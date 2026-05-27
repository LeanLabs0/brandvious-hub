import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

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

export const updateSiteContentSchema = z.object({
  key: z.string().min(1).max(255),
  value: z.string().max(50_000),
});

export type SiteContent = typeof siteContent.$inferSelect;
export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;
export type UpdateSiteContent = z.infer<typeof updateSiteContentSchema>;
