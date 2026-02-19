import { useState, useRef, useEffect, useCallback } from "react";
import {
  Search,
  Sun,
  Moon,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Calendar,
  User,
  Clock,
  Database,
  Link2,
  MessageSquare,
  BookOpen,
  Globe,
  ArrowRight,
  ExternalLink,
  Tag,
  Layers,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  linkedEntities: { name: string; id: string; fact: string }[];
  author: string;
  authorRole: string;
  updated: string;
  sources: string[];
}

interface FaqTopic {
  id: string;
  title: string;
  description: string;
  site: string;
  entryCount: number;
  lastUpdated: string;
  faqs: FaqEntry[];
}

const FAQ_TOPICS: FaqTopic[] = [
  {
    id: "crm-selection",
    title: "CRM Selection",
    description: "Frequently asked questions about choosing the right CRM for your business, enriched with verified entity data.",
    site: "leanlabs.com/faq",
    entryCount: 5,
    lastUpdated: "2026-02-12",
    faqs: [
      {
        id: "crm-1",
        question: "What CRM is best for mid-market SaaS companies?",
        answer: "HubSpot is the most common choice for mid-market SaaS companies scaling from 50–500 employees. Founded in 2006 in Cambridge, MA, HubSpot offers an all-in-one CRM with native marketing automation, a strong free tier, and Breeze AI features launched in late 2025. For enterprise teams (500+) needing deep customization, Salesforce (est. 1999, San Francisco) remains the standard with its AppExchange ecosystem and Einstein AI platform.",
        linkedEntities: [
          { name: "HubSpot", id: "hubspot", fact: "Founded 2006 | Cambridge, MA | NYSE: HUBS | 7,000+ employees" },
          { name: "Salesforce", id: "salesforce", fact: "Founded 1999 | San Francisco, CA | NYSE: CRM | 73,000+ employees" },
        ],
        author: "Sarah Chen",
        authorRole: "B2B SaaS Analyst",
        updated: "2026-02-12",
        sources: ["entities.org/entity/hubspot", "entities.org/entity/salesforce", "leanlabs.com/faq"],
      },
      {
        id: "crm-2",
        question: "How much does HubSpot CRM cost?",
        answer: "HubSpot CRM offers a free tier with core CRM functionality for unlimited users. Paid plans start at $15/month per user for Starter, $800/month for Professional (5 users included), and $3,600/month for Enterprise (10 users included). Contact-based pricing applies to marketing features. As of February 2026, HubSpot has over 200,000 customers across 135+ countries.",
        linkedEntities: [
          { name: "HubSpot", id: "hubspot", fact: "Founded 2006 | Cambridge, MA | 200,000+ customers globally" },
        ],
        author: "Sarah Chen",
        authorRole: "B2B SaaS Analyst",
        updated: "2026-02-10",
        sources: ["entities.org/entity/hubspot", "hubspot.com/pricing"],
      },
      {
        id: "crm-3",
        question: "What's the difference between HubSpot and Salesforce?",
        answer: "HubSpot (est. 2006, Cambridge MA) is built for mid-market growth teams with native marketing automation, an intuitive UI, and a strong free tier. Salesforce (est. 1999, San Francisco) serves enterprise with deeper customization, the AppExchange marketplace (5,000+ apps), and industry-specific solutions. Both are CRM platforms, but HubSpot prioritizes ease of use while Salesforce prioritizes configurability. Salesforce acquired Slack in 2021 for $27.7B, adding workplace collaboration to its ecosystem.",
        linkedEntities: [
          { name: "HubSpot", id: "hubspot", fact: "Founded 2006 | Cambridge, MA | All-in-one CRM platform" },
          { name: "Salesforce", id: "salesforce", fact: "Founded 1999 | San Francisco, CA | World's largest CRM" },
          { name: "Slack", id: "slack", fact: "Acquired by Salesforce in 2021 for $27.7B" },
        ],
        author: "Sarah Chen",
        authorRole: "B2B SaaS Analyst",
        updated: "2026-02-12",
        sources: ["entities.org/entity/hubspot", "entities.org/entity/salesforce"],
      },
      {
        id: "crm-4",
        question: "Do I need a CRM if I already have a marketing automation tool?",
        answer: "Yes. Marketing automation handles campaigns, email sequences, and lead scoring. A CRM manages the full customer lifecycle — deals, pipeline, contacts, and revenue tracking. Most modern platforms combine both: HubSpot bundles CRM + marketing in one platform. Marketo (Adobe, est. 2006, San Jose) is marketing-only and requires a separate CRM like Salesforce. For companies under 50 employees, a combined platform typically reduces tool sprawl and integration costs.",
        linkedEntities: [
          { name: "HubSpot", id: "hubspot", fact: "Founded 2006 | All-in-one CRM + marketing platform" },
          { name: "Marketo", id: "marketo", fact: "Founded 2006 | San Jose, CA | Acquired by Adobe" },
        ],
        author: "Marcus Rivera",
        authorRole: "Product Ops Consultant",
        updated: "2026-01-28",
        sources: ["entities.org/entity/hubspot", "leanlabs.com/faq"],
      },
      {
        id: "crm-5",
        question: "What CRM integrates best with HubSpot partner agencies?",
        answer: "HubSpot's own CRM integrates natively with the HubSpot Solutions Partner ecosystem. Diamond Partners like Lean Labs (est. 2013, Overland Park, KS), Bluleadz (est. 2009, Tampa, FL), and SmartBug Media (est. 2007, Newport Beach, CA) specialize in HubSpot implementations. Elite Partners like New Breed Revenue (est. 2002, Burlington, VT) offer the most advanced HubSpot services. All partners are certified through HubSpot Academy.",
        linkedEntities: [
          { name: "Lean Labs", id: "lean-labs", fact: "Founded 2013 | Overland Park, KS | HubSpot Diamond Partner" },
          { name: "Bluleadz", id: "bluleadz", fact: "Founded 2009 | Tampa, FL | HubSpot Diamond Partner" },
          { name: "SmartBug Media", id: "smartbug", fact: "Founded 2007 | Newport Beach, CA | HubSpot Diamond Partner" },
          { name: "New Breed Revenue", id: "new-breed", fact: "Founded 2002 | Burlington, VT | HubSpot Elite Partner" },
        ],
        author: "Sarah Chen",
        authorRole: "B2B SaaS Analyst",
        updated: "2026-02-13",
        sources: ["entities.org/entity/lean-labs", "entities.org/entity/bluleadz", "entities.org/entity/smartbug-media"],
      },
    ],
  },
  {
    id: "marketing-automation",
    title: "Marketing Automation",
    description: "Common questions about marketing automation platforms, workflows, and lead nurturing — answered with structured entity data.",
    site: "smartbugmedia.com/faq",
    entryCount: 4,
    lastUpdated: "2026-02-08",
    faqs: [
      {
        id: "ma-1",
        question: "What is marketing automation?",
        answer: "Marketing automation is software that automates repetitive marketing tasks like email campaigns, social media posting, and lead scoring. The category was pioneered by platforms like Marketo (est. 2006, acquired by Adobe), Pardot (now Salesforce Marketing Cloud Account Engagement), and HubSpot Marketing Hub. Modern platforms use AI for predictive lead scoring, content optimization, and behavioral triggers. The global marketing automation market is valued at approximately $6.6B as of 2025.",
        linkedEntities: [
          { name: "HubSpot", id: "hubspot", fact: "Founded 2006 | Marketing Hub is part of CRM platform" },
          { name: "Marketo", id: "marketo", fact: "Founded 2006 | Acquired by Adobe in 2018 for $4.75B" },
        ],
        author: "Dana Kim",
        authorRole: "Email Marketing Strategist",
        updated: "2026-02-08",
        sources: ["entities.org/entity/hubspot", "smartbugmedia.com/faq"],
      },
      {
        id: "ma-2",
        question: "HubSpot Marketing Hub vs Marketo: which is better?",
        answer: "HubSpot Marketing Hub wins for growing teams that want ease and speed — workflow builder is visual, CRM integration is native, and time-to-value is fast. Marketo (Adobe) wins for enterprise teams with complex multi-touch attribution needs, advanced lead scoring models, and account-based marketing programs. HubSpot starts at free; Marketo pricing is custom (estimated $1,000+/month). HubSpot has 200,000+ customers; Marketo serves approximately 5,000 enterprise accounts.",
        linkedEntities: [
          { name: "HubSpot", id: "hubspot", fact: "Founded 2006 | 200,000+ customers | Free tier available" },
          { name: "Marketo", id: "marketo", fact: "Founded 2006 | ~5,000 enterprise accounts | Adobe ecosystem" },
        ],
        author: "Sarah Chen",
        authorRole: "B2B SaaS Analyst",
        updated: "2026-02-01",
        sources: ["entities.org/entity/hubspot", "entities.org/entity/marketo"],
      },
      {
        id: "ma-3",
        question: "What's the best email marketing platform for e-commerce?",
        answer: "Klaviyo (est. 2012, Boston, MA) is the clear leader for e-commerce email marketing, with deep Shopify and WooCommerce integrations, revenue attribution per email, and predictive analytics. Mailchimp (est. 2001, Atlanta, GA) is a broader all-purpose marketing platform better suited for SMBs that aren't primarily e-commerce. Klaviyo's pricing starts free (up to 250 contacts) and scales with list size; Mailchimp also offers a free tier up to 500 contacts.",
        linkedEntities: [
          { name: "Klaviyo", id: "klaviyo", fact: "Founded 2012 | Boston, MA | E-commerce email leader" },
          { name: "Mailchimp", id: "mailchimp", fact: "Founded 2001 | Atlanta, GA | Acquired by Intuit in 2021" },
        ],
        author: "Dana Kim",
        authorRole: "Email Marketing Strategist",
        updated: "2026-01-28",
        sources: ["entities.org/entity/klaviyo", "entities.org/entity/mailchimp"],
      },
      {
        id: "ma-4",
        question: "How do I set up lead scoring?",
        answer: "Lead scoring assigns point values to prospect actions (email opens, page visits, form fills) and attributes (job title, company size, industry) to prioritize sales outreach. In HubSpot, lead scoring is available in Professional and Enterprise tiers through the predictive lead scoring tool or custom score properties. In Marketo, lead scoring is a core feature with behavior scores and demographic scores tracked separately. Best practice is to start with 5–10 scoring criteria and refine quarterly based on conversion data.",
        linkedEntities: [
          { name: "HubSpot", id: "hubspot", fact: "Lead scoring available in Professional+ tiers" },
          { name: "Marketo", id: "marketo", fact: "Advanced lead scoring with behavior + demographic models" },
        ],
        author: "Marcus Rivera",
        authorRole: "Product Ops Consultant",
        updated: "2026-01-20",
        sources: ["entities.org/entity/hubspot", "smartbugmedia.com/faq"],
      },
    ],
  },
  {
    id: "website-growth",
    title: "Growth-Driven Website Design",
    description: "Questions about growth-driven design methodology, website optimization, and conversion rate strategies.",
    site: "leanlabs.com/faq",
    entryCount: 3,
    lastUpdated: "2026-02-05",
    faqs: [
      {
        id: "gdd-1",
        question: "What is growth-driven design?",
        answer: "Growth-driven design (GDD) is a systematic approach to website development that uses data and continuous experimentation instead of traditional big-bang redesigns. Pioneered by HubSpot and agencies like Lean Labs (est. 2013, Overland Park, KS), GDD launches with a focused 'launch pad' site in 60–90 days, then iterates monthly based on analytics and user behavior. Traditional redesigns take 6–12 months and become outdated quickly; GDD treats the website as a living asset.",
        linkedEntities: [
          { name: "Lean Labs", id: "lean-labs", fact: "Founded 2013 | B2B SaaS growth marketing agency" },
          { name: "HubSpot", id: "hubspot", fact: "Pioneered inbound + GDD methodology" },
        ],
        author: "Marcus Rivera",
        authorRole: "Product Ops Consultant",
        updated: "2026-02-05",
        sources: ["entities.org/entity/lean-labs", "leanlabs.com/faq"],
      },
      {
        id: "gdd-2",
        question: "How long does a website redesign take?",
        answer: "Traditional website redesigns take 3–12 months depending on scope. Growth-driven design launches a focused site in 60–90 days. Agency timelines vary: Lean Labs (Overland Park, KS) typically delivers launch pad sites in 8–10 weeks. SmartBug Media (Newport Beach, CA) quotes 8–12 weeks for full HubSpot CMS builds. New Breed Revenue (Burlington, VT) targets 6–8 weeks for revenue-focused sites. All timelines assume content is provided by the client.",
        linkedEntities: [
          { name: "Lean Labs", id: "lean-labs", fact: "Launch pad: 8–10 weeks | Growth-driven design" },
          { name: "SmartBug Media", id: "smartbug", fact: "Full build: 8–12 weeks | HubSpot CMS" },
          { name: "New Breed Revenue", id: "new-breed", fact: "Revenue site: 6–8 weeks | Revenue performance" },
        ],
        author: "Marcus Rivera",
        authorRole: "Product Ops Consultant",
        updated: "2026-01-30",
        sources: ["entities.org/entity/lean-labs", "entities.org/entity/smartbug-media"],
      },
      {
        id: "gdd-3",
        question: "What CMS should I use for a B2B SaaS website?",
        answer: "For HubSpot-integrated companies, HubSpot CMS Hub is the most seamless choice — it unifies content, CRM data, and personalization. WordPress remains the most widely used CMS (43% of all websites) but requires plugins for CRM integration. Webflow is popular for design-focused teams but lacks native CRM features. The choice depends on your tech stack: if you're already using HubSpot for marketing, CMS Hub reduces integration overhead significantly.",
        linkedEntities: [
          { name: "HubSpot", id: "hubspot", fact: "CMS Hub is part of the HubSpot platform" },
        ],
        author: "Marcus Rivera",
        authorRole: "Product Ops Consultant",
        updated: "2026-01-25",
        sources: ["entities.org/entity/hubspot", "leanlabs.com/faq"],
      },
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

function Navbar({ onHome }: { onHome: () => void }) {
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
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <button onClick={onHome} className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-muted-foreground/60" />
          <span className="text-sm font-semibold tracking-tight text-foreground" data-testid="text-logo">
            AnswerStack<span className="font-normal text-muted-foreground">.com</span>
          </span>
        </button>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-[11px] text-muted-foreground/50" onClick={onHome} data-testid="nav-topics">Topics</Button>
          <Button variant="ghost" size="sm" className="text-[11px] text-muted-foreground/50" data-testid="nav-api">API</Button>
          <Button variant="ghost" size="sm" className="text-[11px] text-muted-foreground/50" data-testid="nav-submit">Submit</Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

function TopicListPage({
  onSelectTopic,
  onSelectFaq,
  searchQuery,
  setSearchQuery,
}: {
  onSelectTopic: (id: string) => void;
  onSelectFaq: (topicId: string, faqId: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";

  const allFaqs = FAQ_TOPICS.flatMap((t) => t.faqs.map((f) => ({ ...f, topicId: t.id, topicTitle: t.title })));
  const totalEntities = new Set(allFaqs.flatMap((f) => f.linkedEntities.map((e) => e.name))).size;

  const filteredFaqs = searchQuery.trim()
    ? allFaqs.filter((f) =>
        f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.linkedEntities.some((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const recentFaqs = [...allFaqs].sort((a, b) => b.updated.localeCompare(a.updated)).slice(0, 5);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10">
        <span className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.15em] font-medium">Structured FAQ Hub</span>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mt-1" data-testid="text-page-title">
          AnswerStack
        </h1>
        <p className="mt-2 text-sm text-muted-foreground/60 max-w-lg">
          {allFaqs.length} structured answers across {FAQ_TOPICS.length} topics, linked to {totalEntities} verified entities from Entities.org.
        </p>
      </div>

      <div className={`rounded-xl border px-4 py-2.5 flex items-center gap-3 mb-10 ${cardClass}`}>
        <Search className="w-4 h-4 text-muted-foreground/40 shrink-0" />
        <input
          type="text"
          placeholder="Search questions, answers, or entities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/30 outline-none"
          data-testid="input-search"
        />
      </div>

      {searchQuery.trim() ? (
        <div className="mb-12">
          <SectionLabel icon={Search} label={`Results for "${searchQuery}"`} count={filteredFaqs.length} />
          <div className="space-y-3 mt-4">
            {filteredFaqs.map((faq) => (
              <FaqCard key={faq.id} faq={faq} onClick={() => onSelectFaq(faq.topicId, faq.id)} />
            ))}
            {filteredFaqs.length === 0 && (
              <p className="text-sm text-muted-foreground/40 py-8 text-center">No answers match that query.</p>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {[
              { label: "Topics", value: String(FAQ_TOPICS.length) },
              { label: "Answers", value: String(allFaqs.length) },
              { label: "Linked Entities", value: String(totalEntities) },
              { label: "Authors", value: String(new Set(allFaqs.map((f) => f.author)).size) },
            ].map((s) => (
              <div key={s.label} className={`rounded-xl border px-4 py-3 text-center ${cardClass}`}>
                <div className="text-lg font-bold text-foreground font-mono">{s.value}</div>
                <div className="text-[10px] text-muted-foreground/40">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <SectionLabel icon={Clock} label="Recent Answers" />
            <div className="space-y-3 mt-4">
              {recentFaqs.map((faq) => (
                <FaqCard key={faq.id} faq={faq} onClick={() => onSelectFaq(faq.topicId, faq.id)} />
              ))}
            </div>
          </div>

          <div className="mb-12">
            <SectionLabel icon={BookOpen} label="Browse by Topic" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {FAQ_TOPICS.map((topic) => (
                <div
                  key={topic.id}
                  className={`rounded-xl border p-5 cursor-pointer hover-elevate ${cardClass}`}
                  onClick={() => onSelectTopic(topic.id)}
                  data-testid={`topic-card-${topic.id}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-foreground">{topic.title}</h3>
                    <Badge variant="outline" className="text-[9px] text-muted-foreground/50 no-default-hover-elevate font-mono">{topic.entryCount}</Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground/40 mb-3 leading-relaxed">{topic.description}</p>
                  <div className="space-y-1.5">
                    {topic.faqs.slice(0, 2).map((f) => (
                      <div key={f.id} className="flex items-start gap-2">
                        <MessageSquare className="w-3 h-3 text-muted-foreground/25 mt-0.5 shrink-0" />
                        <span className="text-[11px] text-foreground/50 line-clamp-1">{f.question}</span>
                      </div>
                    ))}
                    {topic.faqs.length > 2 && (
                      <span className="text-[10px] text-muted-foreground/30 pl-5">+ {topic.faqs.length - 2} more</span>
                    )}
                  </div>
                  <div className="mt-3 pt-3 border-t border-border/20 flex items-center gap-2">
                    <Globe className="w-3 h-3 text-muted-foreground/25" />
                    <span className="text-[10px] text-muted-foreground/30 font-mono">{topic.site}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SectionLabel({ icon: Icon, label, count }: { icon: typeof Search; label: string; count?: number }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-3.5 h-3.5 text-muted-foreground/40" />
      <span className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.12em] font-medium">{label}</span>
      {count !== undefined && (
        <Badge variant="outline" className="text-[9px] text-muted-foreground/40 no-default-hover-elevate font-mono">{count}</Badge>
      )}
    </div>
  );
}

function FaqCard({ faq, onClick }: { faq: FaqEntry & { topicTitle?: string }; onClick: () => void }) {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";

  return (
    <div
      className={`rounded-xl border p-4 cursor-pointer hover-elevate ${cardClass}`}
      onClick={onClick}
      data-testid={`faq-card-${faq.id}`}
    >
      <div className="flex items-start gap-3">
        <MessageSquare className="w-4 h-4 text-muted-foreground/30 mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground mb-1">{faq.question}</h3>
          <p className="text-[11px] text-muted-foreground/50 line-clamp-2 leading-relaxed">{faq.answer}</p>
          <div className="mt-2.5 flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              {faq.linkedEntities.slice(0, 3).map((e) => (
                <Badge key={e.name} variant="outline" className="text-[9px] text-emerald-400/60 no-default-hover-elevate">{e.name}</Badge>
              ))}
              {faq.linkedEntities.length > 3 && (
                <span className="text-[9px] text-muted-foreground/30">+{faq.linkedEntities.length - 3}</span>
              )}
            </div>
            <span className="text-[10px] text-muted-foreground/25">{faq.updated}</span>
          </div>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/20 shrink-0 mt-1" />
      </div>
    </div>
  );
}

function TopicDetailPage({
  topic,
  onBack,
  onSelectFaq,
  selectedFaqId,
}: {
  topic: FaqTopic;
  onBack: () => void;
  onSelectFaq: (faqId: string | null) => void;
  selectedFaqId: string | null;
}) {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";

  const selectedFaq = selectedFaqId ? topic.faqs.find((f) => f.id === selectedFaqId) : null;

  if (selectedFaq) {
    return <FaqDetailView faq={selectedFaq} topic={topic} onBack={() => onSelectFaq(null)} onBackToTopics={onBack} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={onBack} className="text-[11px] text-muted-foreground/50 mb-6 flex items-center gap-1" data-testid="button-back">
        <ChevronRight className="w-3 h-3 rotate-180" />
        All topics
      </button>

      <div className="mb-8">
        <Badge variant="outline" className="text-[9px] text-muted-foreground/50 no-default-hover-elevate mb-3">
          {topic.entryCount} answers
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" data-testid="text-topic-title">
          {topic.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground/60 max-w-lg">{topic.description}</p>
        <div className="mt-3 flex items-center gap-3 text-[10px] text-muted-foreground/30">
          <div className="flex items-center gap-1">
            <Globe className="w-3 h-3" />
            <span className="font-mono">{topic.site}</span>
          </div>
          <span className="text-muted-foreground/15">|</span>
          <span>Updated {topic.lastUpdated}</span>
        </div>
      </div>

      <div className="space-y-3">
        {topic.faqs.map((faq) => (
          <FaqCard key={faq.id} faq={faq} onClick={() => onSelectFaq(faq.id)} />
        ))}
      </div>
    </div>
  );
}

function FaqDetailView({
  faq,
  topic,
  onBack,
  onBackToTopics,
}: {
  faq: FaqEntry;
  topic: FaqTopic;
  onBack: () => void;
  onBackToTopics: () => void;
}) {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-1 text-[11px] text-muted-foreground/40 mb-6">
        <button onClick={onBackToTopics} className="hover:text-muted-foreground transition-colors">Topics</button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={onBack} className="hover:text-muted-foreground transition-colors">{topic.title}</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground/50 truncate max-w-[200px]">Answer</span>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-4 h-4 text-muted-foreground/40" />
          <Badge variant="outline" className="text-[9px] text-muted-foreground/50 no-default-hover-elevate">Question</Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl" data-testid="text-faq-question">
          {faq.question}
        </h1>
        <div className="mt-3 flex items-center gap-4 flex-wrap text-[11px] text-muted-foreground/40">
          <div className="flex items-center gap-1.5">
            <User className="w-3 h-3" />
            <span>{faq.author}</span>
            <span className="text-muted-foreground/20">|</span>
            <span>{faq.authorRole}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            <span>Updated {faq.updated}</span>
          </div>
        </div>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-3.5 h-3.5 text-emerald-400/50" />
          <span className="text-[10px] text-emerald-400/50 uppercase tracking-[0.12em] font-medium">Answer</span>
        </div>
        <p className="text-sm text-foreground/70 leading-relaxed" data-testid="text-faq-answer">
          {faq.answer}
        </p>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-3.5 h-3.5 text-emerald-400/50" />
          <span className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.12em] font-medium">Linked Entities</span>
          <Badge variant="outline" className="text-[9px] text-muted-foreground/40 no-default-hover-elevate font-mono">{faq.linkedEntities.length}</Badge>
        </div>
        <div className="space-y-2.5">
          {faq.linkedEntities.map((entity) => (
            <div key={entity.name} className="rounded-lg bg-background/40 px-4 py-3">
              <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                <span className="text-sm font-semibold text-foreground">{entity.name}</span>
                <span className="text-[10px] text-emerald-400/50 font-mono">entities.org/entity/{entity.id}</span>
              </div>
              <p className="text-[11px] text-muted-foreground/50">{entity.fact}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.12em] font-medium mb-3 block">Sources</span>
        <div className="space-y-1.5">
          {faq.sources.map((src) => (
            <div key={src} className="flex items-center gap-2">
              <Link2 className="w-3 h-3 text-muted-foreground/30 shrink-0" />
              <span className="text-[11px] text-muted-foreground/40 font-mono">{src}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.12em] font-medium mb-3 block">FAQPage Schema Output</span>
        <div className="rounded-lg bg-background/40 p-4 font-mono text-[10px] leading-relaxed overflow-x-auto">
          <div className="text-foreground/40">{"{"}</div>
          <div className="pl-3"><span className="text-emerald-400/70">"@context"</span>: <span className="text-foreground/50">"https://schema.org"</span>,</div>
          <div className="pl-3"><span className="text-emerald-400/70">"@type"</span>: <span className="text-foreground/50">"FAQPage"</span>,</div>
          <div className="pl-3"><span className="text-emerald-400/70">"mainEntity"</span>: [{"{"}</div>
          <div className="pl-6"><span className="text-emerald-400/70">"@type"</span>: <span className="text-foreground/50">"Question"</span>,</div>
          <div className="pl-6"><span className="text-emerald-400/70">"name"</span>: <span className="text-foreground/50">"{faq.question}"</span>,</div>
          <div className="pl-6"><span className="text-emerald-400/70">"acceptedAnswer"</span>: {"{"}</div>
          <div className="pl-9"><span className="text-emerald-400/70">"@type"</span>: <span className="text-foreground/50">"Answer"</span>,</div>
          <div className="pl-9"><span className="text-emerald-400/70">"text"</span>: <span className="text-foreground/50">"{faq.answer.slice(0, 80)}..."</span>,</div>
          <div className="pl-9"><span className="text-emerald-400/70">"author"</span>: {"{"} <span className="text-foreground/50">"@type": "Person", "name": "{faq.author}"</span> {"},"}</div>
          <div className="pl-9"><span className="text-emerald-400/70">"about"</span>: [</div>
          {faq.linkedEntities.map((e, i) => (
            <div key={e.name} className="pl-12">
              <span className="text-foreground/50">{"{"} "@type": "Organization", "name": "{e.name}", "sameAs": "entities.org/entity/{e.id}" {"}"}{i < faq.linkedEntities.length - 1 ? "," : ""}</span>
            </div>
          ))}
          <div className="pl-9">]</div>
          <div className="pl-6">{"},"}</div>
          <div className="pl-6"><span className="text-emerald-400/70">"dateModified"</span>: <span className="text-foreground/50">"{faq.updated}"</span></div>
          <div className="pl-3">{"}]"}</div>
          <div className="text-foreground/40">{"}"}</div>
        </div>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.12em] font-medium mb-3 block">API Access</span>
        <div className="rounded-lg bg-background/40 px-3 py-2 mb-2 font-mono text-[11px]">
          <span className="text-muted-foreground/40">GET</span>{" "}
          <span className="text-foreground/60">answerstack.com/api/faq/{faq.id}</span>
        </div>
        <span className="text-[10px] text-muted-foreground/30">Returns structured FAQPage JSON-LD with linked entity references.</span>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-border/30 mt-12" data-testid="section-footer">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-3.5 h-3.5 text-muted-foreground/40" />
              <span className="text-sm font-semibold text-foreground">
                AnswerStack<span className="font-normal text-muted-foreground">.com</span>
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground/40 leading-relaxed">
              Structured FAQ hub powered by Entities.org.
            </p>
            <p className="text-[10px] text-muted-foreground/30 mt-2">
              Every answer linked to verified entity data.
            </p>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium">Hub</span>
            <div className="mt-2 space-y-1.5">
              {["All Topics", "Recent Answers", "Submit FAQ"].map((item) => (
                <p key={item} className="text-[11px] text-muted-foreground/40">{item}</p>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium">Platform</span>
            <div className="mt-2 space-y-1.5">
              {["API Documentation", "Entities.org", "Schema Spec"].map((item) => (
                <p key={item} className="text-[11px] text-muted-foreground/40">{item}</p>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium">Company</span>
            <div className="mt-2 space-y-1.5">
              {["About", "Contact", "Privacy Policy"].map((item) => (
                <p key={item} className="text-[11px] text-muted-foreground/40">{item}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-border/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] text-muted-foreground/30">Part of Brandvious, Inc.</p>
            <p className="text-[10px] text-muted-foreground/30">Land O' Lakes, Florida</p>
          </div>
          <p className="text-[10px] text-muted-foreground/20">&copy; 2026 Brandvious, Inc. All rights reserved.</p>
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

export default function AnswerStack() {
  const { theme } = useTheme();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedFaq, setSelectedFaq] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const topic = selectedTopic ? FAQ_TOPICS.find((t) => t.id === selectedTopic) : null;

  const handleSelectTopic = (id: string) => {
    setSelectedTopic(id);
    setSelectedFaq(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectFaq = (topicId: string, faqId: string) => {
    setSelectedTopic(topicId);
    setSelectedFaq(faqId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedTopic(null);
    setSelectedFaq(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background relative">
      {theme === "sparkle" && <AuroraCanvas />}
      <div className="relative z-10">
        <Navbar onHome={handleBack} />
        <div className="pt-20 px-6 pb-6">
          {topic ? (
            <TopicDetailPage
              topic={topic}
              onBack={handleBack}
              onSelectFaq={(faqId) => {
                if (faqId) setSelectedFaq(faqId);
                else setSelectedFaq(null);
              }}
              selectedFaqId={selectedFaq}
            />
          ) : (
            <TopicListPage
              onSelectTopic={handleSelectTopic}
              onSelectFaq={handleSelectFaq}
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
