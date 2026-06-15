// ============================================================================
// Zero-Friction CMS — API routes. Merge into your `server/routes.ts`.
//
// SECURITY MODEL: GET is public (so published-site visitors load overrides).
// All writes/deletes are gated by a shared secret compared against the
// `x-cms-edit-token` header. The browser sends VITE_CMS_EDIT_TOKEN; the server
// checks CMS_EDIT_TOKEN. Keep BOTH env vars in the development environment only
// so they're never shipped to production — that's what keeps editing dev-only.
// ============================================================================
import type { Express, Request, Response, NextFunction } from "express";
import { storage } from "./storage";
import { api } from "@shared/routes";

function requireCmsAuth(req: Request, res: Response, next: NextFunction) {
  // Deny-by-default in production. The frontend edit UI is already dev-gated, but
  // the server must not rely on that: if VITE_CMS_EDIT_TOKEN ever leaks into a
  // prod bundle the token is publicly readable, so writes would be forgeable.
  // Block all writes in production unless the operator explicitly opts in.
  const isProd = process.env.NODE_ENV === "production";
  if (isProd && process.env.CMS_ALLOW_PROD_EDIT !== "true") {
    return res.status(403).json({ message: "CMS writes are disabled in production" });
  }

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

// Call this from inside your registerRoutes(app) function.
export function registerCmsRoutes(app: Express) {
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

  app.delete(api.content.deleteAll.path, requireCmsAuth, async (_req, res) => {
    try {
      const deleted = await storage.deleteAllContent();
      res.json({ deleted });
    } catch (err) {
      console.error("Error clearing CMS content", err);
      res.status(500).json({ message: "Failed to clear content" });
    }
  });

  app.delete(api.content.deleteOne.path, requireCmsAuth, async (req, res) => {
    const parsed = api.content.deleteOne.input.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid input",
        field: parsed.error.issues[0]?.path.join("."),
      });
    }
    try {
      const deleted = await storage.deleteContent(parsed.data.key);
      res.json({ deleted });
    } catch (err) {
      console.error("Error deleting CMS content", err);
      res.status(500).json({ message: "Failed to delete content" });
    }
  });
}
