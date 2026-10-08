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
