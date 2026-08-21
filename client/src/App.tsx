import { Switch, Route, Redirect, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { EditModeProvider, useEditMode } from "@/contexts/edit-mode-context";
import { ContentProvider, useContent } from "@/contexts/content-context";
import { AutoEditOverlay } from "@/components/auto-edit-overlay";
import { Pencil, X, CheckCircle2, Copy, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Home from "@/pages/home";
import EntitiesHome from "@/pages/entities-home";
import EntitiesPreview from "@/pages/entities";
import Schema from "@/pages/schema";
import WhatisBest from "@/pages/whatisbest";
import WhatisBestV2 from "@/pages/whatisbest-v2";
import WhatisBestV3 from "@/pages/whatisbest-v3";
import AnswerStack from "@/pages/answerstack";
import ReviewRadar from "@/pages/reviewradar";
import Mentions from "@/pages/mentions";
import HomeV2 from "@/pages/home-v2";
import HomeV3 from "@/pages/home-v3";
import HomeV4 from "@/pages/home-v4";
import HomeNew from "@/pages/home-new";
import HomeV5 from "@/pages/home-v5";
import HomeV6 from "@/pages/home-v6";
import Partners from "@/pages/partners";
import Gtm from "@/pages/gtm";
import Playbook from "@/pages/playbook";
import Redirects from "@/pages/redirects";
import Products from "@/pages/products";
import Pricing from "@/pages/pricing";
import NotFound from "@/pages/not-found";
import Login from "@/pages/login";
import HomePublic from "@/pages/home-public";
import HomeBrandvious from "@/pages/home-brandvious";
import AgentcyModel from "@/pages/agentcy-model";
import Future from "@/pages/future";
import HomeAeo from "@/pages/home-aeo";
import SprocketRocketStack from "@/pages/sprocketrocket-stack";
import ProductsPublic from "@/pages/products-public";
import { PrivateGate } from "@/components/private-gate";

/** Redirects a legacy public URL to its /private equivalent (preserves params, query string, and hash). */
function MoveToPrivate() {
  const [location] = useLocation();
  return <Redirect to={`/private${location}${window.location.search}${window.location.hash}`} />;
}

function Router() {
  return (
    <Switch>
      {/* Public site */}
      <Route path="/" component={HomeBrandvious} />
      <Route path="/growthrocket" component={HomePublic} />
      <Route path="/products" component={ProductsPublic} />
      <Route path="/partners" component={Partners} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/login" component={Login} />
      <Route path="/brandvious" component={HomeBrandvious} />
      <Route path="/agentcy-model" component={AgentcyModel} />
      <Route path="/future" component={Future} />
      <Route path="/aeo" component={HomeAeo} />
      <Route path="/sprocketrocket" component={SprocketRocketStack} />
      <Route path="/partner-playbook">
        <Redirect to="/private/partner-playbook" />
      </Route>
      <Route path="/playbook">
        <Redirect to="/partner-playbook" />
      </Route>
      <Route path="/new">
        <Redirect to="/private" />
      </Route>

      {/* Private site (password-gated): the previous public stack, preserved as-is */}
      <Route path="/private"><PrivateGate><HomeNew /></PrivateGate></Route>
      <Route path="/private/v1"><PrivateGate><Home /></PrivateGate></Route>
      <Route path="/private/v2"><PrivateGate><HomeV2 /></PrivateGate></Route>
      <Route path="/private/v3"><PrivateGate><HomeV3 /></PrivateGate></Route>
      <Route path="/private/v4"><PrivateGate><HomeV4 /></PrivateGate></Route>
      <Route path="/private/v5"><PrivateGate><HomeV5 /></PrivateGate></Route>
      <Route path="/private/v6"><PrivateGate><HomeV6 /></PrivateGate></Route>
      <Route path="/private/products"><PrivateGate><Products /></PrivateGate></Route>
      <Route path="/private/pricing"><PrivateGate><Pricing /></PrivateGate></Route>
      <Route path="/private/partners"><PrivateGate><Partners /></PrivateGate></Route>
      <Route path="/private/partner-playbook"><PrivateGate><Playbook /></PrivateGate></Route>
      <Route path="/private/gtm"><PrivateGate><Gtm /></PrivateGate></Route>
      <Route path="/private/redirects"><PrivateGate><Redirects /></PrivateGate></Route>
      <Route path="/private/entities"><PrivateGate><EntitiesHome /></PrivateGate></Route>
      <Route path="/private/entitiespreview"><PrivateGate><EntitiesPreview /></PrivateGate></Route>
      <Route path="/private/schema"><PrivateGate><Schema /></PrivateGate></Route>
      <Route path="/private/whatisbest/v1"><PrivateGate><WhatisBest /></PrivateGate></Route>
      <Route path="/private/whatisbest/v2"><PrivateGate><WhatisBestV2 /></PrivateGate></Route>
      <Route path="/private/whatisbest/sector/:sectorId/:articleId"><PrivateGate><WhatisBestV3 /></PrivateGate></Route>
      <Route path="/private/whatisbest/sector/:sectorId"><PrivateGate><WhatisBestV3 /></PrivateGate></Route>
      <Route path="/private/whatisbest"><PrivateGate><WhatisBestV3 /></PrivateGate></Route>
      <Route path="/private/answerstack"><PrivateGate><AnswerStack /></PrivateGate></Route>
      <Route path="/private/reviewradar"><PrivateGate><ReviewRadar /></PrivateGate></Route>
      <Route path="/private/mentions/:entityId"><PrivateGate><Mentions /></PrivateGate></Route>
      <Route path="/private/mentions"><PrivateGate><Mentions /></PrivateGate></Route>

      {/* Legacy public URLs moved behind the gate */}
      <Route path="/v1"><MoveToPrivate /></Route>
      <Route path="/v2"><MoveToPrivate /></Route>
      <Route path="/v3"><MoveToPrivate /></Route>
      <Route path="/v4"><MoveToPrivate /></Route>
      <Route path="/v5"><MoveToPrivate /></Route>
      <Route path="/v6"><MoveToPrivate /></Route>
      <Route path="/gtm"><MoveToPrivate /></Route>
      <Route path="/redirects"><MoveToPrivate /></Route>
      <Route path="/entities"><MoveToPrivate /></Route>
      <Route path="/entitiespreview"><MoveToPrivate /></Route>
      <Route path="/schema"><MoveToPrivate /></Route>
      <Route path="/whatisbest/sector/:sectorId/:articleId"><MoveToPrivate /></Route>
      <Route path="/whatisbest/sector/:sectorId"><MoveToPrivate /></Route>
      <Route path="/whatisbest/v1"><MoveToPrivate /></Route>
      <Route path="/whatisbest/v2"><MoveToPrivate /></Route>
      <Route path="/whatisbest"><MoveToPrivate /></Route>
      <Route path="/answerstack"><MoveToPrivate /></Route>
      <Route path="/reviewradar"><MoveToPrivate /></Route>
      <Route path="/mentions/:entityId"><MoveToPrivate /></Route>
      <Route path="/mentions"><MoveToPrivate /></Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function FloatingEditButton() {
  const { isEditMode, toggleEditMode, isEnabled } = useEditMode();
  const { content } = useContent();
  const { toast } = useToast();
  const [showApply, setShowApply] = useState(false);
  const [busy, setBusy] = useState(false);

  if (!isEnabled) return null;

  const pending = Object.entries(content);
  const pendingCount = pending.length;
  const token = (import.meta.env.VITE_CMS_EDIT_TOKEN as string | undefined) ?? "";

  const buildPrompt = () => {
    const lines = pending
      .map(([key, value]) => `- key: ${key}\n  new text: ${JSON.stringify(value)}`)
      .join("\n");
    return `Apply the pending CMS edits below to the source code, then delete them from the site_content table so they don't double-apply.\n\nFor each edit: find the old text in the relevant page/component, replace it with the new text, and confirm what you changed. If the key starts with 'auto::/v4::' it's on home-v4.tsx; 'auto::/::' is the homepage (also home-v4.tsx since '/' routes there).\n\nPending edits:\n${lines}`;
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(buildPrompt());
      toast({ title: "Prompt copied", description: "Paste it into chat with the agent." });
    } catch {
      toast({ title: "Copy failed", description: "Clipboard blocked.", variant: "destructive" });
    }
  };

  const discardAll = async () => {
    if (pendingCount === 0) return;
    if (!confirm(`Discard all ${pendingCount} pending edit${pendingCount === 1 ? "" : "s"}? This can't be undone.`)) return;
    setBusy(true);
    try {
      const res = await fetch("/api/content", {
        method: "DELETE",
        headers: { "X-CMS-Edit-Token": token },
      });
      if (!res.ok) throw new Error((await res.text()) || res.statusText);
      await queryClient.invalidateQueries({ queryKey: ["/api/content"] });
      toast({ title: "Discarded", description: `Removed ${pendingCount} pending edit${pendingCount === 1 ? "" : "s"}.` });
      setShowApply(false);
    } catch (e) {
      toast({ title: "Discard failed", description: String(e), variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  if (!isEditMode) {
    return (
      <button
        onClick={toggleEditMode}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50 transition-all"
        data-testid="button-floating-edit"
      >
        <Pencil size={18} />
        <span className="text-sm font-medium">
          Edit Content{pendingCount > 0 ? ` (${pendingCount} pending)` : ""}
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2" data-cms-no-auto data-testid="cms-floating-panel">
      {showApply && (
        <div className="bg-white text-zinc-800 rounded-xl shadow-xl border border-zinc-200 w-96 max-h-[28rem] overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold" data-testid="text-pending-count">
                {pendingCount} pending edit{pendingCount === 1 ? "" : "s"}
              </div>
              <div className="text-xs text-zinc-500">In database, not yet in source code</div>
            </div>
            <button
              onClick={() => setShowApply(false)}
              className="text-zinc-400 hover:text-zinc-700"
              data-testid="button-close-apply"
            >
              <X size={16} />
            </button>
          </div>
          <div className="overflow-auto flex-1 px-4 py-2 text-xs space-y-2">
            {pending.length === 0 && (
              <div className="text-zinc-400 py-6 text-center">No pending edits.</div>
            )}
            {pending.map(([k, v]) => (
              <div key={k} className="border-b border-zinc-50 pb-2 last:border-0">
                <div className="font-mono text-[10px] text-zinc-400 truncate" title={k}>{k}</div>
                <div className="text-zinc-700 break-words" title={v}>{v}</div>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-zinc-100 flex gap-2">
            <button
              onClick={copyPrompt}
              disabled={pendingCount === 0 || busy}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium bg-zinc-900 text-white py-2 rounded-md hover:bg-zinc-800 disabled:opacity-40"
              data-testid="button-copy-apply-prompt"
            >
              <Copy size={14} /> Copy prompt for agent
            </button>
            <button
              onClick={discardAll}
              disabled={pendingCount === 0 || busy}
              className="flex items-center gap-1.5 text-xs font-medium text-red-600 border border-red-200 px-3 py-2 rounded-md hover:bg-red-50 disabled:opacity-40"
              data-testid="button-discard-all"
            >
              <Trash2 size={14} /> Discard
            </button>
          </div>
        </div>
      )}
      <div className="flex gap-2">
        <button
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: ["/api/content"] });
            setShowApply((s) => !s);
          }}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-all"
          data-testid="button-apply-to-code"
        >
          <CheckCircle2 size={18} />
          <span className="text-sm font-medium">
            Apply to code{pendingCount > 0 ? ` (${pendingCount})` : ""}
          </span>
        </button>
        <button
          onClick={toggleEditMode}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-zinc-700 border border-zinc-200 shadow-lg hover:bg-zinc-50 transition-all"
          data-testid="button-exit-edit"
          title="Exit edit mode (pending edits stay saved)"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <EditModeProvider editToken={import.meta.env.VITE_CMS_EDIT_TOKEN ?? null}>
            <ContentProvider>
              <Toaster />
              <Router />
              <AutoEditOverlay />
              <FloatingEditButton />
            </ContentProvider>
          </EditModeProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
