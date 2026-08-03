import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { NewFooter } from "@/pages/home-new";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { GtmConstellation } from "@/components/gtm-constellation";
import { GtmLoopSection } from "@/components/consensus-graph";
import { Maximize2 } from "lucide-react";

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

// Market landscape — computed from Brandvious category research datasets (low-end
// of estimated ARR ranges; counts are companies tracked per dataset).
const landscapeTotals = { companies: 304, arr: "$1.4B+" };

const landscape = [
  {
    name: "AI Marketing",
    accent: "purple" as const,
    companies: 80,
    arr: "$363M+",
    featured: ["Mutiny", "Goldcast", "PathFactory", "Folloze", "Factors.ai", "Tofu", "Letterdrop", "Userled"],
  },
  {
    name: "Sales Technology",
    accent: "blue" as const,
    companies: 32,
    arr: "$386M+",
    featured: ["Common Room", "GetAccept", "Dock", "Accord", "Attention", "Aligned", "Trumpet", "Unify"],
  },
  {
    name: "Revenue Operations",
    accent: "emerald" as const,
    companies: 117,
    arr: "$379M+",
    featured: ["Scratchpad", "Syncari", "Openprise", "Weflow", "FunnelStory", "Forecastio", "Revcast", "MaxIQ"],
  },
  {
    name: "Product Marketing",
    accent: "amber" as const,
    companies: 25,
    arr: "$132M+",
    featured: ["Navattic", "Storylane", "Walnut", "Arcade", "Demostack", "Saleo", "Supademo", "Guideflow"],
  },
  {
    name: "Pipeline Generation",
    accent: "rose" as const,
    companies: 50,
    arr: "$164M+",
    featured: ["Metadata", "Mutiny", "UserGems", "Unify", "HockeyStack", "N.Rich", "Champify", "Bombora"],
  },
];

