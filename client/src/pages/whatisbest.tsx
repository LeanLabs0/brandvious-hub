import { useRef, useEffect, useCallback } from "react";
import {
  ArrowDown,
  ArrowRight,
  Trophy,
  BarChart3,
  Bot,
  MessageSquare,
  Scale,
  Search,
  Layers,
  FileText,
  Check,
  X,
  Sun,
  Moon,
  Sparkles,
  Users,
  Shield,
  RefreshCw,
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
          WhatisBest<span className="font-normal text-muted-foreground">.com</span>
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
            B2B SaaS Comparisons
          </Badge>
          <h1
            className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl text-foreground"
            data-testid="text-headline"
          >
            Comparisons built{" "}
            <br />
            for AI to cite.
          </h1>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground max-w-md sm:text-base" data-testid="text-subheadline">
            Expert-vetted B2B SaaS comparisons structured so AI search engines can extract, trust, and surface them as answers.
          </p>

          <div className="mt-8 flex items-center gap-3 flex-wrap">
            <Button variant="outline" data-testid="button-browse">
              Browse Comparisons
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 w-full max-w-sm">
          <HeroComparisonCard />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50">
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </section>
  );
}

function HeroComparisonCard() {
  const { theme } = useTheme();
  return (
    <div
      className={`rounded-xl border p-5 card-glow overflow-visible ${
        theme === "sparkle"
          ? "border-purple-900/20 bg-card/40"
          : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
      }`}
      data-testid="hero-comparison-card"
    >
      <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
        <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium">Comparison</span>
        <Badge variant="outline" className="text-[9px] text-emerald-400 no-default-hover-elevate">Expert-vetted</Badge>
      </div>
      <h3 className="text-sm font-semibold text-foreground mb-3">HubSpot vs. Salesforce</h3>

      <div className="space-y-2.5">
        {[
          { label: "Best for", a: "Mid-market growth", b: "Enterprise complexity" },
          { label: "Starting price", a: "$800/mo", b: "$1,650/mo" },
          { label: "Setup time", a: "2–4 weeks", b: "3–6 months" },
          { label: "Native AI", a: "Breeze AI", b: "Einstein GPT" },
        ].map((row) => (
          <div key={row.label} className="rounded-lg bg-background/40 px-3 py-2">
            <span className="text-[9px] text-muted-foreground/40 uppercase tracking-wider">{row.label}</span>
            <div className="flex items-center justify-between gap-3 mt-1">
              <span className="text-[11px] text-foreground/60">{row.a}</span>
              <span className="text-[9px] text-muted-foreground/30">vs</span>
              <span className="text-[11px] text-foreground/60">{row.b}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-3 flex-wrap">
        <span className="text-[10px] text-muted-foreground/40">Updated: Feb 2026</span>
        <span className="text-[10px] text-muted-foreground/40">12 criteria</span>
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
      icon: Scale,
      title: "Affiliate-driven rankings",
      description: "Most comparison sites rank products by commission rate, not fit. The \"best\" product is the one that pays the most per click.",
      detail: "Paid placement. Not best fit.",
    },
    {
      icon: RefreshCw,
      title: "Stale data",
      description: "Pricing changes quarterly. Features ship monthly. Most comparison pages haven't been updated since they were published.",
      detail: "Written once. Never maintained.",
    },
    {
      icon: Bot,
      title: "Invisible to AI",
      description: "Comparison content buried in long-form prose. No structured schema. AI can't extract a clean answer from a 3,000-word blog post.",
      detail: "No structure. No citations.",
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
            B2B comparisons are broken.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-lg">
            Ask AI "What's the best CRM for mid-market SaaS?" and you'll get a recycled affiliate list, not an honest answer.
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
            Structured comparisons that AI can parse.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-lg">
            Every comparison is built as structured data first, editorial content second. AI extracts clean answers because the data is machine-readable from the start.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: FileText,
              title: "Expert-Written Criteria",
              description: "Each comparison uses standardized criteria relevant to the category — pricing, integrations, support, scalability. No filler. No fluff.",
            },
            {
              icon: Layers,
              title: "Schema-First Structure",
              description: "Every comparison outputs Schema.org JSON-LD with Product, Offer, and Review markup. AI can extract specific answers without parsing prose.",
            },
            {
              icon: RefreshCw,
              title: "Maintained Quarterly",
              description: "Pricing, features, and positioning change. Comparisons are reviewed and updated on a quarterly cycle with timestamped modification dates.",
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

function ComparisonExample() {
  const { theme } = useTheme();
  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-comparison-example">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            What AI sees
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-example-heading">
            A comparison AI can actually use.
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
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium">Typical comparison site</span>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg bg-background/40 px-3 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="w-3 h-3 text-muted-foreground/50" />
                  <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">AI reads page</span>
                </div>
                <div className="text-[11px] text-foreground/50 mt-1">3,000 words of prose</div>
                <div className="text-[11px] text-muted-foreground/40">No schema. No structured fields.</div>
              </div>
              <div className="rounded-lg bg-background/40 px-3 py-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="w-3 h-3 text-muted-foreground/50" />
                  <span className="text-[10px] text-muted-foreground/50">AI Response</span>
                </div>
                <p className="text-[11px] text-foreground/50 italic">
                  "Both HubSpot and Salesforce are popular CRMs. HubSpot is easier to use while Salesforce has more features..."
                </p>
                <p className="text-[10px] text-muted-foreground/40 mt-1">Generic summary. No specifics cited.</p>
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
            <span className="text-[10px] text-emerald-400/60 uppercase tracking-wider font-medium">WhatisBest.com</span>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg bg-background/40 px-3 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="w-3 h-3 text-emerald-400/50" />
                  <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">AI reads page</span>
                </div>
                <div className="text-[11px] text-foreground/60 mt-1">Structured Product + Offer + Review schema</div>
                <div className="text-[11px] text-emerald-400/60">12 comparison criteria extracted.</div>
              </div>
              <div className="rounded-lg bg-background/40 px-3 py-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="w-3 h-3 text-emerald-400/50" />
                  <span className="text-[10px] text-muted-foreground/50">AI Response</span>
                </div>
                <p className="text-[11px] text-foreground/70">
                  "For mid-market SaaS, HubSpot starts at $800/mo with 2–4 week setup. Salesforce starts at $1,650/mo with 3–6 month implementation. HubSpot includes Breeze AI natively."
                </p>
                <p className="text-[10px] text-emerald-400/50 mt-1">Specific data points cited from structured fields.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  const { theme } = useTheme();
  const categories = [
    { name: "CRM", count: 8, examples: "HubSpot, Salesforce, Pipedrive, Close" },
    { name: "Marketing Automation", count: 6, examples: "HubSpot, Marketo, Pardot, ActiveCampaign" },
    { name: "Project Management", count: 7, examples: "Monday, Asana, ClickUp, Jira" },
    { name: "Customer Support", count: 5, examples: "Zendesk, Intercom, Freshdesk, HubSpot Service" },
    { name: "Analytics", count: 4, examples: "GA4, Mixpanel, Amplitude, Heap" },
    { name: "E-commerce", count: 5, examples: "Shopify, BigCommerce, WooCommerce, Magento" },
  ];

  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-categories">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            Categories
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-categories-heading">
            B2B SaaS categories covered.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-lg">
            Each category has standardized comparison criteria specific to that software type.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              className={`rounded-xl border p-5 ${
                theme === "sparkle"
                  ? "border-purple-900/20 bg-card/40"
                  : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
              }`}
              data-testid={`category-${i}`}
            >
              <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                <h3 className="text-sm font-semibold text-foreground">{cat.name}</h3>
                <span className="text-[10px] text-muted-foreground/40 font-mono">{cat.count} comparisons</span>
              </div>
              <p className="text-[11px] text-muted-foreground/50">{cat.examples}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnatomySection() {
  const { theme } = useTheme();
  const fields = [
    { field: "Category", value: "CRM", note: "Standardized taxonomy" },
    { field: "Products compared", value: "2–4 per page", note: "Focused, not exhaustive" },
    { field: "Criteria count", value: "10–15 per comparison", note: "Category-specific" },
    { field: "Pricing", value: "Verified quarterly", note: "Timestamped" },
    { field: "Verdict", value: "Conditional recommendation", note: '"Best for X, not Y"' },
    { field: "Schema output", value: "Product + Offer + Review", note: "JSON-LD" },
    { field: "Update cycle", value: "Quarterly review", note: "dateModified tracked" },
    { field: "Author", value: "Named expert", note: "Linked credentials" },
  ];

  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-anatomy">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            Comparison anatomy
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-anatomy-heading">
            What every comparison includes.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-lg">
            Standardized structure. No filler content. Every field is machine-readable and citable.
          </p>
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
                  <th className="text-left p-4 text-foreground/70 font-medium">Value</th>
                  <th className="text-left p-4 text-muted-foreground/50 font-medium">Note</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((f, i) => (
                  <tr key={f.field} className={i < fields.length - 1 ? "border-b border-border/20" : ""}>
                    <td className="p-4 text-foreground/60 font-mono text-[11px]">{f.field}</td>
                    <td className="p-4 text-foreground/70">{f.value}</td>
                    <td className="p-4 text-muted-foreground/40 italic">{f.note}</td>
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

function DifferenceSection() {
  const { theme } = useTheme();
  const features = [
    { name: "Structured schema output", whatisbest: true, g2: false, capterra: false, trustradius: false },
    { name: "Expert-written verdicts", whatisbest: true, g2: false, capterra: false, trustradius: true },
    { name: "No affiliate ranking bias", whatisbest: true, g2: false, capterra: false, trustradius: false },
    { name: "Quarterly update cycle", whatisbest: true, g2: false, capterra: false, trustradius: false },
    { name: "AI-parseable criteria", whatisbest: true, g2: false, capterra: false, trustradius: false },
    { name: "Free access", whatisbest: true, g2: true, capterra: true, trustradius: true },
  ];

  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-difference">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            How WhatisBest compares
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-difference-heading">
            Not another review aggregator.
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
                  <th className="text-left p-4 text-muted-foreground/50 font-medium"></th>
                  <th className="p-4 text-foreground font-semibold text-center">WhatisBest</th>
                  <th className="p-4 text-muted-foreground/60 font-medium text-center">G2</th>
                  <th className="p-4 text-muted-foreground/60 font-medium text-center">Capterra</th>
                  <th className="p-4 text-muted-foreground/60 font-medium text-center">TrustRadius</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr key={f.name} className={i < features.length - 1 ? "border-b border-border/20" : ""}>
                    <td className="p-4 text-foreground/70">{f.name}</td>
                    <td className="p-4 text-center">
                      {f.whatisbest ? <Check className="w-3.5 h-3.5 text-emerald-400 mx-auto" /> : <X className="w-3.5 h-3.5 text-muted-foreground/30 mx-auto" />}
                    </td>
                    <td className="p-4 text-center">
                      {f.g2 ? <Check className="w-3.5 h-3.5 text-emerald-400/50 mx-auto" /> : <X className="w-3.5 h-3.5 text-muted-foreground/30 mx-auto" />}
                    </td>
                    <td className="p-4 text-center">
                      {f.capterra ? <Check className="w-3.5 h-3.5 text-emerald-400/50 mx-auto" /> : <X className="w-3.5 h-3.5 text-muted-foreground/30 mx-auto" />}
                    </td>
                    <td className="p-4 text-center">
                      {f.trustradius ? <Check className="w-3.5 h-3.5 text-emerald-400/50 mx-auto" /> : <X className="w-3.5 h-3.5 text-muted-foreground/30 mx-auto" />}
                    </td>
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

function PrinciplesSection() {
  const { theme } = useTheme();
  const principles = [
    {
      icon: Shield,
      title: "No affiliate rankings",
      description: "Products are ranked by fit, not commission. WhatisBest doesn't accept pay-for-placement. Recommendations are conditional: \"best for X, not Y.\"",
    },
    {
      icon: Users,
      title: "Named expert authors",
      description: "Every comparison has a named author with linked credentials. No anonymous listicles. Expertise is traceable and verifiable.",
    },
    {
      icon: RefreshCw,
      title: "Timestamped and maintained",
      description: "Every page shows when it was last reviewed. Outdated comparisons are flagged and updated. dateModified is part of the schema.",
    },
  ];

  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-principles">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            Editorial principles
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-principles-heading">
            What makes this different from a review site.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className={`rounded-xl border p-5 ${
                  theme === "sparkle"
                    ? "border-purple-900/20 bg-card/40"
                    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
                }`}
                data-testid={`principle-${i}`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-border/40 bg-background/40 mb-4">
                  <Icon className="w-4 h-4 text-muted-foreground/60" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground/60">{p.description}</p>
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
            Comparisons that AI trusts enough to cite.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-md">
            Structured, expert-vetted, and maintained. When AI recommends software, these are the comparisons it pulls from.
          </p>
          <div className="mt-8 flex items-center gap-3 flex-wrap">
            <Button variant="outline" data-testid="button-cta-browse">
              Browse All Comparisons
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
              WhatisBest<span className="font-normal text-muted-foreground">.com</span>
            </span>
            <p className="mt-1 text-xs text-muted-foreground/60">
              Expert-vetted B2B SaaS comparisons for AI search.
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

export default function WhatisBest() {
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
        <ComparisonExample />
        <SectionDivider />
        <HowItWorksSection />
        <SectionDivider />
        <AnatomySection />
        <SectionDivider />
        <CategoriesSection />
        <SectionDivider />
        <DifferenceSection />
        <SectionDivider />
        <PrinciplesSection />
        <SectionDivider />
        <CtaSection />
        <Footer />
      </div>
    </div>
  );
}
