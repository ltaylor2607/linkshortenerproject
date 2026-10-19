"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { z } from "zod";
import { createLink, deleteLink, updateLink } from "@/data/links";

type CreateLinkInput = {
  destinationUrl: string;
  shortCode?: string;
};

type CreateLinkResult =
  | { success: true; shortCode: string }
  | { error: string };

const destinationUrlSchema = z
  .url({ protocol: /^https?$/, error: "Enter a valid http(s) URL." })
  .max(2048, "URL is too long.")
  .refine(
    (value) => {
      const { username, password } = new URL(value);
      return !username && !password;
    },
    { message: "URLs with embedded credentials are not allowed." },
  );

const shortCodeSchema = z
  .string()
  .regex(
    /^[A-Za-z0-9_-]{3,20}$/,
    "Short code must be 3–20 characters: letters, numbers, - or _.",
  );

const trimmedDestinationUrlSchema = z
  .string({ error: "Enter a valid http(s) URL." })
  .trim()
  .pipe(destinationUrlSchema);

const createLinkSchema = z.object({
  destinationUrl: trimmedDestinationUrlSchema,
  shortCode: z
    .string({ error: "Invalid short code." })
    .trim()
    .optional()
    .transform((value) => value || undefined)
    .pipe(shortCodeSchema.optional()),
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

    const parsed = createLinkSchema.safeParse(input);
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

type UpdateLinkInput = {
  id: number;
  destinationUrl: string;
  shortCode: string;
};

type UpdateLinkResult = { success: true } | { error: string };

const linkIdSchema = z
  .number({ error: "Invalid link." })
  .int("Invalid link.")
  .positive("Invalid link.");

const updateLinkSchema = z.object({
  id: linkIdSchema,
  destinationUrl: trimmedDestinationUrlSchema,
  shortCode: z
    .string({ error: "Invalid short code." })
    .trim()
    .pipe(shortCodeSchema),
});

const deleteLinkSchema = z.object({
  id: linkIdSchema,
});

export async function updateLinkAction(
  input: UpdateLinkInput,
): Promise<UpdateLinkResult> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "You must be signed in to update a link." };
    }

    const parsed = updateLinkSchema.safeParse(input);
    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
    }

    const updated = await updateLink({
      id: parsed.data.id,
      clerkUserId: userId,
      destinationUrl: parsed.data.destinationUrl,
      shortCode: parsed.data.shortCode,
    });
    if (!updated) {
      return {
        error: "That short code is already taken, or the link no longer exists.",
      };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch {
    return { error: "Something went wrong while updating the link." };
  }
}

type DeleteLinkInput = {
  id: number;
};

type DeleteLinkResult = { success: true } | { error: string };

export async function deleteLinkAction(
  input: DeleteLinkInput,
): Promise<DeleteLinkResult> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "You must be signed in to delete a link." };
    }

    const parsed = deleteLinkSchema.safeParse(input);
    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
    }

    const deleted = await deleteLink({
      id: parsed.data.id,
      clerkUserId: userId,
    });
    if (!deleted) {
      return { error: "That link no longer exists." };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch {
    return { error: "Something went wrong while deleting the link." };
  }
}
