import { useRef, useEffect, useCallback } from "react";
import {
  ArrowDown,
  ArrowRight,
  Globe,
  Database,
  Search,
  Bot,
  MessageSquare,
  FileCode2,
  Fingerprint,
  Sun,
  Moon,
  Sparkles,
  Check,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const registryEntities = [
  { name: "Tesla", industry: "Automotive", founded: "2003", hq: "Austin, USA", ceo: "Elon Musk" },
  { name: "Amazon", industry: "E-commerce", founded: "1994", hq: "Seattle, USA", ceo: "Andy Jassy" },
  { name: "Shopify", industry: "E-commerce", founded: "2006", hq: "Ottawa, Canada", ceo: "Tobias Lutke" },
  { name: "Moderna", industry: "Pharmaceuticals", founded: "2010", hq: "Cambridge, USA", ceo: "Stephane Bancel" },
  { name: "Pfizer", industry: "Pharmaceuticals", founded: "1849", hq: "New York, USA", ceo: "Albert Bourla" },
  { name: "Salesforce", industry: "Tech / SaaS", founded: "1999", hq: "San Francisco, USA", ceo: "Marc Benioff" },
];

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
          entities<span className="font-normal text-muted-foreground">.org</span>
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
          <h1
            className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl text-foreground"
            data-testid="text-headline"
          >
            Structured facts,{" "}
            <br />
            open data.
          </h1>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground max-w-md sm:text-base" data-testid="text-subheadline">
            AI systems get names wrong, merge entities, and lose context.
            This registry fixes that with structured, cited, machine-readable data.
          </p>

          <div className="mt-8 flex items-center gap-3 flex-wrap">
            <Button variant="outline" data-testid="button-explore">
              Explore Entities
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 w-full max-w-sm">
          <HeroEntityCard />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50">
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </section>
  );
}

