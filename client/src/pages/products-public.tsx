import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { NewNavbar, NewFooter, NoiseOverlay, PartyAtmosphere } from "@/pages/home-new";
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

function ProductsHero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative px-6 pt-40 pb-20 overflow-hidden" data-testid="ppub-section-hero">
      <div
        className={`relative z-10 max-w-6xl mx-auto transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Products</p>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight max-w-4xl"
          data-testid="ppub-text-headline"
        >
          <span className="text-white">The </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(160,120,255,0.55))",
            }}
          >
            GrowthRocket Stack.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/50 leading-relaxed" data-testid="ppub-text-subhead">
          Eight AEO tools with one job: make AI understand, trust, and recommend your
          brand. Run any tool on its own, or run the whole stack as the GrowthRocket Bundle.
        </p>
      </div>
    </section>
  );
}

function ToolGrid() {
  const { theme } = useTheme();
  const party = theme === "sparkle";

  return (
    <section className="relative pb-24 px-6" data-testid="ppub-section-grid">
      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        {growthRocketTools.map((tool, i) => (
          <a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative rounded-2xl overflow-hidden p-8 transition-all duration-500 transform hover:-translate-y-1 ${glassCard} ${glassCardBorder} ${glassCardHover} ${cardShadowBase} ${party ? cardShadowParty : cardShadowHover}`}
            data-testid={`ppub-card-${tool.name.toLowerCase().replace(/[\s.]/g, "-")}`}
          >
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(160,120,255,0.4), transparent)" }}
            />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <span className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-purple-300/80">
                  <tool.icon className="w-5 h-5" />
                </span>
                <span className="text-xs font-mono text-white/20">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">{tool.category}</p>
              <h2 className="text-xl font-semibold text-white mb-1">
                {tool.name}
                {tool.sup && <sup className="text-[10px] text-purple-300/70 ml-0.5">{tool.sup}</sup>}
              </h2>
              <p className="text-sm text-white/70 font-medium mb-2">{tool.tag}</p>
              <p className="text-sm text-white/45 leading-relaxed mb-6">{tool.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-xs text-white/35 group-hover:text-white/70 transition-colors">
                {tool.domain} <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function BundleBand() {
  const { theme } = useTheme();
  const party = theme === "sparkle";

  return (
    <section className="relative py-20 px-6 border-t border-white/[0.06]" data-testid="ppub-section-bundle">
      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`relative rounded-2xl overflow-hidden p-8 md:p-12 ${glassCard} ${glassCardBorder} ${cardShadowBase} ${
            party ? "shadow-[0_2px_20px_rgba(0,0,0,0.3),0_0_40px_rgba(100,40,200,0.05),inset_0_1px_0_rgba(255,255,255,0.04)]" : ""
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
              <p className="text-xs uppercase tracking-[0.2em] text-purple-300/70 mb-3">GrowthRocket Bundle</p>
              <h2 className="text-xl sm:text-2xl font-semibold text-white">
                The full stack, one plan.{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg, rgba(190,150,255,0.95), rgba(140,180,255,0.9))",
                  }}
                >
                  One story AI can trust.
                </span>
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-purple-300/25 bg-purple-400/[0.08] hover:bg-purple-400/[0.14] hover:border-purple-300/40 hover:shadow-[0_0_24px_rgba(140,80,255,0.18)]"
                data-testid="ppub-button-see-pricing"
              >
                See pricing <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/partners"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white/70 hover:text-white text-sm font-medium transition-all duration-300 border border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.05]"
                data-testid="ppub-button-partners"
              >
                Become a partner
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProductsPublic() {
  return (
    <div className="min-h-screen bg-[hsl(220,10%,4%)] text-white relative" data-testid="ppub-page">
      <PartyLayer />
      <NoiseOverlay />
      <NewNavbar />
      <ProductsHero />
      <ToolGrid />
      <BundleBand />
      <NewFooter />
    </div>
  );
}
