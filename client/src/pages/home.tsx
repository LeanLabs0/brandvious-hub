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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/[0.03] animate-float-particle"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 20}%`,
            ["--duration" as string]: `${Math.random() * 10 + 10}s`,
            ["--delay" as string]: `${Math.random() * 8}s`,
          }}
        />
      ))}
    </div>
  );
}

function HeroGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.015] blur-[120px] animate-subtle-glow" />
      <div className="absolute left-1/2 top-[60%] -translate-x-1/2 w-[1px] h-[300px] bg-gradient-to-b from-white/[0.08] to-transparent" />
    </div>
  );
}

function IconBar() {
  const heroIcons = projects.slice(0, 4);
  return (
    <div className="flex items-center gap-2 mb-10" data-testid="icon-bar">
      {heroIcons.map((project, i) => {
        const Icon = project.icon;
        return (
          <a
            key={project.name}
            href="#projects"
            className="flex items-center justify-center w-12 h-12 rounded-xl border border-border/60 bg-card/80 transition-colors duration-200 hover-elevate"
            title={project.name}
            data-testid={`icon-bar-${i}`}
          >
            <Icon className="w-5 h-5 text-muted-foreground" />
          </a>
        );
      })}
    </div>
  );
}

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-4 px-6 py-4 md:px-10"
      style={{ backdropFilter: "blur(12px)", backgroundColor: "hsl(220 10% 6% / 0.8)" }}
      data-testid="navbar"
    >
      <a
        href="/"
        className="text-sm font-semibold tracking-tight text-foreground"
        data-testid="link-home"
      >
        Brandvious <span className="font-normal text-muted-foreground">Digital</span>
      </a>
    </nav>
  );
}

function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center"
      data-testid="section-hero"
    >
      <HeroGlow />
      <HeroParticles />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        <IconBar />

        <div className="mb-8">
          <Badge
            variant="outline"
            className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1"
            data-testid="badge-brandvious"
          >
            Brandvious Digital
          </Badge>
        </div>

        <h1
          className="text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-5xl md:text-6xl"
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

      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50">
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </section>
  );
}

function PrincipleVisual1() {
  return (
    <div className="rounded-xl border border-border/40 bg-card/30 p-4 space-y-3">
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
    <div className="rounded-xl border border-border/40 bg-card/30 p-4 space-y-3">
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
    <div className="rounded-xl border border-border/40 bg-card/30 p-4 space-y-3">
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
  const visuals = [<PrincipleVisual1 />, <PrincipleVisual2 />, <PrincipleVisual3 />];

  return (
    <section
      id="principles"
      className="relative px-6 py-24 md:py-32"
      data-testid="section-beliefs"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-4">
            <Badge
              variant="outline"
              className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1"
            >
              The Mission
            </Badge>
          </div>

          <h2
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
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
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border border-border/40 bg-card/40 p-6 transition-all duration-300 hover-elevate overflow-visible"
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
  return (
    <section
      id="projects"
      className="relative px-6 py-24 md:py-32"
      data-testid="section-projects"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="mb-4">
            <Badge
              variant="outline"
              className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1"
            >
              The Products
            </Badge>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl" data-testid="text-projects-heading">
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

function ClosingStatement() {
  return (
    <section className="relative px-6 py-24 md:py-32" data-testid="section-closing">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-xl border border-border/30 bg-card/20 px-8 py-12 md:px-16 md:py-16 text-center">
          <p className="text-xl font-medium leading-relaxed text-foreground/80 sm:text-2xl max-w-xl mx-auto" data-testid="text-closing">
            AI is changing how people find, trust, and choose.
          </p>
          <p className="mt-3 text-base text-muted-foreground max-w-md mx-auto">
            We build the products that make sure the answers are right.
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
          <div className="text-right">
            <a
              href="tel:+19138716500"
              className="text-xs text-muted-foreground/60 block"
              data-testid="link-phone"
            >
              1-913-871-6500
            </a>
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground/40" data-testid="text-address">
            16703 Early Riser Ave, Suite 111, Land O' Lakes, FL 34638
          </p>
          <p className="text-xs text-muted-foreground/40" data-testid="text-copyright">
            &copy; {new Date().getFullYear()} Brandvious, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Beliefs />
      <Projects />
      <ClosingStatement />
      <Footer />
    </div>
  );
}
