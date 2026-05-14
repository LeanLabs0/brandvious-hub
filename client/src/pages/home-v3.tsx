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

const products = [
  {
    name: "SchemaRocket",
    domain: "schemarocket.ai",
    label: "Structured Data",
    subtitle: "Structured data for AI",
    description: "Schema markup that makes your brand machine-readable — so AI can understand, trust, and recommend you.",
    status: "Established",
    statusColor: "text-emerald-400",
    url: "/schema",
    icon: Braces,
  },
  {
    name: "Entities.org",
    domain: "entities.org",
    label: "Entity Registry",
    subtitle: "Entity registry for AI",
    description: "A canonical entity registry for machines. Verified data so AI always gets the right company.",
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
    description: "Expert-vetted B2B SaaS comparisons built to surface in AI search results.",
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
    description: "Schema-rich, expert-vetted content that AI engines cite as a credible source.",
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
    description: "Real-time sentiment from leading platforms and communities. Not biased. Not stale.",
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
    description: "Records when a brand is mentioned across articles, blogs, comparisons, and more.",
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
  { label: "v1", path: "/" },
  { label: "v2", path: "/v2" },
  { label: "v3", path: "/v3" },
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
        <a href="/v3" className="text-base font-semibold tracking-tight text-white" data-testid="v2-link-home">
          Brandvious<span className="font-light text-white/60 ml-0.5">Digital</span>
        </a>
        <div className="flex items-center gap-6">
          <a href="#products" className="text-sm text-white/70 hover:text-white transition-colors hidden sm:block" data-testid="v2-nav-products">Products</a>
          <a href="#mission" className="text-sm text-white/70 hover:text-white transition-colors hidden sm:block" data-testid="v2-nav-mission">Mission</a>
          <a href="#thesis" className="text-sm text-white/70 hover:text-white transition-colors hidden sm:block" data-testid="v2-nav-thesis">Thesis</a>
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
          <span className="text-white">We build products that </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.4))",
            }}
          >
            make the internet
          </span>
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.3))",
            }}
          >
            {" "}work for AI.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed" data-testid="v2-text-subheadline">
          Equitable outcomes for businesses across AI. Five products that give machines structured, verified data — so every business gets a fair shot.
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
            See the products <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#mission"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.08] text-white/70 text-sm font-medium hover:border-white/[0.16] hover:text-white transition-all duration-300"
            data-testid="v2-button-mission"
          >
            Our mission <ArrowRight className="w-4 h-4" />
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
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">The Ecosystem</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
            Five products.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.35))",
              }}
            >
              One goal: make the internet machine-readable.
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

function MissionSection() {
  return (
    <section
      id="mission"
      className="relative py-24 px-6 border-t border-white/[0.06]"
      data-testid="v2-section-mission"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">The Mission</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Consensus is King.
            </h2>
          </div>

          <div className="space-y-8 pt-2">
            <p className="text-base text-white/55 leading-relaxed">
              AI is rewriting how people find, trust, and choose. Brandvious delivers factual brand data that LLMs can ingest and cite with ease.
            </p>
          </div>
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
      title: "Fair",
      description: "Every business deserves to be accurately represented to AI. Not just the ones that can afford to game the system.",
    },
    {
      number: "02",
      title: "Factual",
      description: "AI is only as good as its sources. We provide structured, verified, machine-readable data — not SEO noise.",
    },
    {
      number: "03",
      title: "Functional",
      description: "Every product we ship makes web content more useful for humans and AI alike. Real utility, not vaporware.",
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
            Equitable outcomes for{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.35))",
              }}
            >
              businesses across AI.
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

