import { useRef, useEffect, useCallback } from "react";
import {
  ArrowDown,
  ArrowRight,
  Globe,
  Database,
  Bot,
  Braces,
  Search,
  FileCode2,
  Users,
  Layers,
  MessageSquare,
  Zap,
  AlertTriangle,
  Check,
  X,
  Sun,
  Moon,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const icon =
    theme === "dark" ? <Sun className="w-4 h-4" /> :
    theme === "light" ? <Sparkles className="w-4 h-4" /> :
    <Moon className="w-4 h-4" />;
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={toggleTheme}
      data-testid="button-theme-toggle"
    >
      {icon}
    </Button>
  );
}

function Navbar() {
  const { theme } = useTheme();
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[9999] px-6 py-4"
      style={{
        backdropFilter: "blur(12px)",
        backgroundColor:
          theme === "sparkle" ? "hsl(220 10% 6% / 0.7)" :
          theme === "dark" ? "hsl(220 10% 6% / 0.8)" :
          "hsl(220 10% 97% / 0.8)",
      }}
      data-testid="navbar"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <span className="text-sm font-semibold tracking-tight text-foreground" data-testid="text-logo">
          SchemaRocket<span className="font-normal text-muted-foreground">.ai</span>
        </span>
        <ThemeToggle />
      </div>
    </nav>
  );
}

function Hero() {
  const { theme } = useTheme();
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen px-6"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {theme === "sparkle" ? (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] animate-subtle-glow"
            style={{ background: "radial-gradient(circle, rgba(100, 30, 140, 0.18) 0%, rgba(60, 10, 90, 0.08) 50%, transparent 70%)" }}
          />
        ) : (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-black/[0.02] dark:bg-white/[0.04] blur-[120px] animate-subtle-glow" />
        )}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <div className="flex-1 text-left">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-6">
            Structured Data
          </Badge>
          <h1
            className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl text-foreground"
            data-testid="text-headline"
          >
            Schema markup that{" "}
            <br />
            AI actually uses.
          </h1>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground max-w-md sm:text-base" data-testid="text-subheadline">
            AI systems recommend businesses they can understand. SchemaRocket builds the structured data layer that makes your brand machine-readable.
          </p>

          <div className="mt-8 flex items-center gap-3 flex-wrap">
            <Button variant="outline" data-testid="button-scan">
              Run AI Visibility Scan
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 w-full max-w-sm">
          <HeroSchemaCard />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/70">
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </section>
  );
}

function HeroSchemaCard() {
  const { theme } = useTheme();
  return (
    <div
      className={`rounded-xl border p-5 card-glow overflow-visible ${
        theme === "sparkle"
          ? "border-purple-900/20 bg-card/40"
          : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
      }`}
      data-testid="hero-schema-card"
    >
      <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[9px] text-emerald-400 no-default-hover-elevate">Valid JSON-LD</Badge>
          <span className="text-[10px] text-emerald-500/70 font-mono">32 lines</span>
        </div>
      </div>
      <div className="rounded-lg bg-background/40 p-3 font-mono text-[11px] leading-relaxed space-y-0.5">
        <div className="text-foreground/70">{"{"}</div>
        <div className="pl-3"><span className="text-emerald-400/70">"@context"</span>: <span className="text-foreground/70">"schema.org"</span>,</div>
        <div className="pl-3"><span className="text-emerald-400/70">"@type"</span>: <span className="text-foreground/70">"Organization"</span>,</div>
        <div className="pl-3"><span className="text-emerald-400/70">"name"</span>: <span className="text-foreground/70">"YourCompany"</span>,</div>
        <div className="pl-3"><span className="text-emerald-400/70">"founder"</span>: {"{"}</div>
        <div className="pl-6"><span className="text-emerald-400/70">"@type"</span>: <span className="text-foreground/70">"Person"</span>,</div>
        <div className="pl-6"><span className="text-emerald-400/70">"name"</span>: <span className="text-foreground/70">"Jane Smith"</span></div>
        <div className="pl-3">{"},"}</div>
        <div className="pl-3"><span className="text-emerald-400/70">"makesOffer"</span>: <span className="text-foreground/65">[...]</span>,</div>
        <div className="pl-3"><span className="text-emerald-400/70">"sameAs"</span>: <span className="text-foreground/65">[LinkedIn, Crunchbase]</span></div>
        <div className="text-foreground/70">{"}"}</div>
      </div>
      <div className="mt-3 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-muted-foreground/60">10 entities</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-muted-foreground/60">12 relationships</span>
        </div>
      </div>
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      <div className="divider-glow" />
    </div>
  );
}

