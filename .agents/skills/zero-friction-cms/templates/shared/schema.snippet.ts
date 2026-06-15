// ============================================================================
// Zero-Friction CMS — add this to your existing `shared/schema.ts`.
// Requires: drizzle-orm, drizzle-zod, zod (already present in the fullstack-js template).
// After adding, run `npm run db:push` to create the table.
// ============================================================================
import { sql } from "drizzle-orm";
import { pgTable, text, serial, timestamp, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const siteContent = pgTable(
  "site_content",
  {
    id: serial("id").primaryKey(),
    key: text("key").notNull().unique(),
    value: text("value").notNull(),
    type: text("type").default("text").notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    keyIdx: index("site_content_key_idx").on(table.key),
  })
);

export const insertSiteContentSchema = createInsertSchema(siteContent).pick({
  key: true,
  value: true,
  type: true,
});

// Validation for the public upsert endpoint (key + value only).
export const updateSiteContentSchema = z.object({
  key: z.string().min(1).max(255),
  value: z.string().max(50_000),
});

export type SiteContent = typeof siteContent.$inferSelect;
export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;
export type UpdateSiteContent = z.infer<typeof updateSiteContentSchema>;
