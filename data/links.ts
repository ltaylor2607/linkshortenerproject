import { db } from "@/db";
import { links, type Link } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export function getLinksByUserId(clerkUserId: string): Promise<Link[]> {
  return db
    .select()
    .from(links)
    .where(eq(links.clerkUserId, clerkUserId))
    .orderBy(desc(links.createdAt));
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
