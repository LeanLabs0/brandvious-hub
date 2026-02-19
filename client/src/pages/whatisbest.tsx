import { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowRight,
  Sun,
  Moon,
  Sparkles,
  Check,
  X,
  Minus,
  Star,
  Search,
  ChevronRight,
  Calendar,
  User,
  ExternalLink,
  BarChart3,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const CATEGORIES = [
  "CRM",
  "Marketing Automation",
  "Project Management",
  "Help Desk",
  "Email Marketing",
  "Analytics",
];

const COMPARISONS = [
  {
    id: "hubspot-vs-salesforce",
    category: "CRM",
    title: "HubSpot vs Salesforce",
    subtitle: "Which CRM fits your growth stage?",
    author: "Sarah Chen",
    authorRole: "B2B SaaS Analyst",
    updated: "Feb 12, 2026",
    readTime: "8 min read",
    verdict: "HubSpot wins for mid-market teams prioritizing ease of use. Salesforce wins for enterprise needing deep customization.",
    products: [
      {
        name: "HubSpot",
        score: 4.4,
        founded: "2006",
        hq: "Cambridge, MA",
        pricing: "Free — $800+/mo",
        bestFor: "Mid-market SaaS (50–500 employees)",
        strengths: ["Ease of use", "All-in-one platform", "Strong free tier", "Native marketing tools"],
        weaknesses: ["Price escalation at scale", "Limited enterprise customization"],
      },
      {
        name: "Salesforce",
        score: 4.2,
        founded: "1999",
        hq: "San Francisco, CA",
        pricing: "$25 — $300+/mo per user",
        bestFor: "Enterprise (500+ employees)",
        strengths: ["Deep customization", "AppExchange ecosystem", "Enterprise reporting", "Industry solutions"],
        weaknesses: ["Steep learning curve", "Implementation complexity"],
      },
    ],
    criteria: [
      { name: "Ease of Setup", a: 5, b: 2 },
      { name: "Customization", a: 3, b: 5 },
      { name: "Reporting", a: 3, b: 5 },
      { name: "Integrations", a: 4, b: 5 },
      { name: "Pricing Transparency", a: 4, b: 2 },
      { name: "AI Features", a: 4, b: 4 },
      { name: "Support Quality", a: 4, b: 3 },
    ],
  },
  {
    id: "notion-vs-monday",
    category: "Project Management",
    title: "Notion vs Monday.com",
    subtitle: "Flexible docs or structured workflows?",
    author: "Marcus Rivera",
    authorRole: "Product Ops Consultant",
    updated: "Feb 6, 2026",
    readTime: "7 min read",
    verdict: "Notion excels at flexible knowledge management. Monday.com wins for structured project workflows with clear timelines.",
    products: [
      {
        name: "Notion",
        score: 4.5,
        founded: "2013",
        hq: "San Francisco, CA",
        pricing: "Free — $15/mo per user",
        bestFor: "Teams wanting flexible, doc-driven workflows",
        strengths: ["Extreme flexibility", "Great for documentation", "AI integration", "Template ecosystem"],
        weaknesses: ["Learning curve for teams", "Weaker timeline/Gantt views"],
      },
      {
        name: "Monday.com",
        score: 4.3,
        founded: "2012",
        hq: "Tel Aviv, Israel",
        pricing: "$9 — $19/mo per user",
        bestFor: "Teams needing visual project tracking",
        strengths: ["Visual dashboards", "Automations", "Timeline views", "Cross-team visibility"],
        weaknesses: ["Can feel rigid", "Price adds up with add-ons"],
      },
    ],
    criteria: [
      { name: "Flexibility", a: 5, b: 3 },
      { name: "Project Tracking", a: 3, b: 5 },
      { name: "Documentation", a: 5, b: 2 },
      { name: "Automations", a: 3, b: 5 },
      { name: "Ease of Use", a: 3, b: 4 },
      { name: "Reporting", a: 3, b: 5 },
      { name: "Pricing Value", a: 5, b: 3 },
    ],
  },
  {
    id: "mailchimp-vs-klaviyo",
    category: "Email Marketing",
    title: "Mailchimp vs Klaviyo",
    subtitle: "General marketing or e-commerce focused?",
    author: "Dana Kim",
    authorRole: "Email Marketing Strategist",
    updated: "Jan 28, 2026",
    readTime: "6 min read",
    verdict: "Mailchimp is the all-purpose choice for most businesses. Klaviyo is the clear winner for e-commerce brands needing deep segmentation.",
    products: [
      {
        name: "Mailchimp",
        score: 4.2,
        founded: "2001",
        hq: "Atlanta, GA",
        pricing: "Free — $350/mo",
        bestFor: "SMBs and general marketing",
        strengths: ["Brand recognition", "All-in-one marketing", "Easy templates", "Wide integrations"],
        weaknesses: ["Automation limits on free tier", "E-commerce segmentation"],
      },
      {
        name: "Klaviyo",
        score: 4.6,
        founded: "2012",
        hq: "Boston, MA",
        pricing: "Free — $700+/mo",
        bestFor: "E-commerce (Shopify, WooCommerce)",
        strengths: ["Deep e-commerce integration", "Advanced segmentation", "Revenue attribution", "Predictive analytics"],
        weaknesses: ["Price scales with contacts", "Learning curve for beginners"],
      },
    ],
    criteria: [
      { name: "E-commerce Fit", a: 3, b: 5 },
      { name: "Segmentation", a: 3, b: 5 },
      { name: "Template Design", a: 5, b: 3 },
      { name: "Ease of Use", a: 5, b: 3 },
      { name: "Automation Depth", a: 3, b: 5 },
      { name: "Analytics", a: 3, b: 5 },
      { name: "Free Tier", a: 4, b: 4 },
    ],
  },
  {
    id: "zendesk-vs-intercom",
    category: "Help Desk",
    title: "Zendesk vs Intercom",
    subtitle: "Traditional ticketing or conversational support?",
    author: "James Park",
    authorRole: "CS Operations Lead",
    updated: "Jan 20, 2026",
    readTime: "7 min read",
    verdict: "Zendesk excels at structured ticket management at scale. Intercom wins for conversational, proactive support with modern UX.",
    products: [
      {
        name: "Zendesk",
        score: 4.1,
        founded: "2007",
        hq: "San Francisco, CA",
        pricing: "$19 — $115/mo per agent",
        bestFor: "Large support teams with ticket workflows",
        strengths: ["Mature ticketing system", "Deep customization", "Marketplace apps", "Multi-channel"],
        weaknesses: ["Dated UI", "Complex setup for advanced features"],
      },
      {
        name: "Intercom",
        score: 4.4,
        founded: "2011",
        hq: "San Francisco, CA",
        pricing: "$74 — $139/mo per seat",
        bestFor: "SaaS teams wanting conversational support",
        strengths: ["Modern messenger UX", "AI bot (Fin)", "Proactive messaging", "Product tours"],
        weaknesses: ["Expensive at scale", "Less suited for email-heavy support"],
      },
    ],
    criteria: [
      { name: "Ticket Management", a: 5, b: 3 },
      { name: "Live Chat", a: 3, b: 5 },
      { name: "AI / Bots", a: 3, b: 5 },
      { name: "Multi-channel", a: 5, b: 4 },
      { name: "Ease of Setup", a: 3, b: 4 },
      { name: "Reporting", a: 4, b: 4 },
      { name: "Pricing Value", a: 4, b: 3 },
    ],
  },
  {
    id: "hubspot-marketing-vs-marketo",
    category: "Marketing Automation",
    title: "HubSpot Marketing vs Marketo",
    subtitle: "All-in-one simplicity or enterprise power?",
    author: "Sarah Chen",
    authorRole: "B2B SaaS Analyst",
    updated: "Feb 1, 2026",
    readTime: "8 min read",
    verdict: "HubSpot Marketing Hub wins for growing teams that want ease and speed. Marketo wins for enterprise teams with complex multi-touch attribution needs.",
    products: [
      {
        name: "HubSpot Marketing",
        score: 4.4,
        founded: "2006",
        hq: "Cambridge, MA",
        pricing: "Free — $3,600/mo",
        bestFor: "SMB to mid-market marketing teams",
        strengths: ["All-in-one platform", "Easy workflow builder", "CRM integration", "Content tools"],
        weaknesses: ["Advanced features locked to higher tiers", "Contact-based pricing"],
      },
      {
        name: "Marketo (Adobe)",
        score: 4.0,
        founded: "2006",
        hq: "San Jose, CA",
        pricing: "Custom (est. $1,000+/mo)",
        bestFor: "Enterprise with complex campaigns",
        strengths: ["Advanced lead scoring", "Multi-touch attribution", "Account-based marketing", "Adobe ecosystem"],
        weaknesses: ["Steep learning curve", "Requires dedicated admin"],
      },
    ],
    criteria: [
      { name: "Ease of Use", a: 5, b: 2 },
      { name: "Lead Scoring", a: 3, b: 5 },
      { name: "Attribution", a: 3, b: 5 },
      { name: "Content Tools", a: 5, b: 3 },
      { name: "CRM Integration", a: 5, b: 4 },
      { name: "Scalability", a: 3, b: 5 },
      { name: "Time to Value", a: 5, b: 2 },
    ],
  },
  {
    id: "mixpanel-vs-amplitude",
    category: "Analytics",
    title: "Mixpanel vs Amplitude",
    subtitle: "Which product analytics platform leads?",
    author: "Dana Kim",
    authorRole: "Email Marketing Strategist",
    updated: "Jan 15, 2026",
    readTime: "6 min read",
    verdict: "Both are strong. Mixpanel edges ahead on simplicity and speed. Amplitude wins for teams needing behavioral cohort analysis at scale.",
    products: [
      {
        name: "Mixpanel",
        score: 4.5,
        founded: "2009",
        hq: "San Francisco, CA",
        pricing: "Free — $24+/mo",
        bestFor: "Product teams tracking events and funnels",
        strengths: ["Fast query engine", "Intuitive UI", "Strong free tier", "JQL for power users"],
        weaknesses: ["Fewer enterprise features", "Smaller ecosystem"],
      },
      {
        name: "Amplitude",
        score: 4.4,
        founded: "2012",
        hq: "San Francisco, CA",
        pricing: "Free — Custom",
        bestFor: "Growth teams running behavioral analysis",
        strengths: ["Behavioral cohorts", "Experiment integration", "CDP features", "Governance tools"],
        weaknesses: ["Steeper learning curve", "Can be slow on complex queries"],
      },
    ],
    criteria: [
      { name: "Query Speed", a: 5, b: 3 },
      { name: "Cohort Analysis", a: 3, b: 5 },
      { name: "Ease of Use", a: 5, b: 3 },
      { name: "Experimentation", a: 3, b: 5 },
      { name: "Free Tier", a: 5, b: 4 },
      { name: "Data Governance", a: 3, b: 5 },
      { name: "Integrations", a: 4, b: 4 },
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
    <Button
      size="icon"
      variant="ghost"
      onClick={toggleTheme}
      data-testid="button-theme-toggle"
    >
      {icon}
    </Button>
  );
}

function ScoreBar({ score, max = 5 }: { score: number; max?: number }) {
  const pct = (score / max) * 100;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-border/30 overflow-hidden">
        <div
          className="h-full rounded-full bg-foreground/30"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] font-mono text-muted-foreground/60 w-4 text-right">{score}</span>
    </div>
  );
}

