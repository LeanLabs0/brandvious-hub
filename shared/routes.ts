import { z } from "zod";
import { siteContent, updateSiteContentSchema } from "./schema";

export const errorSchemas = {
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  unauthorized: z.object({ message: z.string() }),
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  content: {
    list: {
      method: "GET" as const,
      path: "/api/content",
      responses: {
        200: z.record(z.string(), z.string()),
        500: errorSchemas.internal,
      },
    },
    upsert: {
      method: "POST" as const,
      path: "/api/content",
      input: updateSiteContentSchema,
      responses: {
        200: z.custom<typeof siteContent.$inferSelect>(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
        500: errorSchemas.internal,
      },
    },
  },
};

export type ContentMap = z.infer<typeof api.content.list.responses[200]>;
export type ContentUpdateInput = z.infer<typeof api.content.upsert.input>;
export type ContentResponse = z.infer<typeof api.content.upsert.responses[200]>;
