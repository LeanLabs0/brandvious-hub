import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import {
  NewNavbar,
  NewFooter,
  NoiseOverlay,
  LightBeam,
  FloatingParticles,
} from "@/pages/home-new";
import { growthRocketTools } from "@/pages/products";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// /pricing: GrowthRocket stack licensing. Every tool is one up-front fee with
// year one of AI tokens, product updates & support included, then a flat
// monthly renewal. All prices are placeholders — owner edits the `prices`
// map; bundle savings and à-la-carte totals compute automatically.
// ---------------------------------------------------------------------------

type Price = { upfront: number; renewal: number };

const prices: Record<string, Price> = {
  DesignRocket: { upfront: 4000, renewal: 200 },
  CopyRocket: { upfront: 0, renewal: 40 },
  SprocketRocket: { upfront: 1000, renewal: 97 },
  SchemaRocket: { upfront: 4000, renewal: 75 },
  SurveyRocket: { upfront: 2000, renewal: 25 },
  ReputationRocket: { upfront: 2000, renewal: 50 },
  AnswerRocket: { upfront: 5000, renewal: 75 },
  RocketRank: { upfront: 0, renewal: 75 },
};

const bundle = { upfront: 12000, renewal: 500 };

// tools with no standalone license — they ride along with another tool
const includedWith: Record<string, string> = {
  CopyRocket: "DesignRocket",
};

// perks that ship with a tool — shown in the summary when selected
const bonuses: Record<string, string> = {
  SchemaRocket: "Entities.org listing ($1,000 value)",
};

const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

const totalUpfront = Object.values(prices).reduce((s, p) => s + p.upfront, 0);
// children like CopyRocket ride free with their parent — exclude them from the compare-at total
const totalRenewal = Object.entries(prices)
  .filter(([name]) => !includedWith[name])
  .reduce((s, [, p]) => s + p.renewal, 0);
const bundleSaveUpfront = totalUpfront - bundle.upfront;
const bundleSaveRenewal = totalRenewal - bundle.renewal;

const monthlyCovers = "AI tokens, product updates & support";