function Navbar({ activeCategory, onCategoryChange }: { activeCategory: string | null; onCategoryChange: (c: string | null) => void }) {
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
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold tracking-tight text-foreground" data-testid="text-logo">
            WhatisBest<span className="font-normal text-muted-foreground">.com</span>
          </span>
          <Badge variant="outline" className="text-[9px] text-muted-foreground/50 no-default-hover-elevate hidden sm:inline-flex">B2B Comparisons</Badge>
        </div>
        <ThemeToggle />
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-2 flex items-center gap-1 overflow-x-auto no-scrollbar">
        <Button
          variant="ghost"
          size="sm"
          className={`text-[11px] shrink-0 ${!activeCategory ? "text-foreground" : "text-muted-foreground/50"}`}
          onClick={() => onCategoryChange(null)}
          data-testid="button-category-all"
        >
          All
        </Button>
        {CATEGORIES.map((c) => (
          <Button
            key={c}
            variant="ghost"
            size="sm"
            className={`text-[11px] shrink-0 ${activeCategory === c ? "text-foreground" : "text-muted-foreground/50"}`}
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

function ComparisonCard({ comparison, onClick }: { comparison: typeof COMPARISONS[0]; onClick: () => void }) {
  const { theme } = useTheme();
  const a = comparison.products[0];
  const b = comparison.products[1];

  return (
    <div
      className={`rounded-xl border p-5 cursor-pointer transition-colors hover-elevate ${
        theme === "sparkle"
          ? "border-purple-900/20 bg-card/40"
          : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
      }`}
      onClick={onClick}
      data-testid={`card-${comparison.id}`}
    >
      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <Badge variant="outline" className="text-[9px] text-muted-foreground/50 no-default-hover-elevate">{comparison.category}</Badge>
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3 text-muted-foreground/30" />
          <span className="text-[10px] text-muted-foreground/40">{comparison.readTime}</span>
        </div>
      </div>

      <h3 className="text-base font-semibold text-foreground mb-1" data-testid={`text-title-${comparison.id}`}>{comparison.title}</h3>
      <p className="text-xs text-muted-foreground/50 mb-4">{comparison.subtitle}</p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-lg bg-background/40 px-3 py-2.5 text-center">
          <div className="text-sm font-semibold text-foreground">{a.name}</div>
          <div className="flex items-center justify-center gap-1 mt-1">
            <Star className="w-3 h-3 text-foreground/30 fill-foreground/30" />
            <span className="text-xs font-mono text-foreground/60">{a.score}</span>
          </div>
        </div>
        <div className="rounded-lg bg-background/40 px-3 py-2.5 text-center">
          <div className="text-sm font-semibold text-foreground">{b.name}</div>
          <div className="flex items-center justify-center gap-1 mt-1">
            <Star className="w-3 h-3 text-foreground/30 fill-foreground/30" />
            <span className="text-xs font-mono text-foreground/60">{b.score}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <User className="w-3 h-3 text-muted-foreground/30" />
          <span className="text-[10px] text-muted-foreground/40">{comparison.author}</span>
        </div>
        <span className="text-[10px] text-muted-foreground/30">{comparison.updated}</span>
      </div>
    </div>
  );
}

function ComparisonArticle({ comparison, onBack }: { comparison: typeof COMPARISONS[0]; onBack: () => void }) {
  const { theme } = useTheme();
  const a = comparison.products[0];
  const b = comparison.products[1];

  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="text-[11px] text-muted-foreground/50 mb-6 flex items-center gap-1 transition-colors"
        data-testid="button-back"
      >
        <ChevronRight className="w-3 h-3 rotate-180" />
        All comparisons
      </button>

      <div className="mb-8">
        <Badge variant="outline" className="text-[9px] text-muted-foreground/50 no-default-hover-elevate mb-3">{comparison.category}</Badge>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" data-testid="text-article-title">
          {comparison.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground/60">{comparison.subtitle}</p>
        <div className="mt-4 flex items-center gap-4 flex-wrap text-[11px] text-muted-foreground/40">
          <div className="flex items-center gap-1.5">
            <User className="w-3 h-3" />
            <span>{comparison.author}</span>
            <span className="text-muted-foreground/20">|</span>
            <span>{comparison.authorRole}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            <span>Updated {comparison.updated}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            <span>{comparison.readTime}</span>
          </div>
        </div>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium">Verdict</span>
        <p className="mt-2 text-sm text-foreground/70 leading-relaxed" data-testid="text-verdict">{comparison.verdict}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[a, b].map((product) => (
          <div key={product.name} className={`rounded-xl border p-5 ${cardClass}`}>
            <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
              <h2 className="text-lg font-semibold text-foreground">{product.name}</h2>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-foreground/30 fill-foreground/30" />
                <span className="text-sm font-mono text-foreground/60">{product.score}</span>
              </div>
            </div>

            <div className="space-y-2 text-[11px] mb-4">
              <div className="flex justify-between gap-2 flex-wrap">
                <span className="text-muted-foreground/40">Founded</span>
                <span className="text-foreground/60 font-mono">{product.founded}</span>
              </div>
              <div className="flex justify-between gap-2 flex-wrap">
                <span className="text-muted-foreground/40">HQ</span>
                <span className="text-foreground/60">{product.hq}</span>
              </div>
              <div className="flex justify-between gap-2 flex-wrap">
                <span className="text-muted-foreground/40">Pricing</span>
                <span className="text-foreground/60 font-mono">{product.pricing}</span>
              </div>
              <div className="flex justify-between gap-2 flex-wrap">
                <span className="text-muted-foreground/40">Best for</span>
                <span className="text-foreground/60 text-right max-w-[180px]">{product.bestFor}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-muted-foreground/40 uppercase tracking-wider font-medium">Strengths</span>
                <div className="mt-1.5 space-y-1">
                  {product.strengths.map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-emerald-400/50 shrink-0" />
                      <span className="text-[11px] text-foreground/60">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground/40 uppercase tracking-wider font-medium">Weaknesses</span>
                <div className="mt-1.5 space-y-1">
                  {product.weaknesses.map((w) => (
                    <div key={w} className="flex items-center gap-2">
                      <X className="w-3 h-3 text-red-400/40 shrink-0" />
                      <span className="text-[11px] text-foreground/60">{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium mb-4 block">Criteria Comparison</span>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left pb-3 text-muted-foreground/50 font-medium">Criteria</th>
                <th className="text-center pb-3 text-foreground/70 font-medium w-32">{a.name}</th>
                <th className="text-center pb-3 text-foreground/70 font-medium w-32">{b.name}</th>
                <th className="text-center pb-3 text-muted-foreground/50 font-medium w-20">Edge</th>
              </tr>
            </thead>
            <tbody>
              {comparison.criteria.map((c, i) => {
                const winner = c.a > c.b ? a.name : c.b > c.a ? b.name : "Tie";
                return (
                  <tr key={c.name} className={i < comparison.criteria.length - 1 ? "border-b border-border/10" : ""}>
                    <td className="py-2.5 text-foreground/60">{c.name}</td>
                    <td className="py-2.5 px-2">
                      <ScoreBar score={c.a} />
                    </td>
                    <td className="py-2.5 px-2">
                      <ScoreBar score={c.b} />
                    </td>
                    <td className="py-2.5 text-center">
                      <span className={`text-[10px] font-mono ${winner === "Tie" ? "text-muted-foreground/40" : "text-foreground/50"}`}>
                        {winner === "Tie" ? "—" : winner.split(" ")[0]}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium mb-3 block">Schema Markup</span>
        <div className="rounded-lg bg-background/40 p-4 font-mono text-[10px] leading-relaxed overflow-x-auto">
          <div className="text-foreground/40">{"{"}</div>
          <div className="pl-3"><span className="text-emerald-400/70">"@type"</span>: <span className="text-foreground/50">"ComparisonArticle"</span>,</div>
          <div className="pl-3"><span className="text-emerald-400/70">"products"</span>: [<span className="text-foreground/50">"{a.name}", "{b.name}"</span>],</div>
          <div className="pl-3"><span className="text-emerald-400/70">"category"</span>: <span className="text-foreground/50">"{comparison.category}"</span>,</div>
          <div className="pl-3"><span className="text-emerald-400/70">"author"</span>: <span className="text-foreground/50">"{comparison.author}"</span>,</div>
          <div className="pl-3"><span className="text-emerald-400/70">"dateModified"</span>: <span className="text-foreground/50">"2026-02-12"</span>,</div>
          <div className="pl-3"><span className="text-emerald-400/70">"verdict"</span>: <span className="text-foreground/50">"{comparison.verdict.slice(0, 60)}..."</span></div>
          <div className="text-foreground/40">{"}"}</div>
        </div>
        <p className="mt-3 text-[10px] text-muted-foreground/40">
          Every comparison outputs structured data so AI search engines can parse criteria, scores, and verdicts directly.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 py-6 border-t border-border/20 flex-wrap">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground/40">
          <User className="w-3 h-3" />
          <span>Written by <span className="text-foreground/50">{comparison.author}</span>, {comparison.authorRole}</span>
        </div>
        <div className="text-[10px] text-muted-foreground/30">
          Last verified {comparison.updated}
        </div>
      </div>
    </div>
  );
}

function FeaturedStats() {
  const { theme } = useTheme();
  const stats = [
    { label: "Comparisons", value: "48", icon: BarChart3 },
    { label: "Categories", value: "6", icon: Search },
    { label: "Products Covered", value: "96", icon: TrendingUp },
    { label: "Expert Authors", value: "12", icon: User },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className={`rounded-xl border px-4 py-3 text-center ${
              theme === "sparkle"
                ? "border-purple-900/20 bg-card/40"
                : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40"
            }`}
          >
            <Icon className="w-3.5 h-3.5 text-muted-foreground/40 mx-auto mb-1.5" />
            <div className="text-lg font-bold text-foreground font-mono">{s.value}</div>
            <div className="text-[10px] text-muted-foreground/40">{s.label}</div>
          </div>
        );
      })}
    </div>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-border/30 mt-12" data-testid="section-footer">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-sm font-semibold text-foreground">
              WhatisBest<span className="font-normal text-muted-foreground">.com</span>
            </span>
            <p className="mt-1 text-xs text-muted-foreground/60">
              Expert-vetted B2B SaaS comparisons built for AI citations.
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground/40">
              Part of Brandvious, Inc.
            </p>
            <p className="text-[10px] text-muted-foreground/40">
              Land O' Lakes, Florida
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4 flex-wrap text-[10px] text-muted-foreground/30">
          <span>No affiliate rankings</span>
          <span className="text-muted-foreground/10">|</span>
          <span>Named expert authors</span>
          <span className="text-muted-foreground/10">|</span>
          <span>Quarterly updates</span>
          <span className="text-muted-foreground/10">|</span>
          <span>Schema-first architecture</span>
        </div>

        <div className="mt-6 pt-6 border-t border-border/20">
          <p className="text-[10px] text-muted-foreground/30">
            &copy; 2026 Brandvious, Inc. All rights reserved.
          </p>
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

export default function WhatisBest() {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedComparison, setSelectedComparison] = useState<string | null>(null);

  const filtered = activeCategory
    ? COMPARISONS.filter((c) => c.category === activeCategory)
    : COMPARISONS;

  const selected = selectedComparison
    ? COMPARISONS.find((c) => c.id === selectedComparison)
    : null;

  return (
    <div className="min-h-screen bg-background relative">
      {theme === "sparkle" && <AuroraCanvas />}
      <div className="relative z-10">
        <Navbar activeCategory={activeCategory} onCategoryChange={(c) => { setActiveCategory(c); setSelectedComparison(null); }} />
        <div className="pt-28 px-6 pb-6">
          <div className="max-w-6xl mx-auto">
            {selected ? (
              <ComparisonArticle
                comparison={selected}
                onBack={() => setSelectedComparison(null)}
              />
            ) : (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" data-testid="text-page-title">
                    {activeCategory ? `${activeCategory} Comparisons` : "B2B Software Comparisons"}
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground/60 max-w-lg">
                    Expert-vetted, schema-structured comparisons that AI search engines cite. No affiliate rankings. Updated quarterly.
                  </p>
                </div>

                {!activeCategory && <FeaturedStats />}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map((c) => (
                    <ComparisonCard
                      key={c.id}
                      comparison={c}
                      onClick={() => setSelectedComparison(c.id)}
                    />
                  ))}
                </div>

                {filtered.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-sm text-muted-foreground/40">No comparisons in this category yet.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
