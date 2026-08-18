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

const glassCard = "backdrop-blur-sm bg-white/[0.03]";
const glassCardBorder = "border border-white/[0.07]";
const cardShadowBase = "shadow-[0_2px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]";

function PartyLayer() {
  const { theme } = useTheme();
  if (theme !== "sparkle") return null;
  return <PartyAtmosphere />;
}

function ProductsHero({ visible }: { visible: boolean }) {
  const { theme } = useTheme();
  const party = theme === "sparkle";

  return (
    <section className="relative px-6 pt-40 pb-20 overflow-hidden" data-testid="ppub-section-hero">
      <LightBeam party={party} />
      <FloatingParticles party={party} />
      <div
        className={`relative z-10 max-w-6xl mx-auto transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1
          className="text-4xl sm:text-5xl font-bold leading-[1.08] tracking-tight"
          data-testid="ppub-text-headline"
        >
          <span className="block text-white">The</span>
          <span
            className="block bg-clip-text text-transparent"
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

function ToolGrid({ visible }: { visible: boolean }) {
  return (
    <section className="relative pb-24 px-6" data-testid="ppub-section-grid">
      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {growthRocketTools.map((tool, i) => (
          <ToolCard key={tool.name} item={tool} visible={visible} delay={150 + i * 60} />
        ))}
      </div>
    </section>
  );
}

function BundleBand({ visible }: { visible: boolean }) {
  const { theme } = useTheme();
  const party = theme === "sparkle";

  return (
    <section className="relative py-20 px-6 border-t border-white/[0.06]" data-testid="ppub-section-bundle">
      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`relative rounded-2xl overflow-hidden p-8 md:p-12 ${glassCard} ${glassCardBorder} transition-all duration-1000 ${
            party
              ? "shadow-[0_2px_20px_rgba(0,0,0,0.3),0_0_40px_rgba(100,40,200,0.05),inset_0_1px_0_rgba(255,255,255,0.04)]"
              : cardShadowBase
          } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "350ms" }}
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
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(220,10%,4%)] text-white relative" data-testid="ppub-page">
      <PartyLayer />
      <NoiseOverlay />
      <NewNavbar />
      <ProductsHero visible={visible} />
      <ToolGrid visible={visible} />
      <BundleBand visible={visible} />
      <NewFooter />
    </div>
  );
}
