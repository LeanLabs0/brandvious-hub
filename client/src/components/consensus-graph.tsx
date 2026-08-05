import { useEffect, useMemo, useRef, useState } from "react";

export type ConsensusRingNode = { name: string; sub: string; url: string | null; owner?: "client"; radiusScale?: number };

const CLIENT_ACCENT = "#f08a8a";

export const gtmConsensusNodes: ConsensusRingNode[] = [
  { name: "GTM Journal", sub: "Original Reporting", url: null },
  { name: "GTM Review", sub: "Review Authority", url: null },
  { name: "WhatIsBest.com", sub: "Market Position", url: "https://whatisbest.com" },
  { name: "GTM Index", sub: "Ranking Authority", url: null },
  { name: "ReviewInsight.com", sub: "Review Intelligence", url: "https://reviewinsight.com" },
  { name: "GTM 100", sub: "Flagship Recognition", url: null },
  { name: "Entities.org", sub: "Technical Registry", url: "https://entities.org" },
  { name: "r/GTMtools", sub: "Community Signal", url: null },
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

export function ConsensusGraph({
  ring,
  accent = "#8ea2ff",
  centerLabel = "Your Brand",
  centerSub,
}: {
  ring: ConsensusRingNode[];
  accent?: string;
  centerLabel?: string;
  centerSub?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  const W = 900;
  const H = 560;
  const cx = W / 2;
  const cy = H / 2;

  const nodes = useMemo(
    () =>
      ring.map((n, i) => {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / ring.length;
        const rs = n.radiusScale ?? 1;
        return {
          ...n,
          x: cx + Math.cos(angle) * 290 * rs,
          y: cy + Math.sin(angle) * 210 * rs,
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
        const nodeAccent = n.owner === "client" ? CLIENT_ACCENT : accent;
        return (
          <g key={`spoke-${i}`}>
            <line
              x1={n.x}
              y1={n.y}
              x2={cx}
              y2={cy}
              stroke={nodeAccent}
              strokeWidth={active ? 1.4 : 0.9}
              strokeDasharray="1.5 5"
              opacity={active ? 0.95 : dimmed ? 0.1 : 0.4}
              style={{ transition: "opacity 300ms" }}
            />
            <circle r={1.6} fill={nodeAccent} opacity={dimmed ? 0.12 : active ? 1 : 0.7} style={{ transition: "opacity 300ms" }}>
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
          {centerSub ?? `CONSENSUS · ${totalLinks} CROSS-LINKS ACTIVE`}
        </text>
      </g>

      {/* nodes */}
      {nodes.map((n, i) => {
        const dimmed = hovered !== null && hovered !== i;
        const nodeAccent = n.owner === "client" ? CLIENT_ACCENT : accent;
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
            <circle cx={n.x} cy={n.y} r={30} fill={nodeAccent} opacity={0.05} />
            <circle cx={n.x} cy={n.y} r={19} fill="none" stroke={nodeAccent} strokeOpacity={0.22} strokeWidth={1} />
            <rect
              x={n.x - 8}
              y={n.y - 8}
              width={16}
              height={16}
              rx={4}
              fill={nodeAccent}
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

      {/* legend, only when the ring mixes ownership */}
      {ring.some((n) => n.owner === "client") && (
        <g style={{ fontFamily: "ui-monospace, monospace" }} data-testid="playbook-consensus-legend">
          <rect x={24} y={H - 46} width={9} height={9} rx={2.5} fill={accent} />
          <text x={40} y={H - 38} fill="rgba(255,255,255,0.55)" fontSize="10.5" letterSpacing="1">
            BRANDVIOUS PROPERTIES
          </text>
          <rect x={24} y={H - 26} width={9} height={9} rx={2.5} fill={CLIENT_ACCENT} />
          <text x={40} y={H - 18} fill="rgba(255,255,255,0.55)" fontSize="10.5" letterSpacing="1">
            MANAGED BY YOUR AGENCY
          </text>
        </g>
      )}
    </svg>
  );
}

export function GtmLoopSection() {
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
      </div>
    </section>
  );
}