// TAL (Target Account List) overlay — full company lists per section from source datasets.
// Excludes companies over $100M in revenue (Salesforce, HubSpot, ZoomInfo, Gong, Outreach,
// Salesloft, Apollo.io, 6sense, Demandbase, Clari, Jasper, Writer, Seismic, Highspot,
// Mindtickle, Seamless.AI, DemandScience, G2 are all excluded).
const tal = [
  {
    name: "AI Marketing",
    accent: "purple" as const,
    companies: [
      "Copy.ai", "Typeface", "HeyGen", "Descript", "Mutiny", "Clay", "Common Room", "Metadata",
      "Goldcast", "PathFactory", "Folloze", "Factors.ai", "Tofu", "Letterdrop", "Userled",
      "Profound", "Slate", "Autobound", "Regie.ai", "Warmly", "Hushly", "Zuddl", "Demio",
      "Airmeet", "Livestorm", "BigMarker", "Vendelux", "Fibbler", "CaliberMind", "InfiniGrow",
      "Cometly", "SegmentStream", "Attribution", "Heeet", "Ruler Analytics", "GrowthLoop",
      "Conversion", "AudiencePlus", "Recotap", "Repurpose.io", "SEO.AI", "Scalenut",
      "SE Ranking", "Alli AI", "MarketMuse", "Frase", "Peec AI", "AthenaHQ", "Gracker.ai",
      "DemandSense",
    ],
  },
  {
    name: "Sales Technology",
    accent: "blue" as const,
    companies: [
      "Lavender", "Chili Piper", "RB2B", "Cognism", "Common Room", "GetAccept", "Dock",
      "Accord", "Attention", "Aligned", "Trumpet", "Unify", "Flowla", "Valuecase", "Nooks",
      "Clay", "Instantly", "Artisan", "11x", "Factors.ai", "B2B Rocket", "Salesmotion",
      "DealHub", "Fathom", "Allego", "RELAYTO", "Distribute", "Brainshark", "Leadfeeder",
    ],
  },
  {
    name: "Revenue Operations",
    accent: "emerald" as const,
    companies: [
      "Dreamdata", "HockeyStack", "BoostUp", "InsightSquared", "Pavilion", "Scratchpad",
      "Syncari", "FunnelStory", "Openprise", "Forecastio", "Weflow", "MaxIQ", "Revcast",
      "RevenueHero", "LeanData", "Traction Complete", "LeadAngel", "Kubaru", "Gradient Works",
      "RevOps.io", "Qobra", "QuotaPath", "Full Circle Insights", "Insycle", "Plauti",
      "Revenue Grid", "Terret", "Oliv AI", "Substrata", "AskElephant", "Default",
      "Chili Piper", "Visdum", "Variabl", "Performio", "DealHub", "Revenue.io", "Fullcast",
      "People.ai", "Aviso AI", "CaptivateIQ", "Everstage", "Factors.ai", "CaliberMind",
      "Windsor.ai", "Surface", "Attention", "Winn.ai", "Nue.io", "Warmly", "Ruler Analytics",
      "RevSure", "Momentum.io", "Centify", "Cloudingo", "Fibbler", "SegmentStream",
      "WhatConverts", "Funnel.io", "RB2B", "Dealfront", "Lead Forensics", "Leadinfo",
      "Derrick", "Avoma", "Fireflies.ai", "Fathom", "Sybill", "Spiky", "FloWorks",
      "RevRag", "tl;dv", "Paperless Parts", "Proposify", "QuoteWerks", "Salesbricks",
      "Vendori", "Vloq", "Xait", "Logik.io", "Palette", "Elevate", "DuplicateCheck",
      "Zaapit", "Supermetrics", "Improvado", "Adverity", "Clarisights", "Whatagraph",
      "Coupler.io", "NinjaCat", "AgencyAnalytics", "Porter Metrics", "TapClicks",
      "HappierLeads", "Albacross", "Coffee.ai", "Visitor Queue", "Visitor InSites",
      "LeadsForge", "Otter.ai", "Grain", "Granola", "Alfred", "Wave", "Jamie", "Fellow",
      "Notta", "Sembly", "Qwilr", "Better Proposals", "Quoter", "Fulcrum", "SalesCookie",
      "Commissionly", "DataGroomr", "Peeklogic",
    ],
  },
  {
    name: "Product Marketing",
    accent: "amber" as const,
    companies: [
      "Klue", "Crayon", "Walnut", "Storylane", "Navattic", "Consensus", "Arcade", "Demostack",
      "Saleo", "Supademo", "Guideflow", "Tourial", "Reprise", "Demoboost", "Karumi",
      "TestBox", "UserEvidence", "SlapFive", "Laudable", "Deeto", "Userpilot", "LaunchNotes",
      "Featurebase", "Canny", "Beamer", "Userback", "ProdPad", "ProductPlan", "AnnounceKit",
      "FeatureOS", "Frill", "Rapidr", "Nolt", "ReferenceEdge", "Peerbound",
    ],
  },
  {
    name: "Pipeline Generation",
    accent: "rose" as const,
    companies: [
      "Metadata", "Mutiny", "UserGems", "Unify", "Factors.ai", "N.Rich", "HockeyStack",
      "Champify", "Lead Onion", "Common Room", "Salesmotion", "RB2B", "Leadinfo", "Albacross",
      "Intentsify", "SalesIntel", "Lead411", "LeadIQ", "UpLead", "Snitcher", "Salespanel",
      "SMARTe", "IntentData.io", "Bombora", "Cognism", "Lead Forensics", "Influ2",
      "Madison Logic", "Leadfeeder", "HG Insights", "TrustRadius", "Warmly", "RollWorks",
      "Terminus", "Clay", "Lusha", "Kaspr", "Clearbit", "Triblio", "LeadSift",
      "Visitor Queue", "MadKudu", "Vector",
    ],
  },
];

