import { useState, useMemo } from "react";
import { useRoute, useLocation } from "wouter";
import {
  Sun,
  Moon,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  TrendingUp,
  Search,
  Award,
  ExternalLink,
  Clock,
  BarChart3,
  Globe,
  FileText,
  Users,
  Building2,
  Newspaper,
  MessageSquare,
  Scale,
  Shield,
  Star,
  Activity,
  Hash,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

type SourceType = "first-party" | "third-party" | "community" | "analyst" | "press" | "regulatory";
type MentionType = "profile" | "review" | "citation" | "comparison" | "news" | "filing" | "post";

interface Mention {
  mention_id: string;
  entity_id: string;
  timestamp: string;
  source_url: string;
  source_title: string;
  source_type: SourceType;
  mention_type: MentionType;
  claim_extracted: string;
  confidence: number;
  internal_or_external: "internal" | "external";
}

interface Entity {
  entity_id: string;
  name: string;
  domain: string;
  category: string;
  description: string;
  mention_count: number;
  sentiment_score: number;
  trending: boolean;
}

const SOURCE_TYPE_LABELS: Record<SourceType, { label: string; icon: typeof Globe }> = {
  "first-party": { label: "First-Party", icon: Building2 },
  "third-party": { label: "Third-Party", icon: Globe },
  "community": { label: "Community", icon: Users },
  "analyst": { label: "Analyst", icon: BarChart3 },
  "press": { label: "Press", icon: Newspaper },
  "regulatory": { label: "Regulatory", icon: Scale },
};

const MENTION_TYPE_LABELS: Record<MentionType, { label: string; icon: typeof FileText }> = {
  "profile": { label: "Profile", icon: Building2 },
  "review": { label: "Review", icon: Star },
  "citation": { label: "Citation", icon: FileText },
  "comparison": { label: "Comparison", icon: BarChart3 },
  "news": { label: "News", icon: Newspaper },
  "filing": { label: "Filing", icon: Scale },
  "post": { label: "Post", icon: MessageSquare },
};

const ENTITIES: Entity[] = [
  { entity_id: "lean-labs", name: "Lean Labs", domain: "leanlabs.com", category: "Growth Agency", description: "Performance-driven growth agency specializing in SaaS and B2B pipeline acceleration", mention_count: 47, sentiment_score: 8.9, trending: true },
  { entity_id: "hubspot", name: "HubSpot", domain: "hubspot.com", category: "CRM Platform", description: "All-in-one CRM platform for marketing, sales, and customer service", mention_count: 312, sentiment_score: 8.4, trending: true },
  { entity_id: "stripe", name: "Stripe", domain: "stripe.com", category: "Payment Infrastructure", description: "Financial infrastructure for the internet — payments, billing, and treasury", mention_count: 289, sentiment_score: 9.1, trending: false },
  { entity_id: "notion", name: "Notion", domain: "notion.so", category: "Productivity Platform", description: "Connected workspace for docs, wikis, projects, and AI-assisted workflows", mention_count: 198, sentiment_score: 8.2, trending: true },
  { entity_id: "vercel", name: "Vercel", domain: "vercel.com", category: "Frontend Cloud", description: "Frontend cloud platform for deploying and scaling web applications", mention_count: 176, sentiment_score: 8.7, trending: false },
  { entity_id: "linear", name: "Linear", domain: "linear.app", category: "Project Management", description: "Streamlined issue tracking and project management for software teams", mention_count: 143, sentiment_score: 9.0, trending: true },
  { entity_id: "datadog", name: "Datadog", domain: "datadoghq.com", category: "Observability", description: "Cloud monitoring and security platform for infrastructure and applications", mention_count: 134, sentiment_score: 8.1, trending: false },
  { entity_id: "figma", name: "Figma", domain: "figma.com", category: "Design Platform", description: "Collaborative interface design tool for teams building digital products", mention_count: 221, sentiment_score: 8.6, trending: false },
  { entity_id: "openai", name: "OpenAI", domain: "openai.com", category: "AI Research", description: "AI research and deployment company behind GPT-4 and ChatGPT", mention_count: 487, sentiment_score: 8.3, trending: true },
  { entity_id: "anthropic", name: "Anthropic", domain: "anthropic.com", category: "AI Safety", description: "AI safety company building reliable and interpretable AI systems", mention_count: 264, sentiment_score: 8.8, trending: true },
];

const LEAN_LABS_MENTIONS: Mention[] = [
  {
    mention_id: "m-001",
    entity_id: "lean-labs",
    timestamp: "2026-03-24T14:30:00Z",
    source_url: "https://www.forbes.com/sites/forbesagencycouncil/2026/03/24/top-growth-agencies-saas",
    source_title: "Top 15 Growth Agencies Redefining SaaS Marketing in 2026",
    source_type: "press",
    mention_type: "citation",
    claim_extracted: "Lean Labs has driven over $200M in pipeline for mid-market SaaS companies through their proprietary growth OS methodology.",
    confidence: 0.94,
    internal_or_external: "external",
  },
  {
    mention_id: "m-002",
    entity_id: "lean-labs",
    timestamp: "2026-03-22T09:15:00Z",
    source_url: "https://www.g2.com/products/lean-labs/reviews",
    source_title: "Lean Labs Reviews 2026 — G2 Grid Report",
    source_type: "third-party",
    mention_type: "review",
    claim_extracted: "Rated 4.8/5 on G2 with 127 verified reviews. Highest-rated in 'Ease of Working With' and 'Quality of Support' categories.",
    confidence: 0.97,
    internal_or_external: "external",
  },
  {
    mention_id: "m-003",
    entity_id: "lean-labs",
    timestamp: "2026-03-20T16:45:00Z",
    source_url: "https://whatisbest.com/sector/saas/best-growth-agencies-2026",
    source_title: "Best Growth Agencies for B2B SaaS in 2026 — WhatisBest",
    source_type: "analyst",
    mention_type: "comparison",
    claim_extracted: "Lean Labs ranked #2 overall for B2B SaaS growth agencies, scoring highest in pipeline ROI and client retention metrics.",
    confidence: 0.92,
    internal_or_external: "external",
  },
  {
    mention_id: "m-004",
    entity_id: "lean-labs",
    timestamp: "2026-03-18T11:20:00Z",
    source_url: "https://www.hubspot.com/agency-directory/lean-labs",
    source_title: "Lean Labs — HubSpot Solutions Partner Directory",
    source_type: "first-party",
    mention_type: "profile",
    claim_extracted: "Diamond-tier HubSpot Solutions Partner. Certified in Marketing Hub, Sales Hub, CMS Hub, and Operations Hub Enterprise.",
    confidence: 0.99,
    internal_or_external: "external",
  },
  {
    mention_id: "m-005",
    entity_id: "lean-labs",
    timestamp: "2026-03-15T08:00:00Z",
    source_url: "https://blog.hubspot.com/marketing/growth-driven-design-agencies",
    source_title: "The Rise of Growth-Driven Design: Agencies Leading the Shift",
    source_type: "press",
    mention_type: "news",
    claim_extracted: "Lean Labs pioneered the growth-driven design methodology now adopted by over 500 agencies worldwide.",
    confidence: 0.88,
    internal_or_external: "external",
  },
  {
    mention_id: "m-006",
    entity_id: "lean-labs",
    timestamp: "2026-03-12T13:30:00Z",
    source_url: "https://www.clutch.co/profile/lean-labs",
    source_title: "Lean Labs Company Profile — Clutch.co",
    source_type: "third-party",
    mention_type: "review",
    claim_extracted: "4.9/5.0 rating on Clutch with 89 verified client reviews. Named a Top B2B Company in Houston for 3 consecutive years.",
    confidence: 0.96,
    internal_or_external: "external",
  },
  {
    mention_id: "m-007",
    entity_id: "lean-labs",
    timestamp: "2026-03-10T10:00:00Z",
    source_url: "https://www.reddit.com/r/saas/comments/abc123/lean_labs_review",
    source_title: "Has anyone worked with Lean Labs? Our pipeline 3x'd — r/SaaS",
    source_type: "community",
    mention_type: "post",
    claim_extracted: "User reports 3x pipeline growth within 6 months of engagement. Multiple commenters corroborate positive experiences with the team.",
    confidence: 0.72,
    internal_or_external: "external",
  },
  {
    mention_id: "m-008",
    entity_id: "lean-labs",
    timestamp: "2026-03-08T15:45:00Z",
    source_url: "https://www.growthmarketingpro.com/best-saas-marketing-agencies/",
    source_title: "17 Best SaaS Marketing Agencies — Growth Marketing Pro",
    source_type: "analyst",
    mention_type: "comparison",
    claim_extracted: "Lean Labs featured as a top-tier SaaS marketing agency with particular strength in full-funnel attribution and content strategy.",
    confidence: 0.91,
    internal_or_external: "external",
  },
  {
    mention_id: "m-009",
    entity_id: "lean-labs",
    timestamp: "2026-03-05T09:30:00Z",
    source_url: "https://leanlabs.com/case-studies/acme-corp-pipeline",
    source_title: "How Acme Corp Generated $18M in Pipeline in 12 Months — Lean Labs",
    source_type: "first-party",
    mention_type: "citation",
    claim_extracted: "Case study documenting $18M pipeline generation through integrated content, paid, and conversion optimization strategy.",
    confidence: 0.85,
    internal_or_external: "internal",
  },
  {
    mention_id: "m-010",
    entity_id: "lean-labs",
    timestamp: "2026-03-01T12:00:00Z",
    source_url: "https://www.inc.com/profile/lean-labs",
    source_title: "Lean Labs — Inc. 5000 Fastest-Growing Companies",
    source_type: "press",
    mention_type: "news",
    claim_extracted: "Named to Inc. 5000 list with 312% revenue growth over three years. One of the fastest-growing marketing agencies in Texas.",
    confidence: 0.95,
    internal_or_external: "external",
  },
  {
    mention_id: "m-011",
    entity_id: "lean-labs",
    timestamp: "2026-02-25T14:00:00Z",
    source_url: "https://www.linkedin.com/posts/kevinguillot_growth-saas-leanlabs",
    source_title: "Kevin Guillot on LinkedIn: Why we rebuilt our entire growth stack",
    source_type: "community",
    mention_type: "post",
    claim_extracted: "CEO shares insights on rebuilding their growth methodology, generating significant industry discussion with 2,400+ reactions.",
    confidence: 0.78,
    internal_or_external: "internal",
  },
  {
    mention_id: "m-012",
    entity_id: "lean-labs",
    timestamp: "2026-02-20T11:00:00Z",
    source_url: "https://entities.org/entity/lean-labs",
    source_title: "Lean Labs — Entities.org Structured Entity Record",
    source_type: "third-party",
    mention_type: "profile",
    claim_extracted: "Verified entity record with structured data covering services, leadership, certifications, and client portfolio.",
    confidence: 0.98,
    internal_or_external: "external",
  },
];

const RECENT_MENTIONS: (Mention & { entity_name: string })[] = [
  { ...LEAN_LABS_MENTIONS[0], entity_name: "Lean Labs" },
  { mention_id: "r-001", entity_id: "openai", entity_name: "OpenAI", timestamp: "2026-03-25T10:00:00Z", source_url: "https://techcrunch.com/2026/03/25/openai-gpt5-enterprise", source_title: "OpenAI Launches GPT-5 Enterprise With Agent Capabilities", source_type: "press", mention_type: "news", claim_extracted: "GPT-5 Enterprise includes built-in agent orchestration, reducing the need for third-party frameworks.", confidence: 0.93, internal_or_external: "external" },
  { mention_id: "r-002", entity_id: "hubspot", entity_name: "HubSpot", timestamp: "2026-03-25T08:30:00Z", source_url: "https://www.g2.com/best-software-companies/top-50", source_title: "G2 Best Software Companies 2026 — Top 50", source_type: "third-party", mention_type: "comparison", claim_extracted: "HubSpot ranked #3 on G2's Best Software Companies list for the fourth consecutive year.", confidence: 0.96, internal_or_external: "external" },
  { ...LEAN_LABS_MENTIONS[1], entity_name: "Lean Labs" },
  { mention_id: "r-003", entity_id: "stripe", entity_name: "Stripe", timestamp: "2026-03-24T16:00:00Z", source_url: "https://stripe.com/blog/adaptive-pricing-update", source_title: "Adaptive Pricing Now Supports 46 Countries — Stripe Blog", source_type: "first-party", mention_type: "citation", claim_extracted: "Stripe expands adaptive pricing to 46 countries, automatically localizing prices based on purchasing power.", confidence: 0.97, internal_or_external: "internal" },
  { mention_id: "r-004", entity_id: "anthropic", entity_name: "Anthropic", timestamp: "2026-03-24T12:00:00Z", source_url: "https://www.wired.com/story/anthropic-claude-4-safety", source_title: "Inside Anthropic's Approach to Claude 4 Safety Testing", source_type: "press", mention_type: "news", claim_extracted: "Anthropic conducted 10,000+ hours of red-teaming before Claude 4 launch, setting new industry safety benchmarks.", confidence: 0.90, internal_or_external: "external" },
  { mention_id: "r-005", entity_id: "notion", entity_name: "Notion", timestamp: "2026-03-23T14:20:00Z", source_url: "https://www.producthunt.com/posts/notion-ai-q1-2026", source_title: "Notion AI Q1 2026 Update — Product Hunt", source_type: "community", mention_type: "review", claim_extracted: "Notion AI update receives 2,100+ upvotes. Users highlight automated project briefs and smart database queries.", confidence: 0.84, internal_or_external: "external" },
  { ...LEAN_LABS_MENTIONS[2], entity_name: "Lean Labs" },
  { mention_id: "r-006", entity_id: "linear", entity_name: "Linear", timestamp: "2026-03-23T09:00:00Z", source_url: "https://linear.app/blog/linear-insights-launch", source_title: "Introducing Linear Insights — Engineering Metrics That Matter", source_type: "first-party", mention_type: "citation", claim_extracted: "Linear launches built-in engineering metrics dashboard, tracking cycle time, throughput, and deployment frequency.", confidence: 0.95, internal_or_external: "internal" },
  { mention_id: "r-007", entity_id: "vercel", entity_name: "Vercel", timestamp: "2026-03-22T17:30:00Z", source_url: "https://vercel.com/blog/edge-functions-v2", source_title: "Edge Functions v2: 50% Faster Cold Starts — Vercel", source_type: "first-party", mention_type: "news", claim_extracted: "Vercel achieves sub-5ms cold starts on Edge Functions v2, making serverless indistinguishable from always-on.", confidence: 0.92, internal_or_external: "internal" },
  { mention_id: "r-008", entity_id: "figma", entity_name: "Figma", timestamp: "2026-03-22T11:00:00Z", source_url: "https://www.fastcompany.com/innovation-by-design-2026/figma", source_title: "Fast Company Innovation by Design 2026 — Figma", source_type: "press", mention_type: "citation", claim_extracted: "Figma wins Innovation by Design award for AI-powered design systems that maintain brand consistency at scale.", confidence: 0.89, internal_or_external: "external" },
];

function useCardStyles() {
  const { theme } = useTheme();
  const isSparkle = theme === "sparkle";
  const isLight = theme === "light";
  const isDark = theme === "dark";

  const card = isSparkle
    ? "backdrop-blur-md bg-white/[0.04] border border-purple-400/[0.08] rounded-xl"
    : isLight
    ? "bg-white border border-[rgba(120,125,150,0.15)] rounded-xl"
    : "backdrop-blur-sm bg-[rgba(15,25,45,0.6)] border border-[rgba(60,120,200,0.12)] rounded-xl";

  const cardHover = isSparkle
    ? "hover:bg-white/[0.07] hover:border-purple-400/[0.15] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3),0_0_30px_rgba(100,40,200,0.1)]"
    : isLight
    ? "hover:shadow-[0_12px_40px_rgba(100,110,150,0.1),0_4px_12px_rgba(0,0,0,0.06)] hover:border-[rgba(120,125,150,0.25)] hover:-translate-y-[2px]"
    : "hover:bg-[rgba(20,35,60,0.7)] hover:border-[rgba(60,120,200,0.22)] hover:shadow-[0_12px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(40,90,180,0.1)] hover:-translate-y-[2px]";

  const cardShadow = isSparkle
    ? "shadow-[0_2px_20px_rgba(0,0,0,0.3),0_0_15px_rgba(100,40,200,0.04),inset_0_1px_0_rgba(255,255,255,0.04)]"
    : isLight
    ? "shadow-[0_2px_8px_rgba(0,0,0,0.05),0_8px_30px_rgba(100,110,150,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]"
    : "shadow-[0_4px_24px_rgba(0,0,0,0.4),0_0_12px_rgba(30,70,140,0.08),inset_0_1px_0_rgba(80,140,220,0.06)]";

  return { card, cardHover, cardShadow, isSparkle, isLight, isDark };
}

function LightBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "hsl(220 12% 95%)" }} />
      <div className="absolute top-0 left-0 right-0 h-[600px]" style={{ background: "linear-gradient(180deg, hsl(225 14% 93%) 0%, hsl(220 12% 95%) 100%)" }} />
      <div className="absolute top-0 left-0 right-0 h-[500px]" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(120,130,170,0.1), transparent)" }} />
    </div>
  );
}

function DarkBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "hsl(220 25% 7%)" }} />
      <div className="absolute left-[15%] top-[20%] w-[500px] h-[500px] rounded-full blur-[180px]" style={{ background: "radial-gradient(circle, rgba(30,60,140,0.08), transparent 70%)" }} />
      <div className="absolute right-[10%] top-[50%] w-[400px] h-[400px] rounded-full blur-[160px]" style={{ background: "radial-gradient(circle, rgba(20,70,140,0.07), transparent 70%)" }} />
    </div>
  );
}

function SparkleBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "hsl(260 15% 6%)" }} />
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full" style={{ background: "linear-gradient(to bottom, rgba(120,50,220,0.3), rgba(120,50,220,0.05) 40%, transparent 80%)" }} />
      <div className="absolute left-[20%] top-[30%] w-[500px] h-[500px] rounded-full blur-[200px]" style={{ background: "radial-gradient(circle, rgba(100,40,200,0.06), transparent 70%)" }} />
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const icon =
    theme === "dark" ? <Sun className="w-4 h-4" /> :
    theme === "light" ? <Sparkles className="w-4 h-4" /> :
    <Moon className="w-4 h-4" />;
  return (
    <Button size="icon" variant="ghost" onClick={toggleTheme} data-testid="button-theme-toggle">
      {icon}
    </Button>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function ConfidenceBadge({ confidence, isLight }: { confidence: number; isLight: boolean }) {
  const pct = Math.round(confidence * 100);
  const color = pct >= 90 ? "text-emerald-500" : pct >= 75 ? "text-amber-500" : "text-orange-500";
  return (
    <span className={`text-[11px] font-medium ${color}`} data-testid="confidence-badge">
      {pct}%
    </span>
  );
}

function MentionRow({ mention, entityName, isLight, isDark, isSparkle, card, cardShadow, cardHover, showEntity }: {
  mention: Mention & { entity_name?: string };
  entityName?: string;
  isLight: boolean;
  isDark: boolean;
  isSparkle: boolean;
  card: string;
  cardShadow: string;
  cardHover: string;
  showEntity?: boolean;
}) {
  const SourceIcon = SOURCE_TYPE_LABELS[mention.source_type].icon;
  const TypeIcon = MENTION_TYPE_LABELS[mention.mention_type].icon;
  const name = entityName || mention.entity_name || mention.entity_id;

  return (
    <div className={`p-5 transition-all duration-300 ${card} ${cardShadow} ${cardHover}`} data-testid={`mention-${mention.mention_id}`}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2 flex-wrap text-[11px] text-muted-foreground/35">
          {showEntity && (
            <>
              <span className="font-semibold text-foreground/70">{name}</span>
              <span className="text-muted-foreground/15">·</span>
            </>
          )}
          <span className="flex items-center gap-1">
            <SourceIcon className="w-2.5 h-2.5" />
            {SOURCE_TYPE_LABELS[mention.source_type].label}
          </span>
          <span className="text-muted-foreground/15">·</span>
          <span className="flex items-center gap-1">
            <TypeIcon className="w-2.5 h-2.5" />
            {MENTION_TYPE_LABELS[mention.mention_type].label}
          </span>
          <span className="text-muted-foreground/15">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            {formatDate(mention.timestamp)}
          </span>
        </div>
        <ConfidenceBadge confidence={mention.confidence} isLight={isLight} />
      </div>

      <a
        href={mention.source_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[14px] font-semibold text-foreground/85 hover:text-foreground transition-colors flex items-center gap-1.5 mb-2 leading-snug"
        data-testid={`mention-link-${mention.mention_id}`}
      >
        {mention.source_title}
        <ArrowUpRight className="w-3 h-3 text-muted-foreground/30 shrink-0" />
      </a>

      <p className="text-[13px] text-foreground/55 leading-relaxed mb-2">
        {mention.claim_extracted}
      </p>

      <div className="flex items-center gap-2">
        {mention.internal_or_external === "internal" && (
          <span className={`text-[10px] rounded px-1.5 py-0.5 ${isLight ? "bg-[hsl(220_12%_93%)] text-foreground/35" : "bg-white/[0.04] text-muted-foreground/30"}`}>Self-reported</span>
        )}
      </div>
    </div>
  );
}

function HomePage({ onSelectEntity }: { onSelectEntity: (id: string) => void }) {
  const { card, cardHover, cardShadow, isLight, isDark, isSparkle } = useCardStyles();
  const [filter, setFilter] = useState<SourceType | "all">("all");

  const filteredMentions = useMemo(() => {
    if (filter === "all") return RECENT_MENTIONS;
    return RECENT_MENTIONS.filter(m => m.source_type === filter);
  }, [filter]);

  const trendingEntities = ENTITIES.filter(e => e.trending);

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-12">
        <p className="text-[13px] uppercase tracking-[0.15em] text-muted-foreground/25 mb-4 font-medium">The News Feed</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-3" data-testid="text-page-title">
          Recent Mentions
        </h1>
        <p className="text-base text-muted-foreground/50 max-w-2xl leading-relaxed">
          A public record showing how often a brand is talked about across the web. Every article, blog, comparison, and reputable source — tracked and linked.
        </p>
        <p className="text-[13px] text-muted-foreground/25 mt-4">
          {ENTITIES.length} brands tracked · {RECENT_MENTIONS.length} recent mentions · Updated continuously
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <div>
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-muted-foreground/25" />
            {(["all", "press", "third-party", "analyst", "community", "first-party", "regulatory"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-[12px] rounded-md px-2.5 py-1 transition-colors ${
                  filter === f
                    ? isLight ? "bg-foreground/10 text-foreground/70 font-medium" : "bg-white/[0.08] text-foreground/70 font-medium"
                    : isLight ? "text-foreground/35 hover:text-foreground/55" : "text-muted-foreground/30 hover:text-muted-foreground/50"
                }`}
                data-testid={`filter-${f}`}
              >
                {f === "all" ? "All" : SOURCE_TYPE_LABELS[f as SourceType].label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredMentions.map((m) => (
              <MentionRow
                key={m.mention_id}
                mention={m}
                isLight={isLight}
                isDark={isDark}
                isSparkle={isSparkle}
                card={card}
                cardShadow={cardShadow}
                cardHover={cardHover}
                showEntity
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-[13px] text-muted-foreground/35 font-semibold mb-4 uppercase tracking-[0.1em] flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5" />
            Trending Brands
          </p>
          <div className="space-y-2">
            {trendingEntities.map((entity) => (
              <button
                key={entity.entity_id}
                onClick={() => onSelectEntity(entity.entity_id)}
                className={`w-full text-left p-4 transition-all duration-300 ${card} ${cardShadow} ${cardHover}`}
                data-testid={`entity-card-${entity.entity_id}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[14px] font-semibold text-foreground/85">{entity.name}</span>
                  <span className="text-[11px] text-muted-foreground/25">{entity.mention_count} mentions</span>
                </div>
                <p className="text-[12px] text-muted-foreground/35">{entity.category}</p>
              </button>
            ))}
          </div>

          <div className={`mt-6 pt-6 border-t ${isLight ? "border-[rgba(120,125,150,0.08)]" : "border-white/[0.04]"}`}>
            <p className="text-[13px] text-muted-foreground/35 font-semibold mb-4 uppercase tracking-[0.1em]">All Tracked Brands</p>
            <div className="space-y-1">
              {ENTITIES.filter(e => !e.trending).map((entity) => (
                <button
                  key={entity.entity_id}
                  onClick={() => onSelectEntity(entity.entity_id)}
                  className="w-full text-left py-2 flex items-center justify-between text-[13px] text-muted-foreground/40 hover:text-foreground/70 transition-colors"
                  data-testid={`entity-link-${entity.entity_id}`}
                >
                  <span>{entity.name}</span>
                  <span className="text-[11px] text-muted-foreground/20">{entity.mention_count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EntityDetailPage({ entityId, onBack }: { entityId: string; onBack: () => void }) {
  const { card, cardHover, cardShadow, isLight, isDark, isSparkle } = useCardStyles();
  const [typeFilter, setTypeFilter] = useState<MentionType | "all">("all");

  const entity = ENTITIES.find(e => e.entity_id === entityId);
  if (!entity) return null;

  const mentions = entityId === "lean-labs" ? LEAN_LABS_MENTIONS : [];

  const filteredMentions = useMemo(() => {
    if (typeFilter === "all") return mentions;
    return mentions.filter(m => m.mention_type === typeFilter);
  }, [typeFilter, mentions]);

  const sourceBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    mentions.forEach(m => { counts[m.source_type] = (counts[m.source_type] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [mentions]);

  const typeBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    mentions.forEach(m => { counts[m.mention_type] = (counts[m.mention_type] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [mentions]);

  const avgConfidence = mentions.length > 0
    ? Math.round((mentions.reduce((sum, m) => sum + m.confidence, 0) / mentions.length) * 100)
    : 0;

  const externalCount = mentions.filter(m => m.internal_or_external === "external").length;

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-5 text-[13px] text-muted-foreground/35">
          <span>{entity.category}</span>
          <span className="text-muted-foreground/15">·</span>
          <span>{entity.domain}</span>
          {entity.trending && (
            <>
              <span className="text-muted-foreground/15">·</span>
              <span className="flex items-center gap-1 text-emerald-500/70">
                <TrendingUp className="w-2.5 h-2.5" />
                Trending
              </span>
            </>
          )}
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-3" data-testid="text-entity-title">
          {entity.name}
        </h1>
        <p className="text-base text-muted-foreground/50 max-w-2xl leading-relaxed">{entity.description}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { label: "Total Mentions", value: entity.mention_count.toString(), icon: Hash },
          { label: "Sentiment", value: `${entity.sentiment_score}/10`, icon: Activity },
          { label: "Avg Confidence", value: `${avgConfidence}%`, icon: Shield },
          { label: "External Sources", value: `${externalCount}/${mentions.length}`, icon: Globe },
        ].map(stat => (
          <div key={stat.label} className={`p-4 ${card} ${cardShadow}`} data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`}>
            <stat.icon className="w-3.5 h-3.5 text-muted-foreground/25 mb-2" />
            <p className="text-xl font-bold text-foreground/90 mb-0.5">{stat.value}</p>
            <p className="text-[11px] text-muted-foreground/30">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-[13px] text-muted-foreground/35 font-semibold uppercase tracking-[0.1em]">
              Mention History
            </p>
            <div className="flex items-center gap-1.5 flex-wrap">
              {(["all", "review", "comparison", "citation", "news", "profile", "post", "filing"] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setTypeFilter(f)}
                  className={`text-[11px] rounded px-2 py-0.5 transition-colors ${
                    typeFilter === f
                      ? isLight ? "bg-foreground/10 text-foreground/70 font-medium" : "bg-white/[0.08] text-foreground/70 font-medium"
                      : isLight ? "text-foreground/30 hover:text-foreground/50" : "text-muted-foreground/25 hover:text-muted-foreground/45"
                  }`}
                  data-testid={`type-filter-${f}`}
                >
                  {f === "all" ? "All" : MENTION_TYPE_LABELS[f as MentionType].label}
                </button>
              ))}
            </div>
          </div>

          {filteredMentions.length > 0 ? (
            <div className="space-y-3">
              {filteredMentions.map(m => (
                <MentionRow
                  key={m.mention_id}
                  mention={{ ...m, entity_name: entity.name }}
                  entityName={entity.name}
                  isLight={isLight}
                  isDark={isDark}
                  isSparkle={isSparkle}
                  card={card}
                  cardShadow={cardShadow}
                  cardHover={cardHover}
                />
              ))}
            </div>
          ) : (
            <div className={`rounded-xl p-8 text-center ${card} ${cardShadow}`}>
              <p className="text-base text-muted-foreground/50">No mentions found for this filter.</p>
            </div>
          )}
        </div>

        <div>
          <div className="mb-8">
            <p className="text-[13px] text-muted-foreground/35 font-semibold mb-4 uppercase tracking-[0.1em]">By Source</p>
            <div className="space-y-2">
              {sourceBreakdown.map(([type, count]) => {
                const info = SOURCE_TYPE_LABELS[type as SourceType];
                const Icon = info.icon;
                return (
                  <div key={type} className="flex items-center justify-between text-[13px]">
                    <span className="flex items-center gap-2 text-muted-foreground/40">
                      <Icon className="w-3 h-3" />
                      {info.label}
                    </span>
                    <span className="text-foreground/60 font-medium">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`pt-6 border-t ${isLight ? "border-[rgba(120,125,150,0.08)]" : "border-white/[0.04]"}`}>
            <p className="text-[13px] text-muted-foreground/35 font-semibold mb-4 uppercase tracking-[0.1em]">By Type</p>
            <div className="space-y-2">
              {typeBreakdown.map(([type, count]) => {
                const info = MENTION_TYPE_LABELS[type as MentionType];
                const Icon = info.icon;
                return (
                  <div key={type} className="flex items-center justify-between text-[13px]">
                    <span className="flex items-center gap-2 text-muted-foreground/40">
                      <Icon className="w-3 h-3" />
                      {info.label}
                    </span>
                    <span className="text-foreground/60 font-medium">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`mt-6 pt-6 border-t ${isLight ? "border-[rgba(120,125,150,0.08)]" : "border-white/[0.04]"}`}>
            <p className="text-[13px] text-muted-foreground/35 font-semibold mb-3 uppercase tracking-[0.1em]">Proof of Presence</p>
            <p className="text-[12px] text-muted-foreground/30 leading-relaxed">
              {entity.name} has been independently mentioned across {externalCount} external sources including press outlets, review platforms, analyst reports, and community forums.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Navbar({ activeEntity, onHome, onSelectEntity }: {
  activeEntity: string | null;
  onHome: () => void;
  onSelectEntity: (id: string) => void;
}) {
  const { theme } = useTheme();
  const activeEntityData = activeEntity ? ENTITIES.find(e => e.entity_id === activeEntity) : null;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[9999]"
      style={{
        backdropFilter: "blur(20px)",
        backgroundColor:
          theme === "sparkle" ? "hsl(220 10% 6% / 0.7)" :
          theme === "dark" ? "hsl(220 25% 8% / 0.9)" :
          "hsl(220 12% 94% / 0.9)",
        borderBottom:
          theme === "sparkle" ? "1px solid rgba(120,50,220,0.06)" :
          theme === "dark" ? "1px solid rgba(40,90,180,0.1)" :
          "1px solid rgba(120,125,150,0.1)",
      }}
      data-testid="navbar"
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <button onClick={onHome} className="flex items-center gap-2 group" data-testid="link-home">
            <Activity className={`w-4 h-4 ${theme === "sparkle" ? "text-purple-400/60" : "text-foreground/40"}`} />
            <span className="text-base font-semibold tracking-tight text-foreground/90">Mentions.io</span>
          </button>
        </div>
        <ThemeToggle />
      </div>
      {activeEntityData && (
        <div className="border-t border-border/20">
          <div className="max-w-6xl mx-auto px-6 py-1.5 flex items-center gap-2 text-[13px]">
            <button onClick={onHome} className="text-muted-foreground/70 hover:text-muted-foreground transition-colors shrink-0" data-testid="breadcrumb-home">All Mentions</button>
            <ChevronRight className="w-3 h-3 text-muted-foreground/70 shrink-0" />
            <span className="text-foreground/70 font-medium truncate">{activeEntityData.name}</span>
          </div>
        </div>
      )}
    </nav>
  );
}

export default function MentionsPage() {
  const { theme } = useTheme();
  const isSparkle = theme === "sparkle";
  const isDark = theme === "dark";
  const isLight = theme === "light";
  const [, navigate] = useLocation();

  const [, entityParams] = useRoute("/mentions/:entityId");
  const activeEntity = entityParams?.entityId || null;
  const view = activeEntity ? "entity" : "home";

  const handleSelectEntity = (id: string) => {
    navigate(`/mentions/${id}`);
    window.scrollTo(0, 0);
  };

  const handleHome = () => {
    navigate("/mentions");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative transition-colors duration-300" data-testid="mentions-page">
      {isSparkle && <SparkleBackground />}
      {isDark && <DarkBackground />}
      {isLight && <LightBackground />}

      <Navbar
        activeEntity={activeEntity}
        onHome={handleHome}
        onSelectEntity={handleSelectEntity}
      />

      <main className={`relative z-10 max-w-6xl mx-auto px-6 pb-16 ${activeEntity ? "pt-28" : "pt-24"}`}>
        {view === "home" && (
          <HomePage onSelectEntity={handleSelectEntity} />
        )}
        {view === "entity" && activeEntity && (
          <EntityDetailPage entityId={activeEntity} onBack={handleHome} />
        )}
      </main>

      <footer className={`relative z-10 py-8 border-t ${isSparkle ? "border-purple-500/10" : isDark ? "border-[rgba(60,100,140,0.1)]" : isLight ? "border-[rgba(120,125,150,0.1)]" : "border-border/20"}`}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground/50">
          <div className="flex items-center gap-2">
            <Award className="w-3 h-3" />
            <span>Mentions.io — A Brandvious Product</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Transparent tracking</span>
            <span className="text-muted-foreground/20">|</span>
            <span>All sources linked</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