function ProblemSection() {
  const { theme } = useTheme();
  const problems = [
    {
      icon: AlertTriangle,
      title: "No Entity Identity",
      description: "Without entity schema, AI has no source of truth. It scrapes fragments from different pages, sees incomplete data, and defaults to skipping you.",
      detail: "No Schema. No Citations.",
    },
    {
      icon: FileCode2,
      title: "Unstructured Content",
      description: "Your content exists, but AI can't extract structured answers from plain text. It pulls from pages with FAQ schema, not walls of prose.",
      detail: "No Structure. No Extraction.",
    },
    {
      icon: Search,
      title: "Zero Trust Signals",
      description: "Without entity connections, AI can't verify your credentials, expertise, or authority. No verification means no recommendations.",
      detail: "No Entity Links. No Authority.",
    },
  ];

  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-problem">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            The problem
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-problem-heading">
            AI can't recommend what it can't understand.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-lg">
            Your site looks great to humans. But AI sees fragmented data, conflicting signals, and missing connections.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className={`rounded-xl border p-5 ${
                  theme === "sparkle"
                    ? "border-purple-900/20 bg-card/40"
                    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
                }`}
                data-testid={`problem-${i}`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-border/40 bg-background/40 mb-4">
                  <Icon className="w-4 h-4 text-muted-foreground/60" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground/60 mb-3">{p.description}</p>
                <span className="text-[10px] font-mono text-muted-foreground/60 italic">{p.detail}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const { theme } = useTheme();
  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-comparison">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            How AI decides
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-comparison-heading">
            What AI sees with and without structured data.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`rounded-xl border p-5 ${
              theme === "sparkle"
                ? "border-purple-900/20 bg-card/40"
                : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
            }`}
          >
            <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-medium">Without SchemaRocket</span>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg bg-background/40 px-3 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="w-3 h-3 text-muted-foreground/70" />
                  <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider">AI crawls page</span>
                </div>
                <div className="text-[11px] text-foreground/70 font-mono mt-1">Found: title, body text, meta</div>
                <div className="text-[11px] text-muted-foreground/60 font-mono">No schema. No entities. No graph.</div>
              </div>
              <div className="rounded-lg bg-background/40 px-3 py-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="w-3 h-3 text-muted-foreground/70" />
                  <span className="text-[10px] text-muted-foreground/70">AI Response</span>
                </div>
                <p className="text-[11px] text-foreground/70 italic">
                  "Top agencies include Vajra Global, Orange Marketing, Holland Adhaus..."
                </p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">Your company is not mentioned.</p>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border p-5 ${
              theme === "sparkle"
                ? "border-purple-900/20 bg-card/40"
                : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
            }`}
          >
            <span className="text-[10px] text-emerald-500/70 uppercase tracking-wider font-medium">With SchemaRocket</span>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg bg-background/40 px-3 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="w-3 h-3 text-emerald-500/70" />
                  <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider">AI crawls page</span>
                </div>
                <div className="text-[11px] text-foreground/80 font-mono mt-1">Found: Organization, Service, SameAs, Rating</div>
                <div className="text-[11px] text-emerald-500/70 font-mono">Full entity graph detected.</div>
              </div>
              <div className="rounded-lg bg-background/40 px-3 py-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="w-3 h-3 text-emerald-500/70" />
                  <span className="text-[10px] text-muted-foreground/70">AI Response</span>
                </div>
                <p className="text-[11px] text-foreground/85">
                  "Top agencies include Lean Labs (Diamond Partner, Tampa FL — AEO + lead gen for SaaS, $100M+ attributed revenue)..."
                </p>
                <p className="text-[10px] text-emerald-500/70 mt-1">Your company is cited with specifics.</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground/70 max-w-lg">
          AI doesn't guess. It looks for structured proof. Without it, you're invisible — not because your content is bad, but because it's unparseable.
        </p>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const { theme } = useTheme();
  const steps = [
    {
      icon: Layers,
      title: "Brand-Level Knowledge Graph",
      description: "We analyze your entire company — products, services, people, locations, expertise — and map how they connect. AI sees your complete entity graph, not isolated pages.",
    },
    {
      icon: Zap,
      title: "Automatic Updates via MCP",
      description: "When you update a page, SchemaRocket regenerates schema via MCP. Agents and workflows keep your structured data synced without manual work.",
    },
    {
      icon: Search,
      title: "Gap Analysis Before Deployment",
      description: "We analyze what's on your page and show you what's missing for optimal AI visibility. You see the gaps before deploying, not after AI skips you.",
    },
  ];

  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-how">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            How it works
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-how-heading">
            Not a page-by-page generator. A brand-wide knowledge graph.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-lg">
            Most schema tools copy what's on your page. SchemaRocket analyzes what should be there, maps your complete entity graph, and identifies gaps before AI ever sees them.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className={`rounded-xl border p-5 ${
                  theme === "sparkle"
                    ? "border-purple-900/20 bg-card/40"
                    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
                }`}
                data-testid={`how-step-${i}`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-border/40 bg-background/40 mb-4">
                  <Icon className="w-4 h-4 text-muted-foreground/60" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground/60">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function OtherToolsComparison() {
  const { theme } = useTheme();
  const otherSteps = [
    { step: "1", text: "Copy-paste a URL into a schema generator", note: "One page at a time" },
    { step: "2", text: "Get generic schema output for that page", note: "No entity connections" },
    { step: "3", text: "Repeat for every page. Manually.", note: "50 pages = 50 sessions" },
    { step: "4", text: "Content changes? Start over.", note: "No sync, no memory" },
  ];

  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-vs">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            Other tools vs. SchemaRocket
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-vs-heading">
            Page-by-page generators break at scale.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`rounded-xl border p-5 ${
              theme === "sparkle"
                ? "border-purple-900/20 bg-card/40"
                : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
            }`}
          >
            <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-medium mb-4 block">Other tools</span>
            <div className="space-y-3">
              {otherSteps.map((s) => (
                <div key={s.step} className="flex items-start gap-3">
                  <span className="text-[10px] font-mono text-muted-foreground/60 mt-0.5 shrink-0">{s.step}</span>
                  <div>
                    <p className="text-[11px] text-foreground/80">{s.text}</p>
                    <p className="text-[10px] text-muted-foreground/60 italic">{s.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`rounded-xl border p-5 ${
              theme === "sparkle"
                ? "border-purple-900/20 bg-card/40"
                : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
            }`}
          >
            <span className="text-[10px] text-emerald-500/70 uppercase tracking-wider font-medium mb-4 block">SchemaRocket</span>
            <div className="space-y-3">
              <div className="rounded-lg bg-background/40 px-3 py-2">
                <p className="text-[11px] text-foreground/80">Analyze your entire site once</p>
                <p className="text-[10px] text-emerald-500/70">Full entity graph mapped automatically</p>
              </div>
              <div className="rounded-lg bg-background/40 px-3 py-2">
                <p className="text-[11px] text-foreground/80">Schema generated per page type</p>
                <p className="text-[10px] text-emerald-500/70">Connected to your brand knowledge graph</p>
              </div>
              <div className="rounded-lg bg-background/40 px-3 py-2">
                <p className="text-[11px] text-foreground/80">Content changes trigger updates</p>
                <p className="text-[10px] text-emerald-500/70">MCP keeps schema synced automatically</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatAISeesSection() {
  const { theme } = useTheme();
  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-ai-sees">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            Technical proof
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-ai-sees-heading">
            What AI actually sees.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-lg">
            Most tools show you formatted markdown. SchemaRocket builds the machine-readable architecture AI systems actually use to rank and recommend.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            className={`rounded-xl border p-5 ${
              theme === "sparkle"
                ? "border-purple-900/20 bg-card/40"
                : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-3.5 h-3.5 text-muted-foreground/70" />
              <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider">Entity Graph</span>
            </div>
            <p className="text-xs text-muted-foreground/60 mb-3">How we map your brand's knowledge architecture</p>
            <div className="rounded-lg bg-background/40 p-3 font-mono text-[10px] text-muted-foreground/60 space-y-0.5">
              <div><span className="text-emerald-400/70">"@type"</span>: <span className="text-foreground/70">"Organization"</span></div>
              <div><span className="text-emerald-400/70">"name"</span>: <span className="text-foreground/70">"YourCompany"</span></div>
              <div><span className="text-emerald-400/70">"founder"</span>: {"{"}</div>
              <div className="pl-2"><span className="text-emerald-400/70">"@type"</span>: <span className="text-foreground/70">"Person"</span></div>
              <div className="pl-2"><span className="text-emerald-400/70">"name"</span>: <span className="text-foreground/70">"Jane Smith"</span></div>
              <div>{"}"}</div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-[10px] text-muted-foreground/60">10 entities</span>
              <span className="text-[10px] text-muted-foreground/60">12 relationships</span>
            </div>
          </div>

          <div
            className={`rounded-xl border p-5 ${
              theme === "sparkle"
                ? "border-purple-900/20 bg-card/40"
                : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Braces className="w-3.5 h-3.5 text-muted-foreground/70" />
              <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider">Generated Schema</span>
            </div>
            <p className="text-xs text-muted-foreground/60 mb-3">Actual JSON-LD deployed to your pages</p>
            <div className="rounded-lg bg-background/40 p-3">
              <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                <span className="text-[10px] text-muted-foreground/60 font-mono">32 lines</span>
                <Badge variant="outline" className="text-[9px] text-emerald-400 no-default-hover-elevate">Valid JSON-LD</Badge>
              </div>
              <div className="space-y-1">
                {["Organization", "Person", "Service", "Product", "SameAs"].map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-emerald-500/70" />
                    <span className="text-[10px] text-foreground/70 font-mono">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border p-5 ${
              theme === "sparkle"
                ? "border-purple-900/20 bg-card/40"
                : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-3.5 h-3.5 text-muted-foreground/70" />
              <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider">Visibility Score</span>
            </div>
            <p className="text-xs text-muted-foreground/60 mb-3">Your brand's AI-readiness at a glance</p>
            <div className="rounded-lg bg-background/40 p-4">
              <div className="text-3xl font-bold text-foreground mb-1">82%</div>
              <span className="text-[10px] text-emerald-500/70">AI-Ready</span>
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-muted-foreground/70">Ready</span>
                  <span className="text-[10px] text-emerald-500/70 font-mono">4</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-muted-foreground/70">Gaps</span>
                  <span className="text-[10px] text-amber-400/60 font-mono">3</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-muted-foreground/70">Risk</span>
                  <span className="text-[10px] text-red-400/60 font-mono">1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PageTypesSection() {
  const { theme } = useTheme();
  const pageTypes = [
    {
      title: "Homepage",
      subtitle: "Full entity graph root",
      type: "Organization",
      fields: [
        { key: "name", value: '"Acme Corp"' },
        { key: "founder", value: "Person" },
        { key: "makesOffer", value: "Product[]" },
        { key: "sameAs", value: "[LinkedIn, Crunchbase]" },
      ],
    },
    {
      title: "Product Pages",
      subtitle: "Connected to solutions & team",
      type: "Product",
      fields: [
        { key: "name", value: '"Platform Pro"' },
        { key: "brand", value: "Organization" },
        { key: "review", value: "Review[]" },
        { key: "offers", value: "{ price, availability }" },
      ],
    },
    {
      title: "Blog Posts",
      subtitle: "Author credentials & topics",
      type: "Article",
      fields: [
        { key: "headline", value: '"Why AEO Matters"' },
        { key: "author", value: "Person + credentials" },
        { key: "about", value: "Topic entities" },
        { key: "publisher", value: "Organization" },
      ],
    },
    {
      title: "About Page",
      subtitle: "Linked to authored content",
      type: "Person[]",
      fields: [
        { key: "jobTitle", value: '"CEO"' },
        { key: "worksFor", value: "Organization" },
        { key: "knowsAbout", value: "[expertise areas]" },
        { key: "sameAs", value: "[LinkedIn, Twitter]" },
      ],
    },
    {
      title: "FAQ Pages",
      subtitle: "Structured Q&A for AI parsing",
      type: "FAQPage",
      fields: [
        { key: "mainEntity", value: "Question[]" },
        { key: "name", value: '"How does...?"' },
        { key: "acceptedAnswer", value: "Answer" },
        { key: "about", value: "Product" },
      ],
    },
    {
      title: "Solution Pages",
      subtitle: "Tied to products & outcomes",
      type: "Service",
      fields: [
        { key: "provider", value: "Organization" },
        { key: "serviceOutput", value: '"Outcome description"' },
        { key: "areaServed", value: '"Industry vertical"' },
        { key: "hasOfferCatalog", value: "Product[]" },
      ],
    },
  ];

  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-pages">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            What you get
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-pages-heading">
            Your site, structured.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-lg">
            Each page type gets schema that connects back to your entity graph. Not isolated markup — a connected knowledge system.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pageTypes.map((page, i) => (
            <div
              key={page.title}
              className={`rounded-xl border p-5 ${
                theme === "sparkle"
                  ? "border-purple-900/20 bg-card/40"
                  : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
              }`}
              data-testid={`page-type-${i}`}
            >
              <h3 className="text-sm font-semibold text-foreground mb-0.5">{page.title}</h3>
              <p className="text-[10px] text-muted-foreground/70 mb-3">{page.subtitle}</p>
              <Badge variant="outline" className="text-[9px] text-emerald-400 no-default-hover-elevate font-mono mb-3">{page.type}</Badge>
              <div className="rounded-lg bg-background/40 p-3 font-mono text-[10px] space-y-1">
                {page.fields.map((f) => (
                  <div key={f.key} className="flex items-start gap-1">
                    <span className="text-emerald-400/70 shrink-0">{f.key}:</span>
                    <span className="text-foreground/70">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuiltForSection() {
  const { theme } = useTheme();
  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-built-for">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            Built for teams
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-built-heading">
            Schema shouldn't be a side project.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`rounded-xl border p-6 ${
              theme === "sparkle"
                ? "border-purple-900/20 bg-card/40"
                : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-border/40 bg-background/40">
                <Users className="w-4 h-4 text-muted-foreground/60" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">In-House Marketing Teams</h3>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground/60 mb-4">
              Your content team ships pages daily. Schema falls behind. With SchemaRocket, schema updates when content changes — no backlog, no manual work, no outdated markup.
            </p>
            <div className="space-y-1.5">
              {[
                "Schema deploys when content publishes",
                "No developer tickets for markup updates",
                "AI visibility stays current",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-emerald-500/70" />
                  <span className="text-[11px] text-muted-foreground/70">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`rounded-xl border p-6 ${
              theme === "sparkle"
                ? "border-purple-900/20 bg-card/40"
                : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-border/40 bg-background/40">
                <Globe className="w-4 h-4 text-muted-foreground/60" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Agencies Managing Clients</h3>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground/60 mb-4">
              One dashboard. Multiple portals. Deploy schema across 10 client sites in the time it used to take for one. Strategy stays with your team, implementation runs at scale.
            </p>
            <div className="space-y-1.5">
              {[
                "Multi-portal deployment from one account",
                "White-label schema reports for clients",
                "Scale technical SEO without scaling headcount",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-emerald-500/70" />
                  <span className="text-[11px] text-muted-foreground/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  const { theme } = useTheme();
  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-cta">
      <div className="max-w-4xl mx-auto relative">
        <div
          className={`rounded-xl border px-8 py-12 md:px-16 md:py-16 card-glow ${
            theme === "sparkle"
              ? "border-purple-900/20 bg-card/30"
              : "border-border/60 bg-card/60 dark:border-border/30 dark:bg-card/20"
          }`}
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-cta-heading">
            See what AI knows about your company.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-md">
            Free AI Visibility Scan. Full schema audit, visibility score, and actionable gaps.
          </p>
          <div className="mt-8 flex items-center gap-3 flex-wrap">
            <Button variant="outline" data-testid="button-cta-scan">
              Run Free Scan
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-border/30" data-testid="section-footer">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-sm font-semibold text-foreground">
              SchemaRocket<span className="font-normal text-muted-foreground">.ai</span>
            </span>
            <p className="mt-1 text-xs text-muted-foreground/60">
              Structured data that powers AI recommendations.
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground/60">
              Part of Brandvious, Inc.
            </p>
            <p className="text-[10px] text-muted-foreground/60">
              Land O' Lakes, Florida
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/20">
          <p className="text-[10px] text-muted-foreground/70">
            &copy; 2026 Brandvious, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1, y: -1 });
  const streaksRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    life: number; maxLife: number;
    hue: number; width: number;
    trail: Array<{ x: number; y: number }>;
  }>>([]);
  const waveRef = useRef<Array<{
    y: number; amplitude: number; frequency: number;
    speed: number; phase: number; hue: number; opacity: number;
  }>>([]);

  const init = useCallback((w: number, h: number) => {
    const waves = [];
    for (let i = 0; i < 4; i++) {
      waves.push({
        y: h * 0.2 + (i / 4) * h * 0.6,
        amplitude: 40 + Math.random() * 60,
        frequency: 0.001 + Math.random() * 0.003,
        speed: 0.1 + Math.random() * 0.15,
        phase: Math.random() * Math.PI * 2,
        hue: [270, 290, 260, 305][i],
        opacity: 0.05 + Math.random() * 0.04,
      });
    }
    waveRef.current = waves;
    streaksRef.current = [];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      for (const wave of waveRef.current) {
        wave.phase += wave.speed * 0.016;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const y = wave.y +
            Math.sin(x * wave.frequency + wave.phase) * wave.amplitude +
            Math.sin(x * wave.frequency * 2.3 + wave.phase * 1.7) * wave.amplitude * 0.3 +
            Math.cos(x * wave.frequency * 0.7 + wave.phase * 0.5) * wave.amplitude * 0.5;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, wave.y - wave.amplitude * 2, 0, wave.y + wave.amplitude * 2);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.3, `hsla(${wave.hue}, 80%, 55%, ${wave.opacity})`);
        grad.addColorStop(0.6, `hsla(${wave.hue}, 80%, 55%, ${wave.opacity * 0.5})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fill();
      }

      if (Math.random() < 0.12) {
        const startX = Math.random() * w;
        const startY = Math.random() * h * 0.7;
        streaksRef.current.push({
          x: startX, y: startY,
          vx: (Math.random() - 0.5) * 2.5,
          vy: Math.random() * 1.2 + 0.3,
          life: 0, maxLife: 70 + Math.random() * 90,
          hue: 260 + Math.random() * 50,
          width: 0.4 + Math.random() * 1.2,
          trail: [{ x: startX, y: startY }],
        });
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      for (let i = streaksRef.current.length - 1; i >= 0; i--) {
        const s = streaksRef.current[i];
        s.life++;
        if (s.life > s.maxLife) { streaksRef.current.splice(i, 1); continue; }
        if (mx >= 0) {
          const dx = mx - s.x; const dy = my - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            s.vx += (dx / dist) * 0.25;
            s.vy += (dy / dist) * 0.25;
          }
        }
        s.x += s.vx; s.y += s.vy;
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 25) s.trail.shift();
        const alpha = (1 - s.life / s.maxLife) * 0.5;
        if (s.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(s.trail[0].x, s.trail[0].y);
          for (let j = 1; j < s.trail.length; j++) ctx.lineTo(s.trail[j].x, s.trail[j].y);
          ctx.strokeStyle = `hsla(${s.hue}, 75%, 65%, ${alpha})`;
          ctx.lineWidth = s.width;
          ctx.stroke();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [init]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

export default function Schema() {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen bg-background relative">
      {theme === "sparkle" && <AuroraCanvas />}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <SectionDivider />
        <ProblemSection />
        <SectionDivider />
        <ComparisonSection />
        <SectionDivider />
        <HowItWorksSection />
        <SectionDivider />
        <OtherToolsComparison />
        <SectionDivider />
        <WhatAISeesSection />
        <SectionDivider />
        <PageTypesSection />
        <SectionDivider />
        <BuiltForSection />
        <SectionDivider />
        <CtaSection />
        <Footer />
      </div>
    </div>
  );
}
