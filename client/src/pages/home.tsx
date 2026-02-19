import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Braces,
  Globe,
  Trophy,
  Layers,
  Radar,
  Bot,
  Database,
  Shield,
  MessageSquare,
  CheckCircle2,
  Search,
  Star,
  BarChart3,
  Sun,
  Moon,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const projects = [
  {
    name: "SchemaRocket.ai",
    label: "STRUCTURED DATA",
    description:
      "Schema markup that makes your brand machine-readable — so AI can understand, trust, and recommend you.",
    status: "Established",
    statusColor: "text-emerald-400",
    url: "https://schemarocket.ai",
    icon: Braces,
  },
  {
    name: "Entities.org",
    label: "REGISTRY",
    description:
      "A canonical entity registry for machines. Verified data so AI always gets the right company.",
    status: "Growing",
    statusColor: "text-blue-400",
    url: "https://entities.org",
    icon: Globe,
  },
  {
    name: "WhatisBest.com",
    label: "COMPARISONS",
    description:
      "Expert-vetted B2B SaaS comparisons built to surface in AI search results.",
    status: "Launching",
    statusColor: "text-amber-400",
    url: "https://whatisbest.com",
    icon: Trophy,
  },
  {
    name: "AnswerStack.io",
    label: "ANSWERS",
    description:
      "Schema-rich, expert-vetted content that AI engines cite as a credible source.",
    status: "In Development",
    statusColor: "text-neutral-400",
    url: "https://answerstack.io",
    icon: Layers,
  },
  {
    name: "ReviewRadar.com",
    label: "TRUST",
    description:
      "Review sites are biased and stale. ReviewRadar pulls real-time sentiment from leading platforms and communities.",
    status: "Backlog",
    statusColor: "text-neutral-500",
    url: "https://reviewradar.com",
    icon: Radar,
  },
];

const beliefs = [
  {
    number: "01",
    title: "Fair",
    body: "The internet should give every business a fair shot, not just the ones with the biggest ad budgets. Our products make accurate information easier to surface.",
  },
  {
    number: "02",
    title: "Factual",
    body: "AI is only as good as its sources. We provide structured, verified, machine-readable data so AI answers are grounded in citable facts.",
  },
  {
    number: "03",
    title: "Functional",
    body: "Every product we ship makes web content more structured and useful for humans and AI alike.",
  },
];

function HeroParticles() {
  const { theme } = useTheme();
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full animate-float-particle ${
            theme === "sparkle" ? "bg-purple-300/[0.10]" : "bg-black/[0.06] dark:bg-white/[0.12]"
          }`}
          style={{
            width: `${Math.random() * 3 + 1.5}px`,
            height: `${Math.random() * 3 + 1.5}px`,
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 30}%`,
            ["--duration" as string]: `${Math.random() * 10 + 10}s`,
            ["--delay" as string]: `${Math.random() * 8}s`,
          }}
        />
      ))}
    </div>
  );
}

function HeroGlow() {
  const { theme } = useTheme();
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {theme === "sparkle" ? (
        <>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] animate-subtle-glow"
            style={{ background: "radial-gradient(circle, rgba(100, 30, 140, 0.18) 0%, rgba(60, 10, 90, 0.08) 50%, transparent 70%)" }}
          />
        </>
      ) : (
        <>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-black/[0.02] dark:bg-white/[0.04] blur-[120px] animate-subtle-glow" />
          <div className="absolute left-1/2 top-[60%] -translate-x-1/2 w-[1px] h-[300px] bg-gradient-to-b from-black/[0.08] dark:from-white/[0.12] to-transparent" />
        </>
      )}
    </div>
  );
}

