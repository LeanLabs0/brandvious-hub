import { useState, useEffect, useMemo } from "react";
import {
  ArrowRight,
  Braces,
  Globe,
  Trophy,
  Layers,
  Radar,
  Sun,
  Moon,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import agentcyTransitionImage from "@assets/generated_images/agentcy-transition.png";

const products = [
  {
    name: "SchemaRocket",
    domain: "schemarocket.ai",
    label: "Structured Data",
    subtitle: "Structured data for AI",
    description: "Schema markup helps LLMs read, understand, & validate your brand in a token-efficient way.",
    status: "Established",
    statusColor: "text-emerald-400",
    url: "https://schemarocket.ai",
    icon: Braces,
  },
  {
    name: "Entities.org",
    domain: "entities.org",
    label: "Entity Registry",
    subtitle: "Entity registry for AI",
    description: "Verified company data listed in a registry, so AI knows who your company is and what you do.",
    status: "Growing",
    statusColor: "text-blue-400",
    url: "https://entities.org",
    icon: Globe,
  },
  {
    name: "WhatisBest",
    domain: "whatisbest.com",
    label: "Comparisons",
    subtitle: "Comparisons for AI",
    description: "Real comparisons, vetted by B2B experts, made to be recommended in AI answers.",
    status: "Launching",
    statusColor: "text-amber-400",
    url: "https://whatisbest.com",
    icon: Trophy,
  },
  {
    name: "AnswerStack",
    domain: "answerstack.io",
    label: "Answers",
    subtitle: "Answers for AI",
    description: "Rich schema content verified by experts that LLMs see as a source of truth in citations.",
    status: "In Development",
    statusColor: "text-neutral-400",
    url: "https://answerstack.io",
    icon: Layers,
  },
  {
    name: "ReviewInsight",
    domain: "reviewinsight.com",
    label: "Trust",
    subtitle: "Reviews AI can trust",
    description: "Real reviews from the most trusted online platforms that carry weight in influencing buying behavior from customers.",
    status: "Backlog",
    statusColor: "text-neutral-500",
    url: "/reviewradar",
    icon: Radar,
  },
  {
    name: "Mentions.io",
    domain: "mentions.io",
    label: "Presence",
    subtitle: "Proof of presence",
    description: "Online monitoring for brand mentions across web pages, blog articles, whitepapers and more.",
    status: "Prototype",
    statusColor: "text-purple-400",
    url: "/mentions",
    icon: Activity,
  },
];

const stats = [
  { value: "6", label: "Products" },
  { value: "1", label: "Mission" },
  { value: "∞", label: "Machines served" },
];

// Single source of truth for version links shown in the sub-footer.
// To add v4/v5/etc, just append a new entry here.
const versions = [
  { label: "v1", path: "/v1" },
  { label: "v2", path: "/v2" },
  { label: "v3", path: "/" },
  { label: "v4", path: "/v4" },
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
      data-testid="noise-overlay"
    />
  );
}

