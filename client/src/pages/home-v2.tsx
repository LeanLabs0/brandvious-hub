import { useState, useEffect, useRef, useMemo } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const products = [
  {
    name: "SchemaRocket",
    domain: "schemarocket.ai",
    label: "Structured Data",
    description: "Schema markup that makes your brand machine-readable — so AI can understand, trust, and recommend you.",
    status: "Established",
    statusColor: "text-emerald-400",
    url: "/schema",
    icon: Braces,
    gradient: "from-orange-500 to-amber-400",
  },
  {
    name: "Entities.org",
    domain: "entities.org",
    label: "Entity Registry",
    description: "A canonical entity registry for machines. Verified data so AI always gets the right company.",
    status: "Growing",
    statusColor: "text-blue-400",
    url: "https://entitiesregistry.replit.app",
    icon: Globe,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    name: "WhatisBest",
    domain: "whatisbest.com",
    label: "Comparisons",
    description: "Expert-vetted B2B SaaS comparisons built to surface in AI search results.",
    status: "Launching",
    statusColor: "text-amber-400",
    url: "/whatisbest",
    icon: Trophy,
    gradient: "from-amber-500 to-yellow-400",
  },
  {
    name: "AnswerStack",
    domain: "answerstack.com",
    label: "Answers",
    description: "Schema-rich, expert-vetted content that AI engines cite as a credible source.",
    status: "In Development",
    statusColor: "text-neutral-400",
    url: "/answerstack",
    icon: Layers,
    gradient: "from-violet-500 to-purple-400",
  },
  {
    name: "ReviewRadar",
    domain: "reviewradar.com",
    label: "Trust",
    description: "Real-time sentiment from leading platforms and communities. Not biased. Not stale.",
    status: "Backlog",
    statusColor: "text-neutral-500",
    url: "/reviewradar",
    icon: Radar,
    gradient: "from-rose-500 to-pink-400",
  },
];

const stats = [
  { value: "5", label: "Products" },
  { value: "1", label: "Mission" },
  { value: "∞", label: "Machines served" },
];

function LightBeam() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" data-testid="light-beam">
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-[60vh]"
        style={{
          background: "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(120,80,255,0.3), transparent)",
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[200px] h-[60vh] blur-[80px]"
        style={{
          background: "linear-gradient(to bottom, rgba(120,80,255,0.15), rgba(80,120,255,0.08), transparent)",
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[40vh] blur-[120px]"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(100,60,255,0.08), transparent 70%)",
        }}
      />
    </div>
  );
}

function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }).map(() => ({
        size: Math.random() * 2 + 1,
        left: Math.random() * 100,
        bottom: Math.random() * 40,
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 10,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/[0.08] animate-float-particle"
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

function V2Navbar() {
  const { theme, toggleTheme } = useTheme();
  const icon =
    theme === "dark" ? <Sun className="w-4 h-4" /> :
    theme === "light" ? <Sparkles className="w-4 h-4" /> :
    <Moon className="w-4 h-4" />;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        backdropFilter: "blur(16px)",
        backgroundColor: "hsl(220 10% 6% / 0.7)",
      }}
      data-testid="v2-navbar"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/v2" className="text-base font-semibold tracking-tight text-white" data-testid="v2-link-home">
          Brandvious<span className="font-light text-white/60 ml-0.5">Digital</span>
        </a>
        <div className="flex items-center gap-6">
          <a href="#products" className="text-sm text-white/70 hover:text-white transition-colors hidden sm:block" data-testid="v2-nav-products">Products</a>
          <a href="#mission" className="text-sm text-white/70 hover:text-white transition-colors hidden sm:block" data-testid="v2-nav-mission">Mission</a>
          <a href="#thesis" className="text-sm text-white/70 hover:text-white transition-colors hidden sm:block" data-testid="v2-nav-thesis">Thesis</a>
          <Button size="icon" variant="ghost" onClick={toggleTheme} className="text-white/70 hover:text-white" data-testid="v2-button-theme-toggle">
            {icon}
          </Button>
          <a
            href="/"
            className="text-xs font-medium text-white/50 hover:text-white transition-colors px-2 py-1 rounded border border-white/10 hover:border-white/25"
            data-testid="v2-link-v1"
          >
            v1
          </a>
        </div>
      </div>
    </nav>
  );
}

