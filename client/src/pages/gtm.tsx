import { useMemo, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { NewFooter } from "@/pages/home-new";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const coverage = [
  {
    name: "AI Marketing",
    accent: "purple" as const,
    total: 47,
    companies: ["Jasper", "Writer", "Copy.ai", "Typeface", "Mutiny", "Clay", "Common Room", "Metadata", "HeyGen", "Descript"],
  },
  {
    name: "Sales Technology",
    accent: "blue" as const,
    total: 52,
    companies: ["Gong", "Outreach", "Salesloft", "Apollo", "ZoomInfo", "Cognism", "Lavender", "Chili Piper", "Clari", "RB2B"],
  },
  {
    name: "Revenue Operations",
    accent: "emerald" as const,
    total: 38,
    companies: ["HubSpot", "Salesforce", "Dreamdata", "HockeyStack", "Fullcast", "BoostUp", "InsightSquared", "Pavilion"],
  },
  {
    name: "Product Marketing",
    accent: "amber" as const,
    total: 41,
    companies: ["Klue", "Crayon", "Highspot", "Seismic", "Walnut", "Storylane", "Navattic", "Consensus", "Arcade"],
  },
  {
    name: "Pipeline Generation",
    accent: "rose" as const,
    total: 44,
    companies: ["6sense", "Demandbase", "Apollo", "ZoomInfo", "Common Room", "UserGems", "Warmly", "Factors.ai", "Albacross"],
  },
];

const ecosystem = [
  { name: "GTM Journal", url: "https://gtmjournal.org", purpose: "Reporting, interviews, and analysis" },
  { name: "GTM Review", url: "https://gtmreview.org", purpose: "Reviews, comparisons, and buyer guides" },
  { name: "GTM Index", url: "https://gtmindex.org", purpose: "Rankings, benchmarks, and market research" },
  { name: "GTM Awards", url: "https://gtmawards.org", purpose: "Recognition of leading companies and products" },
  { name: "AnswerStack", url: "https://answerstack.io", purpose: "Structured answers" },
  { name: "Entities.org", url: "https://entities.org", purpose: "Verified company and product entities" },
  { name: "WhatIsBest", url: "https://whatisbest.com", purpose: "Editorial recommendations" },
];

// ---------------------------------------------------------------------------
// Atmosphere (shared visual language with /new)
// ---------------------------------------------------------------------------

function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  );
}

