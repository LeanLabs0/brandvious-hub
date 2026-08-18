import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import {
  NewNavbar,
  NewFooter,
  NoiseOverlay,
  LightBeam,
  FloatingParticles,
  PartyAtmosphere,
  PartnerCTASection,
} from "@/pages/home-new";
import { growthRocketTools } from "@/pages/products";

const glassCard = "backdrop-blur-sm bg-white/[0.03]";
const glassCardBorder = "border border-white/[0.07]";
const glassCardHover = "hover:bg-white/[0.06] hover:border-white/[0.14]";
const cardShadowBase = "shadow-[0_2px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]";
const cardShadowHover = "hover:shadow-[0_8px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.06)]";
const cardShadowParty = "hover:shadow-[0_8px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(100,40,200,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]";

function PartyLayer() {
  const { theme } = useTheme();
  if (theme !== "sparkle") return null;
  return <PartyAtmosphere />;
}

function PublicHero() {
  const { theme } = useTheme();
  const party = theme === "sparkle";
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex flex-col items-start justify-center px-6 pt-40 pb-28 overflow-hidden" data-testid="pub-section-hero">
      <LightBeam party={party} />
      <FloatingParticles party={party} />

      <div
        className={`relative z-10 max-w-6xl mx-auto w-full transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight max-w-5xl"
          data-testid="pub-text-headline"
        >
          <span className="text-white">Tools that make AI </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(160,120,255,0.55))",
            }}
          >
            recommend your brand.
          </span>
        </h1>
        <p className="mt-8 max-w-2xl text-base sm:text-lg text-white/50 leading-relaxed" data-testid="pub-text-subhead">
          GrowthRocket is the AEO toolstack by Brandvious Digital: schema, surveys,
          reputation, and answer content that give engines like ChatGPT, Gemini, and
          Perplexity a reason to cite you.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-purple-300/25 bg-purple-400/[0.08] hover:bg-purple-400/[0.14] hover:border-purple-300/40 hover:shadow-[0_0_24px_rgba(140,80,255,0.18)]"
            data-testid="pub-button-explore-stack"
          >
            Explore the stack <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white/70 hover:text-white text-sm font-medium transition-all duration-300 border border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.05]"
            data-testid="pub-button-see-bundle"
          >
            See the bundle
          </a>
        </div>
      </div>
    </section>
  );
}

function StackSection() {
  const { theme } = useTheme();
  const party = theme === "sparkle";

  return (
    <section className="relative py-24 px-6 border-t border-white/[0.06]" data-testid="pub-section-stack">
      <div className="max-w-6xl mx-auto relative z-10">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">The GrowthRocket Stack</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-12 max-w-2xl">
          Eight tools. Every one builds the same signal:{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(180,140,255,0.85), rgba(255,255,255,0.95))",
            }}
          >
            trust AI can cite.
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {growthRocketTools.map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative rounded-2xl overflow-hidden p-6 transition-all duration-500 transform hover:-translate-y-1 ${glassCard} ${glassCardBorder} ${glassCardHover} ${cardShadowBase} ${party ? cardShadowParty : cardShadowHover}`}
              data-testid={`pub-tool-${tool.name.toLowerCase().replace(/[\s.]/g, "-")}`}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-purple-300/80">
                  <tool.icon className="w-4 h-4" />
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 transition-colors" />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">{tool.category}</p>
              <h3 className="text-base font-semibold text-white mb-1">
                {tool.name}
                {tool.sup && <sup className="text-[9px] text-purple-300/70 ml-0.5">{tool.sup}</sup>}
              </h3>
              <p className="text-xs text-white/45">{tool.tag}</p>
            </a>
          ))}
        </div>
        <a
          href="/products"
          className="mt-8 inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
          data-testid="pub-link-full-stack"
        >
          See the full stack <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}

function BundleStatement() {
  return (
    <section className="relative py-28 px-6 border-t border-white/[0.06]" data-testid="pub-section-statement">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug tracking-tight">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.45))",
            }}
          >
            Run the full stack, and every AI engine hears the same trusted story about your brand.
          </span>
        </p>
      </div>
    </section>
  );
}

export default function HomePublic() {
  return (
    <div className="min-h-screen bg-[hsl(220,10%,4%)] text-white relative" data-testid="pub-page">
      <PartyLayer />
      <NoiseOverlay />
      <NewNavbar />
      <PublicHero />
      <StackSection />
      <BundleStatement />
      <PartnerCTASection />
      <NewFooter />
    </div>
  );
}
