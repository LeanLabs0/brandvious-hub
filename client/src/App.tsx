import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { EditModeProvider, useEditMode } from "@/contexts/edit-mode-context";
import { ContentProvider } from "@/contexts/content-context";
import { AutoEditOverlay } from "@/components/auto-edit-overlay";
import { Pencil, X } from "lucide-react";
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
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeV4} />
      <Route path="/v1" component={Home} />
      <Route path="/entities" component={EntitiesHome} />
      <Route path="/entitiespreview" component={EntitiesPreview} />
      <Route path="/schema" component={Schema} />
      <Route path="/whatisbest" component={WhatisBestV3} />
      <Route path="/whatisbest/sector/:sectorId" component={WhatisBestV3} />
      <Route path="/whatisbest/sector/:sectorId/:articleId" component={WhatisBestV3} />
      <Route path="/whatisbest/v1" component={WhatisBest} />
      <Route path="/whatisbest/v2" component={WhatisBestV2} />
      <Route path="/answerstack" component={AnswerStack} />
      <Route path="/reviewradar" component={ReviewRadar} />
      <Route path="/mentions" component={Mentions} />
      <Route path="/mentions/:entityId" component={Mentions} />
      <Route path="/v2" component={HomeV2} />
      <Route path="/v3" component={HomeV3} />
      <Route path="/v4" component={HomeV4} />
      <Route component={NotFound} />
    </Switch>
  );
}

function FloatingEditButton() {
  const { isEditMode, toggleEditMode, isEnabled } = useEditMode();
  if (!isEnabled) return null;
  return (
    <button
      onClick={toggleEditMode}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all ${
        isEditMode
          ? "bg-[hsl(var(--cms-accent,217_91%_60%))] text-white"
          : "bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50"
      }`}
      data-testid="button-floating-edit"
    >
      {isEditMode ? <X size={18} /> : <Pencil size={18} />}
      <span className="text-sm font-medium">{isEditMode ? "Exit Edit Mode" : "Edit Content"}</span>
    </button>
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