function IconBar() {
  const { theme } = useTheme();
  const heroIcons = projects.slice(0, 4);
  return (
    <div className="flex items-center gap-2" data-testid="icon-bar">
      {heroIcons.map((project, i) => {
        const Icon = project.icon;
        return (
          <a
            key={project.name}
            href="#projects"
            className={`flex items-center justify-center w-12 h-12 rounded-xl border transition-colors duration-200 hover-elevate icon-pulse ${
              theme === "sparkle"
                ? "border-purple-900/30 bg-card/40"
                : "border-border/60 bg-card/80"
            }`}
            title={project.name}
            data-testid={`icon-bar-${i}`}
          >
            <Icon className={`w-5 h-5 ${theme === "sparkle" ? "text-purple-300/60" : "text-muted-foreground"}`} />
          </a>
        );
      })}
    </div>
  );
}

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
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
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
        <a
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground"
          data-testid="link-home"
        >
          Brandvious <span className="font-normal text-muted-foreground">Digital</span>
        </a>
        <ThemeToggle />
      </div>
    </nav>
  );
}

function Hero() {
  const { theme } = useTheme();
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center"
      data-testid="section-hero"
    >
      <HeroGlow />
      <HeroParticles />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        <h1
          className={`text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl md:text-6xl ${
            theme === "sparkle" ? "sparkle-text" : "text-foreground"
          }`}
          data-testid="text-headline"
        >
          Fair. Factual.{" "}
          <br className="hidden sm:block" />
          Functional for AI.
        </h1>

        <p
          className="mt-5 text-base leading-relaxed text-muted-foreground max-w-md mx-auto sm:text-lg"
          data-testid="text-subheadline"
        >
          Brandvious builds products that make the internet work better.
        </p>

        <div className="mt-10">
          <IconBar />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50">
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </section>
  );
}

function PrincipleVisual1() {
  return (
    <div className="rounded-xl border border-border/60 bg-card/60 dark:border-border/40 dark:bg-card/30 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Bot className="w-4 h-4 text-muted-foreground/60" />
        <span className="text-xs text-muted-foreground/80">AI Search Query</span>
      </div>
      <div className="rounded-lg border border-border/30 bg-background/40 px-3 py-2">
        <span className="text-xs text-foreground/70 font-mono">"What's the best CRM for startups?"</span>
      </div>
      <div className="flex items-center gap-2 pt-1">
        <div className="w-2 h-2 rounded-full bg-amber-400/60" />
        <span className="text-[10px] text-muted-foreground/50">3.2B queries/day rely on web content</span>
      </div>
    </div>
  );
}

function PrincipleVisual2() {
  return (
    <div className="rounded-xl border border-border/60 bg-card/60 dark:border-border/40 dark:bg-card/30 p-4 space-y-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-muted-foreground/60" />
          <span className="text-xs text-muted-foreground/80">Structured Data</span>
        </div>
        <Badge variant="outline" className="text-[9px] text-emerald-400 no-default-hover-elevate">Valid</Badge>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3 h-3 text-emerald-400/60" />
          <span className="text-[11px] text-muted-foreground/60">Schema markup</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3 h-3 text-emerald-400/60" />
          <span className="text-[11px] text-muted-foreground/60">Entity relationships</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3 h-3 text-emerald-400/60" />
          <span className="text-[11px] text-muted-foreground/60">Verified sources</span>
        </div>
      </div>
    </div>
  );
}

function PrincipleVisual3() {
  return (
    <div className="rounded-xl border border-border/60 bg-card/60 dark:border-border/40 dark:bg-card/30 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-muted-foreground/60" />
        <span className="text-xs text-muted-foreground/80">AI Response</span>
      </div>
      <div className="rounded-lg border border-border/30 bg-background/40 px-3 py-2.5">
        <span className="text-[11px] text-foreground/70 leading-relaxed">
          "Based on verified data from structured sources, the best option is..."
        </span>
      </div>
      <div className="flex items-center gap-2 pt-1">
        <Shield className="w-3 h-3 text-emerald-400/50" />
        <span className="text-[10px] text-emerald-400/60">High confidence answer</span>
      </div>
    </div>
  );
}

