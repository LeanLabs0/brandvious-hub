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

// ---------------------------------------------------------------------------
// /agentcy-model — placeholder teaser for the Agentcy Partner Program
// ---------------------------------------------------------------------------

function PartyLayer() {
  const { theme } = useTheme();
  if (theme !== "sparkle") return null;
  return <PartyAtmosphere />;
}

export default function AgentcyModel() {
  const { theme } = useTheme();
  const party = theme === "sparkle";
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(220,10%,4%)] text-white relative" data-testid="agentcy-page">
      <PartyLayer />
      <NoiseOverlay />
      <NewNavbar grBrand />

      {/* hero */}
      <section className="relative px-6 pt-40 pb-10 overflow-hidden" data-testid="agentcy-section-hero">
        <LightBeam party={party} />
        <FloatingParticles party={party} />
        <div
          className={`relative z-10 max-w-6xl mx-auto transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">The Agentcy Partner Program</p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight max-w-4xl"
            data-testid="agentcy-text-headline"
          >
            <span className="text-white">Agencies had a good run. </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(160,120,255,0.55))",
              }}
            >
              Agentcies run on AI.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/50 leading-relaxed" data-testid="agentcy-text-subhead">
            A new kind of agency: AI-native, productized, and powered by the
            GrowthRocket stack. The full model drops soon.
          </p>
        </div>
      </section>

      {/* wave graphic — blended into the page background with an elliptical edge fade */}
      <section className="relative px-6 py-10" data-testid="agentcy-section-waves">
        <div
          className={`max-w-6xl mx-auto relative transition-all duration-1000 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div
            className="absolute inset-0 pointer-events-none blur-[100px]"
            style={{
              background: "radial-gradient(ellipse at 30% 50%, rgba(120,60,255,0.10), transparent 60%)",
            }}
          />
          <img
            src="/waves-agentcy.png"
            alt="Three waves of go-to-market: Wave 1 Inbound, Wave 2 RevOps, Wave 3 Agentcy"
            className="relative w-full h-auto"
            style={{
              maskImage: "radial-gradient(ellipse 92% 88% at 50% 50%, black 55%, transparent 98%)",
              WebkitMaskImage: "radial-gradient(ellipse 92% 88% at 50% 50%, black 55%, transparent 98%)",
            }}
            data-testid="agentcy-img-waves"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-6" data-testid="agentcy-section-cta">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="relative rounded-2xl overflow-hidden p-8 md:p-12 backdrop-blur-sm bg-white/[0.03] border border-white/[0.07] shadow-[0_2px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(160,120,255,0.5), rgba(120,180,255,0.35), transparent)" }}
            />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-white">
                Ready to run{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg, rgba(190,150,255,0.95), rgba(140,180,255,0.9))",
                  }}
                >
                  the Agentcy model?
                </span>
              </h2>
              <a
                href="/partners"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-purple-300/25 bg-purple-400/[0.08] hover:bg-purple-400/[0.14] hover:border-purple-300/40 hover:shadow-[0_0_24px_rgba(140,80,255,0.18)] shrink-0 self-start md:self-auto"
                data-testid="agentcy-button-become-partner"
              >
                Become a Certified GrowthRocket Partner <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <NewFooter grBrand />
    </div>
  );
}
