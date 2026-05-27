import {
  siteContent,
  type User,
  type InsertUser,
  type SiteContent,
  type UpdateSiteContent,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllContent(): Promise<Record<string, string>>;
  upsertContent(data: UpdateSiteContent): Promise<SiteContent>;
}

export class HybridStorage implements IStorage {
  private users = new Map<string, User>();

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((u) => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllContent(): Promise<Record<string, string>> {
    const rows = await db.select().from(siteContent);
    const map: Record<string, string> = {};
    for (const row of rows) map[row.key] = row.value;
    return map;
  }

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
  }
}

export const storage = new HybridStorage();
