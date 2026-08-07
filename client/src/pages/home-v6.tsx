import { useState, useEffect, useMemo } from "react";
import {
  ArrowRight,
  Sun,
  Moon,
  Sparkles,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectWidget, ConnectButton } from "@/components/connect-widget";
import { useTheme } from "@/components/theme-provider";

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const heroHeadline = {
  white: "Brandvious makes AI",
  gradient: "work for businesses.",
};

type VisibilityStat = { stat: string; detail: string; client: string };
type InsightSource = { kind: string; site: string; example: string; url: string };

const visibilityStats: VisibilityStat[] = [
  { stat: "+240%", detail: "AI mentions in 6 months", client: "[Client]" },
  { stat: "65%", detail: "of category AI answers cite the brand", client: "[Client]" },
  { stat: "#1", detail: "category ranking on 3 networks", client: "[Client]" },
  { stat: "4 of 5", detail: "major LLMs recommend the brand", client: "[Client]" },
];

const insightSources: InsightSource[] = [
  {
    kind: "Verified entity records",
    site: "Entities.org",
    example: "Stripe · Organization · Verified. Founded 2010, HQ San Francisco, per-fact citations, sameAs links.",
    url: "https://entities.org/entity/stripe",
  },
  {
    kind: "Original B2B research",
    site: "WhatisBest.com",
    example: "SAP Ariba vs. Coupa: which procurement platform has a lower total cost of ownership?",
    url: "https://www.whatisbest.com/procurement/sap-ariba-vs-coupa-which-procurement-platform-has-a-lower-total-cost-of-ownership",
  },
  {
    kind: "Structured Q&A",
    site: "AnswerStack.io",
    example: "What is a UCaaS platform? Answers authored by the organizations that know the subject.",
    url: "https://www.answerstack.io/search?q=What%20is%20a%20UCaaS%20platform%3F",
  },
];

const focusQuote =
  "Strong LLM visibility is the #1 GTM growth lever of the next decade.";

const howItWorks = {
  title: "How Brandvious Works",
};

const networks = [
  {
    name: "Authority Domain Profiles",
    label: "Knowledge Graph",
    description: "Offsite brand validation & answer citation.",
    accent: "purple" as const,
    examples: [
      { name: "AnswerStack.io", url: "https://answerstack.io" },
      { name: "Entities.org", url: "https://entities.org" },
      { name: "ReviewInsight.com", url: "https://reviewinsight.com" },
    ],
  },
  {
    name: "B2B Consensus",
    label: "B2B Publications",
    description: "Authority domains LLMs cite and recommend.",
    accent: "amber" as const,
    examples: [
      { name: "B2BIndex.org", url: "https://b2bindex.org" },
      { name: "BestFit.org", url: "https://bestfit.org" },
      { name: "WhatisBest.com", url: "https://whatisbest.com" },
    ],
  },
];

