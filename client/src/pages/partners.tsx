import { useState, useEffect, useMemo } from "react";
import {
  ArrowRight,
  Sun,
  Moon,
  Sparkles,
  Check,
  Award,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { NewFooter } from "@/pages/home-new";
import leanLabsLogo from "@/assets/partner-logos/lean-labs.svg";
import getGrowthLogo from "@/assets/partner-logos/get-growth.svg";
import digitalMomentumLogo from "@/assets/partner-logos/digital-momentum.svg";
import smartBugLogo from "@/assets/partner-logos/smartbug.svg";
import impulseCreativeLogo from "@/assets/partner-logos/impulse-creative.svg";

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const hero = {
  eyebrow: "Partner Network",
  headlineWhite: "Brandvious publishes exclusively",
  headlineGradient: "through certified partners.",
};

type PartnerTier = "flagship" | "growth" | "certified";

const tierStyles: Record<PartnerTier, { label: string; color: string; ring: string }> = {
  flagship: {
    label: "Founding AEO Partner",
    color: "text-amber-300",
    ring: "border-amber-300/25 bg-amber-300/[0.06]",
  },
  growth: {
    label: "Growth Partner",
    color: "text-emerald-300",
    ring: "border-emerald-300/25 bg-emerald-300/[0.06]",
  },
  certified: {
    label: "Certified Partner",
    color: "text-blue-300",
    ring: "border-blue-300/25 bg-blue-300/[0.06]",
  },
};

const partners: { name: string; tier: PartnerTier; description: string; logo: string; url: string }[] = [
  {
    name: "Lean Labs",
    tier: "flagship",
    description: "AI Authority • HubSpot • Websites",
    logo: leanLabsLogo,
    url: "https://www.lean-labs.com",
  },
  {
    name: "Digital Momentum",
    tier: "certified",
    description: "B2B Marketing • HubSpot",
    logo: digitalMomentumLogo,
    url: "https://www.digitalmomentum.com",
  },
  {
    name: "Impulse Creative",
    tier: "certified",
    description: "Brand • HubSpot • GTM",
    logo: impulseCreativeLogo,
    url: "https://impulsecreative.com",
  },
  {
    name: "Get Growth",
    tier: "growth",
    description: "Growth Strategy • Demand Gen • GTM",
    logo: getGrowthLogo,
    url: "https://www.getgrowth.com",
  },
  {
    name: "SmartBug Media",
    tier: "certified",
    description: "Marketing • CRM • RevOps",
    logo: smartBugLogo,
    url: "https://www.smartbugmedia.com",
  },
];

const partnerBenefits = [
  "Brandvious certification",
  "Editorial collaboration",
  "Research participation",
  "Authority resources",
  "Client referrals",
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
      data-testid="noise-overlay"
    />
  );
}

function LightBeam({ party }: { party: boolean }) {
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

function PartnersNavbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        backdropFilter: "blur(20px) saturate(180%)",
        backgroundColor: "hsl(220 10% 4% / 0.75)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
      data-testid="partners-navbar"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/" className="text-base font-semibold tracking-tight text-white" data-testid="partners-link-home">
          Brandvious<span className="font-light text-white/60 ml-0.5">Digital</span>
        </a>
        <div className="flex items-center gap-6">
          <a href="/new" className="text-sm text-white/70 hover:text-white transition-colors hidden sm:block" data-testid="partners-nav-how">How Brandvious Works</a>
        </div>
      </div>
    </nav>
  );
}

