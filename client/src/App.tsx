import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
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
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeV2} />
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
      {/* v2 is the default homepage at "/". /v2 is kept as a permanent alias. */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