function V2Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-start justify-center px-6 overflow-hidden" data-testid="v2-section-hero">
      <LightBeam />
      <FloatingParticles />

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
          Fair. Factual. Functional. Five products that give machines structured, verified data — so every business gets a fair shot.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-sm font-medium hover:border-white/40 hover:bg-white/5 transition-all"
            data-testid="v2-button-see-products"
          >
            See the products <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#mission"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white/70 text-sm font-medium hover:border-white/30 hover:text-white transition-all"
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
    <section className="relative py-16 px-6 border-t border-white/[0.06]" data-testid="v2-section-stats">
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="text-center" data-testid={`v2-stat-${i}`}>
            <div className="text-4xl sm:text-5xl font-bold text-white font-mono tracking-tight">{s.value}</div>
            <div className="mt-2 text-sm text-white/60 uppercase tracking-widest">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const isExternal = !product.url.startsWith("/");
  const [hovered, setHovered] = useState(false);
  const Icon = product.icon;

  return (
    <a
      href={product.url}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group relative block rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-testid={`v2-product-card-${index}`}
    >
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none ${hovered ? "opacity-100" : ""}`}
        style={{
          background: `radial-gradient(600px circle at ${hovered ? "50% 50%" : "50% 50%"}, rgba(255,255,255,0.03), transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} bg-opacity-10`}
            style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))` }}
          >
            <Icon className="w-5 h-5 text-white/70" />
          </div>
          <span className={`text-xs font-medium ${product.statusColor}`} data-testid={`v2-product-status-${index}`}>
            {product.status}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-white mb-1" data-testid={`v2-product-name-${index}`}>
          {product.name}
        </h3>
        <p className="text-xs text-white/50 font-mono mb-4">{product.domain}</p>
        <p className="text-sm text-white/60 leading-relaxed mb-6">{product.description}</p>

        <div className="flex items-center gap-1 text-sm text-white/50 group-hover:text-white/80 transition-colors">
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
  return (
    <section id="products" className="relative py-24 px-6" data-testid="v2-section-products">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">The Ecosystem</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
            Five products.{" "}
            <span className="text-white/50">One goal: make the internet machine-readable.</span>
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
    <section id="mission" className="relative py-24 px-6 border-t border-white/[0.06]" data-testid="v2-section-mission">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[400px] blur-[150px]"
          style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.05), transparent 70%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">The Mission</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Consensus is King.
            </h2>
          </div>

          <div className="space-y-8 pt-2">
            <p className="text-base text-white/60 leading-relaxed">
              AI is rewriting how people find, trust, and choose. Brandvious delivers factual brand data that LLMs can ingest and cite with ease.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThesisSection() {
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
    <section id="thesis" className="relative py-24 px-6 border-t border-white/[0.06]" data-testid="v2-section-thesis">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">Our Thesis</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
            Fair. Factual.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.35))",
              }}
            >
              Functional for AI.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((p, i) => (
            <div
              key={p.number}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-300 hover:border-white/[0.10]"
              data-testid={`v2-thesis-card-${i}`}
            >
              <span className="text-xs font-mono text-white/40">{p.number}</span>
              <h3 className="text-2xl font-bold text-white mt-3 mb-4">{p.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EcosystemVisual() {
  return (
    <section className="relative py-24 px-6 border-t border-white/[0.06]" data-testid="v2-section-ecosystem">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">How It Connects</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-6">
                One ecosystem.{" "}
                <span className="text-white/50">Every layer of AI visibility.</span>
              </h2>
              <p className="text-sm text-white/60 leading-relaxed mb-8">
                SchemaRocket makes your data structured. Entities.org makes your identity canonical. WhatisBest makes your category clear. AnswerStack makes your expertise citable. ReviewRadar makes your reputation transparent.
              </p>
              <a
                href="#products"
                className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                data-testid="v2-link-explore-products"
              >
                Explore the products <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                {products.map((p, i) => {
                  const Icon = p.icon;
                  const isExternal = !p.url.startsWith("/");
                  return (
                    <a
                      key={p.name}
                      href={p.url}
                      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`group rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 flex items-center gap-3 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06] ${
                        i === 4 ? "col-span-2" : ""
                      }`}
                      data-testid={`v2-ecosystem-item-${i}`}
                    >
                      <Icon className="w-4 h-4 text-white/50 flex-shrink-0 group-hover:text-white/70 transition-colors" />
                      <div>
                        <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{p.name}</div>
                        <div className="text-[10px] text-white/50 uppercase tracking-wider">{p.label}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
              <div className="absolute inset-0 pointer-events-none rounded-xl" style={{
                background: "radial-gradient(circle at 50% 50%, rgba(120,80,255,0.04), transparent 70%)",
              }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function V2Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-white/[0.06]" data-testid="v2-footer">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <div className="text-base font-semibold text-white mb-2">
              Brandvious<span className="font-light text-white/60 ml-0.5">Digital</span>
            </div>
            <p className="text-sm text-white/50 max-w-xs">
              Building products that make the internet work for both humans and machines.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-16 gap-y-4 text-sm">
            <div className="space-y-3">
              <p className="text-white/40 uppercase tracking-wider text-xs">Products</p>
              {products.map((p) => {
                const isExternal = !p.url.startsWith("/");
                return (
                  <a
                    key={p.name}
                    href={p.url}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="block text-white/60 hover:text-white transition-colors"
                    data-testid={`v2-footer-link-${p.name.toLowerCase().replace(/\./g, "-")}`}
                  >
                    {p.name}
                  </a>
                );
              })}
            </div>
            <div className="space-y-3">
              <p className="text-white/40 uppercase tracking-wider text-xs">Company</p>
              <a href="#mission" className="block text-white/60 hover:text-white transition-colors" data-testid="v2-footer-link-mission">Mission</a>
              <a href="#thesis" className="block text-white/60 hover:text-white transition-colors" data-testid="v2-footer-link-thesis">Thesis</a>
            </div>
            <div className="space-y-3">
              <p className="text-white/40 uppercase tracking-wider text-xs">Connect</p>
              <a href="mailto:hello@brandvious.com" className="block text-white/60 hover:text-white transition-colors" data-testid="v2-footer-link-email">Contact</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} Brandvious Digital. All rights reserved.</p>
          <p className="text-xs text-white/40">Fair. Factual. Functional for AI.</p>
        </div>
      </div>
    </footer>
  );
}

export default function HomeV2() {
  return (
    <div className="min-h-screen bg-[hsl(220,10%,4%)] text-white" data-testid="v2-page">
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
