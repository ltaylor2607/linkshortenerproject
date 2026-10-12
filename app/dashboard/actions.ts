"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { z } from "zod";
import { createLink } from "@/data/links";

type CreateLinkInput = {
  destinationUrl: string;
  shortCode?: string;
};

type CreateLinkResult =
  | { success: true; shortCode: string }
  | { error: string };

const createLinkSchema = z.object({
  destinationUrl: z
    .url({ protocol: /^https?$/, error: "Enter a valid http(s) URL." })
    .max(2048, "URL is too long."),
  shortCode: z
    .string()
    .regex(
      /^[A-Za-z0-9_-]{3,20}$/,
      "Short code must be 3–20 characters: letters, numbers, - or _.",
    )
    .optional(),
});

const MAX_GENERATION_ATTEMPTS = 5;
const SHORT_CODE_LENGTH = 8;

function generateShortCode(): string {
  return nanoid(SHORT_CODE_LENGTH);
}

export async function createLinkAction(
  input: CreateLinkInput,
): Promise<CreateLinkResult> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "You must be signed in to create a link." };
    }

    const parsed = createLinkSchema.safeParse({
      destinationUrl: input.destinationUrl.trim(),
      shortCode: input.shortCode?.trim() || undefined,
    });
    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
    }

    const { destinationUrl, shortCode: customCode } = parsed.data;

    if (customCode) {
      const created = await createLink({
        clerkUserId: userId,
        destinationUrl,
        shortCode: customCode,
      });
      if (!created) {
        return { error: "That short code is already taken." };
      }
      revalidatePath("/dashboard");
      return { success: true, shortCode: created.shortCode };
    }

    for (let attempt = 0; attempt < MAX_GENERATION_ATTEMPTS; attempt++) {
      const created = await createLink({
        clerkUserId: userId,
        destinationUrl,
        shortCode: generateShortCode(),
      });
      if (created) {
        revalidatePath("/dashboard");
        return { success: true, shortCode: created.shortCode };
      }
    }

    return { error: "Could not generate a unique short code. Try again." };
  } catch {
    return { error: "Something went wrong while creating the link." };
  }
}
