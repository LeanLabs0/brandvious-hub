// ============================================================================
// Zero-Friction CMS — storage methods. Merge these into your `server/storage.ts`.
// Add the four method signatures to your IStorage interface, and the
// implementations to your storage class. Keep your existing user methods.
// ============================================================================
import {
  siteContent,
  type SiteContent,
  type UpdateSiteContent,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// --- Add to IStorage interface ---
export interface IStorageContentPart {
  getAllContent(): Promise<Record<string, string>>;
  upsertContent(data: UpdateSiteContent): Promise<SiteContent>;
  deleteContent(key: string): Promise<boolean>;
  deleteAllContent(): Promise<number>;
}

// --- Add these methods to your storage class body ---
export const contentStorageMethods = {
  async getAllContent(): Promise<Record<string, string>> {
    const rows = await db.select().from(siteContent);
    const map: Record<string, string> = {};
    for (const row of rows) map[row.key] = row.value;
    return map;
  },

  async upsertContent(data: UpdateSiteContent): Promise<SiteContent> {
    const [existing] = await db
      .select()
      .from(siteContent)
      .where(eq(siteContent.key, data.key))
      .limit(1);

    if (existing) {
      const [updated] = await db
        .update(siteContent)
        .set({ value: data.value, updatedAt: new Date() })
        .where(eq(siteContent.key, data.key))
        .returning();
      return updated;
    }

    const [created] = await db
      .insert(siteContent)
      .values({ key: data.key, value: data.value, type: "text" })
      .returning();
    return created;
  },

  async deleteContent(key: string): Promise<boolean> {
    const result = await db
      .delete(siteContent)
      .where(eq(siteContent.key, key))
      .returning({ key: siteContent.key });
    return result.length > 0;
  },

  async deleteAllContent(): Promise<number> {
    const result = await db.delete(siteContent).returning({ key: siteContent.key });
    return result.length;
  },
};
