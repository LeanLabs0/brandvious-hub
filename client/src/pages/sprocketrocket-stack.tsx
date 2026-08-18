import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
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
// /sprocketrocket — temporary deal page for the SprocketRocket stack
// ---------------------------------------------------------------------------

function PartyLayer() {
  const { theme } = useTheme();
  if (theme !== "sparkle") return null;
  return <PartyAtmosphere />;
}

const includes = [
  "Core web stack deployment",
  "AI modules pre-installed",
  "Schema & structured data layer",
  "HubSpot & CRM connectors",
  "GrowthRocket-ready configuration",
  "Ongoing support & tokens included",
];

export default function SprocketRocketStack() {
  const { theme } = useTheme();
  const party = theme === "sparkle";
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(220,10%,4%)] text-white relative" data-testid="sprocket-page">
      <PartyLayer />
      <NoiseOverlay />
      <NewNavbar grBrand />

      {/* hero */}
      <section className="relative px-6 pt-40 pb-16 overflow-hidden" data-testid="sprocket-section-hero">
        <LightBeam party={party} />
        <FloatingParticles party={party} />
        <div
          className={`relative z-10 max-w-6xl mx-auto transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">SprocketRocket Stack</p>
          <h1
            className="text-6xl sm:text-7xl md:text-8xl font-bold leading-[1.05] tracking-tight max-w-4xl"
            data-testid="sprocket-text-headline"
          >
            <span className="text-white">Build bolder </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(160,120,255,0.55))",
              }}
            >
              with Stack.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-white/50 leading-relaxed">
            Stack gives you the essential components to launch fast,
            convert more, and scale without ever touching code.
          </p>
        </div>
      </section>

      {/* pricing hero — the "big deal" */}
      <section className="relative px-6 pb-20" data-testid="sprocket-section-pricing">
        <div className="max-w-6xl mx-auto">
          <div
            className={`relative rounded-2xl overflow-hidden backdrop-blur-sm bg-white/[0.03] border border-white/[0.07] transition-all duration-1000 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* top shimmer line */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(160,120,255,0.6), rgba(120,180,255,0.4), transparent)" }}
            />
            {/* glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(700px circle at 50% 0%, rgba(110,60,240,0.07), transparent 60%)",
              }}
            />

            <div className="relative z-10 flex flex-col md:flex-row md:items-stretch divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">

              {/* left — setup */}
              <div className="flex-1 p-10 md:p-14 flex flex-col justify-between gap-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/35 mb-6">Get started</p>
                  <div className="flex items-end gap-3 leading-none mb-2">
                    <span
                      className="text-[80px] sm:text-[100px] font-bold tracking-tight bg-clip-text text-transparent line-through decoration-white/30"
                      style={{
                        backgroundImage: "linear-gradient(160deg, rgba(255,255,255,0.4) 30%, rgba(180,140,255,0.3) 100%)",
                      }}
                    >
                      $997
                    </span>
                  </div>
                  <p className="text-white/55 text-sm mt-1">Now just $1 to launch a 5-day trial</p>
                  <p className="mt-5 text-white/55 text-sm leading-relaxed max-w-xs">
                    Start the full SprocketRocket stack for a dollar. No catch — just get it live.
                  </p>
                </div>
                <a
                  href="https://www.sprocketrocket.co/stack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-purple-300/25 bg-purple-400/[0.08] hover:bg-purple-400/[0.16] hover:border-purple-300/45 hover:shadow-[0_0_28px_rgba(140,80,255,0.2)] self-start"
                  data-testid="sprocket-button-start"
                >
                  Claim your stack <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* right — ongoing */}
              <div className="flex-1 p-10 md:p-14 flex flex-col justify-between gap-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/35 mb-6">Then monthly</p>
                  <div className="flex items-end gap-3 leading-none mb-2">
                    <span
                      className="text-[80px] sm:text-[100px] font-bold tracking-tight bg-clip-text text-transparent"
                      style={{
                        backgroundImage: "linear-gradient(160deg, rgba(255,255,255,1) 30%, rgba(180,140,255,0.65) 100%)",
                      }}
                    >
                      $97
                    </span>
                    <span className="text-white/30 text-xl mb-6">/mo</span>
                  </div>
                  <p className="text-white/40 text-sm mt-1">tokens & support included</p>
                  <ul className="mt-6 space-y-2.5">
                    {includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-white/55">
                        <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-white/30" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewFooter grBrand />
    </div>
  );
}
