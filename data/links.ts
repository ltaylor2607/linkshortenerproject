import { db } from "@/db";
import { links, type Link } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";

export function getLinksByUserId(clerkUserId: string): Promise<Link[]> {
  return db
    .select()
    .from(links)
    .where(eq(links.clerkUserId, clerkUserId))
    .orderBy(desc(links.createdAt));
}

export async function getLinkByShortCode(
  shortCode: string,
): Promise<Link | undefined> {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);

  return link;
}

type CreateLinkInput = {
  clerkUserId: string;
  destinationUrl: string;
  shortCode: string;
};

// Resolves to undefined when the short code is already taken.
export async function createLink(
  input: CreateLinkInput,
): Promise<Link | undefined> {
  const [created] = await db
    .insert(links)
    .values(input)
    .onConflictDoNothing({ target: links.shortCode })
    .returning();

  return created;
}

type UpdateLinkInput = {
  id: number;
  clerkUserId: string;
  destinationUrl: string;
  shortCode: string;
};

// Resolves to undefined when the link doesn't belong to the user, doesn't
// exist, or the new short code is already taken by another link.
export async function updateLink(
  input: UpdateLinkInput,
): Promise<Link | undefined> {
  try {
    const [updated] = await db
      .update(links)
      .set({
        destinationUrl: input.destinationUrl,
        shortCode: input.shortCode,
        updatedAt: new Date(),
      })
      .where(
        and(eq(links.id, input.id), eq(links.clerkUserId, input.clerkUserId)),
      )
      .returning();

    return updated;
  } catch (error) {
    if (isUniqueViolation(error)) {
      return undefined;
    }
    throw error;
  }
}

type DeleteLinkInput = {
  id: number;
  clerkUserId: string;
};

// Resolves to true when a link belonging to the user was deleted.
export async function deleteLink(input: DeleteLinkInput): Promise<boolean> {
  const [deleted] = await db
    .delete(links)
    .where(
      and(eq(links.id, input.id), eq(links.clerkUserId, input.clerkUserId)),
    )
    .returning({ id: links.id });

  return Boolean(deleted);
}

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "23505"
  );
}