function PriceRow({
  tool,
  price,
  includedBy,
  lockedIncluded,
  active,
  onToggle,
  visible,
  delay,
  last,
}: {
  tool: { name: string; sup?: string; category?: string; tag?: string; icon: LucideIcon };
  price: Price;
  includedBy?: string;
  lockedIncluded: boolean;
  active: boolean;
  onToggle?: () => void;
  visible: boolean;
  delay: number;
  last: boolean;
}) {
  const rowClass = `group relative overflow-hidden w-full text-left flex items-center gap-4 py-5 transition-all duration-500 ${
    last ? "" : "border-b border-white/[0.06]"
  } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`;

  const inner = (
    <>
      {active && (
        <>
          {/* soft ambient glow — blurred so it never shows a hard edge */}
          <span className="absolute right-16 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-purple-500/[0.14] blur-2xl pointer-events-none animate-[fade-in_0.5s_ease-out]" />
          {/* vertical beam at the row's edge, fading top and bottom like the hero */}
          <span
            className="absolute right-0 top-1/2 -translate-y-1/2 h-2/3 w-px pointer-events-none animate-[fade-in_0.5s_ease-out]"
            style={{ background: "linear-gradient(180deg, transparent, rgba(180,130,255,0.55), transparent)" }}
          />
        </>
      )}
      <span
        className={`w-9 h-9 rounded-lg bg-white/[0.05] border flex items-center justify-center shrink-0 transition-colors duration-300 ${
          active ? "border-purple-300/25 text-purple-200/80" : "border-white/[0.08] text-white/45"
        }`}
      >
        <tool.icon className="w-4 h-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] uppercase tracking-[0.2em] font-medium text-sky-300/60">{tool.category}</span>
        <span className="block mt-1 text-[15px] tracking-tight">
          <span className="font-semibold text-white">
            {tool.name}
            {tool.sup && <sup className="ml-0.5 text-[9px] font-normal text-white/50">{tool.sup}</sup>}
          </span>
          <span className="text-white/40"> · {tool.tag}</span>
        </span>
      </span>
      <span className="shrink-0 text-right">
        {lockedIncluded ? (
          <>
            <span className="block text-[12px] font-medium text-white/55">Included</span>
            <span className="block mt-0.5 text-[11px] text-white/40">with {includedBy}</span>
          </>
        ) : (
          <>
            <span className="block text-lg font-bold text-white tracking-tight">
              {price.upfront === 0 ? "Free" : fmt(price.upfront)}
              <span className="ml-1.5 text-[10px] font-normal text-white/35">license</span>
            </span>
            <span className="block mt-0.5 text-[11px] text-white/40">+ {fmt(price.renewal)}/mo</span>
          </>
        )}
      </span>
      <span
        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all duration-300 ${
          active
            ? "border-purple-300/40 bg-purple-400/15 text-purple-100"
            : "border-white/[0.15] bg-white/[0.03] text-transparent group-hover:border-white/30"
        }`}
        data-testid={`pricing-checkbox-${tool.name.toLowerCase().replace(/[\s.]/g, "-")}`}
      >
        <Check className="w-3 h-3" />
      </span>
    </>
  );

  if (lockedIncluded) {
    return (
      <div
        className={rowClass}
        style={{ transitionDelay: `${delay}ms` }}
        data-testid={`pricing-card-${tool.name.toLowerCase().replace(/[\s.]/g, "-")}`}
      >
        {inner}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      className={`${rowClass} cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white/25 hover:bg-white/[0.02]`}
      style={{ transitionDelay: `${delay}ms` }}
      data-testid={`pricing-card-${tool.name.toLowerCase().replace(/[\s.]/g, "-")}`}
    >
      {inner}
    </button>
  );
}

export default function Pricing() {
  const { theme } = useTheme();
  const party = theme === "sparkle";
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const tools = growthRocketTools.map((t) => ({ ...t, price: prices[t.name] }));

  const toggle = (name: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  // a child tool is active when selected on its own or included by its parent
  const activeFor = (name: string) => {
    const parent = includedWith[name];
    return parent ? selected.has(parent) || selected.has(name) : selected.has(name);
  };

  // a selected child whose parent is also selected bills nothing — it is included
  const billable = (t: (typeof tools)[number]) => {
    const parent = includedWith[t.name];
    return selected.has(t.name) && !(parent && selected.has(parent));
  };

  const activeTools = tools.filter((t) => activeFor(t.name));
  const selUpfront = tools.reduce((s, t) => s + (billable(t) ? t.price.upfront : 0), 0);
  const selRenewal = tools.reduce((s, t) => s + (billable(t) ? t.price.renewal : 0), 0);
  const selCount = activeTools.length;

  return (
    <div className="min-h-screen bg-[hsl(220,10%,4%)] text-white relative" data-testid="pricing-page">
      <NoiseOverlay />
      <NewNavbar />

      {/* hero */}
      <section className="relative px-6 pt-40 pb-16 overflow-hidden" data-testid="pricing-section-hero">
        <LightBeam party={party} />
        <FloatingParticles party={party} />
        <div
          className={`relative z-10 max-w-6xl mx-auto transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Pricing</p>
          <h1
            className="text-4xl sm:text-5xl font-bold leading-[1.08] tracking-tight"
            data-testid="pricing-text-headline"
          >
            <span className="block text-white">License the stack.</span>
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(160,120,255,0.55))",
              }}
            >
              Keep the margins.
            </span>
          </h1>
          <p className="mt-5 text-sm sm:text-base text-white/45 leading-relaxed max-w-xl">
            One license fee per tool, plus a flat monthly tokens & support
            fee from day one.
          </p>
        </div>
      </section>

      {/* build your stack — 2/3 selector + 1/3 live summary */}
      <section className="relative px-6 py-14" data-testid="pricing-section-tools">
        <div className="max-w-6xl mx-auto">
          <p
            className={`text-xs uppercase tracking-[0.2em] text-white/40 mb-8 transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "250ms" }}
          >
            Build Your Stack
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* selector */}
            <div
              className={`lg:col-span-2 relative rounded-2xl overflow-hidden px-6 md:px-7 py-2 border border-white/[0.07] bg-black/40 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-1000 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(100,170,255,0.35), transparent)" }}
              />
              {tools.map((tool, i) => (
                <PriceRow
                  key={tool.name}
                  tool={tool}
                  price={tool.price}
                  includedBy={includedWith[tool.name]}
                  lockedIncluded={Boolean(includedWith[tool.name] && selected.has(includedWith[tool.name]))}
                  active={activeFor(tool.name)}
                  onToggle={
                    includedWith[tool.name] && selected.has(includedWith[tool.name])
                      ? undefined
                      : () => toggle(tool.name)
                  }
                  visible={visible}
                  delay={350 + i * 40}
                  last={i === tools.length - 1}
                />
              ))}
            </div>

            {/* summary */}
            <div
              className={`relative rounded-2xl overflow-hidden p-7 border border-white/[0.07] bg-black/40 backdrop-blur-md lg:sticky lg:top-28 shadow-[0_2px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-1000 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "450ms" }}
              data-testid="pricing-summary"
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(160,120,255,0.4), rgba(120,180,255,0.3), transparent)" }}
              />
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">Your Stack</p>
              {selCount === 0 ? (
                <p className="mt-4 text-[13px] text-white/35 leading-relaxed">
                  Select tools on the left to build your stack.
                </p>
              ) : (
                <>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tools
                      .filter((t) => activeFor(t.name))
                      .map((t) => (
                        <span
                          key={t.name}
                          className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5"
                        >
                          <t.icon className="w-3.5 h-3.5 text-white/50" />
                          <span className="text-[11px] text-white/70">
                            {t.name}
                            {t.sup && <sup className="ml-0.5 text-[8px] text-white/40">{t.sup}</sup>}
                          </span>
                        </span>
                      ))}
                  </div>
                  <div className="mt-6 border-t border-white/[0.06] pt-5" data-testid="pricing-selection-total">
                    <p className="text-3xl font-bold text-white tracking-tight">
                      {fmt(selUpfront)}
                      <span className="ml-2 text-[11px] font-normal text-white/35">one-time</span>
                    </p>
                    <p className="mt-1.5 text-[13px] text-white/45">
                      + {fmt(selRenewal)}/mo for AI tokens, support & updates
                    </p>
                  </div>
                  {tools
                    .filter((t) => activeFor(t.name) && bonuses[t.name])
                    .map((t) => (
                      <p
                        key={t.name}
                        className="mt-4 flex items-start gap-2 text-[12px] text-white/50 leading-relaxed"
                        data-testid={`pricing-bonus-${t.name.toLowerCase().replace(/[\s.]/g, "-")}`}
                      >
                        <Check className="w-3.5 h-3.5 mt-px shrink-0 text-purple-300/70" />
                        <span>Includes {bonuses[t.name]}.</span>
                      </p>
                    ))}
                  {selUpfront >= bundle.upfront && (
                    <p className="mt-4 text-[12px] text-purple-300/60" data-testid="pricing-bundle-hint">
                      The Full Stack license costs less: all eight tools for {fmt(bundle.upfront)}.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* the full stack — graphical bundle with icons, compare-at price, term & renewal */}
      <section className="relative px-6 pb-14" data-testid="pricing-section-bundle">
        <div className="max-w-6xl mx-auto">
          <div
            className={`relative rounded-2xl overflow-hidden p-8 md:p-12 backdrop-blur-sm bg-white/[0.03] border border-white/[0.07] transition-all duration-1000 ${
              party
                ? "shadow-[0_2px_20px_rgba(0,0,0,0.3),0_0_40px_rgba(100,40,200,0.05),inset_0_1px_0_rgba(255,255,255,0.04)]"
                : "shadow-[0_2px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]"
            } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "550ms" }}
            data-testid="pricing-card-bundle"
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
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-10">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  The full{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(90deg, rgba(190,150,255,0.95), rgba(140,180,255,0.9))",
                    }}
                  >
                    GrowthRocket.ai
                  </span>{" "}
                  stack.
                </h2>
                <div className="mt-6 grid grid-cols-4 gap-2 max-w-lg">
                  {tools.map((t) => (
                    <span
                      key={t.name}
                      className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-black/40 h-20 p-3 flex items-end transition-colors duration-500 hover:border-white/[0.12]"
                    >
                      <t.icon
                        className="absolute -bottom-4 -right-4 w-16 h-16 text-white/[0.06] group-hover:text-white/[0.1] transition-colors duration-500 pointer-events-none"
                        style={{
                          maskImage: "radial-gradient(circle at 35% 35%, black 20%, transparent 75%)",
                          WebkitMaskImage: "radial-gradient(circle at 35% 35%, black 20%, transparent 75%)",
                        }}
                      />
                      <span className="absolute left-3 top-3 w-4 h-4 rounded-[5px] border border-purple-300/40 bg-purple-400/15 text-purple-100 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <span className="relative text-[10px] text-white/60 tracking-tight">
                        {t.name}
                        {t.sup && <sup className="ml-0.5 text-[7px] text-white/40">{t.sup}</sup>}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 lg:pl-10 lg:border-l lg:border-white/[0.06]">
                <p className="text-[12px] text-white/35">
                  À la carte <span className="line-through">{fmt(totalUpfront)}</span>
                </p>
                <p className="mt-2 text-4xl font-bold text-white tracking-tight">
                  {fmt(bundle.upfront)}
                  <span className="ml-2 text-xs font-normal text-white/35">one-time</span>
                </p>
                <p className="mt-3 text-[13px] text-white/40">
                  + {fmt(bundle.renewal)}/mo{" "}
                  <span className="text-white/30">(vs. {fmt(totalRenewal)}/mo)</span>
                </p>
                <p className="mt-2 flex items-start gap-2 text-[13px] text-white/50">
                  <Check className="w-3.5 h-3.5 mt-px shrink-0 text-purple-300/70" />
                  <span>Monthly fee covers {monthlyCovers}</span>
                </p>
                <p className="mt-4 text-[12px] font-medium text-purple-300/70">
                  Save {fmt(bundleSaveUpfront)} (-{Math.round((bundleSaveUpfront / totalUpfront) * 100)}%) up
                  front and {fmt(bundleSaveRenewal)}/mo on the monthly fee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* partner CTA — models the bottom of /new */}
      <section className="relative py-20 px-6 border-t border-white/[0.06]" data-testid="pricing-section-cta">
        <div className="max-w-6xl mx-auto relative z-10">
          <div
            className={`relative rounded-2xl overflow-hidden p-8 md:p-12 backdrop-blur-sm bg-white/[0.03] border border-white/[0.07] transition-all duration-1000 ${
              party
                ? "shadow-[0_2px_20px_rgba(0,0,0,0.3),0_0_40px_rgba(100,40,200,0.05),inset_0_1px_0_rgba(255,255,255,0.04)]"
                : "shadow-[0_2px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]"
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
              <h2 className="text-xl sm:text-2xl font-semibold text-white">
                License the stack through a{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg, rgba(190,150,255,0.95), rgba(140,180,255,0.9))",
                  }}
                >
                  Certified Partner.
                </span>
              </h2>
              <div className="flex flex-col sm:flex-row items-start gap-3 shrink-0">
                <a
                  href="/partners"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-purple-300/25 bg-purple-400/[0.08] hover:bg-purple-400/[0.14] hover:border-purple-300/40 hover:shadow-[0_0_24px_rgba(140,80,255,0.18)]"
                  data-testid="pricing-cta-find-partner"
                >
                  Find a Partner <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/partner-playbook"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white/75 hover:text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.2]"
                  data-testid="pricing-cta-become-partner"
                >
                  Become a Partner <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewFooter />
    </div>
  );
}
