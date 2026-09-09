import { pgTable, integer, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  clerkUserId: text().notNull(),
  destinationUrl: text().notNull(),
  shortCode: varchar({ length: 20 }).notNull().unique(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
