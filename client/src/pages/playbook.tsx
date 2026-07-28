import { useMemo, useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { NewFooter } from "@/pages/home-new";
import { ArrowDown } from "lucide-react";
import waveGraphic from "@assets/0_AEO_agentcy_1785205874408.png";

// ---------------------------------------------------------------------------
// /playbook — The AEO Agentcy Model. Unlinked page for partners and team.
// ---------------------------------------------------------------------------

const b2bProperties = [
  { name: "Entities.org", url: "https://entities.org", role: "Verified company and product entities", accent: "purple" },
  { name: "AnswerStack", url: "https://answerstack.io", role: "Structured answers AI systems can cite", accent: "purple" },
  { name: "WhatIsBest", url: "https://whatisbest.com", role: "Editorial recommendations", accent: "purple" },
  { name: "ReviewInsight", url: "https://reviewinsight.com", role: "Reviews, comparisons, and buyer research", accent: "blue" },
  { name: "B2BIndex.org", url: "https://b2bindex.org", role: "Rankings and benchmarks across B2B", accent: "blue" },
  { name: "BestFit.org", url: "https://bestfit.org", role: "Best-fit guidance for real buying decisions", accent: "blue" },
];

const gtmProperties = [
  { name: "GTM Journal", role: "Founder interviews, industry news, original reporting" },
  { name: "GTM Review", role: "Reviews, comparisons, best-of lists, buyer's guides" },
  { name: "GTM Index", role: "Rankings, benchmarks, the annual State of GTM" },
  { name: "GTM 100", role: "The 100 most influential companies shaping go-to-market" },
  { name: "GTM Loop", role: "Methodology, frameworks, and commentary for revenue leaders" },
];

const flywheel = [
  { name: "r/B2Bstack", detail: "community signal · launches · stack debates" },
  { name: "Editorial Coverage", detail: "interviews · reporting · profiles" },
  { name: "Reviews & Comparisons", detail: "buyer research AI systems cite" },
  { name: "Rankings & Recognition", detail: "indexes · benchmarks · awards" },
  { name: "Knowledge Graph", detail: "verified entities · structured answers" },
  { name: "Certified Brandvious Partner", detail: "the introduction that closes the loop", highlight: true },
];

const contentLoop = [
  ["Community discussion", "an editorial story"],
  ["An interesting debate", "a review or comparison"],
  ["Popularity trends", "an index report"],
  ["Community favorites", "award nominations"],
];

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

function PlaybookNavbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        backdropFilter: "blur(20px) saturate(180%)",
        backgroundColor: "hsl(220 10% 4% / 0.75)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
      data-testid="playbook-navbar"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/" className="text-base font-semibold tracking-tight text-white" data-testid="playbook-link-home">
          Brandvious<span className="font-light text-white/60 ml-0.5">Digital</span>
        </a>
        <div className="flex items-center gap-6">
          <a href="/gtm" className="text-sm text-white/70 hover:text-white transition-colors hidden sm:block" data-testid="playbook-nav-gtm">Brandvious for GTM</a>
          <a href="/partners" className="text-sm text-white/70 hover:text-white transition-colors hidden sm:block" data-testid="playbook-nav-partners">Certified Partners</a>
        </div>
      </div>
    </nav>
  );
}

function PlaybookHero() {
  const { theme } = useTheme();
  const party = theme === "sparkle";

  return (
    <section className="relative min-h-[60vh] flex flex-col items-start justify-center px-6 pt-32 pb-16 overflow-hidden" data-testid="playbook-section-hero">
      <LightBeam party={party} />
      <FloatingParticles party={party} />
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>Playbook</p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight max-w-5xl animate-fade-in-up" style={{ animationDelay: "0.2s" }} data-testid="playbook-heading">
          The AEO{" "}
          <span className="whitespace-nowrap">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(160,120,255,0.75))",
              }}
            >
              Agentcy
            </span>{" "}
            Wave.
          </span>
        </h1>
        <p className="mt-8 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.3s" }} data-testid="playbook-text-intro">
          Inbound built one generation of agencies. RevOps built the next. The third wave is
          AEO: making clients the answer AI systems give, through{" "}
          <span className="text-white font-medium">platforms Brandvious owns</span>, published
          offsite without client delays and revisions.
        </p>
      </div>
    </section>
  );
}