function Beliefs() {
  const { theme } = useTheme();
  const visuals = [<PrincipleVisual1 />, <PrincipleVisual2 />, <PrincipleVisual3 />];

  return (
    <section
      id="principles"
      className="relative px-6 py-24 md:py-32 section-glow dot-pattern"
      data-testid="section-beliefs"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-4">
            <Badge
              variant="outline"
              className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1"
            >
              Mission
            </Badge>
          </div>

          <h2
            className={`text-2xl font-bold tracking-tight sm:text-3xl ${
              theme === "sparkle" ? "sparkle-text" : "text-foreground"
            }`}
            data-testid="text-beliefs-heading"
          >
            Consensus is King.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-lg mx-auto">
            AI is rewriting how people find, trust, and choose. Brandvious delivers factual brand data that LLMs can ingest and cite with ease.
          </p>
        </div>

        <div className="flex flex-col gap-24">
          {beliefs.map((b, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={b.number}
                className={`flex flex-col gap-8 md:gap-12 ${isEven ? "md:flex-row-reverse" : "md:flex-row"} items-center`}
                data-testid={`belief-${i}`}
              >
                <div className="flex-1 w-full">
                  <span className="text-4xl font-bold text-border/60 font-mono select-none block mb-4">
                    {b.number}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mb-3" data-testid={`text-belief-title-${i}`}>
                    {b.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground" data-testid={`text-belief-body-${i}`}>
                    {b.body}
                  </p>
                </div>
                <div className="flex-1 w-full max-w-xs md:max-w-sm">
                  {visuals[i]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  visual,
}: {
  project: (typeof projects)[0];
  index: number;
  visual: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col rounded-xl border p-6 transition-all duration-300 hover-elevate overflow-visible card-glow ${
        theme === "sparkle"
          ? "border-purple-900/20 bg-card/40"
          : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
      }`}
      style={theme === "sparkle" ? { "--cycle-delay": `${index * 5}s`, "--cycle-duration": "25s" } as React.CSSProperties : undefined}
      data-testid={`card-project-${index}`}
    >
      <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
        <h3 className="text-lg font-semibold text-foreground sm:text-xl" data-testid={`text-project-name-${index}`}>
          {project.name}
        </h3>
        <Badge
          variant="outline"
          className={`text-[9px] tracking-wider uppercase font-medium ${project.statusColor} no-default-hover-elevate`}
          data-testid={`badge-status-${index}`}
        >
          {project.status}
        </Badge>
      </div>

      <span className="text-[10px] text-muted-foreground/50 tracking-[0.15em] uppercase font-medium">
        {project.label}
      </span>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground/60 flex-1" data-testid={`text-project-description-${index}`}>
        {project.description}
      </p>

      <div className="mt-5">
        {visual}
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground/40 group-hover:text-foreground/60 transition-colors duration-300">
        Visit Site
        <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
      </div>
    </a>
  );
}

function SchemaVisualInline() {
  return (
    <div className="rounded-lg bg-background/40 p-3 font-mono text-[11px] text-muted-foreground/70 leading-relaxed space-y-1">
      <div><span className="text-foreground/50">{"{"}</span></div>
      <div className="pl-3"><span className="text-emerald-400/70">"@type"</span>: <span className="text-foreground/50">"Organization"</span>,</div>
      <div className="pl-3"><span className="text-emerald-400/70">"name"</span>: <span className="text-foreground/50">"Acme Corp"</span>,</div>
      <div className="pl-3"><span className="text-emerald-400/70">"knowsAbout"</span>: <span className="text-foreground/50">["SaaS", "AI"]</span></div>
      <div><span className="text-foreground/50">{"}"}</span></div>
    </div>
  );
}

function EntitiesVisualInline() {
  return (
    <div className="space-y-1.5">
      {["Acme Corp", "Bolt Analytics", "CloudSync.io"].map((name) => (
        <div key={name} className="flex items-center justify-between gap-4 rounded-lg bg-background/40 px-3 py-2">
          <div className="flex items-center gap-2">
            <Globe className="w-3 h-3 text-blue-400/50" />
            <span className="text-xs text-foreground/70">{name}</span>
          </div>
          <Badge variant="outline" className="text-[8px] text-blue-400/60 no-default-hover-elevate no-default-active-elevate">Verified</Badge>
        </div>
      ))}
    </div>
  );
}

function WhatisBestVisualInline() {
  return (
    <div className="space-y-1.5">
      {[
        { name: "HubSpot CRM", score: "9.2" },
        { name: "Pipedrive", score: "8.7" },
        { name: "Zoho CRM", score: "8.1" },
      ].map((item) => (
        <div key={item.name} className="flex items-center justify-between gap-4 rounded-lg bg-background/40 px-3 py-2">
          <span className="text-xs text-foreground/70">{item.name}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400/60" />
            <span className="text-xs text-amber-400/60 font-mono">{item.score}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function AnswerStackVisualInline() {
  return (
    <div className="space-y-1.5">
      <div className="rounded-lg bg-background/40 px-3 py-2">
        <span className="text-[11px] text-foreground/60">"What is Answer Engine Optimization?"</span>
      </div>
      <div className="rounded-lg bg-background/40 px-3 py-2">
        <span className="text-[11px] text-muted-foreground/50 leading-relaxed">AEO is the practice of structuring content so AI search engines can cite it...</span>
      </div>
      <div className="flex items-center gap-2 px-1 pt-1">
        <Shield className="w-3 h-3 text-emerald-400/50" />
        <span className="text-[10px] text-emerald-400/50">Expert-vetted</span>
      </div>
    </div>
  );
}

function ReviewRadarVisualInline() {
  return (
    <div className="space-y-1.5">
      {[
        { platform: "G2", sentiment: "+12%", dir: "up" },
        { platform: "Reddit", sentiment: "+8%", dir: "up" },
        { platform: "Capterra", sentiment: "-3%", dir: "down" },
      ].map((item) => (
        <div key={item.platform} className="flex items-center justify-between gap-4 rounded-lg bg-background/40 px-3 py-2">
          <span className="text-xs text-foreground/70">{item.platform}</span>
          <span className={`text-xs font-mono ${item.dir === "up" ? "text-emerald-400/60" : "text-red-400/60"}`}>
            {item.sentiment}
          </span>
        </div>
      ))}
    </div>
  );
}

const projectVisuals = [
  <SchemaVisualInline />,
  <EntitiesVisualInline />,
  <WhatisBestVisualInline />,
  <AnswerStackVisualInline />,
  <ReviewRadarVisualInline />,
];

function Projects() {
  const { theme } = useTheme();
  return (
    <section
      id="projects"
      className="relative px-6 py-24 md:py-32 dot-pattern"
      data-testid="section-projects"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="mb-4">
            <Badge
              variant="outline"
              className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1"
            >
              Products
            </Badge>
          </div>

          <h2 className={`text-2xl font-bold tracking-tight sm:text-3xl ${
            theme === "sparkle" ? "sparkle-text" : "text-foreground"
          }`} data-testid="text-projects-heading">
            Structuring the Web for the AI Era.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.slice(0, 3).map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i}
              visual={projectVisuals[i]}
            />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.slice(3).map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i + 3}
              visual={projectVisuals[i + 3]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionDivider() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      <div className="divider-glow" />
    </div>
  );
}

function ClosingStatement() {
  const { theme } = useTheme();
  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-closing">
      {theme === "sparkle" ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none animate-subtle-glow"
          style={{ background: "radial-gradient(circle, rgba(100, 30, 140, 0.12) 0%, rgba(60, 10, 90, 0.05) 50%, transparent 70%)" }}
        />
      ) : (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-black/[0.02] dark:bg-white/[0.04] blur-[100px] pointer-events-none" />
      )}
      <div className="max-w-4xl mx-auto relative">
        <div
          className={`rounded-xl border px-8 py-12 md:px-16 md:py-16 text-center card-glow ${
            theme === "sparkle"
              ? "border-purple-900/20 bg-card/30 sparkle-glow-bg"
              : "border-border/60 bg-card/60 dark:border-border/30 dark:bg-card/20"
          }`}
          style={theme === "sparkle" ? { "--cycle-delay": "0s", "--cycle-duration": "10s" } as React.CSSProperties : undefined}
        >
          <p className={`text-xl font-medium leading-relaxed sm:text-2xl max-w-xl mx-auto ${
            theme === "sparkle" ? "sparkle-text" : "text-foreground/80"
          }`} data-testid="text-closing">
            The answer is the new first impression.
          </p>
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
              Brandvious<span className="font-normal text-muted-foreground">, Inc.</span>
            </span>
            <p className="mt-1 text-xs text-muted-foreground/60">
              Fair. Factual. Functional.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground/40" data-testid="text-address">
              16703 Early Riser Ave, Suite 111, Land O' Lakes, FL 34638
            </p>
            <a
              href="tel:+19138716500"
              className="text-xs text-muted-foreground/40 block"
              data-testid="link-phone"
            >
              1-913-871-6500
            </a>
          </div>
          <p className="text-xs text-muted-foreground/40" data-testid="text-copyright">
            &copy; {new Date().getFullYear()} Brandvious, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SparkleBackground() {
  const entities = [
    { top: "8%", left: "15%", size: 900, blur: 140, drift: "entity-drift-1", duration: "28s", delay: "0s",
      outer: "rgba(120, 40, 180, 0.30)", inner: "rgba(180, 100, 255, 0.45)" },
    { top: "35%", left: "65%", size: 750, blur: 120, drift: "entity-drift-2", duration: "34s", delay: "2s",
      outer: "rgba(90, 20, 150, 0.25)", inner: "rgba(150, 70, 220, 0.40)" },
    { top: "65%", left: "25%", size: 850, blur: 130, drift: "entity-drift-3", duration: "30s", delay: "5s",
      outer: "rgba(100, 30, 160, 0.28)", inner: "rgba(160, 80, 240, 0.42)" },
    { top: "20%", left: "80%", size: 600, blur: 110, drift: "entity-drift-1", duration: "36s", delay: "8s",
      outer: "rgba(80, 15, 140, 0.22)", inner: "rgba(140, 60, 210, 0.35)" },
    { top: "75%", left: "70%", size: 700, blur: 125, drift: "entity-drift-2", duration: "32s", delay: "4s",
      outer: "rgba(110, 35, 170, 0.24)", inner: "rgba(170, 90, 250, 0.38)" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {entities.map((e, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: e.top,
            left: e.left,
            width: `${e.size}px`,
            height: `${e.size}px`,
            filter: `blur(${e.blur}px)`,
            animation: `${e.drift} ${e.duration} ${e.delay} infinite ease-in-out`,
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${e.inner} 0%, ${e.outer} 30%, transparent 65%)`,
              animation: `entity-pulse ${parseInt(e.duration) * 0.4}s ${e.delay} infinite ease-in-out`,
            }}
          />
        </div>
      ))}
      {Array.from({ length: 80 }).map((_, i) => (
        <div
          key={`p-${i}`}
          className="absolute rounded-full bg-purple-300/[0.10] animate-float-particle"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            ["--duration" as string]: `${Math.random() * 15 + 10}s`,
            ["--delay" as string]: `${Math.random() * 12}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen bg-background relative">
      {theme === "sparkle" && <SparkleBackground />}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <SectionDivider />
        <Beliefs />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <ClosingStatement />
        <Footer />
      </div>
    </div>
  );
}
