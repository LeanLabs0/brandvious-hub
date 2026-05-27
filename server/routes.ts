import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

function requireCmsAuth(req: Request, res: Response, next: NextFunction) {
  const expected = process.env.CMS_EDIT_TOKEN;
  if (!expected) {
    console.error("CMS_EDIT_TOKEN not set; refusing CMS write");
    return res.status(401).json({ message: "CMS not configured" });
  }
  const provided = req.header("x-cms-edit-token");
  if (provided !== expected) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.content.list.path, async (_req, res) => {
    try {
      const content = await storage.getAllContent();
      res.json(content);
    } catch (err) {
      console.error("Error fetching CMS content", err);
      res.status(500).json({ message: "Failed to fetch content" });
    }
  });

  app.post(api.content.upsert.path, requireCmsAuth, async (req, res) => {
    const parsed = api.content.upsert.input.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid input",
        field: parsed.error.issues[0]?.path.join("."),
      });
    }
    try {
      const content = await storage.upsertContent(parsed.data);
      res.json(content);
    } catch (err) {
      console.error("Error upserting CMS content", err);
      res.status(500).json({ message: "Failed to save content" });
    }
  });

  return httpServer;
}