function HeroEntityCard() {
  const { theme } = useTheme();
  return (
    <div
      className={`rounded-xl border p-5 card-glow overflow-visible ${
        theme === "sparkle"
          ? "border-purple-900/20 bg-card/40"
          : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
      }`}
      data-testid="hero-entity-card"
    >
      <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[9px] text-emerald-400 no-default-hover-elevate">Entity resolved</Badge>
          <span className="text-[10px] text-emerald-400/60 font-mono">100%</span>
        </div>
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">Stripe, Inc.</h3>
      <Badge variant="outline" className="text-[9px] text-muted-foreground no-default-hover-elevate mb-4">Listed</Badge>

      <div className="space-y-2 mt-3">
        {[
          { key: "@type", value: "Organization", source: "Schema.org" },
          { key: "foundingDate", value: "2010", source: "Crunchbase" },
          { key: "address", value: "San Francisco, CA", source: "Company site" },
          { key: "founder", value: "Patrick Collison", source: "Wikipedia" },
          { key: "employees", value: "~8,000", source: "LinkedIn" },
          { key: "disambiguates", value: 'Not Stripe (pattern)', source: "Wikidata" },
        ].map((row) => (
          <div key={row.key} className="flex items-center justify-between gap-3 text-[11px]">
            <span className="text-emerald-400/70 font-mono shrink-0">{row.key}</span>
            <span className="text-foreground/70 truncate">{row.value}</span>
            <span className="text-muted-foreground/40 text-[10px] shrink-0">{row.source}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-border/30">
        <span className="text-[10px] text-muted-foreground/50">sameAs</span>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {["wikidata.org", "crunchbase.com", "linkedin.com"].map((link) => (
            <span key={link} className="text-[10px] text-muted-foreground/40 font-mono">{link}</span>
          ))}
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

function DisambiguationSection() {
  const { theme } = useTheme();
  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-disambiguation">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            Entity disambiguation
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-disambiguation-heading">
            Same name. Wrong company.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-lg mx-auto">
            Search "Mercury" and see why names alone aren't enough. Every entity gets a disambiguation statement — what it is, what it isn't, and which similarly-named entities exist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`rounded-xl border p-5 ${
              theme === "sparkle"
                ? "border-purple-900/20 bg-card/40"
                : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
            }`}
          >
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium">Without disambiguation</span>
            <div className="mt-3 rounded-lg bg-background/40 px-3 py-2.5">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-3 h-3 text-muted-foreground/50" />
                <span className="text-[11px] text-muted-foreground/60">Q: Tell me about Mercury.</span>
              </div>
              <p className="text-[11px] text-foreground/50 italic">Planet? Element? Car brand? Fintech startup?</p>
            </div>
          </div>

          <div
            className={`rounded-xl border p-5 ${
              theme === "sparkle"
                ? "border-purple-900/20 bg-card/40"
                : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
            }`}
          >
            <span className="text-[10px] text-emerald-400/60 uppercase tracking-wider font-medium">With disambiguation</span>
            <div className="mt-3 rounded-lg bg-background/40 px-3 py-2.5">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-3 h-3 text-emerald-400/50" />
                <span className="text-[11px] text-muted-foreground/60">Q: Tell me about Mercury.</span>
              </div>
              <p className="text-[11px] text-foreground/70">
                Mercury — banking platform for startups (est. 2019, San Francisco). Not Mercury Insurance, Mercury Systems, or the planet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApiSection() {
  const { theme } = useTheme();
  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-api">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 gap-3">
              <div
                className={`rounded-xl border p-4 ${
                  theme === "sparkle"
                    ? "border-purple-900/20 bg-card/40"
                    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-3.5 h-3.5 text-muted-foreground/50" />
                  <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">AI chat</span>
                </div>
                <div className="rounded-lg bg-background/40 px-3 py-2">
                  <span className="text-[11px] text-foreground/60">Who founded Stripe?</span>
                </div>
              </div>

              <div
                className={`rounded-xl border p-4 ${
                  theme === "sparkle"
                    ? "border-purple-900/20 bg-card/40"
                    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-3.5 h-3.5 text-emerald-400/50" />
                  <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">Entities.org lookup</span>
                </div>
                <div className="rounded-lg bg-background/40 px-3 py-2 font-mono text-[10px] text-muted-foreground/60">
                  entities.org/api/entity/stripe
                </div>
                <div className="mt-2 space-y-1 text-[11px]">
                  <div className="text-foreground/60">Founded: 2010</div>
                  <div className="text-foreground/60">HQ: San Francisco, USA</div>
                  <div className="text-foreground/60">CEO: Patrick Collison</div>
                  <div className="text-foreground/60">Employees: 8,000+</div>
                </div>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {["Wikidata", "Crunchbase", "Company website"].map((s) => (
                    <span key={s} className="text-[9px] text-muted-foreground/40">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 text-left">
            <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
              Structured lookup
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-api-heading">
              One API call. Cited facts.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              AI systems query the registry and get structured, timestamped, source-linked data back — instead of scraping fragments from ten different pages and hoping the facts are current.
            </p>

            <div className="mt-6 rounded-lg bg-background/40 border border-border/30 p-3 font-mono text-[10px] text-muted-foreground/60 space-y-0.5">
              <div className="text-emerald-400/70">GET /api/entity/stripe</div>
              <div className="text-foreground/50 pl-2">{"->"} Founded: 2010</div>
              <div className="text-foreground/50 pl-2">{"->"} HQ: San Francisco, USA</div>
              <div className="text-foreground/50 pl-2">{"->"} CEO: Patrick Collison</div>
              <div className="text-foreground/50 pl-2">{"->"} sameAs: Wikidata, Crunchbase, LinkedIn</div>
              <div className="text-foreground/50 pl-2">{"->"} dateModified: 2026-02-13</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FourSteps() {
  const { theme } = useTheme();
  const steps = [
    { title: "Listing", description: "Entity submitted with basic facts. Data formatted from public sources into Schema.org JSON-LD.", icon: FileCode2 },
    { title: "Domain Verification", description: "Identity confirmed through domain ownership. Not fact-checking — identity establishment.", icon: Fingerprint },
    { title: "Disambiguation", description: "Precision statement: what this entity is, what it isn't, and which similarly-named entities exist.", icon: Search },
    { title: "Distribution", description: "Timestamped and surfaced via Schema.org JSON-LD, open API, and machine-readable formats including llms.txt.", icon: Globe },
  ];

  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-steps">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            How entities get listed
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-steps-heading">
            Four steps. All visible.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                data-testid={`step-${i}`}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className={`rounded-xl border p-4 ${
            theme === "sparkle" ? "border-purple-900/20 bg-card/40" : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
          }`}>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[9px] text-emerald-400 no-default-hover-elevate">Listed</Badge>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground/50 leading-relaxed">
              Entity exists in the registry. Facts formatted from public sources. Not independently fact-checked.
            </p>
          </div>
          <div className={`rounded-xl border p-4 ${
            theme === "sparkle" ? "border-purple-900/20 bg-card/40" : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
          }`}>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[9px] text-blue-400 no-default-hover-elevate">Domain Verified</Badge>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground/50 leading-relaxed">
              Domain ownership confirmed. Entity identity established. Not third-party fact verification.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const { theme } = useTheme();
  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-why">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            Why this exists
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground max-w-2xl" data-testid="text-why-heading">
            AI systems are answering questions about your company. Most of those answers are wrong.
          </h2>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground max-w-2xl">
          <p>
            Ask ChatGPT about a mid-market company and you'll get merged facts from two different businesses, an outdated founding date, and a CEO who left three years ago.
          </p>
          <p>
            AI reconstructs entities from scattered, unstructured sources — About pages, press releases, LinkedIn profiles, old directories. There is no canonical place for machines to get structured, cited, disambiguated facts.
          </p>
          <p>
            Entities.org gives every entity Schema.org JSON-LD, a disambiguation statement, source citations, cross-platform links, and a timestamped modification date.
          </p>
        </div>

        <div
          className={`mt-12 rounded-xl border p-6 ${
            theme === "sparkle"
              ? "border-purple-900/20 bg-card/40"
              : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] text-muted-foreground/40 uppercase tracking-wider font-medium">Facts, not marketing.</span>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground/50 mb-4">
            Founding, features, and citable facts. If a fact can't be cited, it doesn't belong here.
          </p>

          <div className={`rounded-lg border p-4 ${
            theme === "sparkle" ? "border-purple-900/15 bg-background/20" : "border-border/30 bg-background/40"
          }`}>
            <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
              <div>
                <h4 className="text-sm font-semibold text-foreground">Stripe</h4>
                <span className="text-[10px] text-muted-foreground/50">Tech / SaaS</span>
              </div>
              <Badge variant="outline" className="text-[9px] text-emerald-400 no-default-hover-elevate">Listed</Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div><span className="text-muted-foreground/40">Founded</span> <span className="text-foreground/60 ml-1">2010</span></div>
              <div><span className="text-muted-foreground/40">HQ</span> <span className="text-foreground/60 ml-1">San Francisco, USA</span></div>
              <div><span className="text-muted-foreground/40">CEO</span> <span className="text-foreground/60 ml-1">Patrick Collison</span></div>
              <div><span className="text-muted-foreground/40">Employees</span> <span className="text-foreground/60 ml-1">8,000+</span></div>
            </div>
            <div className="mt-3 pt-2 border-t border-border/20 flex items-center gap-2 flex-wrap">
              <span className="text-[10px] text-muted-foreground/40">sameAs</span>
              {["wikidata.org", "crunchbase.com", "linkedin.com"].map((l) => (
                <span key={l} className="text-[9px] text-muted-foreground/30 font-mono">{l}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RegistrySection() {
  const { theme } = useTheme();
  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-registry">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            The registry
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-registry-heading">
            Browse the registry
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">24 entities across 5 industries.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {registryEntities.map((entity, i) => (
            <div
              key={entity.name}
              className={`rounded-xl border p-5 hover-elevate overflow-visible ${
                theme === "sparkle"
                  ? "border-purple-900/20 bg-card/40"
                  : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
              }`}
              data-testid={`registry-entity-${i}`}
            >
              <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                <h3 className="text-sm font-semibold text-foreground">{entity.name}</h3>
                <Badge variant="outline" className="text-[9px] text-emerald-400 no-default-hover-elevate">Listed</Badge>
              </div>
              <span className="text-[10px] text-muted-foreground/50">{entity.industry}</span>
              <div className="mt-3 space-y-1 text-[11px] text-muted-foreground/50">
                <div>Founded: {entity.founded}</div>
                <div>HQ: {entity.hq}</div>
                <div>CEO: {entity.ceo}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" data-testid="button-view-all">
            View all 24 entities
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function RelationshipsSection() {
  const { theme } = useTheme();
  const nodes = [
    { label: "Stripe", type: "Organization", x: 50, y: 50 },
    { label: "Patrick", type: "Founder", x: 20, y: 20 },
    { label: "John", type: "Founder", x: 80, y: 15 },
    { label: "Atlas", type: "Product", x: 15, y: 75 },
    { label: "Connect", type: "Product", x: 85, y: 70 },
    { label: "YC", type: "Investor", x: 25, y: 45 },
    { label: "Sequoia", type: "Investor", x: 78, y: 40 },
    { label: "Shopify", type: "Partner", x: 55, y: 85 },
  ];

  const edges = [
    { from: 0, to: 1, label: "founder" },
    { from: 0, to: 2, label: "founder" },
    { from: 0, to: 3, label: "product" },
    { from: 0, to: 4, label: "product" },
    { from: 0, to: 5, label: "investor" },
    { from: 0, to: 6, label: "investor" },
    { from: 0, to: 7, label: "partner" },
  ];

  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-relationships">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 w-full">
            <div
              className={`rounded-xl border p-6 ${
                theme === "sparkle"
                  ? "border-purple-900/20 bg-card/40"
                  : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
              }`}
            >
              <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                  {edges.map((edge, i) => (
                    <line
                      key={i}
                      x1={nodes[edge.from].x}
                      y1={nodes[edge.from].y}
                      x2={nodes[edge.to].x}
                      y2={nodes[edge.to].y}
                      stroke="currentColor"
                      className="text-border/40"
                      strokeWidth="0.3"
                    />
                  ))}
                  {edges.map((edge, i) => {
                    const mx = (nodes[edge.from].x + nodes[edge.to].x) / 2;
                    const my = (nodes[edge.from].y + nodes[edge.to].y) / 2;
                    return (
                      <text
                        key={`label-${i}`}
                        x={mx}
                        y={my - 1.5}
                        textAnchor="middle"
                        className="fill-muted-foreground/30"
                        fontSize="2.2"
                      >
                        {edge.label}
                      </text>
                    );
                  })}
                  {nodes.map((node, i) => (
                    <g key={i}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={i === 0 ? 6 : 4}
                        className={`${i === 0 ? "fill-foreground/10 stroke-foreground/20" : "fill-card stroke-border/40"}`}
                        strokeWidth="0.3"
                      />
                      <text
                        x={node.x}
                        y={node.y + 0.8}
                        textAnchor="middle"
                        className="fill-foreground/70"
                        fontSize={i === 0 ? "2.8" : "2.2"}
                        fontWeight={i === 0 ? "600" : "400"}
                      >
                        {node.label}
                      </text>
                      <text
                        x={node.x}
                        y={node.y + 3.5}
                        textAnchor="middle"
                        className="fill-muted-foreground/40"
                        fontSize="1.8"
                      >
                        {node.type}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>

          <div className="flex-1 text-left">
            <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
              Entity relationships
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-relationships-heading">
              Typed relationships, not flat lists.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              People, products, and organizations connected through labeled edges — founders, investors, partners, subsidiaries. A structured graph, not a directory.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function OpenDataSection() {
  const { theme } = useTheme();
  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-opendata">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            Open data
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-opendata-heading">
            Open data.{" "}
            <br className="hidden sm:block" />
            No keys. No auth.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-lg mx-auto">
            Every entity produces Schema.org JSON-LD with sameAs cross-links, disambiguation, and relationship edges. Query it directly or expand the full schema.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
            <Button variant="outline" data-testid="button-api-docs">
              API documentation
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
            <Button variant="ghost" className="text-muted-foreground" data-testid="button-sample-schema">
              View full sample schema
            </Button>
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
            <Badge variant="outline" className="text-[9px] text-emerald-400 no-default-hover-elevate font-mono">GET</Badge>
            <span className="text-[11px] text-muted-foreground/50 font-mono">/api/entity/stripe</span>
          </div>
          <div className="rounded-lg bg-background/40 p-4 font-mono text-[11px] leading-relaxed overflow-x-auto">
            <div className="text-foreground/50">{"{"}</div>
            <div className="pl-3"><span className="text-emerald-400/70">"@context"</span>: <span className="text-foreground/50">"https://schema.org"</span>,</div>
            <div className="pl-3"><span className="text-emerald-400/70">"@type"</span>: <span className="text-foreground/50">"Organization"</span>,</div>
            <div className="pl-3"><span className="text-emerald-400/70">"name"</span>: <span className="text-foreground/50">"Stripe"</span>,</div>
            <div className="pl-3"><span className="text-emerald-400/70">"foundingDate"</span>: <span className="text-foreground/50">"2010"</span>,</div>
            <div className="pl-3"><span className="text-emerald-400/70">"disambiguatingDescription"</span>:</div>
            <div className="pl-6"><span className="text-foreground/50">"Not Stripe (clothing pattern)..."</span>,</div>
            <div className="pl-3"><span className="text-emerald-400/70">"dateModified"</span>: <span className="text-foreground/50">"2026-02-13"</span>,</div>
            <div className="pl-3"><span className="text-emerald-400/70">"founder"</span>: {"[{"}</div>
            <div className="pl-6"><span className="text-emerald-400/70">"@type"</span>: <span className="text-foreground/50">"Person"</span>,</div>
            <div className="pl-6"><span className="text-emerald-400/70">"name"</span>: <span className="text-foreground/50">"Patrick Collison"</span>,</div>
            <div className="pl-6"><span className="text-emerald-400/70">"jobTitle"</span>: <span className="text-foreground/50">"CEO"</span></div>
            <div className="pl-3">{"}],"}</div>
            <div className="pl-3"><span className="text-emerald-400/70">"sameAs"</span>: {"["}</div>
            <div className="pl-6"><span className="text-foreground/50">"https://wikidata.org/wiki/Q15052388"</span>,</div>
            <div className="pl-6"><span className="text-foreground/50">"https://crunchbase.com/..."</span>,</div>
            <div className="pl-6"><span className="text-foreground/50">"https://linkedin.com/..."</span></div>
            <div className="pl-3">{"]"}</div>
            <div className="text-foreground/50">{"}"}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  const { theme } = useTheme();
  const features = [
    { name: "Schema.org JSON-LD output", entities: true, wikipedia: false, linkedin: false, crunchbase: false },
    { name: "Entity disambiguation", entities: true, wikipedia: true, linkedin: false, crunchbase: true },
    { name: "Domain-verified identity", entities: true, wikipedia: false, linkedin: false, crunchbase: false },
    { name: "Free API (no key required)", entities: true, wikipedia: true, linkedin: false, crunchbase: false },
    { name: "Cross-platform links", entities: true, wikipedia: true, linkedin: false, crunchbase: true },
  ];

  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-comparison">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            How Entities compares
          </Badge>
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
                  <th className="p-4 text-foreground font-semibold text-center">Entities.org</th>
                  <th className="p-4 text-muted-foreground/60 font-medium text-center">Wikipedia</th>
                  <th className="p-4 text-muted-foreground/60 font-medium text-center">LinkedIn</th>
                  <th className="p-4 text-muted-foreground/60 font-medium text-center">Crunchbase</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr key={f.name} className={i < features.length - 1 ? "border-b border-border/20" : ""}>
                    <td className="p-4 text-foreground/70">{f.name}</td>
                    <td className="p-4 text-center">
                      {f.entities ? <Check className="w-3.5 h-3.5 text-emerald-400 mx-auto" /> : <X className="w-3.5 h-3.5 text-muted-foreground/30 mx-auto" />}
                    </td>
                    <td className="p-4 text-center">
                      {f.wikipedia ? <Check className="w-3.5 h-3.5 text-emerald-400/50 mx-auto" /> : <X className="w-3.5 h-3.5 text-muted-foreground/30 mx-auto" />}
                    </td>
                    <td className="p-4 text-center">
                      {f.linkedin ? <Check className="w-3.5 h-3.5 text-emerald-400/50 mx-auto" /> : <X className="w-3.5 h-3.5 text-muted-foreground/30 mx-auto" />}
                    </td>
                    <td className="p-4 text-center">
                      {f.crunchbase ? <Check className="w-3.5 h-3.5 text-emerald-400/50 mx-auto" /> : <X className="w-3.5 h-3.5 text-muted-foreground/30 mx-auto" />}
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

function ClaimSection() {
  const { theme } = useTheme();
  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-claim">
      <div className="max-w-4xl mx-auto relative">
        <div
          className={`rounded-xl border px-8 py-12 md:px-16 md:py-16 text-center card-glow ${
            theme === "sparkle"
              ? "border-purple-900/20 bg-card/30"
              : "border-border/60 bg-card/60 dark:border-border/30 dark:bg-card/20"
          }`}
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-claim-heading">
            Claim your entity
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Free to list. Domain verification when you're ready.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <Button variant="outline" data-testid="button-submit-entity">
              Submit an Entity
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
            <Button variant="ghost" className="text-muted-foreground" data-testid="button-pricing">
              View Pricing
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
              entities<span className="font-normal text-muted-foreground">.org</span>
            </span>
            <p className="mt-1 text-xs text-muted-foreground/60">
              Structured entity data for machines and people.
            </p>
            <p className="mt-1 text-[10px] text-muted-foreground/40">
              24 entities listed | 5 industries
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground/40">
              Operated by Entities, LLC
            </p>
            <p className="text-[10px] text-muted-foreground/40">
              A subsidiary of Brandvious, Inc.
            </p>
            <p className="text-[10px] text-muted-foreground/40">
              Land O' Lakes, Florida
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <h4 className="text-[10px] text-muted-foreground/60 uppercase tracking-wider font-medium mb-2">Registry</h4>
            <div className="space-y-1">
              <p className="text-[11px] text-muted-foreground/40">Entity Index</p>
              <p className="text-[11px] text-muted-foreground/40">Full A-Z List</p>
              <p className="text-[11px] text-muted-foreground/40">Submit Entity</p>
              <p className="text-[11px] text-muted-foreground/40">Pricing</p>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] text-muted-foreground/60 uppercase tracking-wider font-medium mb-2">Platform</h4>
            <div className="space-y-1">
              <p className="text-[11px] text-muted-foreground/40">API Documentation</p>
              <p className="text-[11px] text-muted-foreground/40">LLM Analytics</p>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] text-muted-foreground/60 uppercase tracking-wider font-medium mb-2">Company</h4>
            <div className="space-y-1">
              <p className="text-[11px] text-muted-foreground/40">About</p>
              <p className="text-[11px] text-muted-foreground/40">Partner With Us</p>
              <p className="text-[11px] text-muted-foreground/40">Contact</p>
              <p className="text-[11px] text-muted-foreground/40">Privacy Policy</p>
              <p className="text-[11px] text-muted-foreground/40">Terms of Service</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/20">
          <p className="text-[10px] text-muted-foreground/30">
            &copy; 2026 Entities, LLC. All rights reserved.
          </p>
          <p className="mt-2 text-[10px] text-muted-foreground/30 max-w-2xl">
            Entities.org is an entity resolution platform, not a fact-checker. Listed data is formatted from public sources. Domain verification confirms ownership, not endorsement.
          </p>
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-[10px] text-muted-foreground/30">Standards:</span>
            {["Schema.org", "JSON-LD", "Open API", "llms.txt"].map((s, i) => (
              <span key={s}>
                <span className="text-[10px] text-muted-foreground/30">{s}</span>
                {i < 3 && <span className="text-[10px] text-muted-foreground/20 ml-2">|</span>}
              </span>
            ))}
          </div>
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

export default function Entities() {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen bg-background relative">
      {theme === "sparkle" && <AuroraCanvas />}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <SectionDivider />
        <DisambiguationSection />
        <SectionDivider />
        <ApiSection />
        <SectionDivider />
        <FourSteps />
        <SectionDivider />
        <WhySection />
        <SectionDivider />
        <RegistrySection />
        <SectionDivider />
        <RelationshipsSection />
        <SectionDivider />
        <OpenDataSection />
        <SectionDivider />
        <ComparisonTable />
        <SectionDivider />
        <ClaimSection />
        <Footer />
      </div>
    </div>
  );
}