function EcosystemCard({ product, index }: { product: typeof products[0]; index: number }) {
  const { theme } = useTheme();
  const Icon = product.icon;
  const isExternal = !product.url.startsWith("/");
  const party = theme === "sparkle";

  return (
    <a
      key={product.name}
      href={product.url}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative overflow-hidden rounded-xl p-5 flex items-center gap-4 transition-all duration-500 backdrop-blur-sm bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.14] shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)] ${
        party
          ? "hover:shadow-[0_4px_24px_rgba(0,0,0,0.3),0_0_20px_rgba(100,40,200,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]"
          : "hover:shadow-[0_4px_24px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)]"
      }`}
      data-testid={`v2-ecosystem-item-${index}`}
    >
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
        }}
      />

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: party
            ? "radial-gradient(ellipse at center, rgba(100,40,200,0.05), transparent 70%)"
            : "radial-gradient(ellipse at center, rgba(255,255,255,0.03), transparent 70%)",
        }}
      />

      <div
        className="relative flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
          boxShadow: party
            ? "inset 0 1px 0 rgba(255,255,255,0.05), 0 1px 4px rgba(0,0,0,0.15)"
            : "inset 0 1px 0 rgba(255,255,255,0.05), 0 1px 4px rgba(0,0,0,0.15)",
        }}
      >
        <Icon className="w-4.5 h-4.5 transition-all duration-300 text-white/50 group-hover:text-white/80" />
      </div>

      <div className="relative">
        <div className="text-sm font-semibold transition-colors duration-300 text-white/80 group-hover:text-white">
          {product.name}
        </div>
        <div className="text-[10px] uppercase tracking-wider mt-0.5 text-white/35 group-hover:text-white/55">
          {product.subtitle}
        </div>
      </div>

      <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 text-white/40" />
    </a>
  );
}

function EcosystemVisual() {
  const { theme } = useTheme();
  const party = theme === "sparkle";

  return (
    <section
      className="relative py-24 px-6 border-t border-white/[0.06]"
      data-testid="v2-section-ecosystem"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`rounded-2xl overflow-hidden p-8 md:p-12 transition-all duration-500 ${glassCard} ${glassCardBorder} ${party ? `${cardShadowBase} shadow-[0_2px_20px_rgba(0,0,0,0.3),0_0_40px_rgba(100,40,200,0.04),inset_0_1px_0_rgba(255,255,255,0.04)]` : cardShadowBase}`}>
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
            }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">How It Connects</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-6">
                One ecosystem.{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.35))",
                  }}
                >
                  Every layer of AI visibility.
                </span>
              </h2>
              <p className="text-sm text-white/55 leading-relaxed mb-8">
                SchemaRocket makes your data structured. Entities.org makes your identity canonical. WhatisBest makes your category clear. AnswerStack makes your expertise citable. ReviewInsight makes your reputation transparent. Mentions.io makes your presence provable.
              </p>
              <a
                href="#products"
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300"
                data-testid="v2-link-explore-products"
              >
                Explore the products <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                {products.map((p, i) => (
                  <EcosystemCard key={p.name} product={p} index={i} />
                ))}
              </div>
            </div>
          </div>
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
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "/v3";

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
            <div className="text-base font-semibold text-white mb-2">
              Brandvious<span className="font-light text-white/60">, Inc.</span>
            </div>
            <p className="text-sm text-white/45 max-w-xs mb-4">
              Equitable outcomes for businesses across AI.
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
              <p className="text-white/30 uppercase tracking-wider text-xs">Company</p>
              <a href="#mission" className="block text-white/50 hover:text-white transition-colors" data-testid="v2-footer-link-mission">Mission</a>
              <a href="#thesis" className="block text-white/50 hover:text-white transition-colors" data-testid="v2-footer-link-thesis">Thesis</a>
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

          {/* Center: version switcher */}
          <nav
            className="flex items-center gap-3 justify-self-center"
            data-testid="v2-version-switcher"
          >
            {versions.map((v, i) => {
              const isCurrent = currentPath === v.path;
              return (
                <span key={v.label} className="flex items-center gap-3">
                  <a
                    href={v.path}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`text-xs transition-colors ${
                      isCurrent
                        ? "text-white/80 font-medium"
                        : "text-white/30 hover:text-white/70"
                    }`}
                    data-testid={`v2-version-link-${v.label}`}
                  >
                    {v.label}
                  </a>
                  {i < versions.length - 1 && (
                    <span className="text-white/15 text-xs">·</span>
                  )}
                </span>
              );
            })}
          </nav>

          {/* Right: tagline */}
          <p className="text-xs text-white/30 justify-self-end text-right">
            Equitable outcomes for businesses across AI.
          </p>
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

export default function HomeV3() {
  return (
    <div className="min-h-screen bg-[hsl(220,10%,4%)] text-white relative" data-testid="v2-page">
      <PartyLayer />
      <NoiseOverlay />
      <V2Navbar />
      <V2Hero />
      <StatsRow />
      <ProductsSection />
      <MissionSection />
      <ThesisSection />
      <EcosystemVisual />
      <V2Footer />
    </div>
  );
}
