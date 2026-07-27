import { useMemo, useState } from "react";
import { landscapeGraph, type LandscapeAccent } from "@/data/gtm-landscape";

// ---------------------------------------------------------------------------
// Brandvious GTM knowledge-graph constellation.
// Property hubs sit at the center; every company from the category research
// datasets orbits as a node in its category's arc, linked to the properties
// that reference it.
// ---------------------------------------------------------------------------

const accentHex: Record<LandscapeAccent, string> = {
  purple: "#a78bfa",
  blue: "#60a5fa",
  emerald: "#34d399",
  amber: "#fbbf24",
  rose: "#fb7185",
};

const hubs = [
  "GTM Journal",
  "GTM Review",
  "GTM Index",
  "GTM Awards",
  "AnswerStack",
  "Entities.org",
  "WhatIsBest",
];

// Deterministic hash so the layout is stable across renders.
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

const SIZE = 640;
const C = SIZE / 2;
const HUB_R = 78;
const MIN_R = 150;
const MAX_R = 288;

interface CompanyNode {
  name: string;
  category: string;
  accent: LandscapeAccent;
  x: number;
  y: number;
  r: number;
  hubIdx: [number, number];
  twinkleDelay: number;
}

function buildNodes(): CompanyNode[] {
  const nodes: CompanyNode[] = [];
  const wedge = (Math.PI * 2) / landscapeGraph.length;
  landscapeGraph.forEach((cat, ci) => {
    const start = ci * wedge - Math.PI / 2;
    cat.companies.forEach((name, i) => {
      const h1 = hash(name);
      const h2 = hash(name + "r");
      const angle = start + wedge * 0.08 + wedge * 0.84 * ((i + h1 * 0.8) / cat.companies.length);
      const radius = MIN_R + (MAX_R - MIN_R) * h2;
      nodes.push({
        name,
        category: cat.name,
        accent: cat.accent,
        x: C + Math.cos(angle) * radius,
        y: C + Math.sin(angle) * radius,
        r: 2 + h1 * 1.8,
        hubIdx: [
          Math.floor(h1 * hubs.length),
          Math.floor(h2 * hubs.length),
        ],
        twinkleDelay: h2 * 6,
      });
    });
  });
  return nodes;
}

function hubPos(i: number): { x: number; y: number } {
  const angle = (i / hubs.length) * Math.PI * 2 - Math.PI / 2;
  return { x: C + Math.cos(angle) * HUB_R, y: C + Math.sin(angle) * HUB_R };
}

export function GtmConstellation({ hoveredCategory }: { hoveredCategory: string | null }) {
  const [hoveredNode, setHoveredNode] = useState<CompanyNode | null>(null);
  const nodes = useMemo(buildNodes, []);

  const isDimmed = (n: CompanyNode) => {
    if (hoveredNode) return hoveredNode.name !== n.name;
    if (hoveredCategory) return n.category !== hoveredCategory;
    return false;
  };

  return (
    <div className="relative select-none" data-testid="gtm-constellation">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-auto" role="img" aria-label="Knowledge graph of companies connected to Brandvious properties">
        <defs>
          <radialGradient id="constellation-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(160,120,255,0.22)" />
            <stop offset="55%" stopColor="rgba(160,120,255,0.06)" />
            <stop offset="100%" stopColor="rgba(160,120,255,0)" />
          </radialGradient>
        </defs>

        <circle cx={C} cy={C} r={130} fill="url(#constellation-core)" />

        {/* Edges — company to property hubs. Sparse by default, bright on hover. */}
        {nodes.map((n) => {
          const active = hoveredNode?.name === n.name || (!hoveredNode && hoveredCategory === n.category);
          const hidden = (hoveredNode && hoveredNode.name !== n.name) || (!hoveredNode && hoveredCategory && hoveredCategory !== n.category);
          return n.hubIdx.map((hi, k) => {
            const h = hubPos(hi);
            return (
              <line
                key={`${n.name}-${k}`}
                x1={n.x}
                y1={n.y}
                x2={h.x}
                y2={h.y}
                stroke={active ? accentHex[n.accent] : "rgba(255,255,255,0.05)"}
                strokeOpacity={active ? 0.5 : hidden ? 0.15 : 1}
                strokeWidth={active ? 1 : 0.5}
                className="transition-all duration-300"
              />
            );
          });
        })}

        {/* Company nodes */}
        {nodes.map((n) => (
          <circle
            key={n.name + n.category}
            cx={n.x}
            cy={n.y}
            r={hoveredNode?.name === n.name ? n.r + 2.5 : n.r}
            fill={accentHex[n.accent]}
            fillOpacity={isDimmed(n) ? 0.14 : 0.85}
            className="transition-all duration-300 cursor-pointer animate-constellation-twinkle"
            style={{ animationDelay: `${n.twinkleDelay}s` }}
            onMouseEnter={() => setHoveredNode(n)}
            onMouseLeave={() => setHoveredNode(null)}
          />
        ))}

        {/* Property hubs */}
        {hubs.map((h, i) => {
          const p = hubPos(i);
          return (
            <g key={h} opacity={hoveredNode && !hoveredNode.hubIdx.includes(i) ? 0.3 : 1} className="transition-opacity duration-300">
              <circle cx={p.x} cy={p.y} r={9} fill="rgba(255,255,255,0.08)" />
              <circle cx={p.x} cy={p.y} r={4.5} fill="#fff" opacity={0.9} />
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredNode && (
        <div
          className="absolute pointer-events-none z-10 px-3 py-1.5 rounded-md text-xs font-medium text-white bg-black/80 border border-white/[0.15] backdrop-blur-sm whitespace-nowrap"
          style={{
            left: `${(hoveredNode.x / SIZE) * 100}%`,
            top: `${(hoveredNode.y / SIZE) * 100}%`,
            transform: "translate(-50%, -160%)",
          }}
          data-testid="constellation-tooltip"
        >
          {hoveredNode.name}
          <span className="ml-2" style={{ color: accentHex[hoveredNode.accent] }}>
            {hoveredNode.category}
          </span>
        </div>
      )}

      <p className="mt-3 text-center text-xs text-white/30">
        {nodes.length} companies · {hubs.length} Brandvious properties
      </p>
    </div>
  );
}