const ecosystem = [
  { name: "GTM Journal", url: "https://gtmjournal.org", purpose: "Reporting, interviews, and analysis" },
  { name: "GTM Review", url: "https://gtmreview.org", purpose: "Reviews, comparisons, and buyer guides" },
  { name: "GTM Index", url: "https://gtmindex.org", purpose: "Rankings, benchmarks, and market research" },
  { name: "GTM 100", url: "https://gtm100.org", purpose: "Recognition of leading companies and products" },
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

function OverlayPhase({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10 pt-10 border-t border-white/[0.08]">
      <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1">Phase {n}</p>
      <h3 className="text-xl font-bold text-white tracking-tight mb-4">{title}</h3>
      {children}
    </div>
  );
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
            The Brandvious GTM Strategy
          </DialogTitle>
          <DialogDescription className="mt-5 text-base text-white/60 leading-relaxed">
            Through independent publications, research, structured knowledge, and editorial standards,
            Brandvious creates the trusted information AI systems use to understand modern go-to-market.
          </DialogDescription>
        </div>

        <OverlayPhase n="1" title="Build the Editorial Ecosystem">
          <p className="text-base text-white/55 leading-relaxed">
            Brandvious publishes independent research, reviews, interviews, rankings, awards, entities,
            and structured knowledge across its editorial properties. Every publication strengthens the
            industry&apos;s information layer.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
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
        </OverlayPhase>

        <OverlayPhase n="2" title="Editorial Outreach">
          <p className="text-base text-white/55 leading-relaxed mb-5">
            Brandvious reaches out as a publisher, not as an agency or a vendor.
          </p>
          <ul className="space-y-3">
            {[
              "Invite them for an interview in GTM Journal",
              "Ask them to validate their Entities listing",
              "Include them in a survey or roundup",
              "Consider them for a feature (which we'll likely deny and give to the category king)",
            ].map((item) => (
              <li key={item} className="text-sm text-white/70 border-l border-white/[0.15] pl-4 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-base text-white/55 leading-relaxed">
            The goal is to include them and give them easy wins to say yes to.
          </p>
        </OverlayPhase>

        <OverlayPhase n="3" title="Show Them They're Included">
          <p className="text-base text-white/55 leading-relaxed">
            We show them where they appear across the ecosystem, then ask if they would like an AEO
            analysis and suggestions.
          </p>
        </OverlayPhase>

        <OverlayPhase n="4" title="Run the AEO Baseline">
          <p className="text-base text-white/55 leading-relaxed">
            We run the AEO baseline on{" "}
            <a
              href="https://fanoutquery.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium underline decoration-white/30 underline-offset-4 hover:decoration-white/60 transition-colors"
            >
              fanoutquery.ai
            </a>{" "}
            and show them their gaps compared to their competitors.
          </p>
          <p className="mt-4 text-base text-white/55 leading-relaxed">
            Then we ask if they&apos;re interested in seeing how to solve it.
          </p>
        </OverlayPhase>

        <OverlayPhase n="5" title="Introduce the Right Partner">
          <p className="text-base text-white/55 leading-relaxed">
            When a company wants to strengthen its AI authority, Brandvious makes an introduction to a
            Certified Brandvious Partner. For go-to-market companies, that partner is{" "}
            <span className="text-white font-medium">Kevin Barber and the team at Lean Labs</span>.
          </p>
          <p className="mt-4 text-base text-white/85 leading-relaxed border-l pl-5" style={{ borderColor: "rgba(160,120,255,0.4)" }}>
            Because Lean Labs has already participated in the Brandvious ecosystem, the conversation
            begins with context, not a cold sales pitch.
          </p>
        </OverlayPhase>
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

function MarketLandscapeSection() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [talOpen, setTalOpen] = useState(false);
  const talButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <section id="market-landscape" className="relative py-24 px-6 border-t border-white/[0.06]" data-testid="gtm-section-landscape">
      <div className="max-w-6xl mx-auto relative z-10">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-10">Market Landscape</p>

        <div className="flex flex-wrap gap-x-16 gap-y-6 mb-6 pb-12 border-b border-white/[0.06]">
          <div>
            <p className="text-4xl sm:text-5xl font-bold text-white tabular-nums tracking-tight">{landscapeTotals.companies}</p>
            <p className="mt-2 text-sm text-white/45">companies included</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-bold text-white tabular-nums tracking-tight">{landscapeTotals.arr}</p>
            <p className="mt-2 text-sm text-white/45">combined ARR</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-start">
          <div>
            {landscape.map((cat, i) => (
              <div
                key={cat.name}
                className={`py-10 transition-opacity duration-300 ${i > 0 ? "border-t border-white/[0.06]" : ""} ${
                  hoveredCategory && hoveredCategory !== cat.name ? "opacity-40" : ""
                }`}
                onMouseEnter={() => setHoveredCategory(cat.name)}
                onMouseLeave={() => setHoveredCategory(null)}
                data-testid={`gtm-landscape-${i}`}
              >
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-white/40">
                    <span className="text-white/75 font-semibold tabular-nums">{cat.companies}</span> companies ·{" "}
                    <span className="text-white/75 font-semibold tabular-nums">{cat.arr}</span> ARR
                  </p>
                </div>
                <span className={`block mt-2 h-[2px] w-10 rounded-full ${accentText[cat.accent]}`} style={{ background: "currentColor" }} aria-hidden="true" />
                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-3">Recently Featured</p>
                  <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                    {cat.featured.map((c) => (
                      <span key={c} className="text-base text-white/70">
                        {c}
                      </span>
                    ))}
                    <span className={`text-sm ${accentText[cat.accent]}`}>
                      + {cat.companies - cat.featured.length} more
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-8 border-t border-white/[0.06]">
              <button
                ref={talButtonRef}
                onClick={() => setTalOpen(true)}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#f0c470] transition-colors duration-300 hover:text-white"
                data-testid="button-tal"
              >
                TAL
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>

          <div className="hidden lg:block sticky top-24">
            <div className="relative group/graph">
              <GtmConstellation hoveredCategory={hoveredCategory} />
              <button
                onClick={() => setExpanded(true)}
                className="absolute top-2 right-2 inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/70 transition-colors duration-300 hover:bg-white/[0.09] hover:text-white backdrop-blur-sm"
                data-testid="button-expand-constellation"
                aria-label="Expand knowledge graph to full screen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                Expand
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={expanded} onOpenChange={setExpanded}>
        <DialogContent
          className="w-screen h-screen max-w-none max-h-none rounded-none border-0 bg-[hsl(220,10%,4%)] p-0 flex flex-col"
          data-testid="overlay-constellation"
        >
          <div className="flex items-start justify-between px-6 sm:px-10 pt-8">
            <div>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                The GTM Knowledge Graph
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm text-white/50">
                {landscapeTotals.companies} companies connected to 7 Brandvious properties
              </DialogDescription>
            </div>
          </div>
          <div className="flex-1 min-h-0 flex items-center justify-center px-6 pb-8">
            <div className="w-full h-full flex items-center justify-center">
              <div style={{ width: "min(85vh, 90vw)" }}>
                <GtmConstellation hoveredCategory={null} showHubLabels />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={talOpen} onOpenChange={setTalOpen}>
        <DialogContent
          className="max-w-4xl max-h-[85vh] overflow-y-auto border border-white/[0.08] bg-[hsl(220,10%,4%)] p-8 sm:p-10"
          data-testid="overlay-tal"
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            talButtonRef.current?.focus();
          }}
        >
          <DialogTitle className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            TAL
          </DialogTitle>
          <DialogDescription className="text-sm text-white/50">
            Companies included or featured by Brandvious, by section.
          </DialogDescription>
          <div className="mt-4 space-y-8">
            {tal.map((cat) => (
              <div key={cat.name} data-testid={`tal-section-${cat.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h4 className="text-base font-bold text-white">{cat.name}</h4>
                  <span className="text-xs text-white/40 tabular-nums">{cat.companies.length} listed</span>
                </div>
                <span className={`block mt-2 h-[2px] w-8 rounded-full ${accentText[cat.accent]}`} style={{ background: "currentColor" }} aria-hidden="true" />
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {cat.companies.map((c) => (
                    <span key={c} className="text-sm text-white/70">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
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
  useEffect(() => {
    if (window.location.hash) {
      document.querySelector(window.location.hash)?.scrollIntoView();
    }
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(220,10%,4%)] text-white relative" data-testid="gtm-page">
      <NoiseOverlay />
      <GtmNavbar />
      <GtmHero />
      <CoverageSection />
      <MarketLandscapeSection />
      <EcosystemSection />
      <GtmLoopSection />
      <NewFooter />
    </div>
  );
}