const waves = [
  {
    label: "Wave 1",
    name: "Inbound",
    body: "Content and SEO on the client's site. It built the last generation of agencies, and it is saturated.",
  },
  {
    label: "Wave 2",
    name: "RevOps",
    body: "Systems, data, and process across the funnel. It built the current generation, and it is crowded.",
  },
  {
    label: "Wave 3",
    name: "The AEO Agentcy",
    body: "AI systems now answer the questions buyers used to search. Authority comes from what those systems can cite: editorial coverage, reviews, rankings, and verified entities. Brandvious owns that layer, and Certified Partners deliver it.",
    highlight: true,
  },
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function WaveSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative py-24 px-6 border-t border-white/[0.06]" data-testid="playbook-section-waves">
      <div className="max-w-6xl mx-auto relative z-10">
        <p className={`text-xs uppercase tracking-[0.2em] text-white/40 mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>The Opportunity</p>
        <h2 className={`text-3xl sm:text-4xl font-bold text-white tracking-tight max-w-3xl transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          It's not about how hard you row. It's about what boat you're in.
        </h2>
        <div className={`mt-12 rounded-2xl overflow-hidden border border-white/[0.08] transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <img
            src={waveGraphic}
            alt="Three waves of agency growth: Wave 1 Inbound, Wave 2 RevOps, Wave 3 Agentcy"
            className="w-full h-auto"
            data-testid="playbook-img-waves"
          />
        </div>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          {waves.map((w, i) => (
            <div 
              key={w.name} 
              data-testid={`playbook-wave-${w.label.replace(" ", "-").toLowerCase()}`}
              className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${300 + i * 150}ms` }}
            >
              <p className={`text-xs uppercase tracking-[0.2em] mb-3 ${w.highlight ? "text-purple-300/80" : "text-white/40"}`}>
                {w.label}
              </p>
              <h3 className="text-xl font-bold text-white tracking-tight">{w.name}</h3>
              <span
                className={`block mt-2 h-[2px] w-10 rounded-full ${w.highlight ? "bg-purple-300/80" : "bg-white/[0.25]"}`}
                aria-hidden="true"
              />
              <p className="mt-4 text-base text-white/55 leading-relaxed">{w.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyOffsiteSection() {
  const { ref, isVisible } = useScrollReveal();

  const points = [
    {
      title: "No client bottlenecks",
      body: "On-site content means approvals, delays, and revisions. Offsite editorial ships on our schedule, not the client's.",
    },
    {
      title: "Compounding authority",
      body: "Every interview, review, ranking, and entity adds another trusted reference AI systems can cite. The work compounds.",
    },
    {
      title: "Profitable and scalable",
      body: "Certified partners deliver AEO authority through the ecosystem, so results scale without scaling headcount or scope creep.",
    },
  ];

  return (
    <section ref={ref} className="relative py-24 px-6 border-t border-white/[0.06]" data-testid="playbook-section-why">
      <div className="max-w-6xl mx-auto relative z-10">
        <p className={`text-xs uppercase tracking-[0.2em] text-white/40 mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>The Perks</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {points.map((p, i) => (
            <div 
              key={p.title}
              className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${100 + i * 150}ms` }}
            >
              <h3 className="text-xl font-bold text-white tracking-tight">{p.title}</h3>
              <span className="block mt-2 h-[2px] w-10 rounded-full bg-purple-300/80" aria-hidden="true" />
              <p className="mt-4 text-base text-white/55 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function B2BLoopSection() {
  const { ref, isVisible } = useScrollReveal();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative py-24 px-6 border-t border-white/[0.06]" data-testid="playbook-section-b2b">
      <div className="max-w-6xl mx-auto relative z-10">
        <p className={`text-xs uppercase tracking-[0.2em] text-purple-300/70 mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>The B2B Loop</p>
        <h2 className={`text-3xl sm:text-4xl font-bold text-white tracking-tight max-w-3xl transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          The primary properties.
        </h2>
        <p className={`mt-5 text-lg text-white/60 max-w-2xl leading-relaxed transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          The core of the model is a B2B-wide editorial and knowledge layer. These properties work
          for any B2B category.
        </p>

        <div className="mt-14">
          {b2bProperties.map((p, i) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-baseline gap-6 sm:gap-10 py-6 transition-all duration-500 ${
                i > 0 ? "border-t border-white/[0.06]" : ""
              } ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"} ${
                hoveredIndex !== null && hoveredIndex !== i ? "opacity-40" : ""
              }`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
              data-testid={`playbook-b2b-${i}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="text-xs tabular-nums text-white/25 group-hover:text-purple-300/60 transition-all duration-300 w-6 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-white/80 group-hover:text-white tracking-tight transition-all duration-300 whitespace-nowrap group-hover:translate-x-1">
                {p.name}
              </span>
              <span
                className="hidden sm:block flex-1 border-b border-dotted border-white/[0.12] group-hover:border-purple-300/[0.3] transition-all duration-300 translate-y-[-6px]"
                aria-hidden="true"
              />
              <span className="text-sm text-white/40 group-hover:text-white/70 transition-colors text-right sm:text-left shrink min-w-0">
                {p.role}
              </span>
            </a>
          ))}
        </div>

        <div className={`mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "900ms" }}>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">The Community Signal</p>
            <p className="text-base text-white/55 leading-relaxed">
              <span className="text-white font-medium">r/B2Bstack</span> is where the market talks:
              founders share launches, buyers ask for recommendations, users compare products, and
              marketers post their stacks.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">The Content Loop</p>
            <ul className="space-y-2.5">
              {contentLoop.map(([from, to]) => (
                <li key={from} className="text-sm text-white/55 border-l border-white/[0.15] pl-4 leading-relaxed">
                  <span className="text-white/75">{from}</span> becomes {to}.
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlywheelSection() {
  const { ref, isVisible } = useScrollReveal();
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!isVisible) return;
    const timers = flywheel.map((_, i) =>
      window.setTimeout(() => {
        setVisibleSteps((prev) => (prev.includes(i) ? prev : [...prev, i]));
      }, 400 + i * 200),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [isVisible]);

  return (
    <section ref={ref} className="relative py-24 px-6 border-t border-white/[0.06]" data-testid="playbook-section-flywheel">
      <div className="max-w-6xl mx-auto relative z-10">
        <p className={`text-xs uppercase tracking-[0.2em] text-white/40 mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>The Flywheel</p>
        <h2 className={`text-3xl sm:text-4xl font-bold text-white tracking-tight max-w-3xl mb-14 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Community to consensus to introduction.
        </h2>
        <div className="max-w-md">
          {flywheel.map((step, i) => (
            <div key={step.name}>
              {i > 0 && (
                <div className="flex justify-center py-2">
                  <ArrowDown 
                    className={`w-4 h-4 text-white/25 transition-all duration-500 ${
                      visibleSteps.includes(i - 1) ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                    }`} 
                    aria-hidden="true" 
                  />
                </div>
              )}
              <div
                className={`rounded-xl px-6 py-4 text-center backdrop-blur-sm transition-all duration-700 ${
                  step.highlight
                    ? "border border-purple-300/30 bg-purple-400/[0.07]"
                    : "border border-white/[0.08] bg-white/[0.03]"
                } ${
                  visibleSteps.includes(i) ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
                }`}
                data-testid={`playbook-flywheel-${i}`}
              >
                <p className={`text-base font-semibold ${step.highlight ? "text-purple-200" : "text-white"}`}>
                  {step.name}
                </p>
                <p className="mt-1 text-xs text-white/40">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GtmLoopSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative py-24 px-6 border-t border-white/[0.06]" data-testid="playbook-section-gtm">
      <div className="max-w-6xl mx-auto relative z-10">
        <p className={`text-xs uppercase tracking-[0.2em] text-amber-300/70 mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>And Then</p>
        <h2 className={`text-3xl sm:text-4xl font-bold text-white tracking-tight max-w-3xl transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          A loop built specifically for GTM.
        </h2>
        <p className={`mt-5 text-lg text-white/60 max-w-2xl leading-relaxed transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Once the B2B layer is working, the same model goes deep on a single market: go-to-market
          software.
        </p>
        <div className="mt-12">
          {gtmProperties.map((p, i) => (
            <div
              key={p.name}
              className={`grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-8 py-4 transition-all duration-700 ${i > 0 ? "border-t border-white/[0.06]" : ""} ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
              data-testid={`playbook-gtm-${i}`}
            >
              <span className="text-base font-semibold text-white">{p.name}</span>
              <span className="text-sm text-white/50 leading-relaxed">{p.role}</span>
            </div>
          ))}
        </div>
        <a
          href="/gtm"
          className={`mt-10 inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.04] px-6 py-3 text-sm font-medium text-white/85 transition-all duration-700 hover:bg-white/[0.09] hover:text-white backdrop-blur-sm hover:scale-105 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "800ms" }}
          data-testid="playbook-link-gtm"
        >
          See Brandvious for GTM
        </a>
      </div>
    </section>
  );
}

function PartnerModelSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative py-24 px-6 border-t border-white/[0.06]" data-testid="playbook-section-partner">
      <div className="max-w-6xl mx-auto relative z-10">
        <p className={`text-xs uppercase tracking-[0.2em] text-white/40 mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>The Partner Model</p>
        <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight max-w-3xl transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, rgba(196,160,255,0.95), rgba(120,160,255,0.9))" }}
          >
            Build on platforms that drive AEO authority.
          </span>
        </h2>
        <p className={`mt-5 text-lg text-white/60 max-w-2xl leading-relaxed transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          As a Certified Brandvious Partner, you deliver AI authority for clients through the
          ecosystem — a highly profitable, scalable business without the delays and revisions of
          on-site client content.
        </p>
        <a
          href="/partners"
          className={`mt-10 inline-flex items-center gap-2 rounded-full border border-purple-300/25 bg-purple-400/[0.08] px-6 py-3 text-sm font-medium text-white/90 transition-all duration-700 hover:bg-purple-400/[0.15] hover:text-white backdrop-blur-sm hover:scale-105 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "300ms" }}
          data-testid="playbook-link-partners"
        >
          See Certified Partners
        </a>
      </div>
    </section>
  );
}

export default function Playbook() {
  return (
    <div className="min-h-screen bg-[hsl(220,10%,4%)] text-white relative" data-testid="playbook-page">
      <NoiseOverlay />
      <PlaybookNavbar />
      <PlaybookHero />
      <WaveSection />
      <B2BLoopSection />
      <FlywheelSection />
      <GtmLoopSection />
      <WhyOffsiteSection />
      <PartnerModelSection />
      <NewFooter />
    </div>
  );
}
