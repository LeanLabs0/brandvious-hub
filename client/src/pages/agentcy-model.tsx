import { useEffect, useState } from "react";
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

const MEETING_EMBED_URL = "https://www.lean-labs.com/meetings/kevin930?embed=true";

function HubSpotMeetingEmbed() {
  return (
    <iframe
      src={MEETING_EMBED_URL}
      title="Book a Growth Call"
      className="min-h-[690px] w-full rounded-xl border-0"
      data-testid="agentcy-booking-calendar"
    />
  );
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
              &ldquo;Agentcies&rdquo; own the future.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/50 leading-relaxed" data-testid="agentcy-text-subhead">
            Agencies will shift into an &ldquo;agentcy&rdquo; model or go extinct.<br />
            The full Agentcy Growth Model drops soon.
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

      {/* Live booking calendar */}
      <section className="relative px-6 py-20" data-testid="agentcy-section-booking">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 shadow-[0_2px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm md:p-10">
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(160,120,255,0.5), rgba(120,180,255,0.35), transparent)" }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(620px circle at 0% 35%, rgba(110,60,240,0.08), transparent 58%), radial-gradient(560px circle at 100% 70%, rgba(60,120,255,0.06), transparent 58%)",
              }}
            />
            <div className="relative z-10 grid gap-10 lg:grid-cols-[0.3fr_0.7fr] lg:items-start">
              <div className="pt-2 lg:sticky lg:top-28">
                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-purple-300/70">Marketing Agencies Only:</p>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Book a{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(160,120,255,0.58))",
                    }}
                  >
                    Growth Call.
                  </span>
                </h2>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50 sm:text-base">
                  Our Head of Growth to discuss how your agency can grow and see what the agentcy model could unlock next.
                </p>
                <p className="mt-8 text-xs leading-relaxed text-white/35">
                  The calendar shows Kevin&apos;s live availability in your local timezone.
                </p>
                <a
                  href="https://www.lean-labs.com/meetings/kevin930"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-xs text-white/45 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/50"
                  data-testid="agentcy-booking-direct-link"
                >
                  Open the full booking page
                </a>
              </div>
              <div className="min-w-0 overflow-hidden rounded-xl border border-white/[0.08] bg-white">
                <HubSpotMeetingEmbed />
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewFooter grBrand />
    </div>
  );
}
