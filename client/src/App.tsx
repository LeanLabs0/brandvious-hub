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
import AnswerStack from "@/pages/answerstack";
import ReviewRadar from "@/pages/reviewradar";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/entities" component={EntitiesHome} />
      <Route path="/entitiespreview" component={EntitiesPreview} />
      <Route path="/schema" component={Schema} />
      <Route path="/whatisbest" component={WhatisBest} />
      <Route path="/answerstack" component={AnswerStack} />
      <Route path="/reviewradar" component={ReviewRadar} />
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
