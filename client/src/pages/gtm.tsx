import { useMemo } from "react";
import { useTheme } from "@/components/theme-provider";
import { NewFooter } from "@/pages/home-new";

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const coverage = [
  {
    name: "AI Marketing",
    accent: "purple" as const,
    companies: ["Jasper", "Writer", "Copy.ai", "Typeface", "Mutiny", "Clay", "Common Room", "Metadata", "HeyGen", "Descript"],
  },
  {
    name: "Sales Technology",
    accent: "blue" as const,
    companies: ["Gong", "Outreach", "Salesloft", "Apollo", "ZoomInfo", "Cognism", "Lavender", "Chili Piper", "Clari", "RB2B"],
  },
  {
    name: "Revenue Operations",
    accent: "emerald" as const,
    companies: ["HubSpot", "Salesforce", "Dreamdata", "HockeyStack", "Fullcast", "BoostUp", "InsightSquared", "Pavilion"],
  },
  {
    name: "Product Marketing",
    accent: "amber" as const,
    companies: ["Klue", "Crayon", "Highspot", "Seismic", "Walnut", "Storylane", "Navattic", "Consensus", "Arcade"],
  },
  {
    name: "Pipeline Generation",
    accent: "rose" as const,
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

const editorialOutputs = [
  "Research",
  "Interviews",
  "Company Profiles",
  "Product Profiles",
  "Reviews",
  "Comparisons",
  "Buyer's Guides",
  "Rankings",
  "Benchmarks",
  "Awards",
  "Knowledge Articles",
  "Structured Entities",
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
      </div>
    </section>
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
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {cat.name}
                <span className={`block mt-2 h-[2px] w-10 rounded-full ${accentText[cat.accent]}`} style={{ background: "currentColor" }} aria-hidden="true" />
              </h3>
              <p className="text-sm text-white/45 leading-relaxed">
                {cat.companies.join(" • ")}
              </p>
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
          <p className="text-xs uppercase tracking-[0.2em] text-amber-300/70 pt-7">Publications</p>
          <div>
            {publications.map((p, i) => (
              <EcosystemRow key={p.name} p={p} i={i} first={i === 0} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-2 lg:gap-16 mt-16">
          <p className="text-xs uppercase tracking-[0.2em] text-purple-300/70 pt-7">Knowledge</p>
          <div>
            {knowledge.map((p, i) => (
              <EcosystemRow key={p.name} p={p} i={i + 4} first={i === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EditorialOutputsSection() {
  return (
    <section className="relative py-24 px-6 border-t border-white/[0.06]" data-testid="gtm-section-outputs">
      <div className="max-w-6xl mx-auto relative z-10">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6">Editorial Outputs</p>
        <p className="text-lg text-white/70 max-w-2xl leading-relaxed mb-12">
          Every Brandvious GTM property contributes to a shared information layer through:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-10 gap-y-4 max-w-4xl">
          {editorialOutputs.map((o) => (
            <p key={o} className="text-base text-white/60 border-l border-white/[0.12] pl-4">
              {o}
            </p>
          ))}
        </div>
        <p className="mt-16 text-lg text-white/70 max-w-2xl leading-relaxed border-l pl-5" style={{ borderColor: "rgba(160,120,255,0.4)" }}>
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
      <EditorialOutputsSection />
      <NewFooter />
    </div>
  );
}