function LightBeam({ party }: { party: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px]"
        style={{
          height: party ? "80vh" : "60vh",
          background: party
            ? "linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(140,80,255,0.5), rgba(80,40,200,0.2), transparent)"
            : "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(120,80,255,0.3), transparent)",
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 blur-[80px]"
        style={{
          width: party ? "300px" : "200px",
          height: party ? "80vh" : "60vh",
          background: party
            ? "linear-gradient(to bottom, rgba(140,80,255,0.25), rgba(100,50,220,0.15), rgba(60,20,160,0.05), transparent)"
            : "linear-gradient(to bottom, rgba(120,80,255,0.15), rgba(80,120,255,0.08), transparent)",
        }}
      />
    </div>
  );
}

function FloatingParticles({ party }: { party: boolean }) {
  const count = party ? 50 : 30;
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        size: Math.random() * 2 + (party ? 1.5 : 1),
        left: Math.random() * 100,
        bottom: Math.random() * (party ? 60 : 40),
        duration: Math.random() * 12 + (party ? 8 : 10),
        delay: Math.random() * 10,
      })),
    [party, count],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute rounded-full animate-float-particle ${
            party ? "bg-purple-300/[0.12]" : "bg-white/[0.08]"
          }`}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            ["--duration" as string]: `${p.duration}s`,
            ["--delay" as string]: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

const glassCard = "backdrop-blur-sm bg-white/[0.03]";
const glassCardBorder = "border border-white/[0.07]";

const accentText: Record<string, string> = {
  purple: "text-purple-300/80",
  blue: "text-sky-300/80",
  emerald: "text-emerald-300/80",
  amber: "text-amber-300/80",
  rose: "text-rose-300/80",
};

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

function GtmNavbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        backdropFilter: "blur(20px) saturate(180%)",
        backgroundColor: "hsl(220 10% 4% / 0.75)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
      data-testid="gtm-navbar"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/" className="text-base font-semibold tracking-tight text-white" data-testid="gtm-link-home">
          Brandvious<span className="font-light text-white/60 ml-0.5">Digital</span>
        </a>
        <div className="flex items-center gap-6">
          <a href="/new" className="text-sm text-white/70 hover:text-white transition-colors hidden sm:block" data-testid="gtm-nav-how">How Brandvious Works</a>
          <a href="/partners" className="text-sm text-white/70 hover:text-white transition-colors hidden sm:block" data-testid="gtm-nav-partners">Certified Partners</a>
        </div>
      </div>
    </nav>
  );
}

function GtmHero() {
  const { theme } = useTheme();
  const party = theme === "sparkle";

  return (
    <section className="relative min-h-[60vh] flex flex-col items-start justify-center px-6 pt-32 pb-16 overflow-hidden" data-testid="gtm-section-hero">
      <LightBeam party={party} />
      <FloatingParticles party={party} />
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6">GTM</p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight max-w-5xl" data-testid="gtm-heading">
          Brandvious for{" "}
          <span
            className="bg-clip-text text-transparent whitespace-nowrap"
            style={{
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(160,120,255,0.75))",
            }}
          >
            Go-to-Market.
          </span>
        </h1>
        <p className="mt-8 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed" data-testid="gtm-text-intro">
          Brandvious specializes in the{" "}
          <span className="text-white font-medium">companies, products, and categories</span>{" "}
          defining modern go-to-market.
        </p>
        <div className="mt-10">
          <StrategyOverlay />
        </div>
      </div>
    </section>
  );
}

const strategyProperties = [
  { name: "GTM Journal", role: "Reporting and industry analysis" },
  { name: "GTM Review", role: "Product reviews and comparisons" },
  { name: "GTM Index", role: "Rankings, benchmarks, and research" },
  { name: "GTM Awards", role: "Industry recognition" },
  { name: "AnswerStack", role: "Structured knowledge" },
  { name: "Entities.org", role: "Verified entities" },
  { name: "WhatIsBest", role: "Editorial recommendations" },
];

const editorialPrinciples = [
  "Evidence-Based",
  "Expert-Led",
  "Structured for AI",
  "Accurate & Relevant",
  "Continuously Maintained",
];

function OverlayEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">{children}</p>;
}

function StrategyOverlay() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.04] px-6 py-3 text-sm font-medium text-white/85 transition-colors duration-300 hover:bg-white/[0.09] hover:text-white backdrop-blur-sm"
          data-testid="button-gtm-strategy"
        >
          Brandvious GTM Strategy
        </button>
      </DialogTrigger>
      <DialogContent
        className="max-w-3xl max-h-[85vh] overflow-y-auto border-white/[0.1] bg-[hsl(220,10%,6%)] text-white p-8 sm:p-12"
        data-testid="overlay-gtm-strategy"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Brandvious GTM</p>
          <DialogTitle className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            GTM Sources &amp; Citations for AI
          </DialogTitle>
          <DialogDescription className="mt-5 text-base text-white/60 leading-relaxed">
            Through independent publications, research, structured knowledge, and editorial standards,
            Brandvious creates the trusted information AI systems use to understand modern go-to-market.
          </DialogDescription>
        </div>

        <div className="mt-10 pt-10 border-t border-white/[0.08]">
          <OverlayEyebrow>Our Belief</OverlayEyebrow>
          <p className="text-lg text-white/85 leading-relaxed font-medium">
            The brands that become consensus choices will become the growth leaders of the next decade.
          </p>
          <p className="mt-4 text-base text-white/55 leading-relaxed">
            Consensus is built when trusted publications, research, reviews, rankings, interviews,
            entities, and references consistently reinforce the same understanding of a company,
            product, or category.
          </p>
        </div>

        <div className="mt-10 pt-10 border-t border-white/[0.08]">
          <OverlayEyebrow>Our Strategy</OverlayEyebrow>
          <p className="text-base text-white/55 leading-relaxed mb-6">
            Brandvious is building an editorial ecosystem dedicated to modern go-to-market.
          </p>
          <div>
            {strategyProperties.map((p, i) => (
              <div
                key={p.name}
                className={`grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1 sm:gap-6 py-3 ${i > 0 ? "border-t border-white/[0.06]" : ""}`}
              >
                <span className="text-sm font-semibold text-white">{p.name}</span>
                <span className="text-sm text-white/50">{p.role}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-10 border-t border-white/[0.08]">
          <OverlayEyebrow>Editorial Leadership</OverlayEyebrow>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p className="text-lg font-semibold text-white">Ryan Scott</p>
              <p className="text-sm text-purple-300/80 mt-1">Executive Director</p>
              <p className="mt-3 text-sm text-white/50 leading-relaxed">
                Leads Brandvious&apos; editorial direction, publication standards, and long-term strategy.
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold text-white">Ralph Lemos</p>
              <p className="text-sm text-purple-300/80 mt-1">Research Director &amp; Content Manager</p>
              <p className="mt-3 text-sm text-white/50 leading-relaxed">
                Leads editorial research, content operations, and publishing across Brandvious properties.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-10 border-t border-white/[0.08]">
          <OverlayEyebrow>Editorial Principles</OverlayEyebrow>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {editorialPrinciples.map((p) => (
              <span key={p} className="text-sm text-white/70 border-l border-white/[0.15] pl-3">
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-10 border-t border-white/[0.08]">
          <OverlayEyebrow>Our Purpose</OverlayEyebrow>
          <p className="text-base text-white/55 leading-relaxed">
            We believe trusted information will become one of the most valuable competitive advantages
            in the age of AI.
          </p>
          <p className="mt-4 text-base text-white/85 leading-relaxed border-l pl-5" style={{ borderColor: "rgba(160,120,255,0.4)" }}>
            Brandvious is building the editorial infrastructure that helps define markets, establish
            consensus, and earn lasting authority.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CoverageSection() {
  return (
    <section className="relative py-24 px-6 border-t border-white/[0.06]" data-testid="gtm-section-coverage">
      <div className="max-w-6xl mx-auto relative z-10">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-12">Coverage</p>
        <div className="space-y-0">
          {coverage.map((cat, i) => (
            <div
              key={cat.name}
              className={`grid grid-cols-1 md:grid-cols-[300px_1fr] gap-3 md:gap-12 py-10 items-baseline ${i > 0 ? "border-t border-white/[0.06]" : ""}`}
              data-testid={`gtm-coverage-${i}`}
            >
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {cat.name}
                  <span className={`block mt-2 h-[2px] w-10 rounded-full ${accentText[cat.accent]}`} style={{ background: "currentColor" }} aria-hidden="true" />
                </h3>
                <p className="mt-4 text-sm text-white/40">
                  <span className="text-white/75 font-semibold tabular-nums">{cat.total}</span> companies covered
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-4">Recently Featured</p>
                <div className="flex flex-wrap items-baseline gap-x-7 gap-y-3">
                  {cat.companies.map((c) => (
                    <span key={c} className="text-base text-white/70">
                      {c}
                    </span>
                  ))}
                  <span className={`text-sm ${accentText[cat.accent]}`}>
                    + {cat.total - cat.companies.length} more
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EcosystemRow({ p, i, first }: { p: (typeof ecosystem)[0]; i: number; first?: boolean }) {
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-baseline gap-6 sm:gap-10 py-6 transition-colors duration-300 ${
        first ? "" : "border-t border-white/[0.06]"
      }`}
      data-testid={`gtm-ecosystem-${i}`}
    >
      <span className="text-xs tabular-nums text-white/25 group-hover:text-white/50 transition-colors w-6 shrink-0">
        {String(i + 1).padStart(2, "0")}
      </span>
      <span className="text-2xl sm:text-3xl font-bold text-white/80 group-hover:text-white tracking-tight transition-colors whitespace-nowrap">
        {p.name}
      </span>
      <span
        className="hidden sm:block flex-1 border-b border-dotted border-white/[0.12] group-hover:border-white/[0.25] transition-colors translate-y-[-6px]"
        aria-hidden="true"
      />
      <span className="text-sm text-white/40 group-hover:text-white/70 transition-colors text-right sm:text-left shrink min-w-0">
        {p.purpose}
      </span>
    </a>
  );
}

