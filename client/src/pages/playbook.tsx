import { useMemo, useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { ConsensusGraph, type ConsensusRingNode } from "@/components/consensus-graph";
import { NewFooter } from "@/pages/home-new";
import waveGraphic from "@assets/aeo_wave_brandvious.png";

// ---------------------------------------------------------------------------
// /playbook: The AEO Agentcy Model. Unlinked page for partners and team.
// ---------------------------------------------------------------------------


const flywheelNodes = [
  { name: "r/B2Bstack", sub: "community signal \u00b7 launches \u00b7 stack debates" },
  { name: "AnswerStack.io", sub: "Q&A coverage AI systems cite" },
  { name: "G2, Trustpilot, etc", sub: "third-party reviews & ratings" },
  { name: "ReviewInsight.com", sub: "reviews & comparisons" },
  { name: "B2BIndex.com", sub: "rankings \u00b7 benchmarks \u00b7 recognition" },
  { name: "WhatIsBest.com", sub: "market position" },
  { name: "BestFit.org", sub: "buyer match and shortlists" },
  { name: "Entities.org", sub: "knowledge graph \u00b7 verified entities" },
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
          AEO &amp; AI: the <span className="text-white font-medium">"agentcy" model</span>{" "}
          delivers a value prop no one can duplicate for a service companies can't build alone.
        </p>
      </div>
    </section>
  );
}

