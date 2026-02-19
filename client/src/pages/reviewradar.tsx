import { useRef, useEffect, useCallback } from "react";
import {
  ArrowDown,
  ArrowRight,
  Radar,
  Bot,
  MessageSquare,
  BarChart3,
  Search,
  Globe,
  Database,
  Check,
  X,
  Sun,
  Moon,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus,
  Star,
  Eye,
  RefreshCw,
  Shield,
  Layers,
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
          ReviewRadar<span className="font-normal text-muted-foreground">.com</span>
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
            Review Intelligence
          </Badge>
          <h1
            className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl text-foreground"
            data-testid="text-headline"
          >
            Every review site.{" "}
            <br />
            One consensus.
          </h1>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground max-w-md sm:text-base" data-testid="text-subheadline">
            ReviewRadar aggregates sentiment from G2, Capterra, TrustRadius, Reddit, and more — then delivers a consensus report for every B2B product, brand by brand.
          </p>

          <div className="mt-8 flex items-center gap-3 flex-wrap">
            <Button variant="outline" data-testid="button-explore">
              Explore Reports
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 w-full max-w-sm">
          <HeroDashboardCard />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50">
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </section>
  );
}

function HeroDashboardCard() {
  const { theme } = useTheme();
  const sources = [
    { name: "G2", rating: "4.4", sentiment: "positive", reviews: "11,200" },
    { name: "Capterra", rating: "4.5", sentiment: "positive", reviews: "4,100" },
    { name: "TrustRadius", rating: "8.2/10", sentiment: "positive", reviews: "2,800" },
    { name: "Reddit", rating: "Mixed", sentiment: "neutral", reviews: "850 threads" },
  ];

  return (
    <div
      className={`rounded-xl border p-5 card-glow overflow-visible ${
        theme === "sparkle"
          ? "border-purple-900/20 bg-card/40"
          : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
      }`}
      data-testid="hero-dashboard-card"
    >
      <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
        <h3 className="text-sm font-semibold text-foreground">HubSpot CRM</h3>
        <Badge variant="outline" className="text-[9px] text-emerald-400 no-default-hover-elevate">Consensus: Positive</Badge>
      </div>
      <span className="text-[10px] text-muted-foreground/50">Aggregated from 4 sources</span>

      <div className="mt-4 space-y-2">
        {sources.map((s) => (
          <div key={s.name} className="rounded-lg bg-background/40 px-3 py-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-foreground/60 font-medium w-20">{s.name}</span>
              <span className="text-[11px] text-foreground/50 font-mono">{s.rating}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground/40">{s.reviews}</span>
              {s.sentiment === "positive" ? (
                <TrendingUp className="w-3 h-3 text-emerald-400/60" />
              ) : (
                <Minus className="w-3 h-3 text-amber-400/60" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-3 flex-wrap">
        <span className="text-[10px] text-muted-foreground/40">Last updated: Feb 2026</span>
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
      icon: Eye,
      title: "Reviews are scattered",
      description: "G2 says one thing. Capterra says another. Reddit says something else entirely. There's no single place to see what the consensus actually is.",
      detail: "10 sources. 10 different stories.",
    },
    {
      icon: Shield,
      title: "Review sites are biased",
      description: "Most review platforms rank products by who pays the most. Featured listings, sponsored placements, and gated reviews distort the picture.",
      detail: "Pay to rank. Not earn to rank.",
    },
    {
      icon: RefreshCw,
      title: "Sentiment changes fast",
      description: "A product launch, a price hike, or a support failure can shift sentiment overnight. Static review pages don't capture momentum.",
      detail: "Reviews age. Sentiment doesn't.",
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
            You'd need a research team to read all the reviews.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-lg">
            Before choosing B2B software, buyers check 3–5 review sites, scan Reddit threads, and ask AI. ReviewRadar does all of that automatically.
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
                <span className="text-[10px] font-mono text-muted-foreground/40 italic">{p.detail}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const { theme } = useTheme();
  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-how">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            How it works
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-how-heading">
            AI-powered review aggregation, delivered as a report.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-lg">
            ReviewRadar scans every major review platform, pulls real-time sentiment, normalizes ratings across different scales, and delivers a single consensus view per product.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: Search,
              title: "Scans all major platforms",
              description: "G2, Capterra, TrustRadius, Gartner Peer Insights, Reddit, Twitter/X, and industry forums. Every public signal in one place.",
            },
            {
              icon: BarChart3,
              title: "Normalizes ratings",
              description: "G2 uses 5 stars. TrustRadius uses 10. Reddit has no score. ReviewRadar normalizes everything to a single comparable scale.",
            },
            {
              icon: TrendingUp,
              title: "Tracks sentiment over time",
              description: "Not just the current score — the trajectory. Is sentiment improving after a product update? Declining after a price increase? You'll see it.",
            },
            {
              icon: Layers,
              title: "Delivers consensus reports",
              description: "One report per product. Strengths, weaknesses, trend direction, and the overall consensus across all sources. Updated continuously.",
            },
          ].map((step, i) => {
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
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-border/40 bg-background/40">
                    <Icon className="w-4 h-4 text-muted-foreground/60" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground/60">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ReportExampleSection() {
  const { theme } = useTheme();
  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-report">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            Sample report
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-report-heading">
            What a ReviewRadar report looks like.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-lg">
            Every product gets a structured consensus report with normalized ratings, sentiment trends, and source-by-source breakdown.
          </p>
        </div>

        <div
          className={`rounded-xl border p-6 ${
            theme === "sparkle"
              ? "border-purple-900/20 bg-card/40"
              : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
          }`}
        >
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div>
              <h3 className="text-base font-semibold text-foreground">HubSpot CRM</h3>
              <span className="text-[10px] text-muted-foreground/50">CRM / Marketing Automation</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">4.4</div>
                <span className="text-[10px] text-emerald-400/60">Consensus Score</span>
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-400/50" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="rounded-lg bg-background/40 p-4">
              <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium">Strengths (consensus)</span>
              <div className="mt-2 space-y-1.5">
                {["Ease of use / low learning curve", "All-in-one platform (CRM + marketing + service)", "Strong free tier for startups", "Native AI features (Breeze)"].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-emerald-400/50 shrink-0" />
                    <span className="text-[11px] text-foreground/60">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-background/40 p-4">
              <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium">Weaknesses (consensus)</span>
              <div className="mt-2 space-y-1.5">
                {["Price escalation at scale", "Limited customization vs. Salesforce", "Reporting depth in lower tiers", "Contact-based pricing model"].map((w) => (
                  <div key={w} className="flex items-center gap-2">
                    <X className="w-3 h-3 text-red-400/40 shrink-0" />
                    <span className="text-[11px] text-foreground/60">{w}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-background/40 p-4">
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium mb-3 block">Source breakdown</span>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-border/20">
                    <th className="text-left pb-2 text-muted-foreground/50 font-medium">Source</th>
                    <th className="text-center pb-2 text-muted-foreground/50 font-medium">Rating</th>
                    <th className="text-center pb-2 text-muted-foreground/50 font-medium">Reviews</th>
                    <th className="text-center pb-2 text-muted-foreground/50 font-medium">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { source: "G2", rating: "4.4 / 5", reviews: "11,200", trend: "up" },
                    { source: "Capterra", rating: "4.5 / 5", reviews: "4,100", trend: "stable" },
                    { source: "TrustRadius", rating: "8.2 / 10", reviews: "2,800", trend: "up" },
                    { source: "Gartner Peers", rating: "4.3 / 5", reviews: "1,950", trend: "stable" },
                    { source: "Reddit", rating: "Mixed", reviews: "850 threads", trend: "neutral" },
                  ].map((row, i) => (
                    <tr key={row.source} className={i < 4 ? "border-b border-border/10" : ""}>
                      <td className="py-2 text-foreground/60">{row.source}</td>
                      <td className="py-2 text-center text-foreground/50 font-mono">{row.rating}</td>
                      <td className="py-2 text-center text-muted-foreground/40">{row.reviews}</td>
                      <td className="py-2 text-center">
                        {row.trend === "up" ? <TrendingUp className="w-3 h-3 text-emerald-400/50 mx-auto" /> :
                         row.trend === "stable" ? <Minus className="w-3 h-3 text-muted-foreground/40 mx-auto" /> :
                         <Minus className="w-3 h-3 text-amber-400/50 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-background/40 p-4">
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium">Consensus verdict</span>
            <p className="mt-2 text-xs leading-relaxed text-foreground/60">
              HubSpot CRM is consistently rated as the easiest-to-adopt all-in-one platform for mid-market companies. Reviewers across all platforms praise the unified experience and free tier. The most common criticism is price escalation at higher tiers and limited enterprise-grade customization compared to Salesforce. Sentiment is trending positive following the Breeze AI launch in late 2025.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SourcesSection() {
  const { theme } = useTheme();
  const sources = [
    { name: "G2", type: "Review platform", scale: "5-star", strength: "Largest B2B review volume" },
    { name: "Capterra", type: "Review platform", scale: "5-star", strength: "SMB-focused reviews" },
    { name: "TrustRadius", type: "Review platform", scale: "10-point", strength: "Long-form, verified reviews" },
    { name: "Gartner Peer Insights", type: "Review platform", scale: "5-star", strength: "Enterprise buyer reviews" },
    { name: "Reddit", type: "Community", scale: "Sentiment", strength: "Unfiltered, anonymous opinions" },
    { name: "X / Twitter", type: "Social", scale: "Sentiment", strength: "Real-time reaction to changes" },
  ];

  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-sources">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            Sources monitored
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-sources-heading">
            Where ReviewRadar pulls from.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-lg">
            Structured review platforms for ratings. Communities for unfiltered sentiment. All normalized into one view.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sources.map((s, i) => (
            <div
              key={s.name}
              className={`rounded-xl border p-5 ${
                theme === "sparkle"
                  ? "border-purple-900/20 bg-card/40"
                  : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
              }`}
              data-testid={`source-${i}`}
            >
              <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                <h3 className="text-sm font-semibold text-foreground">{s.name}</h3>
                <Badge variant="outline" className="text-[9px] text-muted-foreground/50 no-default-hover-elevate">{s.type}</Badge>
              </div>
              <div className="space-y-1 text-[11px] text-muted-foreground/50">
                <div>Scale: <span className="text-foreground/50 font-mono">{s.scale}</span></div>
                <div>{s.strength}</div>
              </div>
            </div>
          ))}
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
            Without and with ReviewRadar
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-comparison-heading">
            What research looks like today vs. with ReviewRadar.
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
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium">Manual research</span>
            <div className="mt-4 space-y-2">
              {[
                { step: "1", text: "Check G2 for star ratings", time: "10 min" },
                { step: "2", text: "Cross-reference Capterra reviews", time: "10 min" },
                { step: "3", text: "Read TrustRadius long-form reviews", time: "20 min" },
                { step: "4", text: "Search Reddit for real opinions", time: "15 min" },
                { step: "5", text: "Try to reconcile conflicting signals", time: "????" },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3 rounded-lg bg-background/40 px-3 py-2">
                  <span className="text-[10px] font-mono text-muted-foreground/40 mt-0.5 shrink-0">{s.step}</span>
                  <div className="flex-1">
                    <p className="text-[11px] text-foreground/50">{s.text}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground/30 font-mono shrink-0">{s.time}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground/40 italic">55+ minutes per product. Per decision.</p>
          </div>

          <div
            className={`rounded-xl border p-5 ${
              theme === "sparkle"
                ? "border-purple-900/20 bg-card/40"
                : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
            }`}
          >
            <span className="text-[10px] text-emerald-400/60 uppercase tracking-wider font-medium">ReviewRadar</span>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg bg-background/40 px-3 py-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <Radar className="w-3 h-3 text-emerald-400/50" />
                  <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">Consensus report</span>
                </div>
                <div className="text-[11px] text-foreground/60 mt-1">All sources scanned and normalized</div>
                <div className="text-[11px] text-emerald-400/60">Consensus score: 4.4 / 5 (Positive)</div>
              </div>
              <div className="rounded-lg bg-background/40 px-3 py-2.5">
                <div className="text-[11px] text-foreground/60">Strengths, weaknesses, and trend direction</div>
                <div className="text-[11px] text-emerald-400/50 mt-1">Delivered in one structured report</div>
              </div>
              <div className="rounded-lg bg-background/40 px-3 py-2.5">
                <div className="text-[11px] text-foreground/60">Source-by-source breakdown included</div>
                <div className="text-[11px] text-emerald-400/50 mt-1">Updated continuously, not manually</div>
              </div>
            </div>
            <p className="mt-3 text-[10px] text-emerald-400/40">30 seconds. Every product. Always current.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatYouGetSection() {
  const { theme } = useTheme();
  const fields = [
    { field: "Consensus score", description: "Normalized rating across all sources on a 5-point scale" },
    { field: "Sentiment trend", description: "Direction of sentiment over trailing 90 days (improving, declining, stable)" },
    { field: "Strengths", description: "Top 4–6 strengths consistently cited across platforms" },
    { field: "Weaknesses", description: "Top 4–6 weaknesses consistently cited across platforms" },
    { field: "Source breakdown", description: "Rating, review count, and trend per individual platform" },
    { field: "Consensus verdict", description: "Plain-language summary of what reviewers collectively agree on" },
    { field: "Category context", description: "How this product compares to category average" },
    { field: "Last updated", description: "Timestamp of most recent data pull" },
  ];

  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-what-you-get">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            Report anatomy
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-anatomy-heading">
            What every report includes.
          </h2>
        </div>

        <div
          className={`rounded-xl border overflow-hidden ${
            theme === "sparkle"
              ? "border-purple-900/20 bg-card/40"
              : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left p-4 text-muted-foreground/50 font-medium">Field</th>
                  <th className="text-left p-4 text-foreground/70 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((f, i) => (
                  <tr key={f.field} className={i < fields.length - 1 ? "border-b border-border/20" : ""}>
                    <td className="p-4 text-foreground/60 font-mono text-[11px] whitespace-nowrap">{f.field}</td>
                    <td className="p-4 text-muted-foreground/50">{f.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  const { theme } = useTheme();
  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-use-cases">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            Who uses this
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-use-cases-heading">
            Built for people who make software decisions.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: Search,
              title: "Software buyers",
              description: "Skip the 5-tab research process. See the consensus on any B2B product in 30 seconds. Strengths, weaknesses, and trend direction — from every major source.",
            },
            {
              icon: BarChart3,
              title: "Product marketers",
              description: "Monitor how your product is perceived across all review platforms. Track sentiment shifts after launches, pricing changes, or competitor moves.",
            },
            {
              icon: Globe,
              title: "AI-native content",
              description: "ReviewRadar reports are structured data. When AI is asked \"What do people think of [Product]?\" — these are the reports it pulls from.",
            },
          ].map((uc, i) => {
            const Icon = uc.icon;
            return (
              <div
                key={uc.title}
                className={`rounded-xl border p-5 ${
                  theme === "sparkle"
                    ? "border-purple-900/20 bg-card/40"
                    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
                }`}
                data-testid={`use-case-${i}`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-border/40 bg-background/40 mb-4">
                  <Icon className="w-4 h-4 text-muted-foreground/60" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">{uc.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground/60">{uc.description}</p>
              </div>
            );
          })}
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
            Stop reading reviews. Start reading the consensus.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-md">
            Every major review platform. Normalized ratings. Sentiment trends. One report per product.
          </p>
          <div className="mt-8 flex items-center gap-3 flex-wrap">
            <Button variant="outline" data-testid="button-cta-explore">
              Explore Reports
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
              ReviewRadar<span className="font-normal text-muted-foreground">.com</span>
            </span>
            <p className="mt-1 text-xs text-muted-foreground/60">
              Consensus review intelligence for B2B software.
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground/40">
              Part of Brandvious, Inc.
            </p>
            <p className="text-[10px] text-muted-foreground/40">
              Land O' Lakes, Florida
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/20">
          <p className="text-[10px] text-muted-foreground/30">
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

export default function ReviewRadar() {
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
        <ReportExampleSection />
        <SectionDivider />
        <SourcesSection />
        <SectionDivider />
        <WhatYouGetSection />
        <SectionDivider />
        <UseCasesSection />
        <SectionDivider />
        <CtaSection />
        <Footer />
      </div>
    </div>
  );
}
