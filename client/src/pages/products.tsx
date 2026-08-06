import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import {
  NewNavbar,
  NewFooter,
  NoiseOverlay,
  LightBeam,
  FloatingParticles,
} from "@/pages/home-new";
import {
  Layers,
  Globe,
  Trophy,
  Star,
  BarChart3,
  Target,
  Quote,
  LayoutPanelLeft,
  Blocks,
  Braces,
  ClipboardList,
  ShieldCheck,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

// ---------------------------------------------------------------------------
// /products: the public catalog — AEO authority domains first, then the
// GrowthRocket.ai stack that Brandvious licenses to agency partners.
// ---------------------------------------------------------------------------

type ProductItem = {
  name: string;
  sup?: string;
  domain: string;
  url: string;
  icon: LucideIcon;
  desc: string;
  tag?: string;
  category?: string;
  status?: "Established" | "New";
};

const publishingDomains: ProductItem[] = [
  {
    name: "AnswerStack",
    domain: "answerstack.io",
    url: "https://answerstack.io",
    icon: Layers,
    status: "Established",
    tag: "Source of truth in AI citations.",
    desc: "Expert-verified schema content LLMs treat as a source of truth in citations.",
  },
  {
    name: "Entities.org",
    domain: "entities.org",
    url: "https://entities.org",
    icon: Globe,
    status: "Established",
    tag: "Verified identity for AI.",
    desc: "Verified company data in a registry, so AI knows who you are and what you do.",
  },
  {
    name: "WhatisBest",
    domain: "whatisbest.com",
    url: "https://whatisbest.com",
    icon: Trophy,
    status: "Established",
    tag: "Expert comparisons.",
    desc: "Expert comparison articles made to be recommended in AI answers.",
  },
  {
    name: "ReviewInsight",
    domain: "reviewinsight.com",
    url: "https://reviewinsight.com",
    icon: Star,
    status: "New",
    tag: "Who's trending in trust.",
    desc: "Industry analysis from multiple review sites helps buyers and LLMs see who's trending in trust.",
  },
  {
    name: "B2BIndex",
    domain: "b2bindex.org",
    url: "https://b2bindex.org",
    icon: BarChart3,
    status: "New",
    tag: "Rankings & benchmarks.",
    desc: "Rankings and benchmarks AI systems cite when recommending vendors.",
  },
  {
    name: "BestFit",
    domain: "bestfit.org",
    url: "https://bestfit.org",
    icon: Target,
    status: "New",
    tag: "Buyer-fit shortlists.",
    desc: "Buyer-fit shortlists matching the right vendors to the right buyers.",
  },
];

export const growthRocketTools: ProductItem[] = [
  {
    name: "DesignRocket",
    domain: "designrocket.ai",
    url: "https://designrocket.ai",
    icon: LayoutPanelLeft,
    category: "Design",
    tag: "On-brand, on demand.",
    desc: "On-brand design for web, ads, and collateral.",
  },
  {
    name: "CopyRocket",
    domain: "copyrocket.app",
    url: "https://copyrocket.app",
    icon: Quote,
    category: "Copy",
    tag: "Words that convert.",
    desc: "Conversion copy for pages, emails, and campaigns.",
  },
  {
    name: "SprocketRocket",
    sup: "AI",
    domain: "sprocketrocket.ai",
    url: "https://sprocketrocket.ai",
    icon: Blocks,
    category: "Modules",
    tag: "Core Stack + AI Modules.",
    desc: "HubSpot CMS themes and modules built for speed.",
  },
  {
    name: "SchemaRocket",
    domain: "schemarocket.ai",
    url: "https://schemarocket.ai",
    icon: Braces,
    category: "AEO",
    tag: "Speak LLM fluently.",
    desc: "Schema markup LLMs read, understand, and trust.",
  },
  {
    name: "SurveyRocket",
    domain: "surveyrocket.ai",
    url: "https://surveyrocket.ai",
    icon: ClipboardList,
    category: "Research",
    tag: "Original data on tap.",
    desc: "Surveys that turn audience research into original data.",
  },
  {
    name: "ReputationRocket",
    domain: "reputationrocket.ai",
    url: "https://reputationrocket.ai",
    icon: ShieldCheck,
    category: "Reputation",
    tag: "Trust, managed.",
    desc: "Reviews and reputation across trusted platforms.",
  },
  {
    name: "AnswerRocket",
    domain: "answerrocket.io",
    url: "https://answerrocket.io",
    icon: MessageSquare,
    category: "AI FAQ",
    tag: "Built to be cited.",
    desc: "Answer-first content built for AI citation.",
  },
  {
    name: "RocketRank",
    domain: "rocketrank.ai",
    url: "https://rocketrank.ai",
    icon: TrendingUp,
    category: "Analytics",
    tag: "Proof of presence.",
    desc: "See where LLMs cite and recommend you.",
  },
];

const statusColor: Record<string, string> = {
  Established: "text-emerald-300/70",
  New: "text-amber-300/70",
};

function DomainCard({ item, visible, delay }: { item: ProductItem; visible: boolean; delay: number }) {
  const [flipped, setFlipped] = useState(false);
  const slug = item.name.toLowerCase().replace(/[\s.]/g, "-");

  return (
    <div
      className={`flip-scene transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      data-testid={`products-card-${slug}`}
    >
      <div className={`flip-inner relative min-h-[230px] ${flipped ? "flipped" : ""}`}>
        {/* front — stripped: status, ghost icon, name + tag */}
        <button
          type="button"
          onClick={() => setFlipped(true)}
          className="flip-face group absolute inset-0 w-full text-left rounded-2xl overflow-hidden p-6 border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm transition-colors duration-500 hover:bg-white/[0.05] hover:border-white/[0.14] shadow-[0_2px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)] cursor-pointer"
          data-testid={`products-flip-${slug}`}
        >
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(160,120,255,0.35), transparent)" }}
          />
          <item.icon
            className="absolute -bottom-8 -right-8 w-44 h-44 text-white/[0.05] group-hover:text-white/[0.08] transition-colors duration-500 pointer-events-none"
            style={{
              maskImage: "radial-gradient(circle at 35% 35%, black 20%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(circle at 35% 35%, black 20%, transparent 75%)",
            }}
          />
          {item.status && (
            <span className={`absolute top-6 left-6 text-[10px] uppercase tracking-[0.2em] font-medium ${statusColor[item.status]}`}>
              {item.status}
            </span>
          )}
          <span className="absolute bottom-6 left-6 right-6 block">
            <span className="block text-xl font-semibold text-white tracking-tight">
              {item.name}
              {item.sup && <sup className="ml-0.5 text-[10px] font-normal text-white/50">{item.sup}</sup>}
            </span>
            <span className="block text-[12px] text-white/45 mt-1.5">{item.tag}</span>
          </span>
        </button>
        {/* back — description + actions */}
        <div
          onClick={() => setFlipped(false)}
          className="flip-face flip-back absolute inset-0 rounded-2xl overflow-hidden p-6 border border-purple-300/[0.15] bg-white/[0.05] backdrop-blur-sm shadow-[0_2px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)] flex flex-col cursor-pointer"
        >
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(160,120,255,0.5), transparent)" }}
          />
          <p className="text-[11px] text-white/40">
            <span className="text-white/70 font-medium">
              {item.name}
              {item.sup && <sup className="ml-0.5 text-[8px] font-normal text-white/50">{item.sup}</sup>}
            </span>{" "}
            · {item.domain}
          </p>
          <p className="mt-3 text-[13px] text-white/60 leading-relaxed">{item.desc}</p>
          <div className="mt-auto pt-4 flex items-center gap-4">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group/link inline-flex items-center gap-1.5 text-[12px] font-medium text-white/80 hover:text-white transition-colors"
            >
              Visit site
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFlipped(false);
              }}
              className="text-[12px] text-white/40 hover:text-white/80 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolCard({ item, visible, delay }: { item: ProductItem; visible: boolean; delay: number }) {
  const [flipped, setFlipped] = useState(false);
  const slug = item.name.toLowerCase().replace(/[\s.]/g, "-");

  return (
    <div
      className={`flip-scene transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      data-testid={`products-card-${slug}`}
    >
      <div className={`flip-inner relative min-h-[220px] ${flipped ? "flipped" : ""}`}>
        {/* front — stripped: category, ghost icon, name + tag */}
        <button
          type="button"
          onClick={() => setFlipped(true)}
          className="flip-face group absolute inset-0 w-full text-left rounded-2xl overflow-hidden p-6 border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm transition-colors duration-500 hover:bg-white/[0.05] hover:border-white/[0.14] shadow-[0_2px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)] cursor-pointer"
          data-testid={`products-flip-${slug}`}
        >
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(100,170,255,0.35), transparent)" }}
          />
          <item.icon
            className="absolute -bottom-8 -right-8 w-40 h-40 text-white/[0.05] group-hover:text-white/[0.08] transition-colors duration-500 pointer-events-none"
            style={{
              maskImage: "radial-gradient(circle at 35% 35%, black 20%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(circle at 35% 35%, black 20%, transparent 75%)",
            }}
          />
          {item.category && (
            <span className="absolute top-6 left-6 text-[10px] uppercase tracking-[0.2em] font-medium text-sky-300/60">
              {item.category}
            </span>
          )}
          <span className="absolute bottom-6 left-6 right-6 block">
            <span className="block text-lg font-semibold text-white tracking-tight">
              {item.name}
              {item.sup && <sup className="ml-0.5 text-[9px] font-normal text-white/50">{item.sup}</sup>}
            </span>
            <span className="block text-[12px] text-white/45 mt-1.5">{item.tag}</span>
          </span>
        </button>
        {/* back — description + actions */}
        <div
          onClick={() => setFlipped(false)}
          className="flip-face flip-back absolute inset-0 rounded-2xl overflow-hidden p-6 border border-sky-300/[0.15] bg-white/[0.05] backdrop-blur-sm shadow-[0_2px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)] flex flex-col cursor-pointer"
        >
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(100,170,255,0.5), transparent)" }}
          />
          <p className="text-[11px] text-white/40">
            <span className="text-white/70 font-medium">
              {item.name}
              {item.sup && <sup className="ml-0.5 text-[8px] font-normal text-white/50">{item.sup}</sup>}
            </span>{" "}
            · {item.domain}
          </p>
          <p className="mt-3 text-[13px] text-white/60 leading-relaxed">{item.desc}</p>
          <div className="mt-auto pt-4 flex items-center gap-4">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group/link inline-flex items-center gap-1.5 text-[12px] font-medium text-white/80 hover:text-white transition-colors"
            >
              Visit site
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFlipped(false);
              }}
              className="text-[12px] text-white/40 hover:text-white/80 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const { theme } = useTheme();
  const party = theme === "sparkle";
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(220,10%,4%)] text-white relative" data-testid="products-page">
      <NoiseOverlay />
      <NewNavbar />

      {/* hero */}
      <section className="relative px-6 pt-40 pb-20 overflow-hidden" data-testid="products-section-hero">
        <LightBeam party={party} />
        <FloatingParticles party={party} />
        <div
          className={`relative z-10 max-w-6xl mx-auto transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1
            className="text-4xl sm:text-5xl font-bold leading-[1.08] tracking-tight"
            data-testid="products-text-headline"
          >
            <span className="block text-white">Brandvious products make brands</span>
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(160,120,255,0.55))",
              }}
            >
              easy to understand and recommend by LLMs.
            </span>
          </h1>
        </div>
      </section>

      {/* publishing domains */}
      <section className="relative px-6 pb-24" data-testid="products-section-domains">
        <div className="max-w-6xl mx-auto">
          <p
            className={`text-xs uppercase tracking-[0.2em] text-white/40 mb-8 transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            AEO Authority Domains
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {publishingDomains.map((item, i) => (
              <DomainCard key={item.name} item={item} visible={visible} delay={200 + i * 70} />
            ))}
          </div>
        </div>
      </section>

      {/* GrowthRocket stack */}
      <section className="relative px-6 py-24 border-t border-white/[0.06]" data-testid="products-section-stack">
        <div className="max-w-6xl mx-auto">
          <div
            className={`max-w-3xl transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">The GrowthRocket Stack</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Brandvious licenses{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(160,120,255,0.75))",
                }}
              >
                GrowthRocket.ai
              </span>{" "}
              tools for agency partners.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/45 leading-relaxed">
              GrowthRocket is the web & AEO stack built by{" "}
              <a
                href="https://leanlabs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white/75 hover:text-white transition-colors"
              >
                Lean Labs
              </a>{" "}
              that{" "}
              <a href="/partners" className="font-medium text-white/75 hover:text-white transition-colors">
                Certified Partners
              </a>{" "}
              may license & use for great experiences & great margins.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {growthRocketTools.map((item, i) => (
              <ToolCard key={item.name} item={item} visible={visible} delay={300 + i * 60} />
            ))}
          </div>
        </div>
      </section>

      {/* partner CTA — models the bottom of /new */}
      <section className="relative py-20 px-6 border-t border-white/[0.06]" data-testid="products-section-cta">
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
                Put{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg, rgba(190,150,255,0.95), rgba(140,180,255,0.9))",
                  }}
                >
                  Brandvious products
                </span>{" "}
                to work.
              </h2>
              <div className="flex flex-col sm:flex-row items-start gap-3 shrink-0">
                <a
                  href="/partners"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-purple-300/25 bg-purple-400/[0.08] hover:bg-purple-400/[0.14] hover:border-purple-300/40 hover:shadow-[0_0_24px_rgba(140,80,255,0.18)]"
                  data-testid="products-cta-find-partner"
                >
                  Find a Partner <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white/75 hover:text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.2]"
                  data-testid="products-cta-see-pricing"
                >
                  See Pricing <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/partner-playbook"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white/75 hover:text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.2]"
                  data-testid="products-cta-become-partner"
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