const waves = [
  {
    label: "Wave 1 \u00b7 2010\u20132020",
    name: "Inbound Agency",
    stats: [
      { value: "$70B", label: "industry built on content and SEO" },
      { value: "-75%", label: "organic traffic and ROI over the last five years" },
    ],
    note: "Google rankings have never mattered less.",
  },
  {
    label: "Wave 2 \u00b7 2016\u20132025",
    name: "RevOps Agency",
    stats: [
      { value: "$5B", label: "market built in under a decade" },
      { value: "17%", label: "yearly growth, now being absorbed by AI agents" },
    ],
    note: "AI tools make RevOps easier than ever.",
  },
  {
    label: "Wave 3 \u00b7 2026 and on",
    name: "AEO Agentcy",
    stats: [
      { value: "$7B", label: "AEO market accelerating as we speak" },
      { value: "94%", label: "of buyers use AI to research companies" },
    ],
    note: "An offsite challenge brands can't solve themselves.",
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
    <section ref={ref} id="waves" className="relative py-24 px-6 border-t border-white/[0.06]" data-testid="playbook-section-waves">
      <div className="max-w-6xl mx-auto relative z-10">
        <p className={`text-xs uppercase tracking-[0.2em] text-white/40 mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>The Opportunity</p>
        <h2 className={`text-3xl sm:text-4xl font-bold text-white tracking-tight max-w-none transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="whitespace-nowrap">AI &amp; AEO is the marketing wave</span>{" "}
          <span className="whitespace-nowrap">of the next decade.</span>
        </h2>
        <div className={`mt-12 rounded-2xl overflow-hidden border border-white/[0.08] transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <img
            src={waveGraphic}
            alt="Three waves of agency growth: Wave 1 Inbound, Wave 2 RevOps, Wave 3 Agentcy"
            className="w-full h-auto"
            data-testid="playbook-img-waves"
          />
        </div>
        <p className={`mt-6 text-sm text-white/45 leading-relaxed transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} data-testid="playbook-text-buffett">
          "It's not about how hard you row. It's about what boat you're in."{" "}
          <span className="text-white/60">Warren Buffett</span>
        </p>
        <div id="wave-cards" className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
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
              <div className="mt-5 space-y-4">
                {w.stats.map((st) => (
                  <div key={st.value}>
                    <p className={`text-3xl font-bold tracking-tight ${w.highlight ? "text-purple-200" : "text-white"}`}>{st.value}</p>
                    <p className="mt-0.5 text-sm text-white/50">{st.label}</p>
                  </div>
                ))}
              </div>
              <p className={`mt-5 text-sm ${w.highlight ? "text-purple-200/80" : "text-white/50"}`}>{w.note}</p>
            </div>
          ))}
        </div>
        <p className={`mt-12 text-sm text-white/45 max-w-2xl leading-relaxed transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "750ms" }} data-testid="playbook-text-waveshift">
          Beyond a scalable vehicle of offsite publishing, the model moves the agency from a
          labor-based business to a logic-based business: incredibly scalable with a small team.
        </p>
      </div>
    </section>
  );
}

function WhyOffsiteSection() {
  const { ref, isVisible } = useScrollReveal();

  const points = [
    {
      title: "No more client revisions",
      body: "Off-site content removes client approvals, delays, and revisions.",
    },
    {
      title: "High retention MRR",
      body: "Off-site campaigns are predictable and profitable recurring revenue.",
    },
    {
      title: "Authority Multiplier Model",
      body: "As Brandvious B2B domains mature, results come faster for every brand involved.",
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

const consensusNodes: ConsensusRingNode[] = [
  { name: "Entities.org", sub: "Technical Registry", url: "https://entities.org" },
  { name: "AnswerStack", sub: "Q&A Authority", url: "https://answerstack.io" },
  { name: "LinkedIn", sub: "Business Identity", url: null, owner: "client" as const },
  { name: "WhatIsBest", sub: "Market Position", url: "https://whatisbest.com" },
  { name: "ReviewInsight", sub: "Review Intelligence", url: "https://reviewinsight.com" },
  { name: "G2", sub: "Review Authority", url: null, owner: "client" as const },
  { name: "B2BIndex.org", sub: "Ranking Authority", url: "https://b2bindex.org" },
  { name: "BestFit.org", sub: "Buyer Match", url: "https://bestfit.org" },
  { name: "Crunchbase", sub: "Funding Proof", url: null, owner: "client" as const },
  { name: "r/B2Bstack", sub: "Sentiment Signal", url: null },
];

function B2BLoopSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} id="b2b-loop" className="relative py-24 px-6 border-t border-white/[0.06]" data-testid="playbook-section-b2b">
      <div className="max-w-6xl mx-auto relative z-10">
        <p className={`text-xs uppercase tracking-[0.2em] text-purple-300/70 mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>The B2B Loop</p>
        <h2 className={`text-3xl sm:text-4xl font-bold text-white tracking-tight max-w-3xl transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          The primary properties.
        </h2>
        <p className={`mt-5 text-lg text-white/60 max-w-2xl leading-relaxed transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          The core of the model is a B2B-wide editorial and knowledge layer. These properties work
          for any B2B category.
        </p>

        <div
          className={`mt-14 transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"}`}
          style={{ transitionDelay: "300ms" }}
          data-testid="playbook-b2b-graph"
        >
          <ConsensusGraph ring={consensusNodes} />
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

function FlywheelWheel() {
  const W = 920;
  const H = 640;
  const cx = W / 2;
  const cy = H / 2;
  const R = 218;
  const accent = "#c4a0ff";

  const nodes = flywheelNodes.map((n, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / flywheelNodes.length;
    return { ...n, angle, x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) };
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="The Brandvious flywheel: properties around the ring, the Certified Brandvious Partner spinning the wheel at the center">
      {/* the wheel */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={1.2} strokeDasharray="2 6" />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={accent} strokeOpacity={0.12} strokeWidth={14} />

      {/* direction chevrons at midpoints between nodes */}
      {nodes.map((n, i) => {
        const mid = n.angle + Math.PI / flywheelNodes.length;
        const px = cx + R * Math.cos(mid);
        const py = cy + R * Math.sin(mid);
        const deg = (mid * 180) / Math.PI + 90;
        return (
          <path
            key={`chev-${i}`}
            d="M -3.5 -4.5 L 4.5 0 L -3.5 4.5"
            fill="none"
            stroke={accent}
            strokeOpacity={0.55}
            strokeWidth={1.6}
            strokeLinecap="round"
            transform={`translate(${px} ${py}) rotate(${deg})`}
          />
        );
      })}

      {/* orbiting momentum dots */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="26s" repeatCount="indefinite" />
        {Array.from({ length: 9 }).map((_, i) => {
          const a = (i * 2 * Math.PI) / 9;
          return (
            <circle
              key={`dot-${i}`}
              cx={cx + R * Math.cos(a)}
              cy={cy + R * Math.sin(a)}
              r={i % 3 === 0 ? 2.4 : 1.6}
              fill={accent}
              opacity={i % 3 === 0 ? 0.85 : 0.45}
            />
          );
        })}
      </g>

      {/* spokes from partner to each property */}
      {nodes.map((n, i) => (
        <line
          key={`spoke-${i}`}
          x1={cx}
          y1={cy}
          x2={n.x}
          y2={n.y}
          stroke={accent}
          strokeOpacity={0.14}
          strokeWidth={1}
          strokeDasharray="1.5 5"
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={`push-${i}`} r={1.5} fill={accent} opacity={0.6}>
          <animate attributeName="cx" values={`${cx};${n.x}`} dur={`${3 + (i % 3)}s`} begin={`${-i * 0.7}s`} repeatCount="indefinite" />
          <animate attributeName="cy" values={`${cy};${n.y}`} dur={`${3 + (i % 3)}s`} begin={`${-i * 0.7}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* property nodes on the ring */}
      {nodes.map((n, i) => {
        const lr = R + 36;
        const lx = cx + lr * Math.cos(n.angle);
        const ly = cy + lr * Math.sin(n.angle);
        const cos = Math.cos(n.angle);
        const anchor = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
        const above = Math.sin(n.angle) < 0;
        return (
          <g key={n.name} data-testid={`playbook-flywheel-${i}`}>
            <circle cx={n.x} cy={n.y} r={26} fill={accent} opacity={0.06} />
            <circle cx={n.x} cy={n.y} r={16} fill="none" stroke={accent} strokeOpacity={0.25} strokeWidth={1} />
            <rect x={n.x - 7} y={n.y - 7} width={14} height={14} rx={4.5} fill={accent} opacity={0.55} className="animate-constellation-twinkle" style={{ animationDelay: `${i * 0.5}s` }} />
            <text x={lx} y={above ? ly - 6 : ly + 4} textAnchor={anchor} fill="rgba(255,255,255,0.92)" fontSize={16} fontWeight={700} fontFamily="inherit">
              {n.name}
            </text>
            <text x={lx} y={above ? ly + 12 : ly + 22} textAnchor={anchor} fill="rgba(255,255,255,0.42)" fontSize={10.5} fontFamily="ui-monospace, monospace">
              {n.sub}
            </text>
          </g>
        );
      })}

      {/* the partner spinning the wheel */}
      <circle cx={cx} cy={cy} r={54} fill={accent} opacity={0.07} />
      <rect x={cx - 118} y={cy - 30} width={236} height={60} rx={14} fill="rgba(196,160,255,0.08)" stroke={accent} strokeOpacity={0.4} strokeWidth={1.2} />
      <text x={cx} y={cy + 4} textAnchor="middle" fill="#e6dcff" fontSize={13} fontWeight={400} fontFamily="inherit">
        Certified Partner Publishing
      </text>
    </svg>
  );
}

function FlywheelSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} id="flywheel" className="relative py-24 px-6 border-t border-white/[0.06]" data-testid="playbook-section-flywheel">
      <div className="max-w-6xl mx-auto relative z-10">
        <p className={`text-xs uppercase tracking-[0.2em] text-white/40 mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>The Consensus Flywheel</p>
        <h2 className={`text-3xl sm:text-4xl font-bold text-white tracking-tight max-w-3xl transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Properties Brandvious has already built.
        </h2>
        <p className={`mt-5 text-lg text-white/60 max-w-2xl leading-relaxed transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          The Brandvious model plugs brands into a validated publishing network for AEO
          authority, in a fraction of the time of manual outreach.
        </p>
        <div
          className={`mt-8 transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"}`}
          style={{ transitionDelay: "300ms" }}
          data-testid="playbook-flywheel-graph"
        >
          <FlywheelWheel />
        </div>
      </div>
    </section>
  );
}

const partnerInclusions = [
  "Certified Partner badge",
  "Listed in Partner Directory",
  "Partner onboarding",
  "Playbooks & publishing standards",
  "Partner support/mastermind",
  "Plug into Authority Domains",
  "25x faster than building your own",
  "AI analytics for clients",
];

function FlowStepIcon({ d, accent }: { d: string; accent: string }) {
  return (
    <span
      className="flex h-10 w-10 items-center justify-center rounded-full border"
      style={{ borderColor: `${accent}40`, backgroundColor: `${accent}0d` }}
    >
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" width={18} height={18} fill="none" stroke={accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    </span>
  );
}

function ProcessFlow({
  num,
  steps,
  accent,
}: {
  num: string;
  steps: Array<{ label: string; icon: string }>;
  accent: string;
}) {
  return (
    <div className="mt-8">
      <div className="flex items-start">
        {steps.map((s, i) => (
          <div key={s.label} className={`flex items-start ${i < steps.length - 1 ? "flex-1" : ""}`}>
            <div className="flex flex-col items-center gap-2">
              <FlowStepIcon d={s.icon} accent={accent} />
              <span className="text-xs text-white/60 whitespace-nowrap">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="relative mx-3 mt-5 h-px flex-1 min-w-6">
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: `repeating-linear-gradient(90deg, ${accent}4d 0 3px, transparent 3px 9px)` }}
                />
                <span
                  className="animate-flow-dot absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 -translate-x-1/2 rounded-full"
                  style={{ backgroundColor: accent, animationDelay: `${i * 1.3}s` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-white/30" style={{ fontFamily: "ui-monospace, monospace" }}>
        {num}
      </p>
    </div>
  );
}

function PartnerPricingSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} id="pricing" className="relative py-24 px-6 border-t border-white/[0.06]" data-testid="playbook-section-pricing">
      <div className="max-w-6xl mx-auto relative z-10">
        <p className={`text-xs uppercase tracking-[0.2em] text-purple-300/70 mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>Partner Network</p>

        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-8 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Brandvious Certified Partner Program
          </h2>
          <div className="md:text-right">
            <p className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              $2,500<span className="text-lg font-normal text-white/45"> / year</span>
            </p>
          </div>
        </div>

        <div className={`mt-10 h-px bg-white/[0.08] transition-all duration-1000 origin-left ${isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`} style={{ transitionDelay: "300ms" }} />

        {/* two ways to publish */}
        <div className={`mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "400ms" }}>
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-sm" data-testid="pricing-card-self-serve">
            <span className="inline-block rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-1 text-xs text-white/70">Self-serve</span>
            <p className="mt-8 text-5xl font-bold text-white tracking-tight">$25</p>
            <p className="mt-2 text-sm text-white/50">per approved article</p>
            <ProcessFlow
              num="01 · Self-serve"
              accent="#ffffff"
              steps={[
                { label: "Write", icon: "M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" },
                { label: "Submit", icon: "M22 2 11 13 M22 2l-7 20-4-9-9-4Z" },
                { label: "Published", icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M3 12h18 M12 3a14 14 0 0 1 0 18 M12 3a14 14 0 0 0 0 18" },
              ]}
            />
          </div>

          <div className="rounded-3xl border border-purple-300/30 bg-purple-400/[0.06] p-8 backdrop-blur-sm" data-testid="pricing-card-concierge">
            <span className="inline-block rounded-full border border-purple-300/25 bg-purple-400/[0.1] px-3 py-1 text-xs text-purple-200/90">Concierge</span>
            <p className="mt-8 text-5xl font-bold text-white tracking-tight">$250</p>
            <p className="mt-2 text-sm text-white/50">per article</p>
            <ProcessFlow
              num="02 · Concierge"
              accent="#c4a0ff"
              steps={[
                { label: "AI Interview", icon: "M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3Z M19 11a7 7 0 0 1-14 0 M12 18v3" },
                { label: "Outline", icon: "M8 6h13 M8 12h13 M8 18h13 M3.5 6h.01 M3.5 12h.01 M3.5 18h.01" },
                { label: "Published", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z M14 2v6h6 M9 14l2 2 4-4" },
              ]}
            />
          </div>
        </div>

        {/* everything included, one quiet line each */}
        <div className={`mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "700ms" }} data-testid="pricing-inclusions">
          {partnerInclusions.map((item) => (
            <div key={item} className="flex items-start gap-2.5 text-sm text-white/60">
              <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0" fill="none">
                <path d="M3 8.5 6.5 12 13 4.5" stroke="#c4a0ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* the network you plug into */}
        <h3 className={`mt-16 text-2xl sm:text-3xl font-bold text-white tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "750ms" }}>
          Included Tools &amp; Domains
        </h3>
        <div className={`mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "800ms" }} data-testid="pricing-network-cards">
          {[
            {
              eyebrow: "Infrastructure",
              accent: "#8ea2ff",
              title: "Authority Tools",
              blurb: "75% off for partners.",
              items: [
                { name: "SchemaRocket.ai", url: "https://schemarocket.ai" },
                { name: "SurveyRocket.ai", url: "https://surveyrocket.ai" },
                { name: "ReputationRocket.ai", url: "https://reputationrocket.ai" },
              ],
            },
            {
              eyebrow: "Knowledge Graph",
              accent: "#c4a0ff",
              title: "Authority Domain Profiles",
              blurb: "Offsite brand validation & answer citation.",
              items: [
                { name: "AnswerStack.io", url: "https://answerstack.io" },
                { name: "Entities.org", url: "https://entities.org" },
                { name: "ReviewInsight.com", url: "https://reviewinsight.com" },
              ],
            },
            {
              eyebrow: "B2B Publications",
              accent: "#f0c470",
              title: "B2B Consensus",
              blurb: "Authority Domains LLMs cite and recommend.",
              items: [
                { name: "B2BIndex.org", url: "https://b2bindex.org" },
                { name: "BestFit.org", url: "https://bestfit.org" },
                { name: "WhatisBest.com", url: "https://whatisbest.com" },
              ],
            },
          ].map((card) => (
            <div key={card.title} className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: `${card.accent}b3` }}>
                {card.eyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-bold text-white tracking-tight">{card.title}</h3>
              <p className="mt-1.5 text-sm text-white/50">{card.blurb}</p>
              <ul className="mt-6">
                {card.items.map((item) => {
                  const row = (
                    <span className="flex items-center justify-between border-t border-white/[0.06] py-3.5 text-sm text-white/75">
                      <span>{item.name}</span>
                      <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17 17 7 M9 7h8v8" />
                      </svg>
                    </span>
                  );
                  return (
                    <li key={item.name}>
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-white">
                          {row}
                        </a>
                      ) : (
                        row
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* closing banner */}
        <div
          className={`mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-3xl border border-purple-300/25 bg-purple-400/[0.07] px-8 py-8 md:px-10 backdrop-blur-sm transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "900ms" }}
          data-testid="pricing-banner"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-purple-200/60">The Partner Model</p>
            <p className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Explore the Certified Partner Program.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="/partners"
              className="inline-flex items-center justify-center rounded-full border border-purple-300/25 bg-purple-400/[0.12] px-6 py-3 text-sm font-medium text-white/90 transition-all hover:bg-purple-400/[0.2] hover:text-white hover:scale-105"
              data-testid="pricing-link-partners"
            >
              See Certified Partners
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.04] px-6 py-3 text-sm font-medium text-white/85 transition-all hover:bg-white/[0.09] hover:text-white hover:scale-105"
              data-testid="pricing-link-book-call"
            >
              Book a Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Playbook() {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "instant" as ScrollBehavior }), 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(220,10%,4%)] text-white relative" data-testid="playbook-page">
      <NoiseOverlay />
      <PlaybookNavbar />
      <PlaybookHero />
      <WaveSection />
      <B2BLoopSection />
      <FlywheelSection />
      <WhyOffsiteSection />
      <PartnerPricingSection />
      <NewFooter />
    </div>
  );
}
