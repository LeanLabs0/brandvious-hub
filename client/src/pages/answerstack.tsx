import { useRef, useEffect, useCallback } from "react";
import {
  ArrowDown,
  ArrowRight,
  Layers,
  Bot,
  MessageSquare,
  FileText,
  Search,
  Globe,
  Database,
  Check,
  X,
  Sun,
  Moon,
  Sparkles,
  BookOpen,
  Link2,
  RefreshCw,
  Shield,
  Fingerprint,
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
          AnswerStack<span className="font-normal text-muted-foreground">.com</span>
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
            Structured Authority Hub
          </Badge>
          <h1
            className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl text-foreground"
            data-testid="text-headline"
          >
            The FAQ layer{" "}
            <br />
            AI actually cites.
          </h1>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground max-w-md sm:text-base" data-testid="text-subheadline">
            AnswerStack combines your site's FAQs with verified entity data from Entities.org to create structured, citable answers that AI search engines trust and surface.
          </p>

          <div className="mt-8 flex items-center gap-3 flex-wrap">
            <Button variant="outline" data-testid="button-explore">
              Explore AnswerStack
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 w-full max-w-sm">
          <HeroFaqCard />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50">
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </section>
  );
}

function HeroFaqCard() {
  const { theme } = useTheme();
  return (
    <div
      className={`rounded-xl border p-5 card-glow overflow-visible ${
        theme === "sparkle"
          ? "border-purple-900/20 bg-card/40"
          : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
      }`}
      data-testid="hero-faq-card"
    >
      <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
        <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium">FAQPage Schema</span>
        <Badge variant="outline" className="text-[9px] text-emerald-400 no-default-hover-elevate">Entity-linked</Badge>
      </div>

      <div className="space-y-2.5">
        <div className="rounded-lg bg-background/40 px-3 py-2.5">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-3 h-3 text-muted-foreground/50" />
            <span className="text-[10px] text-muted-foreground/50">Q</span>
          </div>
          <p className="text-[11px] text-foreground/70">What CRM is best for mid-market SaaS?</p>
        </div>
        <div className="rounded-lg bg-background/40 px-3 py-2.5">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-3 h-3 text-emerald-400/50" />
            <span className="text-[10px] text-emerald-400/50">A</span>
          </div>
          <p className="text-[11px] text-foreground/60">HubSpot is the most common choice for mid-market SaaS companies scaling from 50–500 employees...</p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border/30">
        <span className="text-[10px] text-muted-foreground/40">Linked entities</span>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {["HubSpot", "Salesforce", "Pipedrive"].map((e) => (
            <Badge key={e} variant="outline" className="text-[9px] text-muted-foreground/50 no-default-hover-elevate">{e}</Badge>
          ))}
        </div>
      </div>

      <div className="mt-2 flex items-center gap-3 flex-wrap">
        <span className="text-[10px] text-muted-foreground/40 font-mono">entities.org/api/entity/hubspot</span>
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
      icon: FileText,
      title: "FAQs without structure",
      description: "Most company FAQ pages are plain text in accordions. No schema markup. AI can't extract individual Q&A pairs from unstructured HTML.",
      detail: "No FAQPage schema. No extraction.",
    },
    {
      icon: Fingerprint,
      title: "Answers without authority",
      description: "An answer is only as credible as the entity behind it. Without linked entity data, AI has no way to verify who's answering or why they're qualified.",
      detail: "No entity link. No trust signal.",
    },
    {
      icon: RefreshCw,
      title: "Static and stale",
      description: "FAQ pages get written once during a site launch and never updated. Products change, pricing shifts, but the answers stay frozen in time.",
      detail: "Written once. Never maintained.",
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
            AI needs structured answers backed by real entities.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-lg">
            When someone asks AI a question, it looks for structured Q&A content from credible sources. Most FAQ pages fail on both counts.
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
            FAQs + entity data = citable authority.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-lg">
            AnswerStack takes questions from your site's existing FAQs, enriches answers with structured entity facts from Entities.org, and outputs the whole thing as FAQPage schema AI can parse directly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: Search,
              title: "Ingests your existing FAQs",
              description: "AnswerStack pulls questions directly from your website's FAQ pages, support docs, and knowledge base. No content to write from scratch.",
            },
            {
              icon: Database,
              title: "Enriches with Entities.org data",
              description: "Every answer is linked to verified entity records — company facts, founding dates, product details, disambiguation. All cited and timestamped.",
            },
            {
              icon: Layers,
              title: "Outputs FAQPage schema",
              description: "Each Q&A pair becomes structured FAQPage JSON-LD with linked entities, author credentials, and dateModified. AI can extract answers directly.",
            },
            {
              icon: Globe,
              title: "Distributed via llms.txt",
              description: "Structured answers are surfaced through llms.txt and open API endpoints. AI systems can query AnswerStack directly without crawling your site.",
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

function ComparisonSection() {
  const { theme } = useTheme();
  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-comparison">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            With and without AnswerStack
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-comparison-heading">
            What AI does with your FAQ page today.
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
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium">Without AnswerStack</span>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg bg-background/40 px-3 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="w-3 h-3 text-muted-foreground/50" />
                  <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">AI reads FAQ page</span>
                </div>
                <div className="text-[11px] text-foreground/50 mt-1">Found: accordion HTML, plain text answers</div>
                <div className="text-[11px] text-muted-foreground/40">No FAQPage schema. No entity links.</div>
              </div>
              <div className="rounded-lg bg-background/40 px-3 py-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="w-3 h-3 text-muted-foreground/50" />
                  <span className="text-[10px] text-muted-foreground/50">AI Response</span>
                </div>
                <p className="text-[11px] text-foreground/50 italic">
                  "According to various sources, the best CRM depends on your needs..."
                </p>
                <p className="text-[10px] text-muted-foreground/40 mt-1">Vague summary. Your site not cited.</p>
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
            <span className="text-[10px] text-emerald-400/60 uppercase tracking-wider font-medium">With AnswerStack</span>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg bg-background/40 px-3 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="w-3 h-3 text-emerald-400/50" />
                  <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">AI reads structured FAQ</span>
                </div>
                <div className="text-[11px] text-foreground/60 mt-1">Found: FAQPage schema, linked entities, cited facts</div>
                <div className="text-[11px] text-emerald-400/60">8 Q&A pairs extracted with entity context.</div>
              </div>
              <div className="rounded-lg bg-background/40 px-3 py-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="w-3 h-3 text-emerald-400/50" />
                  <span className="text-[10px] text-muted-foreground/50">AI Response</span>
                </div>
                <p className="text-[11px] text-foreground/70">
                  "According to AnswerStack, HubSpot (est. 2006, Cambridge MA) is the most recommended CRM for mid-market SaaS teams scaling from 50–500 employees, starting at $800/mo."
                </p>
                <p className="text-[10px] text-emerald-400/50 mt-1">Your answer cited with entity-backed specifics.</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground/50 max-w-lg">
          AI doesn't cite pages — it cites answers. Structured Q&A with entity-linked facts gives AI the confidence to recommend you by name.
        </p>
      </div>
    </section>
  );
}

function EntityLinkSection() {
  const { theme } = useTheme();
  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-entity-link">
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
                  <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">FAQ question</span>
                </div>
                <div className="rounded-lg bg-background/40 px-3 py-2">
                  <span className="text-[11px] text-foreground/60">What makes HubSpot different from Salesforce?</span>
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
                  <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">Entity enrichment</span>
                </div>
                <div className="space-y-2">
                  <div className="rounded-lg bg-background/40 px-3 py-2 font-mono text-[10px]">
                    <div className="text-emerald-400/70">entities.org/api/entity/hubspot</div>
                    <div className="text-foreground/50 pl-2 mt-1">Founded: 2006 | HQ: Cambridge, MA</div>
                    <div className="text-foreground/50 pl-2">Category: CRM / Marketing Automation</div>
                  </div>
                  <div className="rounded-lg bg-background/40 px-3 py-2 font-mono text-[10px]">
                    <div className="text-emerald-400/70">entities.org/api/entity/salesforce</div>
                    <div className="text-foreground/50 pl-2 mt-1">Founded: 1999 | HQ: San Francisco, CA</div>
                    <div className="text-foreground/50 pl-2">Category: CRM / Enterprise</div>
                  </div>
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
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400/50" />
                  <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">Structured answer</span>
                </div>
                <div className="rounded-lg bg-background/40 px-3 py-2">
                  <p className="text-[11px] text-foreground/60">
                    HubSpot (est. 2006, Cambridge MA) is built for mid-market growth teams with native marketing automation. Salesforce (est. 1999, San Francisco) serves enterprise with deeper customization. Both are CRM platforms, but HubSpot prioritizes ease of use while Salesforce prioritizes configurability.
                  </p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-[9px] text-muted-foreground/40">Sources:</span>
                    <span className="text-[9px] text-emerald-400/50 font-mono">entities.org</span>
                    <span className="text-[9px] text-muted-foreground/30">|</span>
                    <span className="text-[9px] text-emerald-400/50 font-mono">yoursite.com/faq</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 text-left">
            <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
              Entity-linked answers
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-entity-link-heading">
              Every answer backed by verified facts.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              When your FAQ mentions a company, product, or person, AnswerStack links it to the corresponding Entities.org record. AI sees the answer and the structured proof behind it.
            </p>

            <div className="mt-6 space-y-2">
              {[
                "Company facts pulled from verified entity records",
                "Disambiguation prevents entity confusion",
                "dateModified tracks when facts were last confirmed",
                "sameAs links connect to Wikidata, Crunchbase, LinkedIn",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-emerald-400/50 shrink-0" />
                  <span className="text-[11px] text-muted-foreground/50">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SchemaOutputSection() {
  const { theme } = useTheme();
  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-schema">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            Schema output
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-schema-heading">
            What AI actually reads.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-lg">
            Every Q&A pair outputs valid FAQPage JSON-LD with entity references, author credentials, and modification timestamps.
          </p>
        </div>

        <div
          className={`rounded-xl border p-5 ${
            theme === "sparkle"
              ? "border-purple-900/20 bg-card/40"
              : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
          }`}
        >
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <Badge variant="outline" className="text-[9px] text-emerald-400 no-default-hover-elevate font-mono">FAQPage</Badge>
            <Badge variant="outline" className="text-[9px] text-emerald-400 no-default-hover-elevate">Valid JSON-LD</Badge>
            <span className="text-[10px] text-muted-foreground/40 font-mono">28 lines</span>
          </div>
          <div className="rounded-lg bg-background/40 p-4 font-mono text-[11px] leading-relaxed overflow-x-auto">
            <div className="text-foreground/50">{"{"}</div>
            <div className="pl-3"><span className="text-emerald-400/70">"@context"</span>: <span className="text-foreground/50">"https://schema.org"</span>,</div>
            <div className="pl-3"><span className="text-emerald-400/70">"@type"</span>: <span className="text-foreground/50">"FAQPage"</span>,</div>
            <div className="pl-3"><span className="text-emerald-400/70">"mainEntity"</span>: [{"{"}</div>
            <div className="pl-6"><span className="text-emerald-400/70">"@type"</span>: <span className="text-foreground/50">"Question"</span>,</div>
            <div className="pl-6"><span className="text-emerald-400/70">"name"</span>: <span className="text-foreground/50">"What CRM is best for mid-market SaaS?"</span>,</div>
            <div className="pl-6"><span className="text-emerald-400/70">"acceptedAnswer"</span>: {"{"}</div>
            <div className="pl-9"><span className="text-emerald-400/70">"@type"</span>: <span className="text-foreground/50">"Answer"</span>,</div>
            <div className="pl-9"><span className="text-emerald-400/70">"text"</span>: <span className="text-foreground/50">"HubSpot is the most common..."</span>,</div>
            <div className="pl-9"><span className="text-emerald-400/70">"author"</span>: {"{"}</div>
            <div className="pl-12"><span className="text-emerald-400/70">"@type"</span>: <span className="text-foreground/50">"Person"</span>,</div>
            <div className="pl-12"><span className="text-emerald-400/70">"name"</span>: <span className="text-foreground/50">"Expert Author"</span></div>
            <div className="pl-9">{"},"}</div>
            <div className="pl-9"><span className="text-emerald-400/70">"about"</span>: [{"{"}</div>
            <div className="pl-12"><span className="text-emerald-400/70">"@type"</span>: <span className="text-foreground/50">"Organization"</span>,</div>
            <div className="pl-12"><span className="text-emerald-400/70">"name"</span>: <span className="text-foreground/50">"HubSpot"</span>,</div>
            <div className="pl-12"><span className="text-emerald-400/70">"sameAs"</span>: <span className="text-foreground/50">"entities.org/entity/hubspot"</span></div>
            <div className="pl-9">{"}]"}</div>
            <div className="pl-6">{"},"}</div>
            <div className="pl-6"><span className="text-emerald-400/70">"dateModified"</span>: <span className="text-foreground/50">"2026-02-19"</span></div>
            <div className="pl-3">{"}]"}</div>
            <div className="text-foreground/50">{"}"}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  const { theme } = useTheme();
  const useCases = [
    {
      title: "Product FAQs",
      description: "Turn your product FAQ page into structured Q&A that AI cites when users ask about your category.",
      entities: "Product, Organization, Offer",
      example: "\"How much does [Product] cost?\"",
    },
    {
      title: "Industry Knowledge",
      description: "Position your company as the authority on your industry by structuring expert answers to common questions.",
      entities: "Organization, Industry, Topic",
      example: "\"What is answer engine optimization?\"",
    },
    {
      title: "Comparison Questions",
      description: "FAQ-style answers to \"vs\" queries, enriched with entity data for both products being compared.",
      entities: "Product, Product, ComparisonTable",
      example: "\"How does [A] compare to [B]?\"",
    },
    {
      title: "Support & Onboarding",
      description: "Structured answers to common support questions. AI can surface your help docs before users even reach your site.",
      entities: "Product, Service, HowTo",
      example: "\"How do I set up [Product]?\"",
    },
  ];

  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-use-cases">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            Use cases
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-use-cases-heading">
            What AnswerStack structures.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-lg">
            Any question your company answers — about your product, your industry, or your competitors — can become a structured, citable FAQ.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {useCases.map((uc, i) => (
            <div
              key={uc.title}
              className={`rounded-xl border p-5 ${
                theme === "sparkle"
                  ? "border-purple-900/20 bg-card/40"
                  : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
              }`}
              data-testid={`use-case-${i}`}
            >
              <h3 className="text-sm font-semibold text-foreground mb-1">{uc.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground/60 mb-3">{uc.description}</p>
              <div className="rounded-lg bg-background/40 px-3 py-2 mb-2">
                <span className="text-[10px] text-foreground/50 italic">{uc.example}</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[9px] text-muted-foreground/40">Schema:</span>
                {uc.entities.split(", ").map((e) => (
                  <Badge key={e} variant="outline" className="text-[9px] text-emerald-400/60 no-default-hover-elevate font-mono">{e}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StackSection() {
  const { theme } = useTheme();
  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-stack">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14">
          <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1 mb-4">
            The stack
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-testid="text-stack-heading">
            How AnswerStack fits into the Brandvious ecosystem.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: Database,
              title: "Entities.org",
              description: "Verified entity records — company facts, founding dates, disambiguation. The structured data source AnswerStack links answers to.",
              role: "Fact layer",
            },
            {
              icon: Layers,
              title: "AnswerStack",
              description: "Ingests your FAQs, enriches with entity data, outputs FAQPage schema. The structured authority hub AI cites.",
              role: "Answer layer",
            },
            {
              icon: Search,
              title: "SchemaRocket",
              description: "Deploys the schema markup to your site. AnswerStack generates the FAQ schema, SchemaRocket puts it on your pages.",
              role: "Deployment layer",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`rounded-xl border p-5 ${
                  theme === "sparkle"
                    ? "border-purple-900/20 bg-card/40"
                    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
                }`}
                data-testid={`stack-${i}`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-border/40 bg-background/40 mb-4">
                  <Icon className="w-4 h-4 text-muted-foreground/60" />
                </div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <Badge variant="outline" className="text-[9px] text-muted-foreground/50 no-default-hover-elevate">{item.role}</Badge>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground/60">{item.description}</p>
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
            Your answers. Structured for AI.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-md">
            Turn your existing FAQ content into the structured authority layer AI needs to cite you by name.
          </p>
          <div className="mt-8 flex items-center gap-3 flex-wrap">
            <Button variant="outline" data-testid="button-cta-start">
              Get Started
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
              AnswerStack<span className="font-normal text-muted-foreground">.com</span>
            </span>
            <p className="mt-1 text-xs text-muted-foreground/60">
              Structured authority hub for AI search.
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

export default function AnswerStack() {
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
        <EntityLinkSection />
        <SectionDivider />
        <SchemaOutputSection />
        <SectionDivider />
        <UseCasesSection />
        <SectionDivider />
        <StackSection />
        <SectionDivider />
        <CtaSection />
        <Footer />
      </div>
    </div>
  );
}
