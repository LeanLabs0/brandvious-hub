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
import { ArrowRight, Check } from "lucide-react";

// ---------------------------------------------------------------------------
// /pricing: GrowthRocket stack licensing. Every tool is one up-front fee with
// year one of AI tokens, product updates & support included, then a flat
// monthly renewal. All prices are placeholders — owner edits the `prices`
// map; bundle savings and à-la-carte totals compute automatically.
// ---------------------------------------------------------------------------

type Price = { upfront: number; renewal: number };

const prices: Record<string, Price> = {
  CopyRocket: { upfront: 2500, renewal: 50 },
  DesignRocket: { upfront: 2500, renewal: 50 },
  SprocketRocket: { upfront: 3500, renewal: 95 },
  SchemaRocket: { upfront: 3000, renewal: 75 },
  SurveyRocket: { upfront: 2000, renewal: 50 },
  ReputationRocket: { upfront: 3000, renewal: 75 },
  AnswerRocket: { upfront: 2500, renewal: 60 },
  RocketRank: { upfront: 2000, renewal: 50 },
};

const bundle = { upfront: 15000, renewal: 400 };

const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

const totalUpfront = Object.values(prices).reduce((s, p) => s + p.upfront, 0);
const totalRenewal = Object.values(prices).reduce((s, p) => s + p.renewal, 0);
const bundleSaveUpfront = totalUpfront - bundle.upfront;
const bundleSaveRenewal = totalRenewal - bundle.renewal;

const yearOneIncluded = "AI tokens, product updates & support";

function PriceRow({
  name,
  category,
  tag,
  price,
  selected,
  onToggle,
  visible,
  delay,
  last,
}: {
  name: string;
  category?: string;
  tag?: string;
  price: Price;
  selected: boolean;
  onToggle: () => void;
  visible: boolean;
  delay: number;
  last: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`group w-full text-left flex items-center justify-between gap-6 py-5 transition-all duration-500 cursor-pointer ${
        last ? "" : "border-b border-white/[0.06]"
      } ${selected ? "bg-sky-400/[0.04]" : "hover:bg-white/[0.02]"} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      data-testid={`pricing-card-${name.toLowerCase().replace(/[\s.]/g, "-")}`}
    >
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-sky-300/60">{category}</p>
        <p className="mt-1.5 text-[15px] tracking-tight">
          <span className="font-semibold text-white">{name}</span>
          <span className="text-white/40"> · {tag}</span>
        </p>
      </div>
      <div className="shrink-0 flex items-center gap-5">
        <div className="text-right">
          <p className="text-lg font-bold text-white tracking-tight">{fmt(price.upfront)}</p>
          <p className="mt-0.5 text-[11px] text-white/40">then {fmt(price.renewal)}/mo</p>
        </div>
        <span
          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all duration-300 ${
            selected
              ? "border-sky-300/50 bg-sky-400/15 text-sky-200"
              : "border-white/[0.15] bg-white/[0.03] text-transparent group-hover:border-white/30"
          }`}
          data-testid={`pricing-checkbox-${name.toLowerCase().replace(/[\s.]/g, "-")}`}
        >
          <Check className="w-3 h-3" />
        </span>
      </div>
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

  const selUpfront = tools.reduce((s, t) => s + (selected.has(t.name) ? t.price.upfront : 0), 0);
  const selRenewal = tools.reduce((s, t) => s + (selected.has(t.name) ? t.price.renewal : 0), 0);
  const selCount = selected.size;

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
            One up-front fee per tool. Year one of AI tokens, product updates
            & support included. Then a flat monthly renewal.
          </p>
        </div>
      </section>

      {/* full-stack bundle */}
      <section className="relative px-6 pb-10" data-testid="pricing-section-bundle">
        <div className="max-w-6xl mx-auto">
          <div
            className={`relative rounded-2xl overflow-hidden p-8 md:p-12 backdrop-blur-sm bg-white/[0.03] border border-white/[0.07] transition-all duration-1000 ${
              party
                ? "shadow-[0_2px_20px_rgba(0,0,0,0.3),0_0_40px_rgba(100,40,200,0.05),inset_0_1px_0_rgba(255,255,255,0.04)]"
                : "shadow-[0_2px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]"
            } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "200ms" }}
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
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-purple-300/70 mb-3">The Full Stack</p>
                <h2 className="text-xl sm:text-2xl font-semibold text-white">
                  GrowthRocket.ai,{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(90deg, rgba(190,150,255,0.95), rgba(140,180,255,0.9))",
                    }}
                  >
                    all eight tools.
                  </span>
                </h2>
                <p className="mt-3 text-sm text-white/45 leading-relaxed max-w-md">
                  One license. Save {fmt(bundleSaveUpfront)} up front and {fmt(bundleSaveRenewal)}/mo on
                  renewal vs. à la carte.
                </p>
              </div>
              <div className="shrink-0">
                <p className="text-4xl font-bold text-white tracking-tight">
                  {fmt(bundle.upfront)}
                  <span className="ml-2 text-xs font-normal text-white/35">one-time</span>
                </p>
                <p className="mt-3 flex items-start gap-2 text-[13px] text-white/50">
                  <Check className="w-3.5 h-3.5 mt-px shrink-0 text-purple-300/70" />
                  <span>Year 1 included: {yearOneIncluded}</span>
                </p>
                <p className="mt-2 text-[13px] text-white/40">Then {fmt(bundle.renewal)}/mo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* build your stack */}
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
          <div
            className={`relative rounded-2xl overflow-hidden px-6 md:px-8 py-2 border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm shadow-[0_2px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-1000 ${
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
                name={tool.name}
                category={tool.category}
                tag={tool.tag}
                price={tool.price}
                selected={selected.has(tool.name)}
                onToggle={() => toggle(tool.name)}
                visible={visible}
                delay={350 + i * 40}
                last={i === tools.length - 1}
              />
            ))}
          </div>
          <div
            className={`mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "650ms" }}
          >
            <p className="text-[12px] text-white/40">
              Every license includes year one of AI tokens, product updates & support.
            </p>
            {selCount > 0 && (
              <p className="text-[13px] text-white/70" data-testid="pricing-selection-total">
                <span className="text-white/40">Your stack: </span>
                {selCount} tool{selCount > 1 ? "s" : ""} · {fmt(selUpfront)} one-time · then {fmt(selRenewal)}/mo
              </p>
            )}
          </div>
          {selCount > 0 && selUpfront >= bundle.upfront && (
            <p className="mt-2 text-[12px] text-purple-300/60" data-testid="pricing-bundle-hint">
              The Full Stack license costs less: all eight tools for {fmt(bundle.upfront)}.
            </p>
          )}
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
