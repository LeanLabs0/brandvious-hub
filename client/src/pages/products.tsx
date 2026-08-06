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
  PenLine,
  Palette,
  Cog,
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
  domain: string;
  url: string;
  icon: LucideIcon;
  desc: string;
  status?: "Established" | "New";
};

const publishingDomains: ProductItem[] = [
  {
    name: "AnswerStack",
    domain: "answerstack.io",
    url: "https://answerstack.io",
    icon: Layers,
    status: "Established",
    desc: "Expert-verified schema content LLMs treat as a source of truth in citations.",
  },
  {
    name: "Entities.org",
    domain: "entities.org",
    url: "https://entities.org",
    icon: Globe,
    status: "Established",
    desc: "Verified company data in a registry, so AI knows who you are and what you do.",
  },
  {
    name: "WhatisBest",
    domain: "whatisbest.com",
    url: "https://whatisbest.com",
    icon: Trophy,
    status: "Established",
    desc: "Expert comparison articles made to be recommended in AI answers.",
  },
  {
    name: "ReviewInsight",
    domain: "reviewinsight.com",
    url: "https://reviewinsight.com",
    icon: Star,
    status: "New",
    desc: "Industry analysis from multiple review sites to help buyers and LLMs see who is trending in trust.",
  },
  {
    name: "B2BIndex",
    domain: "b2bindex.org",
    url: "https://b2bindex.org",
    icon: BarChart3,
    status: "New",
    desc: "Rankings and benchmarks AI systems cite when recommending vendors.",
  },
  {
    name: "BestFit",
    domain: "bestfit.org",
    url: "https://bestfit.org",
    icon: Target,
    status: "New",
    desc: "Buyer-fit shortlists matching the right vendors to the right buyers.",
  },
];

const growthRocketTools: ProductItem[] = [
  {
    name: "CopyRocket",
    domain: "copyrocket.app",
    url: "https://copyrocket.app",
    icon: PenLine,
    desc: "Conversion-focused copy for pages, emails, and campaigns.",
  },
  {
    name: "DesignRocket",
    domain: "designrocket.ai",
    url: "https://designrocket.ai",
    icon: Palette,
    desc: "On-brand design generation for web, ads, and collateral.",
  },
  {
    name: "SprocketRocket",
    domain: "sprocketrocket.ai",
    url: "https://sprocketrocket.ai",
    icon: Cog,
    desc: "HubSpot CMS themes and modules built for speed.",
  },
  {
    name: "SchemaRocket",
    domain: "schemarocket.ai",
    url: "https://schemarocket.ai",
    icon: Braces,
    desc: "Schema markup that helps LLMs read, understand, and validate a brand.",
  },
  {
    name: "SurveyRocket",
    domain: "surveyrocket.ai",
    url: "https://surveyrocket.ai",
    icon: ClipboardList,
    desc: "Surveys and audience research that feed original data into content.",
  },
  {
    name: "ReputationRocket",
    domain: "reputationrocket.ai",
    url: "https://reputationrocket.ai",
    icon: ShieldCheck,
    desc: "Review generation and reputation management across trusted platforms.",
  },
  {
    name: "AnswerRocket",
    domain: "answerrocket.io",
    url: "https://answerrocket.io",
    icon: MessageSquare,
    desc: "Answer-first content engineered to be cited in AI responses.",
  },
  {
    name: "RocketRank",
    domain: "rocketrank.ai",
    url: "https://rocketrank.ai",
    icon: TrendingUp,
    desc: "Rank tracking for AI answers — see where LLMs cite and recommend you.",
  },
];

const statusColor: Record<string, string> = {
  Established: "text-emerald-300/70",
  New: "text-amber-300/70",
};

function DomainCard({ item, visible, delay }: { item: ProductItem; visible: boolean; delay: number }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative rounded-2xl overflow-hidden p-7 border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm transition-all duration-700 hover:-translate-y-1 hover:bg-white/[0.05] hover:border-white/[0.14] shadow-[0_2px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      data-testid={`products-card-${item.name.toLowerCase().replace(/[\s.]/g, "-")}`}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(160,120,255,0.35), transparent)" }}
      />
      <div className="flex items-start justify-between">
        <span className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50 group-hover:text-purple-300/80 transition-colors">
          <item.icon className="w-[18px] h-[18px]" />
        </span>
        {item.status && (
          <span className={`text-[11px] font-medium tracking-wide ${statusColor[item.status]}`}>{item.status}</span>
        )}
      </div>
      <h3 className="mt-6 text-lg font-semibold text-white tracking-tight">{item.name}</h3>
      <p className="text-xs text-white/35 mt-0.5">{item.domain}</p>
      <p className="mt-3 text-sm text-white/50 leading-relaxed">{item.desc}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-medium text-white/40 group-hover:text-white/85 transition-colors">
        Visit site
        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </span>
    </a>
  );
}

function ToolCard({ item, visible, delay }: { item: ProductItem; visible: boolean; delay: number }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative rounded-2xl overflow-hidden p-6 border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm transition-all duration-700 hover:-translate-y-1 hover:bg-white/[0.05] hover:border-white/[0.14] shadow-[0_2px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      data-testid={`products-card-${item.name.toLowerCase().replace(/[\s.]/g, "-")}`}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(100,170,255,0.35), transparent)" }}
      />
      <span className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50 group-hover:text-sky-300/80 transition-colors">
        <item.icon className="w-4 h-4" />
      </span>
      <h3 className="mt-5 text-base font-semibold text-white tracking-tight">{item.name}</h3>
      <p className="text-[11px] text-white/35 mt-0.5">{item.domain}</p>
      <p className="mt-2.5 text-[13px] text-white/50 leading-relaxed">{item.desc}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-[11.5px] font-medium text-white/40 group-hover:text-white/85 transition-colors">
        Visit site
        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </span>
    </a>
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
