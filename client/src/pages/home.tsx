import {
  ArrowDown,
  ArrowRight,
  Rocket,
  Globe,
  Trophy,
  Layers,
  Radar,
  Bot,
  Database,
  FileSearch,
  Shield,
  Zap,
  BarChart3,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const projects = [
  {
    name: "GrowthRocket",
    label: "AEO",
    tagline: "Get recommended by AI.",
    description:
      "Answer Engine Optimization for B2B SaaS. We make sure AI search engines understand, trust, and recommend your brand.",
    status: "Established",
    statusColor: "text-emerald-400",
    url: "https://growthrocket.ai",
    icon: Rocket,
  },
  {
    name: "Entities.org",
    label: "REGISTRY",
    tagline: "Structured facts, open data.",
    description:
      "A canonical entity registry built for machines. Structured, verified data so AI engines always get the right company — not the wrong one.",
    status: "Growing",
    statusColor: "text-blue-400",
    url: "https://entities.org",
    icon: Globe,
  },
  {
    name: "WhatisBest.com",
    label: "ANSWERS",
    tagline: "The best tool for the job.",
    description:
      "The go-to answer engine for B2B SaaS buyers. Structured, expert-vetted comparisons built to surface in AI search results.",
    status: "Launching",
    statusColor: "text-amber-400",
    url: "https://whatisbest.com",
    icon: Trophy,
  },
  {
    name: "AnswerStack.io",
    label: "AUTHORITY",
    tagline: "Less noise, more signal.",
    description:
      "The structured authority hub for the age of AI search. Schema-rich, expert-vetted content that AI engines cite as a credible source.",
    status: "In Development",
    statusColor: "text-neutral-400",
    url: "https://answerstack.io",
    icon: Layers,
  },
  {
    name: "ReviewRadar.com",
    label: "TRUST",
    tagline: "What's actually happening now.",
    description:
      "Review sites are biased and built on stale data. ReviewRadar indexes what's happening lately — pulling from leading review platforms and gathering real-time sentiment from communities.",
    status: "Backlog",
    statusColor: "text-neutral-500",
    url: "https://reviewradar.com",
    icon: Radar,
  },
];

const principles = [
  {
    number: "01",
    title: "The Internet Has a Trust Problem",
    body: "People ask AI for answers. AI pulls from the internet. But most of the internet wasn't built for accuracy — it was built for clicks. That gap between what people need and what machines find is where misinformation thrives.",
  },
  {
    number: "02",
    title: "Machines Need Structure, Not Noise",
    body: "AI engines don't read websites the way people do. They need structured, verified, schema-rich data to return confident answers. Most content on the web gives them noise. We build signal.",
  },
  {
    number: "03",
    title: "Better Inputs, Better Answers",
    body: "When the source material is fair, factual, and machine-readable, AI gives better answers. Better answers mean better decisions. That's the outcome we're building toward — one product at a time.",
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
      <a href="#projects">
        <Button variant="outline" size="sm" data-testid="button-explore">
          Explore
          <ArrowDown className="w-3 h-3" />
        </Button>
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

        <div className="mt-10">
          <a href="#principles">
            <Button variant="outline" data-testid="button-explore-projects">
              Explore the Projects
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50">
        <span className="text-[10px] tracking-[0.2em] uppercase">Explore</span>
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

function Principles() {
  const visuals = [<PrincipleVisual1 />, <PrincipleVisual2 />, <PrincipleVisual3 />];

  return (
    <section
      id="principles"
      className="relative px-6 py-24 md:py-32"
      data-testid="section-principles"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-4">
            <Badge
              variant="outline"
              className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1"
            >
              The Thesis
            </Badge>
          </div>

          <h2
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            data-testid="text-principles-heading"
          >
            Why we build.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-lg mx-auto">
            AI is rewriting how people find, trust, and choose. These are the beliefs
            behind every product we ship.
          </p>
        </div>

        <div className="flex flex-col gap-24">
          {principles.map((p, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={p.number}
                className={`flex flex-col gap-8 md:gap-12 ${isEven ? "md:flex-row-reverse" : "md:flex-row"} items-center`}
                data-testid={`principle-${i}`}
              >
                <div className="flex-1 w-full">
                  <span className="text-4xl font-bold text-border/60 font-mono select-none block mb-4">
                    {p.number}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mb-3" data-testid={`text-principle-title-${i}`}>
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground" data-testid={`text-principle-body-${i}`}>
                    {p.body}
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
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const Icon = project.icon;

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border border-border/60 bg-card/50 p-5 transition-colors duration-200 hover-elevate"
      data-testid={`card-project-${index}`}
    >
      <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-border/60 bg-background/50">
          <Icon className="w-4 h-4 text-muted-foreground" />
        </div>
        <Badge
          variant="outline"
          className={`text-[9px] tracking-wider uppercase font-medium ${project.statusColor} no-default-hover-elevate`}
          data-testid={`badge-status-${index}`}
        >
          {project.status}
        </Badge>
      </div>

      <h3 className="text-base font-semibold text-foreground" data-testid={`text-project-name-${index}`}>
        {project.name}
      </h3>
      <p className="mt-1 text-xs text-muted-foreground/60 tracking-wider uppercase">
        {project.label}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground flex-1" data-testid={`text-project-description-${index}`}>
        {project.description}
      </p>

      <div className="mt-4 pt-3 border-t border-border/30 flex items-center gap-1.5 text-xs text-muted-foreground/60 group-hover:text-foreground/70 transition-colors">
        Visit Site
        <ArrowRight className="w-3 h-3" />
      </div>
    </a>
  );
}

function Projects() {
  const topProjects = projects.slice(0, 3);
  const bottomProjects = projects.slice(3);

  return (
    <section
      id="projects"
      className="relative px-6 py-24 md:py-32"
      data-testid="section-projects"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="mb-4">
            <Badge
              variant="outline"
              className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium px-3 py-1"
            >
              The Products
            </Badge>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl" data-testid="text-projects-heading">
            What we're building.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-lg mx-auto" data-testid="text-projects-subheading">
            Each product tackles a different piece of the same problem. Together, they
            make the internet more useful — for people and for AI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topProjects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {bottomProjects.map((project, i) => {
            const realIndex = i + 3;
            const Icon = project.icon;
            return (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-border/40 bg-card/30 px-5 py-4 transition-colors duration-200 hover-elevate"
                data-testid={`card-project-${realIndex}`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-border/40 bg-background/30 flex-shrink-0">
                  <Icon className="w-4 h-4 text-muted-foreground/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-sm font-semibold text-foreground" data-testid={`text-project-name-${realIndex}`}>
                      {project.name}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-[9px] tracking-wider uppercase font-medium ${project.statusColor} no-default-hover-elevate`}
                      data-testid={`badge-status-${realIndex}`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground" data-testid={`text-project-description-${realIndex}`}>
                    {project.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/30 flex-shrink-0 invisible group-hover:visible" />
              </a>
            );
          })}
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
              Fair. Factual. Functional for AI.
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
      <Principles />
      <Projects />
      <ClosingStatement />
      <Footer />
    </div>
  );
}
