import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import {
  NewNavbar,
  NewFooter,
  NoiseOverlay,
  LightBeam,
  FloatingParticles,
  PartyAtmosphere,
} from "@/pages/home-new";
import { growthRocketTools, ToolCard } from "@/pages/products";

// ---------------------------------------------------------------------------
// /brandvious — frozen backup of the public homepage as it was before the
// GrowthRocket rebrand (Brandvious wordmark + original hero/statement/CTA copy)
// ---------------------------------------------------------------------------

function PartyLayer() {
  const { theme } = useTheme();
  if (theme !== "sparkle") return null;
  return <PartyAtmosphere />;
}

function BrandviousHero() {
  const { theme } = useTheme();
  const party = theme === "sparkle";
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex flex-col items-start justify-center px-6 pt-40 pb-28 overflow-hidden" data-testid="bv-section-hero">
      <LightBeam party={party} />
      <FloatingParticles party={party} />

      <div
        className={`relative z-10 max-w-6xl mx-auto w-full transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight max-w-5xl"
          data-testid="bv-text-headline"
        >
          <span className="text-white">Brandvious tools power </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(160,120,255,0.55))",
            }}
          >
            AI-native agencies.
          </span>
        </h1>
        <p className="mt-8 max-w-2xl text-base sm:text-lg text-white/50 leading-relaxed" data-testid="bv-text-subhead">
          Sell more, deliver faster, and scale without adding headcount.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-purple-300/25 bg-purple-400/[0.08] hover:bg-purple-400/[0.14] hover:border-purple-300/40 hover:shadow-[0_0_24px_rgba(140,80,255,0.18)]"
            data-testid="bv-button-explore-stack"
          >
            Explore the stack <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white/70 hover:text-white text-sm font-medium transition-all duration-300 border border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.05]"
            data-testid="bv-button-see-bundle"
          >
            See the bundle
          </a>
        </div>
      </div>
    </section>
  );
}

/** Cycles the final word of the stack headline; the period travels with the word. */
function FlipWord({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <span key={i} className="inline-block animate-flip-word">
        {words[i]}
      </span>
    </span>
  );
}

function StackSection() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative py-24 px-6 border-t border-white/[0.06]" data-testid="bv-section-stack">
      <div className="max-w-6xl mx-auto relative z-10">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">The GrowthRocket Stack</p>
        <h2 className="mb-12 whitespace-nowrap text-[clamp(1rem,2.45vw,1.875rem)] font-bold tracking-tight text-white">
          The GrowthRocket product suite is how{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(180,140,255,0.85), rgba(255,255,255,0.95))",
            }}
          >
            micro &ldquo;agentcies&rdquo;
          </span>{" "}
          <FlipWord words={["start.", "succeed.", "scale."]} />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {growthRocketTools.map((tool, i) => (
            <ToolCard key={tool.name} item={tool} visible={visible} delay={150 + i * 60} />
          ))}
        </div>
        <a
          href="/products"
          className="mt-8 inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
          data-testid="bv-link-full-stack"
        >
          See the full stack <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}

function BundleStatement() {
  return (
    <section className="relative py-28 px-6 border-t border-white/[0.06]" data-testid="bv-section-statement">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug tracking-tight">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.45))",
            }}
          >
            Growth Rocket drives wins for your clients and a scalable flow for your agentcy.
          </span>
        </p>
      </div>
    </section>
  );
}

function AgencyCTASection() {
  const { theme } = useTheme();
  const party = theme === "sparkle";

  return (
    <section className="relative border-t border-white/[0.06] px-6 py-20" data-testid="bv-section-agency-cta">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div
          className={`relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8 backdrop-blur-sm md:p-12 ${
            party
              ? "shadow-[0_2px_20px_rgba(0,0,0,0.3),0_0_40px_rgba(100,40,200,0.05),inset_0_1px_0_rgba(255,255,255,0.04)]"
              : "shadow-[0_2px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]"
          }`}
        >
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(160,120,255,0.5), rgba(120,180,255,0.35), transparent)" }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(600px circle at 0% 50%, rgba(110,60,240,0.08), transparent 55%), radial-gradient(500px circle at 100% 50%, rgba(60,120,255,0.06), transparent 55%)",
            }}
          />
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-purple-300/70">For agencies &amp; in-house teams</p>
              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                Become a{" "}
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
              href="/agentcy-model"
              className="inline-flex shrink-0 self-start rounded-full border border-purple-300/25 bg-purple-400/[0.08] px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-purple-300/40 hover:bg-purple-400/[0.14] hover:shadow-[0_0_24px_rgba(140,80,255,0.18)] md:self-auto"
              data-testid="bv-button-agency-model"
            >
              Learn the &ldquo;agentcy&rdquo; model <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomeBrandvious() {
  return (
    <div className="min-h-screen bg-[hsl(220,10%,4%)] text-white relative" data-testid="bv-page">
      <PartyLayer />
      <NoiseOverlay />
      <NewNavbar />
      <BrandviousHero />
      <StackSection />
      <BundleStatement />
      <AgencyCTASection />
      <NewFooter />
    </div>
  );
}