function EcosystemSection() {
  const publications = ecosystem.slice(0, 4);
  const knowledge = ecosystem.slice(4);

  return (
    <section className="relative py-24 px-6 border-t border-white/[0.06]" data-testid="gtm-section-ecosystem">
      <div className="max-w-6xl mx-auto relative z-10">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-14">The GTM Ecosystem</p>

        <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-2 lg:gap-16">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-300/70 pt-7">GTM Publications</p>
          <div>
            {publications.map((p, i) => (
              <EcosystemRow key={p.name} p={p} i={i} first={i === 0} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-2 lg:gap-16 mt-16">
          <p className="text-xs uppercase tracking-[0.2em] text-purple-300/70 pt-7">Knowledge Graph</p>
          <div>
            {knowledge.map((p, i) => (
              <EcosystemRow key={p.name} p={p} i={i + 4} first={i === 0} />
            ))}
          </div>
        </div>

        <p className="mt-20 text-lg text-white/70 max-w-2xl leading-relaxed border-l pl-5" style={{ borderColor: "rgba(160,120,255,0.4)" }}>
          These properties create consensus so AI systems can efficiently{" "}
          <span className="text-white font-medium">understand, evaluate, and recommend</span>.
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Gtm() {
  return (
    <div className="min-h-screen bg-[hsl(220,10%,4%)] text-white relative" data-testid="gtm-page">
      <NoiseOverlay />
      <GtmNavbar />
      <GtmHero />
      <CoverageSection />
      <EcosystemSection />
      <NewFooter />
    </div>
  );
}