function PartnersHero() {
  const { theme } = useTheme();
  const party = theme === "sparkle";
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-[75vh] flex flex-col items-start justify-center px-6 pt-32 pb-16 overflow-hidden" data-testid="partners-section-hero">
      <LightBeam party={party} />
      <FloatingParticles party={party} />

      <div
        className={`relative z-10 max-w-6xl mx-auto w-full transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6">{hero.eyebrow}</p>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight max-w-4xl"
          data-testid="partners-text-headline"
        >
          <span className="text-white">{hero.headlineWhite} </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.35))",
            }}
          >
            {hero.headlineGradient}
          </span>
        </h1>

        <p className="mt-8 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed" data-testid="partners-text-intro">
          Our partner model ensures only{" "}
          <span className="text-white font-medium">original, authoritative, trustworthy content</span>{" "}
          is published on our domains.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#featured-partners"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.20] hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            data-testid="partners-button-featured"
          >
            Find a Partner <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#become-a-partner"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.08] text-white/70 text-sm font-medium hover:border-white/[0.16] hover:text-white transition-all duration-300"
            data-testid="partners-button-apply"
          >
            Become a Partner <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <p
          className="mt-10 text-sm max-w-2xl leading-relaxed border-l pl-4"
          style={{ borderColor: "rgba(160,120,255,0.4)" }}
        >
          <span className="text-white/60">
            Every Certified Brandvious Partner meets our standards for{" "}
            <span className="text-white/85">expertise, quality, and execution</span>.
          </span>
        </p>
      </div>
    </section>
  );
}

function PartnerCard({ partner, index, featured }: { partner: typeof partners[0]; index: number; featured?: boolean }) {
  const { theme } = useTheme();
  const party = theme === "sparkle";
  const tier = tierStyles[partner.tier];

  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block relative rounded-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-0.5 cursor-pointer ${glassCard} ${glassCardBorder} ${glassCardHover} ${cardShadowBase} ${party ? cardShadowParty : cardShadowHover} ${
        featured ? "p-10 md:p-12" : "p-8"
      }`}
      data-testid={`partners-card-${index}`}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
      />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4 mb-5">
          <img
            src={partner.logo}
            alt={`${partner.name} logo`}
            className={`w-auto object-contain object-left opacity-90 ${featured ? "h-9" : "h-7"}`}
            style={{ filter: "brightness(0) invert(1)" }}
            data-testid={`partners-logo-${index}`}
          />
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium shrink-0 ${tier.ring} ${tier.color}`}
            data-testid={`partners-tier-${index}`}
          >
            <Award className="w-3 h-3" />
            {tier.label}
          </span>
        </div>
        <h3 className={`flex items-center gap-2 font-semibold text-white mb-2 ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          {partner.name}
          <ExternalLink className={`text-white/25 group-hover:text-white/70 transition-colors ${featured ? "w-5 h-5" : "w-4 h-4"}`} />
        </h3>
        <p className={`text-white/55 leading-relaxed ${featured ? "text-base max-w-lg" : "text-sm"}`}>
          {partner.description}
        </p>
      </div>
    </a>
  );
}

function FeaturedPartnersSection() {
  const flagship = partners.filter((p) => p.tier === "flagship");
  const rest = partners.filter((p) => p.tier !== "flagship");

  return (
    <section id="featured-partners" className="relative py-24 px-6 border-t border-white/[0.06] scroll-mt-16" data-testid="partners-section-featured">
      <div className="max-w-6xl mx-auto relative z-10">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-10">Featured Partners</p>

        <div className="space-y-4">
          {flagship.map((p) => (
            <PartnerCard key={p.name} partner={p} index={partners.indexOf(p)} featured />
          ))}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rest.map((p) => (
              <PartnerCard key={p.name} partner={p} index={partners.indexOf(p)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BecomePartnerSection() {
  const { theme } = useTheme();
  const party = theme === "sparkle";

  return (
    <section id="become-a-partner" className="relative py-24 px-6 border-t border-white/[0.06] scroll-mt-16" data-testid="partners-section-become">
      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`relative rounded-2xl overflow-hidden p-8 md:p-12 ${glassCard} ${glassCardBorder} ${cardShadowBase} ${
            party ? "shadow-[0_2px_20px_rgba(0,0,0,0.3),0_0_40px_rgba(100,40,200,0.04),inset_0_1px_0_rgba(255,255,255,0.04)]" : ""
          }`}
        >
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Join the Network</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                Become a{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.35))",
                  }}
                >
                  Certified Partner.
                </span>
              </h2>
              <p className="text-sm text-white/55 leading-relaxed mb-8">
                Partners are selected based on expertise, quality, and alignment with
                Brandvious editorial standards.
              </p>
              <a
                href="mailto:hello@brandvious.com?subject=Certified%20Brandvious%20Partner%20Application"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.20] hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                data-testid="partners-button-apply-cta"
              >
                Apply for certification <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-5">Certification Includes</p>
              <ul className="space-y-3.5">
                {partnerBenefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-white/70">
                    <Check className="w-4 h-4 text-white/35 shrink-0" />
                    <span className="text-sm sm:text-base">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartyLayer() {
  const { theme } = useTheme();
  if (theme !== "sparkle") return null;
  return <PartyAtmosphere />;
}

export default function Partners() {
  return (
    <div className="min-h-screen bg-[hsl(220,10%,4%)] text-white relative" data-testid="partners-page">
      <PartyLayer />
      <NoiseOverlay />
      <PartnersNavbar />
      <PartnersHero />
      <FeaturedPartnersSection />
      <BecomePartnerSection />
      <NewFooter />
    </div>
  );
}