function LightBeam({ party }: { party: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" data-testid="light-beam">
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
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 blur-[120px]"
        style={{
          width: party ? "900px" : "600px",
          height: party ? "50vh" : "40vh",
          background: party
            ? "radial-gradient(ellipse at center top, rgba(120,60,255,0.14), rgba(80,30,180,0.06), transparent 70%)"
            : "radial-gradient(ellipse at center top, rgba(100,60,255,0.08), transparent 70%)",
        }}
      />
      {party && (
        <>
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[1200px] h-[30vh] blur-[160px]"
            style={{
              background: "radial-gradient(ellipse at center top, rgba(100,40,200,0.08), transparent 60%)",
            }}
          />
          <div
            className="absolute left-[30%] top-[10%] w-[400px] h-[400px] rounded-full blur-[140px]"
            style={{
              background: "radial-gradient(circle, rgba(80,30,180,0.06), transparent 70%)",
            }}
          />
          <div
            className="absolute left-[65%] top-[5%] w-[350px] h-[350px] rounded-full blur-[130px]"
            style={{
              background: "radial-gradient(circle, rgba(120,50,220,0.05), transparent 70%)",
            }}
          />
        </>
      )}
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

function PartyAtmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full"
        style={{
          background: "linear-gradient(to bottom, rgba(140,80,255,0.4) 0%, rgba(100,50,220,0.15) 20%, rgba(80,30,180,0.06) 40%, rgba(60,20,140,0.04) 60%, rgba(60,20,140,0.03) 80%, rgba(100,50,220,0.08) 92%, rgba(140,80,255,0.25) 100%)",
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[200px] h-full blur-[100px]"
        style={{
          background: "linear-gradient(to bottom, rgba(120,60,255,0.12) 0%, rgba(100,40,200,0.06) 25%, rgba(80,30,160,0.02) 50%, rgba(60,20,120,0.015) 75%, rgba(100,40,200,0.06) 92%, rgba(120,60,255,0.10) 100%)",
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-full blur-[180px]"
        style={{
          background: "linear-gradient(to bottom, rgba(100,40,200,0.06) 0%, rgba(80,30,160,0.02) 30%, rgba(60,20,120,0.008) 60%, rgba(80,30,160,0.02) 85%, rgba(100,40,200,0.05) 100%)",
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[600px] h-[250px] blur-[120px]"
        style={{
          background: "radial-gradient(ellipse at center bottom, rgba(120,50,220,0.12), transparent 70%)",
        }}
      />
    </div>
  );
}

const glassCard = "backdrop-blur-sm bg-white/[0.03]";
const glassCardBorder = "border border-white/[0.07]";
const glassCardHover = "hover:bg-white/[0.06] hover:border-white/[0.14]";
const cardShadowBase = "shadow-[0_2px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]";
const cardShadowHover = "hover:shadow-[0_8px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.06)]";
const cardShadowParty = "hover:shadow-[0_8px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(100,40,200,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]";

function V2Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        backdropFilter: "blur(20px) saturate(180%)",
        backgroundColor: "hsl(220 10% 4% / 0.75)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
      data-testid="v2-navbar"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/" className="text-base font-semibold tracking-tight text-white" data-testid="v2-link-home">
          Brandvious<span className="font-light text-white/60 ml-0.5">Digital</span>
        </a>
        <div className="flex items-center gap-6">
          <a href="#products" className="text-sm text-white/70 hover:text-white transition-colors hidden sm:block" data-testid="v2-nav-products">AEO Products</a>
        </div>
      </div>
    </nav>
  );
}

function V2Hero() {
  const { theme } = useTheme();
  const party = theme === "sparkle";
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-start justify-center px-6 overflow-hidden" data-testid="v2-section-hero">
      <LightBeam party={party} />
      <FloatingParticles party={party} />

      <div
        className={`relative z-10 max-w-6xl mx-auto w-full transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
          data-testid="v2-text-headline"
        >
          <span className="text-white">Products that </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.4))",
            }}
          >
            make AI
          </span>
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.3))",
            }}
          >
            {" "}work for businesses.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed" data-testid="v2-text-subheadline">
          Our tools help innovative companies compete with structured data, verified entities, and validated authority.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#products"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
              party
                ? "border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.20] hover:shadow-[0_0_20px_rgba(120,60,220,0.1)]"
                : "border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.20] hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            }`}
            data-testid="v2-button-see-products"
          >
            See AEO products <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://howaeoworks.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.08] text-white/70 text-sm font-medium hover:border-white/[0.16] hover:text-white transition-all duration-300"
            data-testid="v2-button-aeo"
          >
            See how AEO works <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function StatsRow() {
  return (
    <section
      className="relative py-16 px-6 border-t border-white/[0.06]"
      data-testid="v2-section-stats"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-3 gap-8">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`text-center ${i < 2 ? "border-r border-white/[0.06]" : ""}`}
              data-testid={`v2-stat-${i}`}
            >
              <div className="text-4xl sm:text-5xl font-bold text-white font-mono tracking-tight">{s.value}</div>
              <div className="mt-2 text-sm text-white/50 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const { theme } = useTheme();
  const party = theme === "sparkle";
  const isExternal = !product.url.startsWith("/");
  const Icon = product.icon;

  return (
    <a
      href={product.url}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative block rounded-2xl overflow-hidden p-8 transition-all duration-500 transform hover:-translate-y-0.5 ${glassCard} ${glassCardBorder} ${glassCardHover} ${cardShadowBase} ${party ? cardShadowParty : cardShadowHover}`}
      data-testid={`v2-product-card-${index}`}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: party
            ? "radial-gradient(600px circle at 50% 0%, rgba(100,40,200,0.06), transparent 60%)"
            : "radial-gradient(600px circle at 50% 0%, rgba(255,255,255,0.04), transparent 60%)",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-xl backdrop-blur-sm"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            <Icon className="w-5 h-5 text-white/60 group-hover:text-white/80 transition-colors duration-300" />
          </div>
          <span className={`text-xs font-medium ${product.statusColor}`} data-testid={`v2-product-status-${index}`}>
            {product.status}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-white mb-1" data-testid={`v2-product-name-${index}`}>
          {product.name}
        </h3>
        <p className="text-xs text-white/40 font-mono mb-4">{product.domain}</p>
        <p className="text-sm text-white/55 leading-relaxed mb-6">{product.description}</p>

        <div className="flex items-center gap-1 text-sm text-white/40 group-hover:text-white/70 transition-colors duration-300">
          {isExternal ? (
            <>Visit site <ExternalLink className="w-3.5 h-3.5" /></>
          ) : (
            <>Explore <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" /></>
          )}
        </div>
      </div>
    </a>
  );
}

function ProductsSection() {
  const { theme } = useTheme();
  const party = theme === "sparkle";

  return (
    <section id="products" className="relative py-24 px-6" data-testid="v2-section-products">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Leveling the Playing Field</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
            Our solutions make brands{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.35))",
              }}
            >
              easy to understand and recommend by LLMs.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ThesisSection() {
  const { theme } = useTheme();
  const party = theme === "sparkle";

  const principles = [
    {
      number: "01",
      title: "Level Playing Field",
      description: "Every business, regardless of their size or budget, deserves the same AI visibility as their most well funded competitors.",
    },
    {
      number: "02",
      title: "Just The Facts",
      description: "AI can only ever be as good as its sources. We provide data that's vetted, structured, and LLM-centric so brands can compete.",
    },
    {
      number: "03",
      title: "Function Over Fluff",
      description: "Our products meet the needs of AI and humans because your MarTech stack has to work as hard as you do.",
    },
  ];

  return (
    <section
      id="thesis"
      className="relative py-24 px-6 border-t border-white/[0.06]"
      data-testid="v2-section-thesis"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Our Thesis</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
            Buyers rely upon LLMs to help them select the right vendors, and sellers rely upon LLM consensus around their expertise.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.35))",
              }}
            >
              Our tools enable both to make great choices.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((p, i) => (
            <div
              key={p.number}
              className={`relative rounded-2xl overflow-hidden p-8 transition-all duration-500 transform hover:-translate-y-0.5 ${glassCard} ${glassCardBorder} ${glassCardHover} ${cardShadowBase} ${party ? cardShadowParty : cardShadowHover}`}
              data-testid={`v2-thesis-card-${i}`}
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                }}
              />
              <span className="text-xs font-mono text-white/30">{p.number}</span>
              <h3 className="text-2xl font-bold text-white mt-3 mb-4">{p.title}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Edit Lean Labs section copy here.
const leanLabs = {
  eyebrow: 'The "Agentcy" Model',
  headingWhite: "Our tools empower the new",
  headingGradient: '"agentcy" model.',
  body: [
    'An "agentcy" is a specialized firm that has shifted from labor-based delivery to agent-based delivery — pairing experts with software agents to get critical work done.',
    "Companies once relied on in-house teams and outsourced labor for this work. The agentcy model is predictable, scalable, and high-ROI for both providers and their clients — letting firms grow a business without growing headcount.",
    "Our tools are built to be deployed by agencies and consultants, giving them an unmatched implementation rate for their clients.",
  ],
  ctaLabel: "",
  ctaHref: "",
  showPartners: true,
  partnersEyebrow: "AGENCY Partners",
  partners: [
    { name: "Lean Labs" },
    { name: "Agency Two" },
    { name: "Agency Three" },
    { name: "Agency Four" },
    { name: "Agency Five" },
  ],
  cards: [
    { title: 'Explore the "agentcy" model', href: "https://agentcymodel.com" },
    { title: "See how AEO works", href: "https://howaeoworks.com" },
    { title: "Connect with Brandvious", href: "mailto:hello@brandvious.com" },
  ],
};

function LeanLabsSection() {
  const { theme } = useTheme();
  const party = theme === "sparkle";

  return (
    <section
      className="relative py-24 px-6 border-t border-white/[0.06]"
      data-testid="v2-section-leanlabs"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`relative rounded-2xl overflow-hidden p-8 md:p-12 transition-all duration-500 ${glassCard} ${glassCardBorder} ${
            party
              ? `${cardShadowBase} shadow-[0_2px_20px_rgba(0,0,0,0.3),0_0_40px_rgba(100,40,200,0.04),inset_0_1px_0_rgba(255,255,255,0.04)]`
              : cardShadowBase
          }`}
        >
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
            }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
                {leanLabs.eyebrow}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-6">
                {leanLabs.headingWhite}{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.35))",
                  }}
                >
                  {leanLabs.headingGradient}
                </span>
              </h2>
              <div className="space-y-4">
                {leanLabs.body.map((para, i) => (
                  <p key={i} className="text-sm text-white/55 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src={agentcyTransitionImage}
                alt="Visualization of the transition from labor-based to agent-based agency model"
                className="w-full h-auto rounded-xl border border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
                data-testid="v2-img-agentcy-transition"
              />
            </div>
          </div>
          {leanLabs.ctaHref && leanLabs.ctaLabel && (
            <a
              href={leanLabs.ctaHref}
              target={leanLabs.ctaHref.startsWith("http") ? "_blank" : undefined}
              rel={leanLabs.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300"
              data-testid="v2-link-leanlabs"
            >
              {leanLabs.ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
            </a>
          )}

          {leanLabs.showPartners && leanLabs.partners.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/[0.06]" data-testid="v2-leanlabs-partners">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-5">
                {leanLabs.partnersEyebrow}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {leanLabs.partners.map((p, i) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-center h-16 rounded-xl border border-white/[0.06] bg-white/[0.02] text-sm font-medium text-white/55"
                    data-testid={`v2-leanlabs-partner-${i}`}
                  >
                    {p.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {leanLabs.cards.map((card, i) => {
            const isExternal = card.href.startsWith("http");
            return (
              <a
                key={i}
                href={card.href}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`group relative rounded-2xl overflow-hidden p-8 flex items-center justify-between gap-4 transition-all duration-500 transform hover:-translate-y-0.5 ${glassCard} ${glassCardBorder} ${glassCardHover} ${cardShadowBase} ${party ? cardShadowParty : cardShadowHover}`}
                data-testid={`v2-leanlabs-card-${i}`}
              >
                <div
                  className="absolute inset-x-0 top-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                  }}
                />
                <h3 className="text-lg font-semibold text-white/85 group-hover:text-white transition-colors duration-300">
                  {card.title}
                </h3>
                <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function V2Footer() {
  const { theme, toggleTheme } = useTheme();
  const party = theme === "sparkle";
  const themeIcon =
    theme === "dark" ? <Sun className="w-4 h-4" /> :
    theme === "light" ? <Sparkles className="w-4 h-4" /> :
    <Moon className="w-4 h-4" />;
  // "/" and "/v3" both render v3 — normalize so the switcher highlights v3 on either URL.
  const rawPath =
    typeof window !== "undefined" ? window.location.pathname : "/";
  const currentPath = rawPath === "/v3" ? "/" : rawPath;

  return (
    <footer
      className="relative py-16 px-6 border-t border-white/[0.04]"
      data-testid="v2-footer"
    >
      {party && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[1px]"
            style={{
              boxShadow: "0 0 80px 40px rgba(140,80,255,0.15), 0 0 160px 80px rgba(100,40,200,0.08)",
            }}
          />
          <div
            className="absolute top-0 left-[15%] right-[15%] h-[1px]"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(140,80,255,0.35) 40%, rgba(160,100,255,0.5) 50%, rgba(140,80,255,0.35) 60%, transparent)",
            }}
          />
        </div>
      )}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <a
              href="/v4"
              className="inline-block text-base font-semibold text-white mb-2 hover:text-white/80 transition-colors"
              data-testid="v2-footer-link-home"
            >
              Brandvious<span className="font-light text-white/60">, Inc.</span>
            </a>
            <p className="text-sm text-white/45 max-w-xs mb-4">
              Fair and functional tools for LLM consensus.
            </p>
            <div className="space-y-1">
              <p className="text-xs text-white/30" data-testid="v2-text-address">
                16703 Early Riser Ave, Suite 111, Land O' Lakes, FL 34638
              </p>
              <a
                href="tel:+19138716500"
                className="text-xs text-white/30 hover:text-white/50 transition-colors block"
                data-testid="v2-link-phone"
              >
                1-913-871-6500
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-16 gap-y-4 text-sm">
            <div className="space-y-3">
              <p className="text-white/30 uppercase tracking-wider text-xs">Products</p>
              {products.map((p) => {
                const isExternal = !p.url.startsWith("/");
                return (
                  <a
                    key={p.name}
                    href={p.url}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="block text-white/50 hover:text-white transition-colors"
                    data-testid={`v2-footer-link-${p.name.toLowerCase().replace(/\./g, "-")}`}
                  >
                    {p.name}
                  </a>
                );
              })}
            </div>
            <div className="space-y-3">
              <p className="text-white/30 uppercase tracking-wider text-xs">Partners</p>
              {leanLabs.partners.map((p, i) => (
                <span
                  key={p.name}
                  className="block text-white/50"
                  data-testid={`v2-footer-partner-${i}`}
                >
                  {p.name}
                </span>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-white/30 uppercase tracking-wider text-xs">Connect</p>
              <a href="mailto:hello@brandvious.com" className="block text-white/50 hover:text-white transition-colors" data-testid="v2-footer-link-email">Contact</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.04] grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
          {/* Left: theme toggle + copyright */}
          <div className="flex items-center gap-3 justify-self-start">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              className="h-8 w-8 text-white/40 hover:text-white/80"
              data-testid="v2-button-theme-toggle"
            >
              {themeIcon}
            </Button>
            <p className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} Brandvious, Inc. All rights reserved.
            </p>
          </div>

          <div className="justify-self-center" />

          <div className="justify-self-end" />
        </div>
      </div>
    </footer>
  );
}

function PartyLayer() {
  const { theme } = useTheme();
  if (theme !== "sparkle") return null;
  return <PartyAtmosphere />;
}

export default function HomeV4() {
  return (
    <div className="min-h-screen bg-[hsl(220,10%,4%)] text-white relative" data-testid="v2-page">
      <PartyLayer />
      <NoiseOverlay />
      <V2Navbar />
      <V2Hero />
      <StatsRow />
      <ProductsSection />
      <LeanLabsSection />
      <V2Footer />
    </div>
  );
}
