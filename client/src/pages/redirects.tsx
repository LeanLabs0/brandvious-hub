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
  Wrench,
  PenLine,
  Cog,
  ClipboardList,
  MessageSquare,
  TrendingUp,
  Star,
  BarChart3,
  Target,
  RefreshCw,
  BookOpen,
  FileEdit,
  ListOrdered,
  Trophy,
  type LucideIcon,
} from "lucide-react";

// ---------------------------------------------------------------------------
// /redirects: catch-all landing page for domains that are still being built.
// Inspired by the "we're updating our website" pattern — nothing here links
// out; the items are the destinations themselves.
// ---------------------------------------------------------------------------

type RedirectItem = { name: string; icon: LucideIcon };

const toolItems: RedirectItem[] = [
  { name: "CopyRocket.ai", icon: PenLine },
  { name: "SprocketRocket.ai", icon: Cog },
  { name: "SurveyRocket.ai", icon: ClipboardList },
  { name: "AnswerRocket.io", icon: MessageSquare },
  { name: "RocketRank.ai", icon: TrendingUp },
];

const domainItems: RedirectItem[] = [
  { name: "ReviewInsight.com", icon: Star },
  { name: "B2BIndex.org", icon: BarChart3 },
  { name: "BestFit.org", icon: Target },
  { name: "GTM Loop.ai", icon: RefreshCw },
  { name: "GTMJournal.org", icon: BookOpen },
  { name: "GTMReview.org", icon: FileEdit },
  { name: "GTM Index.org", icon: ListOrdered },
  { name: "GTM 100.org", icon: Trophy },
];

function RedirectColumn({
  title,
  sub,
  items,
  visible,
  delay,
}: {
  title: string;
  sub: string;
  items: RedirectItem[];
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-6 sm:p-7 shadow-[0_2px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      data-testid={`redirects-column-${title.toLowerCase().replace(/[\s.]/g, "-")}`}
    >
      {/* purple glow along the top edge */}
      <div
        className="absolute top-0 left-[10%] right-[10%] h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(160,120,255,0.4), transparent)",
        }}
      />
      <div
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-[280px] h-[140px] blur-[80px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(110,60,240,0.10), transparent 70%)",
        }}
      />

      <p className="text-white/30 uppercase tracking-widest text-[11px]">{title}</p>
      <p className="text-white/45 text-xs mt-1.5 mb-6">{sub}</p>

      <div className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.name}
            className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.045] hover:border-white/[0.10] transition-colors"
            data-testid={`redirects-item-${item.name.toLowerCase().replace(/[\s.]/g, "-")}`}
          >
            <div className="w-8 h-8 shrink-0 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/45 group-hover:text-purple-300/70 transition-colors">
              <item.icon className="w-4 h-4" />
            </div>
            <span className="text-sm text-white/80 flex-1">{item.name}</span>
            <span className="text-[10px] uppercase tracking-wider text-white/30 border border-white/[0.08] rounded-full px-2.5 py-1 whitespace-nowrap">
              Coming soon
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Redirects() {
  const { theme } = useTheme();
  const party = theme === "sparkle";
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(220,10%,4%)] text-white relative" data-testid="redirects-page">
      <NoiseOverlay />
      <NewNavbar />

      <main className="relative px-6 pt-40 pb-28 overflow-hidden">
        <LightBeam party={party} />
        <FloatingParticles party={party} />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          <div
            className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 mb-8">
              <Wrench className="w-3.5 h-3.5 text-purple-300/70" />
              <span className="text-xs text-white/50 tracking-wide">Live updates in progress</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight" data-testid="redirects-text-headline">
              <span className="text-white">You caught us mid-build.</span>
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(160,120,255,0.55))",
                }}
              >
                These pages are next.
              </span>
            </h1>

            <p className="mt-6 max-w-xl mx-auto text-sm sm:text-base text-white/45 leading-relaxed" data-testid="redirects-text-sub">
              We redirected you here because the page you were looking for is one
              of a handful we're still building. They're being shipped as we
              go — and they're coming very soon.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-2 gap-6 w-full items-start text-left">
            <RedirectColumn
              title="GrowthRocket Tools"
              sub="The AI authority toolstack."
              items={toolItems}
              visible={visible}
              delay={150}
            />
            <RedirectColumn
              title="AEO Authority Domains"
              sub="The publishing network."
              items={domainItems}
              visible={visible}
              delay={300}
            />
          </div>
        </div>
      </main>

      <NewFooter />
    </div>
  );
}