const footerColumns = [
  {
    title: "Products",
    wide: true,
    span: 2,
    cols: [
      [
        { name: "CopyRocket", url: "https://copyrocket.app" },
        { name: "DesignRocket", url: "https://designrocket.ai" },
        { name: "SprocketRocket", url: "https://sprocketrocket.ai" },
        { name: "SchemaRocket", url: "https://schemarocket.ai" },
      ],
      [
        { name: "SurveyRocket", url: "https://surveyrocket.ai" },
        { name: "ReputationRocket", url: "https://reputationrocket.ai" },
        { name: "AnswerRocket", url: "https://answerrocket.io" },
        { name: "RocketRank", url: "https://rocketrank.ai" },
      ],
    ],
  },
  {
    title: "Partners",
    span: 1,
    links: [
      { name: "Certified Partners", url: "/partners" },
      { name: "HubSpot for Startups", url: "https://www.hubspot.com/startups" },
      { name: "AEO Accelerator", url: "https://www.getgrowth.com" },
      { name: "Entities.org", url: "https://entities.org" },
    ],
  },
  {
    title: "Properties",
    links: [
      { name: "AnswerStack", url: "https://answerstack.io" },
      { name: "WhatisBest", url: "https://whatisbest.com" },
      { name: "ReviewInsight", url: "https://reviewinsight.com", badge: "New" },
      { name: "B2BIndex", url: "https://b2bindex.org", badge: "New" },
      { name: "BestFit", url: "https://bestfit.org", badge: "New" },
    ],
  },
  {
    title: "Coming Next",
    noDivider: true,
    links: [
      { name: "GTM Loop", url: "/gtm" },
      { name: "GTM 100", url: "https://gtm100.org" },
      { name: "GTM Review", url: "https://gtmreview.org" },
      { name: "GTM Index", url: "https://gtmindex.org" },
      { name: "GTM Journal", url: "https://gtmjournal.org" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Atmosphere (shared visual language with the current homepage)
// ---------------------------------------------------------------------------

export function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
      data-testid="noise-overlay"
    />
  );
}

export function LightBeam({ party }: { party: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" data-testid="light-beam">
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
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 blur-[120px]"
        style={{
          width: party ? "900px" : "600px",
          height: party ? "50vh" : "40vh",
          background: party
            ? "radial-gradient(ellipse at center top, rgba(120,60,255,0.14), rgba(80,30,180,0.06), transparent 70%)"
            : "radial-gradient(ellipse at center top, rgba(100,60,255,0.08), transparent 70%)",
        }}
      />
    </div>
  );
}

export function FloatingParticles({ party }: { party: boolean }) {
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

function PartyAtmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full"
        style={{
          background: "linear-gradient(to bottom, rgba(140,80,255,0.4) 0%, rgba(100,50,220,0.15) 20%, rgba(80,30,180,0.06) 40%, rgba(60,20,140,0.04) 60%, rgba(60,20,140,0.03) 80%, rgba(100,50,220,0.08) 92%, rgba(140,80,255,0.25) 100%)",
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[200px] h-full blur-[100px]"
        style={{
          background: "linear-gradient(to bottom, rgba(120,60,255,0.12) 0%, rgba(100,40,200,0.06) 25%, rgba(80,30,160,0.02) 50%, rgba(60,20,120,0.015) 75%, rgba(100,40,200,0.06) 92%, rgba(120,60,255,0.10) 100%)",
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[600px] h-[250px] blur-[120px]"
        style={{
          background: "radial-gradient(ellipse at center bottom, rgba(120,50,220,0.12), transparent 70%)",
        }}
      />
    </div>
  );
}

const glassCard = "backdrop-blur-sm bg-white/[0.03]";
const glassCardBorder = "border border-white/[0.07]";
const glassCardHover = "hover:bg-white/[0.06] hover:border-white/[0.14]";
const cardShadowBase = "shadow-[0_2px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]";
const cardShadowHover = "hover:shadow-[0_8px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.06)]";
const cardShadowParty = "hover:shadow-[0_8px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(100,40,200,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]";

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

export function NewNavbar() {
  const [connectOpen, setConnectOpen] = useState(false);
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        backdropFilter: "blur(20px) saturate(180%)",
        backgroundColor: "hsl(220 10% 4% / 0.75)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
      data-testid="v2-navbar"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/" className="text-base font-semibold tracking-tight text-white" data-testid="v2-link-home">
          Brandvious<span className="font-light text-white/60 ml-0.5">Digital</span>
        </a>
        <div className="flex items-center gap-6">
          <a href="/products" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block" data-testid="v2-nav-products">Products</a>
          <a href="/partners" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block" data-testid="v2-nav-partners">Partners</a>
          <ConnectButton compact onClick={() => setConnectOpen(true)} testId="v2-nav-connect" />
        </div>
      </div>
      <ConnectWidget open={connectOpen} onClose={() => setConnectOpen(false)} />
    </nav>
  );
}

function NewHero() {
  const { theme } = useTheme();
  const party = theme === "sparkle";
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex flex-col items-start justify-center px-6 pt-40 pb-28 overflow-hidden" data-testid="v2-section-hero">
      <LightBeam party={party} />
      <FloatingParticles party={party} />

      <div
        className={`relative z-10 max-w-6xl mx-auto w-full transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight max-w-5xl"
          data-testid="v2-text-headline"
        >
          <span className="text-white">{heroHeadline.white} </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(160,120,255,0.55))",
            }}
          >
            {heroHeadline.gradient}
          </span>
        </h1>

      </div>
    </section>
  );
}

function ExchangeSectionPremium() {
  const { theme } = useTheme();
  const party = theme === "sparkle";

  return (
    <section className="relative py-24 px-6 border-t border-white/[0.06]" data-testid="v2-section-exchange-premium">
      <div className="max-w-6xl mx-auto relative z-10">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-10">The Value Prop</p>
        {/* One combined story: the visibility brands want, delivered via insights AI can trust */}
        <div
          className={`relative rounded-2xl overflow-hidden p-8 md:p-12 ${glassCard} ${glassCardBorder} ${cardShadowBase} ${party ? cardShadowParty : ""}`}
          data-testid="v2-card-premium-combined"
        >
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(100,170,255,0.5), rgba(160,120,255,0.5), transparent)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(600px circle at 30% 0%, rgba(50,120,240,0.08), transparent 60%), radial-gradient(600px circle at 80% 100%, rgba(110,60,240,0.08), transparent 60%)" }} />
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight max-w-3xl">
              We deliver the AI visibility brands want.
            </h2>
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {visibilityStats.map((item) => (
                <div key={item.stat} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <p className="text-3xl font-bold text-white tracking-tight">{item.stat}</p>
                  <p className="mt-1 text-xs text-white/50">{item.detail}</p>
                  <p className="mt-4 text-[11px] text-sky-300/60">{item.client}</p>
                </div>
              ))}
            </div>
            <p className="mt-12 text-lg text-white/60">
              by delivering <span className="text-white">insights AI can trust</span>.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {insightSources.map((item) => (
                <a
                  key={item.site}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all duration-300 hover:border-purple-300/25 hover:bg-white/[0.04]"
                >
                  <p className="text-[11px] uppercase tracking-[0.14em] text-white/40">{item.kind}</p>
                  <p className="mt-3 text-sm font-semibold text-white inline-flex items-center gap-1.5">
                    {item.site}
                    <ArrowUpRight className="w-3.5 h-3.5 text-purple-300/80 group-hover:text-purple-200 transition-colors" />
                  </p>
                  <p className="mt-2 text-xs text-white/50 leading-relaxed">{item.example}</p>
                </a>
              ))}
              <a
                href="/products"
                className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all duration-300 hover:border-purple-300/25 hover:bg-white/[0.04]"
              >
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/40">And more</p>
                <p className="mt-3 text-sm font-semibold text-white inline-flex items-center gap-1.5">
                  The Brandvious network
                  <ArrowUpRight className="w-3.5 h-3.5 text-purple-300/80 group-hover:text-purple-200 transition-colors" />
                </p>
                <p className="mt-2 text-xs text-white/50 leading-relaxed">Reviews, expert interviews, rankings, and benchmarks across every property.</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteSection({ text, testid }: { text: string; testid: string }) {
  return (
    <section className="relative py-28 px-6 border-t border-white/[0.06]" data-testid={testid}>
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug tracking-tight">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.45))",
            }}
          >
            {text}
          </span>
        </p>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const { theme } = useTheme();
  const party = theme === "sparkle";

  return (
    <section id="how-it-works" className="relative py-24 px-6 border-t border-white/[0.06] scroll-mt-16" data-testid="v2-section-how">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">{howItWorks.title}</p>
          <h2 className="text-xl sm:text-2xl font-semibold leading-snug text-white/60">
            Brandvious properties create{" "}
            <span
              className="bg-clip-text text-transparent font-bold"
              style={{
                backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(180,140,255,0.85), rgba(255,255,255,0.95))",
              }}
            >
              trusted research, content, and entities
            </span>
            <br className="hidden md:block" />{" "}
            that help AI{" "}
            <span
              className="bg-clip-text text-transparent font-bold"
              style={{
                backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(180,140,255,0.85), rgba(255,255,255,0.95))",
              }}
            >
              understand, trust, and recommend
            </span>{" "}
            B2B companies.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {networks.map((n, i) => {
            const accent = {
              purple: {
                label: "text-purple-300/80",
                hairline: "linear-gradient(90deg, transparent, rgba(160,120,255,0.4), transparent)",
                glow: "radial-gradient(400px circle at 50% 0%, rgba(110,60,240,0.07), transparent 60%)",
              },
              blue: {
                label: "text-sky-300/80",
                hairline: "linear-gradient(90deg, transparent, rgba(100,170,255,0.4), transparent)",
                glow: "radial-gradient(400px circle at 50% 0%, rgba(50,120,240,0.07), transparent 60%)",
              },
              amber: {
                label: "text-amber-300/80",
                hairline: "linear-gradient(90deg, transparent, rgba(255,200,120,0.35), transparent)",
                glow: "radial-gradient(400px circle at 50% 0%, rgba(240,170,60,0.05), transparent 60%)",
              },
            }[n.accent];

            return (
              <div
                key={n.name}
                className={`relative rounded-2xl overflow-hidden p-10 transition-all duration-500 transform hover:-translate-y-0.5 ${glassCard} ${glassCardBorder} ${glassCardHover} ${cardShadowBase} ${party ? cardShadowParty : cardShadowHover}`}
                data-testid={`v2-network-card-${i}`}
              >
                <div className="absolute inset-x-0 top-0 h-px" style={{ background: accent.hairline }} />
                <div className="absolute inset-0 pointer-events-none" style={{ background: accent.glow }} />
                <div className="relative z-10">
                  <p className={`text-xs uppercase tracking-[0.2em] mb-5 ${accent.label}`}>{n.label}</p>
                  <h3 className="text-2xl font-semibold text-white mb-3">{n.name}</h3>
                  <p className="text-sm text-white/50 mb-10">{n.description}</p>

                  <div>
                    {n.examples.map((ex, j) => (
                      <a
                        key={ex.name}
                        href={ex.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center justify-between gap-2 py-3.5 text-base transition-colors duration-300 text-white/70 hover:text-white ${
                          j > 0 ? "border-t border-white/[0.06]" : ""
                        }`}
                      >
                        <span className="flex items-center gap-2">{ex.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 transition-colors shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PartnerCTASection() {
  const { theme } = useTheme();
  const party = theme === "sparkle";

  return (
    <section className="relative py-20 px-6 border-t border-white/[0.06]" data-testid="v2-section-partner-cta">
      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`relative rounded-2xl overflow-hidden p-8 md:p-12 ${glassCard} ${glassCardBorder} ${cardShadowBase} ${
            party
              ? "shadow-[0_2px_20px_rgba(0,0,0,0.3),0_0_40px_rgba(100,40,200,0.05),inset_0_1px_0_rgba(255,255,255,0.04)]"
              : ""
          }`}
        >
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(160,120,255,0.5), rgba(120,180,255,0.35), transparent)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(600px circle at 0% 50%, rgba(110,60,240,0.08), transparent 55%), radial-gradient(500px circle at 100% 50%, rgba(60,120,255,0.06), transparent 55%)",
            }}
          />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-purple-300/70 mb-3">Want to grow your AI authority?</p>
              <h2 className="text-xl sm:text-2xl font-semibold text-white">
                Find a{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg, rgba(190,150,255,0.95), rgba(140,180,255,0.9))",
                  }}
                >
                  Certified Brandvious Partner.
                </span>
              </h2>
            </div>
            <a
              href="/partners"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-purple-300/25 bg-purple-400/[0.08] hover:bg-purple-400/[0.14] hover:border-purple-300/40 hover:shadow-[0_0_24px_rgba(140,80,255,0.18)] shrink-0 self-start md:self-auto"
              data-testid="v2-button-see-partners"
            >
              See Partners <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewFooter() {
  const { theme, toggleTheme } = useTheme();
  const [connectOpen, setConnectOpen] = useState(false);
  const party = theme === "sparkle";
  const themeIcon =
    theme === "dark" ? <Sun className="w-4 h-4" /> :
    theme === "light" ? <Sparkles className="w-4 h-4" /> :
    <Moon className="w-4 h-4" />;

  const renderFooterColumn = (col: (typeof footerColumns)[number], padClass: string) => (
    <div key={col.title} className={`shrink-0 whitespace-nowrap ${padClass}`}>
      <p className="text-white/30 uppercase tracking-wider text-xs mb-3">{col.title}</p>
      {"cols" in col ? (
        <div className="flex gap-x-8">
          {(col as { cols: { name: string; url: string; badge?: string; isHeader?: boolean }[][] }).cols.map((colLinks, ci) => (
            <div key={ci} className="space-y-3">
              {colLinks.map((link) =>
                link.isHeader ? (
                  <p key={link.name} className="text-[10px] uppercase tracking-widest text-white/25 pt-1">
                    {link.name}
                  </p>
                ) : (
                  <a
                    key={link.name}
                    href={link.url}
                    {...(link.url.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors"
                    data-testid={`v2-footer-link-${link.name.toLowerCase().replace(/[\s.]/g, "-")}`}
                  >
                    {link.name}
                    {link.badge && (
                      <span className="text-[9px] tracking-wide font-medium rounded px-1 py-0.5 leading-none border text-amber-300/50 border-amber-300/15">{link.badge}</span>
                    )}
                  </a>
                )
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {"links" in col && (col as { links: { name: string; url?: string; badge?: string }[] }).links.map((link) =>
            link.url ? (
              <a
                key={link.name}
                href={link.url}
                {...(link.url.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors"
                data-testid={`v2-footer-link-${link.name.toLowerCase().replace(/[\s.]/g, "-")}`}
              >
                {link.name}
                {link.badge && (
                  <span className="text-[9px] tracking-wide font-medium text-amber-300/50 border border-amber-300/15 rounded px-1 py-0.5 leading-none">{link.badge}</span>
                )}
              </a>
            ) : (
              <span key={link.name} className="block text-white/50">{link.name}</span>
            )
          )}
        </div>
      )}
    </div>
  );

  return (
    <footer className="relative py-16 px-6 border-t border-white/[0.04]" data-testid="v2-footer">
      {party && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[1px]"
            style={{
              boxShadow: "0 0 80px 40px rgba(140,80,255,0.15), 0 0 160px 80px rgba(100,40,200,0.08)",
            }}
          />
          <div
            className="absolute top-0 left-[15%] right-[15%] h-[1px]"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(140,80,255,0.35) 40%, rgba(160,100,255,0.5) 50%, rgba(140,80,255,0.35) 60%, transparent)",
            }}
          />
        </div>
      )}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start text-sm">
          {/* left half: brand + products */}
          <div className="md:w-1/2 flex items-start justify-between gap-8 md:pr-8">
            <div className="min-w-[200px]">
              <a
                href="/"
                className="inline-block text-base font-semibold text-white mb-2 hover:text-white/80 transition-colors"
                data-testid="v2-footer-link-home"
              >
                Brandvious<span className="font-light text-white/60">, Inc.</span>
              </a>
              <div className="space-y-1 mt-2">
                <p className="text-xs text-white/30 leading-relaxed" data-testid="v2-text-address">
                  16703 Early Riser Ave, Suite 111<br />
                  Land O' Lakes, FL 34638
                </p>
                <a
                  href="tel:+19138716500"
                  className="text-xs text-white/30 hover:text-white/50 transition-colors block"
                  data-testid="v2-link-phone"
                >
                  1-913-871-6500
                </a>
              </div>

              <ConnectButton onClick={() => setConnectOpen(true)} className="mt-7" />
            </div>
            {renderFooterColumn(footerColumns[0], "px-0")}
          </div>

          {/* right half — border-l lands exactly at container center, aligned with the page spine */}
          <div className="md:w-1/2 flex flex-wrap items-start gap-y-8 divide-x divide-white/[0.07] md:border-l md:border-white/[0.07]">
            {footerColumns.slice(1).map((col) =>
              renderFooterColumn(col, "noDivider" in col && col.noDivider ? "!border-l-0 px-8" : "px-8")
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.04] flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="h-8 w-8 text-white/40 hover:text-white/80"
            data-testid="v2-button-theme-toggle"
          >
            {themeIcon}
          </Button>
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Brandvious, Inc. All rights reserved.
          </p>
        </div>
      </div>

      <ConnectWidget open={connectOpen} onClose={() => setConnectOpen(false)} />
    </footer>
  );
}

function PartyLayer() {
  const { theme } = useTheme();
  if (theme !== "sparkle") return null;
  return <PartyAtmosphere />;
}

export default function HomeNew() {
  return (
    <div className="min-h-screen bg-[hsl(220,10%,4%)] text-white relative" data-testid="v2-page">
      <PartyLayer />
      <NoiseOverlay />
      <NewNavbar />
      <NewHero />
      <HowItWorksSection />
      <ExchangeSectionPremium />
      <QuoteSection text={focusQuote} testid="v2-section-quote" />
      <PartnerCTASection />
      <NewFooter />
    </div>
  );
}
