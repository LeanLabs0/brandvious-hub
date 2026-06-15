// ============================================================================
// Zero-Friction CMS — content context. Place at
// `client/src/contexts/content-context.tsx`.
//
// Fetches the content map once (TanStack Query) and exposes getContent/setContent.
// setContent uses raw fetch (not apiRequest) so it can attach the X-CMS-Edit-Token
// header. Optimistic update keeps editing snappy; errors roll back + toast.
// ============================================================================
import { createContext, useContext, useCallback, type ReactNode } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useEditMode } from "@/contexts/edit-mode-context";
import { useToast } from "@/hooks/use-toast";
import type { ContentMap } from "@shared/routes";

interface ContentContextType {
  content: ContentMap;
  isReady: boolean;
  isLoading: boolean;
  getContent: (key: string, defaultValue: string) => string;
  setContent: (key: string, value: string) => Promise<void>;
}

const ContentContext = createContext<ContentContextType | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const { editToken } = useEditMode();
  const { toast } = useToast();

  const { data: content = {}, isLoading, isFetched } = useQuery<ContentMap>({
    queryKey: ["/api/content"],
    staleTime: 30 * 1000,
  });

  const mutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(editToken ? { "X-CMS-Edit-Token": editToken } : {}),
        },
        body: JSON.stringify({ key, value }),
        credentials: "include",
      });
      if (!res.ok) {
        const text = (await res.text()) || res.statusText;
        throw new Error(`${res.status}: ${text}`);
      }
      return res.json();
    },
    onMutate: async ({ key, value }) => {
      await queryClient.cancelQueries({ queryKey: ["/api/content"] });
      const previous = queryClient.getQueryData<ContentMap>(["/api/content"]);
      queryClient.setQueryData<ContentMap>(["/api/content"], (old) => ({
        ...(old ?? {}),
        [key]: value,
      }));
      return { previous };
    },
    onError: (err, _vars, ctx) => {
      if (ctx && "previous" in ctx && ctx.previous !== undefined) {
        queryClient.setQueryData(["/api/content"], ctx.previous);
      }
      toast({
        title: "Couldn't save your edit",
        description: err instanceof Error ? err.message : "Try again in a moment.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content"] });
    },
  });

  const getContent = useCallback(
    (key: string, defaultValue: string) => content[key] ?? defaultValue,
    [content]
  );

  const setContent = useCallback(
    async (key: string, value: string) => {
      await mutation.mutateAsync({ key, value });
    },
    [mutation]
  );

  return (
    <ContentContext.Provider
      value={{ content, isReady: isFetched, isLoading, getContent, setContent }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within a ContentProvider");
  return ctx;
}
