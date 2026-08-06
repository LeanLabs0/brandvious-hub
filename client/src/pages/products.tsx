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
    desc: "Rich schema content verified by experts that LLMs see as a source of truth in citations.",
  },
  {
    name: "Entities.org",
    domain: "entities.org",
    url: "https://entities.org",
    icon: Globe,
    status: "Established",
    desc: "Verified company data listed in a registry, so AI knows who your company is and what you do.",
  },
  {
    name: "WhatisBest",
    domain: "whatisbest.com",
    url: "https://whatisbest.com",
    icon: Trophy,
    status: "Established",
    desc: "Real comparisons, vetted by B2B experts, made to be recommended in AI answers.",
  },
  {
    name: "ReviewInsight",
    domain: "reviewinsight.com",
    url: "https://reviewinsight.com",
    icon: Star,
    status: "New",
    desc: "Real reviews from the most trusted online platforms, carrying weight in buying decisions.",
  },
  {
    name: "B2BIndex",
    domain: "b2bindex.org",
    url: "https://b2bindex.org",
    icon: BarChart3,
    status: "New",
    desc: "Rankings, benchmarks, and category recognition that AI systems cite and recommend.",
  },
  {
    name: "BestFit",
    domain: "bestfit.org",
    url: "https://bestfit.org",
    icon: Target,
    status: "New",
    desc: "Buyer-fit matching and shortlists that put the right vendors in front of the right buyers.",
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
              GrowthRocket is the stack, not a product. Eight tools, licensed
              together through a Certified Brandvious Partner.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {growthRocketTools.map((item, i) => (
              <ToolCard key={item.name} item={item} visible={visible} delay={300 + i * 60} />
            ))}
          </div>
        </div>
      </section>

      {/* partner CTA */}
      <section className="relative px-6 pb-28" data-testid="products-section-cta">
        <div
          className={`max-w-4xl mx-auto relative rounded-3xl overflow-hidden border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm px-8 py-14 text-center transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "350ms" }}
        >
          <div
            className="absolute top-0 left-[15%] right-[15%] h-[1px]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(170,130,255,0.45), transparent)" }}
          />
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-[420px] h-[200px] blur-[90px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(110,60,240,0.12), transparent 70%)" }}
          />
          <h2 className="relative text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Put the stack to work.
          </h2>
          <p className="relative mt-3 text-sm text-white/45 max-w-md mx-auto">
            Work with a Certified Partner, or bring the stack to your own agency.
          </p>
          <div className="relative mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/partners"
              className="group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
              style={{
                background: "linear-gradient(135deg, rgba(150,90,255,0.95), rgba(100,50,220,0.95))",
                boxShadow: "0 8px 32px rgba(110,55,230,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
              data-testid="products-cta-find-partner"
            >
              Find a Partner
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="/partner-playbook"
              className="group relative inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium text-white/75 hover:text-white transition-colors"
              data-testid="products-cta-become-partner"
            >
              <span className="absolute inset-0 rounded-full bg-white/[0.03] border border-white/[0.12] group-hover:bg-purple-500/[0.07] group-hover:border-purple-300/25 backdrop-blur-sm transition-all duration-300" />
              <span
                className="absolute top-0 left-[18%] right-[18%] h-[1px]"
                style={{ background: "linear-gradient(90deg, transparent, rgba(170,130,255,0.45), transparent)" }}
              />
              <span className="relative">Become a Partner</span>
              <ArrowRight className="relative w-4 h-4 text-white/40 group-hover:text-purple-300/90 group-hover:translate-x-0.5 transition-all" />
            </a>
          </div>
        </div>
      </section>

      <NewFooter />
    </div>
  );
}
