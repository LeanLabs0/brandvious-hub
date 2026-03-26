import { useState, useRef, useEffect, useCallback } from "react";
import {
  Search,
  Sun,
  Moon,
  Sparkles,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Star,
  Check,
  X,
  Clock,
  ArrowRight,
  BarChart3,
  Globe,
  Radar,
  Building2,
  Filter,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

interface SourceRating {
  source: string;
  rating: string;
  scale: string;
  reviews: string;
  trend: "up" | "down" | "stable" | "mixed";
}

interface ProductReport {
  id: string;
  name: string;
  category: string;
  consensusScore: number;
  consensusTrend: "up" | "down" | "stable";
  consensusLabel: string;
  updated: string;
  description: string;
  founded: string;
  hq: string;
  strengths: string[];
  weaknesses: string[];
  verdict: string;
  sources: SourceRating[];
  sentimentSnippets: { source: string; quote: string; sentiment: "positive" | "negative" | "neutral" }[];
}

const CATEGORIES = ["All", "CRM", "Marketing Automation", "Project Management", "Help Desk", "Email Marketing", "Analytics"];

const PRODUCTS: ProductReport[] = [
  {
    id: "hubspot",
    name: "HubSpot CRM",
    category: "CRM",
    consensusScore: 4.4,
    consensusTrend: "up",
    consensusLabel: "Positive",
    updated: "Feb 15, 2026",
    description: "All-in-one CRM platform for marketing, sales, and service teams.",
    founded: "2006",
    hq: "Cambridge, MA",
    strengths: ["Ease of use / low learning curve", "All-in-one platform (CRM + marketing + service)", "Strong free tier for startups", "Native AI features (Breeze)"],
    weaknesses: ["Price escalation at scale", "Limited customization vs. Salesforce", "Reporting depth in lower tiers", "Contact-based pricing model"],
    verdict: "HubSpot CRM is consistently rated as the easiest-to-adopt all-in-one platform for mid-market companies. Reviewers across all platforms praise the unified experience and free tier. The most common criticism is price escalation at higher tiers and limited enterprise-grade customization compared to Salesforce. Sentiment is trending positive following the Breeze AI launch in late 2025.",
    sources: [
      { source: "G2", rating: "4.4", scale: "/ 5", reviews: "11,200+", trend: "up" },
      { source: "Capterra", rating: "4.5", scale: "/ 5", reviews: "4,100+", trend: "stable" },
      { source: "TrustRadius", rating: "8.2", scale: "/ 10", reviews: "2,800+", trend: "up" },
      { source: "Gartner Peers", rating: "4.3", scale: "/ 5", reviews: "1,950+", trend: "stable" },
      { source: "Reddit", rating: "Mixed+", scale: "", reviews: "850 threads", trend: "mixed" },
    ],
    sentimentSnippets: [
      { source: "G2", quote: "Best CRM we've used. Onboarding took 2 weeks instead of the 3 months Salesforce quoted us.", sentiment: "positive" },
      { source: "Reddit r/sales", quote: "Love it for SMB but once you hit 200+ contacts the pricing gets painful fast.", sentiment: "neutral" },
      { source: "TrustRadius", quote: "The Breeze AI features are actually useful, not just marketing fluff. Saves our team ~5hrs/week.", sentiment: "positive" },
      { source: "Capterra", quote: "Reporting is frustrating in Starter. You basically have to upgrade to Pro to get anything useful.", sentiment: "negative" },
    ],
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    consensusScore: 4.2,
    consensusTrend: "stable",
    consensusLabel: "Positive",
    updated: "Feb 14, 2026",
    description: "World's largest CRM platform for enterprise sales, service, and marketing.",
    founded: "1999",
    hq: "San Francisco, CA",
    strengths: ["Deep customization and configurability", "AppExchange ecosystem (5,000+ apps)", "Enterprise-grade reporting", "Industry-specific solutions"],
    weaknesses: ["Steep learning curve", "Implementation complexity and cost", "UI feels dated vs. competitors", "Requires dedicated admin"],
    verdict: "Salesforce remains the undisputed enterprise CRM leader. Reviewers consistently praise its depth and ecosystem but criticize the complexity and cost of implementation. Sentiment has been stable, with Einstein AI receiving mixed reviews — powerful but hard to configure. The Slack integration post-acquisition is viewed positively by most enterprise users.",
    sources: [
      { source: "G2", rating: "4.3", scale: "/ 5", reviews: "19,800+", trend: "stable" },
      { source: "Capterra", rating: "4.4", scale: "/ 5", reviews: "18,200+", trend: "stable" },
      { source: "TrustRadius", rating: "8.0", scale: "/ 10", reviews: "3,400+", trend: "stable" },
      { source: "Gartner Peers", rating: "4.4", scale: "/ 5", reviews: "3,600+", trend: "up" },
      { source: "Reddit", rating: "Polarized", scale: "", reviews: "2,100 threads", trend: "mixed" },
    ],
    sentimentSnippets: [
      { source: "G2", quote: "If you need enterprise CRM, there's really no alternative. The ecosystem is unmatched.", sentiment: "positive" },
      { source: "Reddit r/salesforce", quote: "We spent $200K on implementation and still needed 2 full-time admins. Not for the faint of heart.", sentiment: "negative" },
      { source: "TrustRadius", quote: "Slack integration has been a game changer for cross-team deal visibility.", sentiment: "positive" },
    ],
  },
  {
    id: "notion",
    name: "Notion",
    category: "Project Management",
    consensusScore: 4.5,
    consensusTrend: "up",
    consensusLabel: "Very Positive",
    updated: "Feb 10, 2026",
    description: "All-in-one workspace for notes, docs, wikis, and project management.",
    founded: "2013",
    hq: "San Francisco, CA",
    strengths: ["Extreme flexibility and customization", "Great for documentation and wikis", "AI integration for writing and search", "Strong template ecosystem"],
    weaknesses: ["Learning curve for teams", "Weaker timeline / Gantt views", "Performance on large databases", "Mobile app limitations"],
    verdict: "Notion has become the go-to workspace for teams that value flexibility over rigid project management. Reviewers love the documentation capabilities and AI features. The main criticism is that it can be overwhelming for teams used to simpler tools, and project tracking features lag behind dedicated PM tools like Monday.com or Asana. Sentiment is strongly positive and trending upward after the Notion AI rollout.",
    sources: [
      { source: "G2", rating: "4.7", scale: "/ 5", reviews: "5,600+", trend: "up" },
      { source: "Capterra", rating: "4.7", scale: "/ 5", reviews: "2,300+", trend: "up" },
      { source: "TrustRadius", rating: "8.8", scale: "/ 10", reviews: "800+", trend: "up" },
      { source: "Reddit", rating: "Very Positive", scale: "", reviews: "3,200 threads", trend: "up" },
      { source: "Product Hunt", rating: "4.8", scale: "/ 5", reviews: "5,400+", trend: "stable" },
    ],
    sentimentSnippets: [
      { source: "G2", quote: "Replaced Confluence, Trello, and Google Docs for our 40-person team. One tool to rule them all.", sentiment: "positive" },
      { source: "Reddit r/Notion", quote: "AI search across our entire wiki has been transformational. Actually finds what you need.", sentiment: "positive" },
      { source: "Capterra", quote: "Took our team 3 weeks to figure out a system that worked. Flexibility is a double-edged sword.", sentiment: "neutral" },
    ],
  },
  {
    id: "monday",
    name: "Monday.com",
    category: "Project Management",
    consensusScore: 4.3,
    consensusTrend: "stable",
    consensusLabel: "Positive",
    updated: "Feb 8, 2026",
    description: "Visual project management and work operating system for teams.",
    founded: "2012",
    hq: "Tel Aviv, Israel",
    strengths: ["Visual dashboards and boards", "Powerful automations", "Timeline and Gantt views", "Cross-team visibility"],
    weaknesses: ["Price adds up with add-ons", "Can feel rigid for creative workflows", "Storage limits on lower tiers", "Automations quota on Standard plan"],
    verdict: "Monday.com is the top choice for teams that need structured, visual project tracking. Reviewers consistently praise the dashboard experience and automations. Criticism centers on pricing — the per-seat model with feature-gated add-ons can make costs unpredictable. Sentiment is stable and positive overall.",
    sources: [
      { source: "G2", rating: "4.7", scale: "/ 5", reviews: "12,100+", trend: "stable" },
      { source: "Capterra", rating: "4.6", scale: "/ 5", reviews: "4,800+", trend: "stable" },
      { source: "TrustRadius", rating: "8.4", scale: "/ 10", reviews: "1,200+", trend: "stable" },
      { source: "Reddit", rating: "Mixed+", scale: "", reviews: "600 threads", trend: "stable" },
    ],
    sentimentSnippets: [
      { source: "G2", quote: "Best visual PM tool. Our non-technical teams adopted it in days, not weeks.", sentiment: "positive" },
      { source: "Reddit r/projectmanagement", quote: "Great for basic PM but the automation limits on Standard are annoying. Feels like nickel-and-diming.", sentiment: "neutral" },
      { source: "TrustRadius", quote: "Dashboard views are unmatched. We use it for executive reporting across 5 departments.", sentiment: "positive" },
    ],
  },
  {
    id: "klaviyo",
    name: "Klaviyo",
    category: "Email Marketing",
    consensusScore: 4.6,
    consensusTrend: "up",
    consensusLabel: "Very Positive",
    updated: "Feb 6, 2026",
    description: "Email and SMS marketing platform built for e-commerce brands.",
    founded: "2012",
    hq: "Boston, MA",
    strengths: ["Deep Shopify / e-commerce integration", "Advanced segmentation engine", "Revenue attribution per email", "Predictive analytics and AI"],
    weaknesses: ["Price scales aggressively with contacts", "Learning curve for beginners", "SMS features still maturing", "Template builder less intuitive than Mailchimp"],
    verdict: "Klaviyo is the consensus leader for e-commerce email marketing. Reviewers across all platforms praise the Shopify integration depth and revenue attribution capabilities. The main criticism is pricing — Klaviyo gets expensive fast as contact lists grow. Sentiment is trending upward following their IPO and continued product investment in AI-driven segmentation.",
    sources: [
      { source: "G2", rating: "4.6", scale: "/ 5", reviews: "1,100+", trend: "up" },
      { source: "Capterra", rating: "4.7", scale: "/ 5", reviews: "440+", trend: "up" },
      { source: "TrustRadius", rating: "8.6", scale: "/ 10", reviews: "320+", trend: "up" },
      { source: "Shopify App Store", rating: "4.2", scale: "/ 5", reviews: "1,900+", trend: "stable" },
      { source: "Reddit", rating: "Positive", scale: "", reviews: "400 threads", trend: "up" },
    ],
    sentimentSnippets: [
      { source: "G2", quote: "Revenue per email metric changed how our CEO thinks about email marketing. It pays for itself.", sentiment: "positive" },
      { source: "Reddit r/ecommerce", quote: "Nothing touches Klaviyo for Shopify stores. Mailchimp doesn't even come close for segmentation.", sentiment: "positive" },
      { source: "Shopify App Store", quote: "Pricing jumped 40% when we crossed 10K contacts. That stung.", sentiment: "negative" },
    ],
  },
  {
    id: "zendesk",
    name: "Zendesk",
    category: "Help Desk",
    consensusScore: 4.1,
    consensusTrend: "down",
    consensusLabel: "Mixed-Positive",
    updated: "Feb 4, 2026",
    description: "Customer service and support ticketing platform for businesses of all sizes.",
    founded: "2007",
    hq: "San Francisco, CA",
    strengths: ["Mature ticketing system", "Deep customization options", "Large marketplace of apps", "Multi-channel support (email, chat, phone, social)"],
    weaknesses: ["UI feels dated", "Complex setup for advanced features", "Pricing not transparent", "AI features lag behind Intercom"],
    verdict: "Zendesk is the established incumbent in help desk software. Reviewers respect its maturity and multi-channel capabilities but increasingly criticize the dated UI and pricing opacity. Sentiment has been trending slightly downward as competitors like Intercom and Freshdesk modernize faster. The recent AI bot (Zendesk AI) has received mixed reviews compared to Intercom's Fin.",
    sources: [
      { source: "G2", rating: "4.3", scale: "/ 5", reviews: "5,900+", trend: "stable" },
      { source: "Capterra", rating: "4.4", scale: "/ 5", reviews: "3,900+", trend: "down" },
      { source: "TrustRadius", rating: "7.8", scale: "/ 10", reviews: "1,400+", trend: "down" },
      { source: "Reddit", rating: "Mixed", scale: "", reviews: "1,100 threads", trend: "down" },
    ],
    sentimentSnippets: [
      { source: "G2", quote: "Reliable and battle-tested. We've been on Zendesk for 8 years and it just works.", sentiment: "positive" },
      { source: "Reddit r/CustomerSuccess", quote: "Seriously considering Intercom. Zendesk UI looks like it's from 2015 and their AI bot is mediocre.", sentiment: "negative" },
      { source: "TrustRadius", quote: "Pricing went up 30% at renewal and they wouldn't budge. Feeling locked in.", sentiment: "negative" },
    ],
  },
  {
    id: "mixpanel",
    name: "Mixpanel",
    category: "Analytics",
    consensusScore: 4.5,
    consensusTrend: "up",
    consensusLabel: "Positive",
    updated: "Feb 2, 2026",
    description: "Product analytics platform for tracking user behavior, funnels, and retention.",
    founded: "2009",
    hq: "San Francisco, CA",
    strengths: ["Fast query engine", "Intuitive UI for non-technical users", "Strong free tier (20M events/mo)", "JQL for power users"],
    weaknesses: ["Fewer enterprise governance features", "Smaller ecosystem than Amplitude", "Data warehouse integration maturing", "Mobile SDK can be heavy"],
    verdict: "Mixpanel is the preferred product analytics tool for teams that prioritize speed and simplicity. Reviewers love the fast query engine and generous free tier. Compared to Amplitude, Mixpanel is seen as easier to learn but less powerful for complex behavioral cohort analysis. Sentiment is trending positive after their warehouse-native architecture update.",
    sources: [
      { source: "G2", rating: "4.6", scale: "/ 5", reviews: "1,100+", trend: "up" },
      { source: "Capterra", rating: "4.5", scale: "/ 5", reviews: "130+", trend: "stable" },
      { source: "TrustRadius", rating: "8.4", scale: "/ 10", reviews: "340+", trend: "up" },
      { source: "Reddit", rating: "Positive", scale: "", reviews: "300 threads", trend: "up" },
    ],
    sentimentSnippets: [
      { source: "G2", quote: "Free tier is insanely generous. 20M events/month means most startups never need to pay.", sentiment: "positive" },
      { source: "Reddit r/analytics", quote: "Switched from Amplitude. Mixpanel just feels faster and our PMs actually use it now.", sentiment: "positive" },
      { source: "TrustRadius", quote: "Warehouse-native mode finally makes it enterprise-ready. Game changer.", sentiment: "positive" },
    ],
  },
  {
    id: "hubspot-marketing",
    name: "HubSpot Marketing Hub",
    category: "Marketing Automation",
    consensusScore: 4.4,
    consensusTrend: "up",
    consensusLabel: "Positive",
    updated: "Feb 12, 2026",
    description: "Marketing automation platform with email, workflows, landing pages, and analytics.",
    founded: "2006",
    hq: "Cambridge, MA",
    strengths: ["All-in-one with CRM", "Visual workflow builder", "Strong content tools (blog, SEO)", "Fast time-to-value"],
    weaknesses: ["Advanced features locked to higher tiers", "Contact-based pricing", "Reporting less deep than Marketo", "Custom objects limited on lower plans"],
    verdict: "HubSpot Marketing Hub is the consensus pick for mid-market teams wanting marketing automation bundled with CRM. Reviewers praise the visual workflow builder and native CRM integration. Criticism focuses on the tiered pricing model that gates key features behind Professional and Enterprise plans. Sentiment is positive and improving with the Breeze AI additions.",
    sources: [
      { source: "G2", rating: "4.4", scale: "/ 5", reviews: "11,200+", trend: "up" },
      { source: "Capterra", rating: "4.5", scale: "/ 5", reviews: "6,100+", trend: "stable" },
      { source: "TrustRadius", rating: "8.3", scale: "/ 10", reviews: "2,900+", trend: "up" },
      { source: "Reddit", rating: "Mixed+", scale: "", reviews: "700 threads", trend: "stable" },
    ],
    sentimentSnippets: [
      { source: "G2", quote: "Best marketing platform for teams that also need CRM. No Zapier duct tape required.", sentiment: "positive" },
      { source: "Reddit r/marketing", quote: "Great until you need custom reporting. Then it's 'upgrade to Enterprise' for everything.", sentiment: "neutral" },
      { source: "TrustRadius", quote: "We went from Marketo to HubSpot and our team adoption went from 40% to 95%.", sentiment: "positive" },
    ],
  },
];

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

function TrendIcon({ trend, className = "w-3.5 h-3.5" }: { trend: string; className?: string }) {
  if (trend === "up") return <TrendingUp className={`${className} text-emerald-500/70`} />;
  if (trend === "down") return <TrendingDown className={`${className} text-red-400/65`} />;
  if (trend === "mixed") return <Minus className={`${className} text-amber-400/65`} />;
  return <Minus className={`${className} text-muted-foreground/50`} />;
}

function ScoreDisplay({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xl font-bold text-foreground font-mono">{score.toFixed(1)}</span>
      <span className="text-[10px] text-muted-foreground/50">/ 5</span>
    </div>
  );
}

function Navbar({ onHome, activeCategory, onCategoryChange }: {
  onHome: () => void;
  activeCategory: string;
  onCategoryChange: (c: string) => void;
}) {
  const { theme } = useTheme();
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[9999]"
      style={{
        backdropFilter: "blur(12px)",
        backgroundColor:
          theme === "sparkle" ? "hsl(220 10% 6% / 0.7)" :
          theme === "dark" ? "hsl(220 10% 6% / 0.8)" :
          "hsl(220 10% 97% / 0.8)",
      }}
      data-testid="navbar"
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <button onClick={onHome} className="flex items-center gap-2">
          <Radar className="w-4 h-4 text-muted-foreground/60" />
          <span className="text-sm font-semibold tracking-tight text-foreground" data-testid="text-logo">
            ReviewInsight<span className="font-normal text-muted-foreground">.com</span>
          </span>
        </button>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-[11px] text-muted-foreground/70" onClick={onHome} data-testid="nav-reports">Reports</Button>
          <Button variant="ghost" size="sm" className="text-[11px] text-muted-foreground/70" data-testid="nav-methodology">Methodology</Button>
          <ThemeToggle />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-2 flex items-center gap-1 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((c) => (
          <Button
            key={c}
            variant="ghost"
            size="sm"
            className={`text-[11px] shrink-0 ${activeCategory === c ? "text-foreground" : "text-muted-foreground/60"}`}
            onClick={() => onCategoryChange(c)}
            data-testid={`button-category-${c.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {c}
          </Button>
        ))}
      </div>
    </nav>
  );
}

function ProductCard({ product, onClick }: { product: ProductReport; onClick: () => void }) {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";

  return (
    <div
      className={`rounded-xl border p-5 cursor-pointer hover-elevate ${cardClass}`}
      onClick={onClick}
      data-testid={`card-${product.id}`}
    >
      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <Badge variant="outline" className="text-[9px] text-muted-foreground/70 no-default-hover-elevate">{product.category}</Badge>
        <div className="flex items-center gap-1.5">
          <TrendIcon trend={product.consensusTrend} className="w-3 h-3" />
          <Badge
            variant="outline"
            className={`text-[9px] no-default-hover-elevate ${
              product.consensusLabel.includes("Very") ? "text-emerald-400" :
              product.consensusLabel === "Positive" ? "text-emerald-400/70" :
              product.consensusLabel.includes("Mixed") ? "text-amber-400/70" :
              "text-muted-foreground/70"
            }`}
          >
            {product.consensusLabel}
          </Badge>
        </div>
      </div>

      <h3 className="text-base font-semibold text-foreground mb-1">{product.name}</h3>
      <p className="text-[11px] text-muted-foreground/60 mb-4">{product.description}</p>

      <div className="flex items-center justify-between gap-4 mb-4">
        <ScoreDisplay score={product.consensusScore} />
        <span className="text-[10px] text-muted-foreground/50">{product.sources.length} sources</span>
      </div>

      <div className="space-y-1.5">
        {product.sources.slice(0, 3).map((s) => (
          <div key={s.source} className="flex items-center justify-between gap-2">
            <span className="text-[11px] text-muted-foreground/60 w-24">{s.source}</span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-foreground/70 font-mono">{s.rating}{s.scale}</span>
              <TrendIcon trend={s.trend} className="w-3 h-3" />
            </div>
          </div>
        ))}
        {product.sources.length > 3 && (
          <span className="text-[10px] text-muted-foreground/40">+ {product.sources.length - 3} more sources</span>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-border/20 flex items-center justify-between gap-2">
        <span className="text-[10px] text-muted-foreground/40">Updated {product.updated}</span>
        <ArrowRight className="w-3 h-3 text-muted-foreground/35" />
      </div>
    </div>
  );
}

function ProductListPage({
  activeCategory,
  onSelectProduct,
  searchQuery,
  setSearchQuery,
}: {
  activeCategory: string;
  onSelectProduct: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";

  let filtered = activeCategory === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  const totalSources = new Set(PRODUCTS.flatMap((p) => p.sources.map((s) => s.source))).size;
  const totalReviews = PRODUCTS.reduce((sum, p) => {
    return sum + p.sources.reduce((s2, src) => {
      const num = parseInt(src.reviews.replace(/[^0-9]/g, ""));
      return s2 + (isNaN(num) ? 0 : num);
    }, 0);
  }, 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" data-testid="text-page-title">
          {activeCategory === "All" ? "Consensus Reports" : `${activeCategory} Reports`}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground/60 max-w-lg">
          {filtered.length} products analyzed across {totalSources} review platforms. Ratings normalized. Sentiment tracked. Updated continuously.
        </p>
      </div>

      <div className={`rounded-xl border px-4 py-2.5 flex items-center gap-3 mb-8 ${cardClass}`}>
        <Search className="w-4 h-4 text-muted-foreground/60 shrink-0" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
          data-testid="input-search"
        />
      </div>

      {activeCategory === "All" && !searchQuery.trim() && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Products", value: String(PRODUCTS.length) },
            { label: "Sources", value: String(totalSources) },
            { label: "Reviews Analyzed", value: totalReviews > 1000 ? `${Math.round(totalReviews / 1000)}K+` : String(totalReviews) },
            { label: "Categories", value: String(CATEGORIES.length - 1) },
          ].map((s) => (
            <div key={s.label} className={`rounded-xl border px-4 py-3 text-center ${cardClass}`}>
              <div className="text-lg font-bold text-foreground font-mono">{s.value}</div>
              <div className="text-[10px] text-muted-foreground/60">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} onClick={() => onSelectProduct(product.id)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm text-muted-foreground/60">No products match that query.</p>
        </div>
      )}
    </div>
  );
}

function ProductDetailPage({ product, onBack }: { product: ProductReport; onBack: () => void }) {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={onBack} className="text-[11px] text-muted-foreground/70 mb-6 flex items-center gap-1" data-testid="button-back">
        <ChevronRight className="w-3 h-3 rotate-180" />
        All reports
      </button>

      <div className="flex items-start justify-between gap-6 mb-6 flex-wrap">
        <div>
          <Badge variant="outline" className="text-[9px] text-muted-foreground/70 no-default-hover-elevate mb-3">{product.category}</Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" data-testid="text-product-name">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground/60">{product.description}</p>
          <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground/50 flex-wrap">
            <span>Founded {product.founded}</span>
            <span className="text-muted-foreground/25">|</span>
            <span>{product.hq}</span>
            <span className="text-muted-foreground/25">|</span>
            <span>Updated {product.updated}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <ScoreDisplay score={product.consensusScore} />
            <TrendIcon trend={product.consensusTrend} />
          </div>
          <Badge
            variant="outline"
            className={`text-[9px] no-default-hover-elevate mt-1 ${
              product.consensusLabel.includes("Very") ? "text-emerald-400" :
              product.consensusLabel === "Positive" ? "text-emerald-400/70" :
              "text-amber-400/70"
            }`}
          >
            Consensus: {product.consensusLabel}
          </Badge>
        </div>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.12em] font-medium mb-3 block">Consensus Verdict</span>
        <p className="text-sm text-foreground/85 leading-relaxed" data-testid="text-verdict">{product.verdict}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className={`rounded-xl border p-5 ${cardClass}`}>
          <span className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.12em] font-medium mb-3 block">Strengths (consensus)</span>
          <div className="space-y-2">
            {product.strengths.map((s) => (
              <div key={s} className="flex items-start gap-2">
                <Check className="w-3 h-3 text-emerald-500/70 mt-0.5 shrink-0" />
                <span className="text-[12px] text-foreground/80">{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`rounded-xl border p-5 ${cardClass}`}>
          <span className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.12em] font-medium mb-3 block">Weaknesses (consensus)</span>
          <div className="space-y-2">
            {product.weaknesses.map((w) => (
              <div key={w} className="flex items-start gap-2">
                <X className="w-3 h-3 text-red-400/60 mt-0.5 shrink-0" />
                <span className="text-[12px] text-foreground/80">{w}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.12em] font-medium mb-4 block">Source Breakdown</span>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left pb-3 text-muted-foreground/70 font-medium">Source</th>
                <th className="text-center pb-3 text-muted-foreground/70 font-medium">Rating</th>
                <th className="text-center pb-3 text-muted-foreground/70 font-medium">Reviews</th>
                <th className="text-center pb-3 text-muted-foreground/70 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {product.sources.map((s, i) => (
                <tr key={s.source} className={i < product.sources.length - 1 ? "border-b border-border/10" : ""}>
                  <td className="py-2.5 text-foreground/80">{s.source}</td>
                  <td className="py-2.5 text-center text-foreground/70 font-mono">{s.rating} {s.scale}</td>
                  <td className="py-2.5 text-center text-muted-foreground/60">{s.reviews}</td>
                  <td className="py-2.5">
                    <div className="flex justify-center">
                      <TrendIcon trend={s.trend} className="w-3.5 h-3.5" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.12em] font-medium mb-4 block">
          What Reviewers Are Saying
        </span>
        <div className="space-y-3">
          {product.sentimentSnippets.map((snippet, i) => (
            <div key={i} className="rounded-lg bg-background/40 px-4 py-3">
              <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                <span className="text-[10px] text-muted-foreground/60 font-medium">{snippet.source}</span>
                <Badge
                  variant="outline"
                  className={`text-[9px] no-default-hover-elevate ${
                    snippet.sentiment === "positive" ? "text-emerald-500/70" :
                    snippet.sentiment === "negative" ? "text-red-400/65" :
                    "text-muted-foreground/60"
                  }`}
                >
                  {snippet.sentiment}
                </Badge>
              </div>
              <p className="text-[12px] text-foreground/80 leading-relaxed italic">"{snippet.quote}"</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.12em] font-medium mb-3 block">API Access</span>
        <div className="rounded-lg bg-background/40 px-3 py-2 mb-2 font-mono text-[11px]">
          <span className="text-muted-foreground/60">GET</span>{" "}
          <span className="text-foreground/80">reviewinsight.com/api/report/{product.id}</span>
        </div>
        <span className="text-[10px] text-muted-foreground/50">Returns structured consensus report with source-by-source breakdown.</span>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.12em] font-medium mb-3 block">Structured Output</span>
        <div className="rounded-lg bg-background/40 p-4 font-mono text-[10px] leading-relaxed overflow-x-auto">
          <div className="text-foreground/65">{"{"}</div>
          <div className="pl-3"><span className="text-emerald-400/70">"product"</span>: <span className="text-foreground/70">"{product.name}"</span>,</div>
          <div className="pl-3"><span className="text-emerald-400/70">"category"</span>: <span className="text-foreground/70">"{product.category}"</span>,</div>
          <div className="pl-3"><span className="text-emerald-400/70">"consensusScore"</span>: <span className="text-foreground/70">{product.consensusScore}</span>,</div>
          <div className="pl-3"><span className="text-emerald-400/70">"consensusTrend"</span>: <span className="text-foreground/70">"{product.consensusTrend}"</span>,</div>
          <div className="pl-3"><span className="text-emerald-400/70">"sources"</span>: <span className="text-foreground/70">{product.sources.length}</span>,</div>
          <div className="pl-3"><span className="text-emerald-400/70">"strengths"</span>: [<span className="text-foreground/70">"{product.strengths[0]}", ...</span>],</div>
          <div className="pl-3"><span className="text-emerald-400/70">"weaknesses"</span>: [<span className="text-foreground/70">"{product.weaknesses[0]}", ...</span>],</div>
          <div className="pl-3"><span className="text-emerald-400/70">"verdict"</span>: <span className="text-foreground/70">"{product.verdict.slice(0, 70)}..."</span>,</div>
          <div className="pl-3"><span className="text-emerald-400/70">"lastUpdated"</span>: <span className="text-foreground/70">"{product.updated}"</span></div>
          <div className="text-foreground/65">{"}"}</div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 py-6 border-t border-border/20 text-[10px] text-muted-foreground/50 flex-wrap">
        <span>Aggregated from {product.sources.length} sources | {product.sources.reduce((sum, s) => { const n = parseInt(s.reviews.replace(/[^0-9]/g, "")); return sum + (isNaN(n) ? 0 : n); }, 0).toLocaleString()}+ reviews analyzed</span>
        <span>Last updated {product.updated}</span>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-border/30 mt-12" data-testid="section-footer">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Radar className="w-3.5 h-3.5 text-muted-foreground/60" />
              <span className="text-sm font-semibold text-foreground">
                ReviewInsight<span className="font-normal text-muted-foreground">.com</span>
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
              Consensus review intelligence for B2B software.
            </p>
            <p className="text-[10px] text-muted-foreground/50 mt-2">
              {PRODUCTS.length} products | {CATEGORIES.length - 1} categories
            </p>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-medium">Reports</span>
            <div className="mt-2 space-y-1.5">
              {["All Reports", "By Category", "Trending"].map((item) => (
                <p key={item} className="text-[11px] text-muted-foreground/60">{item}</p>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-medium">Platform</span>
            <div className="mt-2 space-y-1.5">
              {["API Documentation", "Methodology", "Data Sources"].map((item) => (
                <p key={item} className="text-[11px] text-muted-foreground/60">{item}</p>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-medium">Company</span>
            <div className="mt-2 space-y-1.5">
              {["About", "Contact", "Privacy Policy"].map((item) => (
                <p key={item} className="text-[11px] text-muted-foreground/60">{item}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4 flex-wrap text-[10px] text-muted-foreground/40">
          <span>No sponsored rankings</span>
          <span className="text-muted-foreground/10">|</span>
          <span>All sources cited</span>
          <span className="text-muted-foreground/10">|</span>
          <span>Updated continuously</span>
          <span className="text-muted-foreground/10">|</span>
          <span>Structured for AI</span>
        </div>

        <div className="mt-6 pt-4 border-t border-border/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] text-muted-foreground/50">Part of Brandvious, Inc.</p>
            <p className="text-[10px] text-muted-foreground/50">Land O' Lakes, Florida</p>
          </div>
          <p className="text-[10px] text-muted-foreground/35">&copy; 2026 Brandvious, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1, y: -1 });
  const streaksRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    life: number; maxLife: number;
    hue: number; width: number;
    trail: Array<{ x: number; y: number }>;
  }>>([]);
  const waveRef = useRef<Array<{
    y: number; amplitude: number; frequency: number;
    speed: number; phase: number; hue: number; opacity: number;
  }>>([]);

  const init = useCallback((w: number, h: number) => {
    const waves = [];
    for (let i = 0; i < 4; i++) {
      waves.push({
        y: h * 0.2 + (i / 4) * h * 0.6,
        amplitude: 40 + Math.random() * 60,
        frequency: 0.001 + Math.random() * 0.003,
        speed: 0.1 + Math.random() * 0.15,
        phase: Math.random() * Math.PI * 2,
        hue: [270, 290, 260, 305][i],
        opacity: 0.05 + Math.random() * 0.04,
      });
    }
    waveRef.current = waves;
    streaksRef.current = [];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      for (const wave of waveRef.current) {
        wave.phase += wave.speed * 0.016;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const y = wave.y +
            Math.sin(x * wave.frequency + wave.phase) * wave.amplitude +
            Math.sin(x * wave.frequency * 2.3 + wave.phase * 1.7) * wave.amplitude * 0.3 +
            Math.cos(x * wave.frequency * 0.7 + wave.phase * 0.5) * wave.amplitude * 0.5;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, wave.y - wave.amplitude * 2, 0, wave.y + wave.amplitude * 2);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.3, `hsla(${wave.hue}, 80%, 55%, ${wave.opacity})`);
        grad.addColorStop(0.6, `hsla(${wave.hue}, 80%, 55%, ${wave.opacity * 0.5})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fill();
      }

      if (Math.random() < 0.12) {
        const startX = Math.random() * w;
        const startY = Math.random() * h * 0.7;
        streaksRef.current.push({
          x: startX, y: startY,
          vx: (Math.random() - 0.5) * 2.5,
          vy: Math.random() * 1.2 + 0.3,
          life: 0, maxLife: 70 + Math.random() * 90,
          hue: 260 + Math.random() * 50,
          width: 0.4 + Math.random() * 1.2,
          trail: [{ x: startX, y: startY }],
        });
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      for (let i = streaksRef.current.length - 1; i >= 0; i--) {
        const s = streaksRef.current[i];
        s.life++;
        if (s.life > s.maxLife) { streaksRef.current.splice(i, 1); continue; }
        if (mx >= 0) {
          const dx = mx - s.x; const dy = my - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            s.vx += (dx / dist) * 0.25;
            s.vy += (dy / dist) * 0.25;
          }
        }
        s.x += s.vx; s.y += s.vy;
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 25) s.trail.shift();
        const alpha = (1 - s.life / s.maxLife) * 0.5;
        if (s.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(s.trail[0].x, s.trail[0].y);
          for (let j = 1; j < s.trail.length; j++) ctx.lineTo(s.trail[j].x, s.trail[j].y);
          ctx.strokeStyle = `hsla(${s.hue}, 75%, 65%, ${alpha})`;
          ctx.lineWidth = s.width;
          ctx.stroke();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [init]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

export default function ReviewRadar() {
  const { theme } = useTheme();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const product = selectedProduct ? PRODUCTS.find((p) => p.id === selectedProduct) : null;

  const handleSelect = (id: string) => {
    setSelectedProduct(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background relative">
      {theme === "sparkle" && <AuroraCanvas />}
      <div className="relative z-10">
        <Navbar
          onHome={handleBack}
          activeCategory={activeCategory}
          onCategoryChange={(c) => { setActiveCategory(c); setSelectedProduct(null); }}
        />
        <div className="pt-28 px-6 pb-6">
          {product ? (
            <ProductDetailPage product={product} onBack={handleBack} />
          ) : (
            <ProductListPage
              activeCategory={activeCategory}
              onSelectProduct={handleSelect}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
