import { useMemo, useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { NewFooter } from "@/pages/home-new";
import waveGraphic from "@assets/aeo_wave_brandvious.png";

// ---------------------------------------------------------------------------
// /playbook: The AEO Agentcy Model. Unlinked page for partners and team.
// ---------------------------------------------------------------------------


const flywheelNodes = [
  { name: "r/B2Bstack", sub: "community signal \u00b7 launches \u00b7 stack debates" },
  { name: "AnswerStack", sub: "Q&A coverage AI systems cite" },
  { name: "ReviewInsight + WhatIsBest", sub: "reviews & comparisons" },
  { name: "B2BIndex.org", sub: "rankings \u00b7 benchmarks \u00b7 recognition" },
  { name: "Entities.org", sub: "knowledge graph \u00b7 verified entities" },
  { name: "BestFit.org", sub: "buyer match and shortlists" },
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
          AEO: the agentcy with a value prop no one can duplicate,{" "}
          <span className="text-white font-medium">offsite authority</span> in a fraction of
          the time a company could build it alone.
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
          <span className="whitespace-nowrap">AEO is the marketing wave</span>{" "}
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

const consensusNodes = [
  { name: "Entities.org", sub: "Technical Registry", url: "https://entities.org" },
  { name: "AnswerStack", sub: "Q&A Authority", url: "https://answerstack.io" },
  { name: "LinkedIn", sub: "Business Identity", url: null },
  { name: "WhatIsBest", sub: "Market Position", url: "https://whatisbest.com" },
  { name: "ReviewInsight", sub: "Review Intelligence", url: "https://reviewinsight.com" },
  { name: "G2", sub: "Review Authority", url: null },
  { name: "B2BIndex.org", sub: "Ranking Authority", url: "https://b2bindex.org" },
  { name: "Crunchbase", sub: "Funding Proof", url: null },
  { name: "BestFit.org", sub: "Buyer Match", url: "https://bestfit.org" },
  { name: "r/B2Bstack", sub: "Sentiment Signal", url: null },
];

const CONSENSUS_ACCENT = "#8ea2ff";

const gtmConsensusNodes = [
  { name: "GTM Journal", sub: "Original Reporting", url: null },
  { name: "GTM Review", sub: "Review Authority", url: null },
  { name: "LinkedIn", sub: "Business Identity", url: null },
  { name: "GTM Index", sub: "Ranking Authority", url: null },
  { name: "G2", sub: "Review Authority", url: null },
  { name: "GTM 100", sub: "Flagship Recognition", url: null },
  { name: "Crunchbase", sub: "Funding Proof", url: null },
  { name: "GTM Loop", sub: "Methodology", url: null },
];

type ConsensusRingNode = { name: string; sub: string; url: string | null };

function ConsensusGraph({
  ring = consensusNodes,
  accent = CONSENSUS_ACCENT,
  centerLabel = "Your Brand",
}: {
  ring?: ConsensusRingNode[];
  accent?: string;
  centerLabel?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  const W = 850;
  const H = 560;
  const cx = W / 2;
  const cy = H / 2;

  const nodes = useMemo(
    () =>
      ring.map((n, i) => {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / ring.length;
        return {
          ...n,
          x: cx + Math.cos(angle) * 290,
          y: cy + Math.sin(angle) * 210,
        };
      }),
    [ring, cx, cy],
  );

  const edges = useMemo(() => {
    const out: Array<[number, number]> = [];
    for (let a = 0; a < nodes.length; a++)
      for (let b = a + 1; b < nodes.length; b++) out.push([a, b]);
    return out;
  }, [nodes]);

  const totalLinks = edges.length + nodes.length;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label="Consensus network of Brandvious B2B properties, all cross-linked"
      data-testid="playbook-consensus-graph"
    >
      {/* ring edges */}
      {edges.map(([a, b], i) => {
        const active = hovered !== null && (hovered === a || hovered === b);
        const dimmed = hovered !== null && !active;
        const dur = 10.5 + ((i * 13) % 9) * 1.5;
        return (
          <g key={i}>
            <line
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke={accent}
              strokeWidth={active ? 1.2 : 0.7}
              strokeDasharray="1.5 5"
              opacity={active ? 0.85 : dimmed ? 0.06 : 0.22}
              style={{ transition: "opacity 300ms" }}
            />
            <circle r={1.4} fill={accent} opacity={dimmed ? 0.08 : active ? 0.9 : 0.55} style={{ transition: "opacity 300ms" }}>
              <animate
                attributeName="cx"
                values={`${nodes[a].x};${nodes[b].x};${nodes[a].x}`}
                dur={`${dur}s`}
                begin={`${-((i * 0.37) % dur)}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values={`${nodes[a].y};${nodes[b].y};${nodes[a].y}`}
                dur={`${dur}s`}
                begin={`${-((i * 0.37) % dur)}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}

      {/* spokes to the brand in the middle */}
      {nodes.map((n, i) => {
        const active = hovered === i;
        const dimmed = hovered !== null && !active;
        const dur = 7.5 + ((i * 7) % 6) * 1.2;
        return (
          <g key={`spoke-${i}`}>
            <line
              x1={n.x}
              y1={n.y}
              x2={cx}
              y2={cy}
              stroke={accent}
              strokeWidth={active ? 1.4 : 0.9}
              strokeDasharray="1.5 5"
              opacity={active ? 0.95 : dimmed ? 0.1 : 0.4}
              style={{ transition: "opacity 300ms" }}
            />
            <circle r={1.6} fill={accent} opacity={dimmed ? 0.12 : active ? 1 : 0.7} style={{ transition: "opacity 300ms" }}>
              <animate
                attributeName="cx"
                values={`${n.x};${cx};${n.x}`}
                dur={`${dur}s`}
                begin={`${-((i * 0.61) % dur)}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values={`${n.y};${cy};${n.y}`}
                dur={`${dur}s`}
                begin={`${-((i * 0.61) % dur)}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}

      {/* center: the brand */}
      <g data-testid="playbook-consensus-center">
        <circle cx={cx} cy={cy} r={44} fill={accent} opacity={0.06} />
        <circle cx={cx} cy={cy} r={28} fill="none" stroke={accent} strokeOpacity={0.3} strokeWidth={1} />
        <rect
          x={cx - 12}
          y={cy - 12}
          width={24}
          height={24}
          rx={6}
          fill={accent}
          className="animate-constellation-twinkle"
        />
        <text x={cx} y={cy + 52} textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="17" fontWeight="700">
          {centerLabel}
        </text>
        <text
          x={cx}
          y={cy + 70}
          textAnchor="middle"
          fill={accent}
          fontSize="10.5"
          letterSpacing="2"
          style={{ fontFamily: "ui-monospace, monospace" }}
        >
          CONSENSUS · {totalLinks} CROSS-LINKS ACTIVE
        </text>
      </g>

      {/* nodes */}
      {nodes.map((n, i) => {
        const dimmed = hovered !== null && hovered !== i;
        const labelAbove = n.y <= cy;
        const anchor = n.x < cx - 60 ? "end" : n.x > cx + 60 ? "start" : "middle";
        const lx = anchor === "middle" ? n.x : anchor === "end" ? n.x + 14 : n.x - 14;
        const nameY = labelAbove ? n.y - 40 : n.y + 46;
        const subY = labelAbove ? n.y - 26 : n.y + 60;
        const node = (
          <g
            opacity={dimmed ? 0.3 : 1}
            style={{ transition: "opacity 300ms", cursor: n.url ? "pointer" : "default" }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            data-testid={`playbook-consensus-node-${i}`}
          >
            <circle cx={n.x} cy={n.y} r={30} fill={accent} opacity={0.05} />
            <circle cx={n.x} cy={n.y} r={19} fill="none" stroke={accent} strokeOpacity={0.22} strokeWidth={1} />
            <rect
              x={n.x - 8}
              y={n.y - 8}
              width={16}
              height={16}
              rx={4}
              fill={accent}
              className="animate-constellation-twinkle"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
            <text x={lx} y={nameY} textAnchor={anchor} fill="rgba(255,255,255,0.92)" fontSize="15" fontWeight="700">
              {n.name}
            </text>
            <text
              x={lx}
              y={subY}
              textAnchor={anchor}
              fill="rgba(255,255,255,0.38)"
              fontSize="10.5"
              letterSpacing="1"
              style={{ fontFamily: "ui-monospace, monospace" }}
            >
              {n.sub}
            </text>
          </g>
        );
        return n.url ? (
          <a key={n.name} href={n.url} target="_blank" rel="noopener noreferrer">
            {node}
          </a>
        ) : (
          <g key={n.name}>{node}</g>
        );
      })}
    </svg>
  );
}

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
          <ConsensusGraph />
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
  const W = 850;
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
        <p className={`text-xs uppercase tracking-[0.2em] text-white/40 mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>The Flywheel</p>
        <h2 className={`text-3xl sm:text-4xl font-bold text-white tracking-tight max-w-3xl transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Community to consensus to introduction.
        </h2>
        <p className={`mt-5 text-lg text-white/60 max-w-2xl leading-relaxed transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          The wheel is driven by properties Brandvious has already built. The partner plugs a
          client in, each property adds AEO coverage for the deal, and the introduction closes
          the loop.
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

function GtmLoopSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} id="gtm-loop" className="relative py-24 px-6 border-t border-white/[0.06]" data-testid="playbook-section-gtm">
      <div className="max-w-6xl mx-auto relative z-10">
        <p className={`text-xs uppercase tracking-[0.2em] text-amber-300/70 mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>And Then</p>
        <h2 className={`text-3xl sm:text-4xl font-bold text-white tracking-tight max-w-3xl transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          A loop built specifically for GTM.
        </h2>
        <p className={`mt-5 text-lg text-white/60 max-w-2xl leading-relaxed transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Once the B2B layer is working, the same model goes deep on a single market: go-to-market
          software. Brandvious is constructing consensus loops specific for go-to-market brands
          and tools.
        </p>
        <div
          className={`mt-12 transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"}`}
          style={{ transitionDelay: "300ms" }}
          data-testid="playbook-gtm-graph"
        >
          <ConsensusGraph ring={gtmConsensusNodes} accent="#f0c470" centerLabel="Your GTM Brand" />
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
          ecosystem: a highly profitable, scalable business without the delays and revisions of
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
      <GtmLoopSection />
      <WhyOffsiteSection />
      <PartnerModelSection />
      <NewFooter />
    </div>
  );
}
