import { useState, useRef, useEffect, useCallback } from "react";
import {
  Search,
  Sun,
  Moon,
  Sparkles,
  ChevronRight,
  Clock,
  ArrowRight,
  TrendingUp,
  BookOpen,
  User,
  Calendar,
  Tag,
  Layers,
  BarChart3,
  Zap,
  Shield,
  Globe,
  Users,
  Award,
  Target,
  Lightbulb,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

type ArticleType = "comparison" | "roundup" | "guide" | "trending";

interface Mention {
  name: string;
  verdict: string;
}

interface Article {
  id: string;
  title: string;
  subtitle: string;
  type: ArticleType;
  category: string;
  tags: string[];
  readTime: string;
  wordCount: string;
  author: string;
  authorRole: string;
  updated: string;
  featured?: boolean;
  intro: string;
  sections: { heading: string; content: string }[];
  mentions: Mention[];
  bottomLine: string;
}

const CATEGORIES = ["All", "CRM", "Marketing", "AI & Automation", "Cybersecurity", "Project Management", "Analytics", "E-commerce"];

const ARTICLES: Article[] = [
  {
    id: "hubspot-vs-salesforce-2026",
    title: "HubSpot vs Salesforce: Which CRM Is Best for Your Team in 2026?",
    subtitle: "A deep-dive comparison for mid-market and enterprise buyers",
    type: "comparison",
    category: "CRM",
    tags: ["CRM", "HubSpot", "Salesforce", "Mid-Market", "Enterprise"],
    readTime: "14 min read",
    wordCount: "4,200 words",
    author: "Sarah Chen",
    authorRole: "B2B SaaS Analyst",
    updated: "Feb 12, 2026",
    featured: true,
    intro: "The CRM market in 2026 remains a two-horse race at the top. HubSpot and Salesforce together command over 40% of the global CRM market — but they serve fundamentally different buyers. This guide breaks down where each platform wins, who it's built for, and how to decide without the marketing spin.",
    sections: [
      {
        heading: "Who HubSpot Is Best For",
        content: "HubSpot is the best CRM for mid-market SaaS companies (50–500 employees) that want a unified marketing + sales + service platform without a dedicated admin team. Its strength is speed-to-value: most teams are fully operational within 2–4 weeks. The free tier is genuinely useful, and the all-in-one architecture means fewer integrations to maintain. Since the Breeze AI launch in late 2025, HubSpot now offers predictive lead scoring, AI-generated content, and conversational intelligence natively — features that previously required third-party tools."
      },
      {
        heading: "Who Salesforce Is Best For",
        content: "Salesforce is the best CRM for enterprise organizations (500+ employees) that need deep customization, industry-specific workflows, and an ecosystem of 5,000+ apps on AppExchange. If your sales process is complex — multi-division, global, heavily regulated — Salesforce's configurability is unmatched. The tradeoff is implementation: expect 3–6 months and a dedicated admin (or team). Einstein AI is powerful but requires significant configuration to deliver value. The Slack acquisition adds workplace collaboration, making the platform stickier for enterprise teams."
      },
      {
        heading: "Pricing Comparison",
        content: "HubSpot starts free (unlimited users, core CRM features) and scales to $3,600/month for Enterprise (10 users included). Contact-based pricing applies to marketing features, which can escalate costs quickly for large databases. Salesforce starts at $25/user/month (Essentials) and scales to $300/user/month (Unlimited). The per-user model is more predictable but becomes expensive at scale. Both platforms charge significantly more for advanced features — HubSpot gates reporting and automation by tier, while Salesforce gates AI and analytics."
      },
      {
        heading: "Migration & Implementation",
        content: "HubSpot migrations typically take 2–6 weeks with a partner agency. Diamond Partners like Lean Labs (Overland Park, KS) and Bluleadz (Tampa, FL) specialize in Salesforce-to-HubSpot migrations. Salesforce implementations take 3–12 months depending on complexity. The ecosystem of implementation partners is larger, but so is the cost — expect $50K–$500K for enterprise implementations. Both platforms offer data import tools, but complex migrations with custom objects and workflow logic require professional services."
      },
      {
        heading: "The Verdict",
        content: "Choose HubSpot if you want to move fast, need marketing + sales in one platform, and don't have a dedicated CRM admin. Choose Salesforce if you need enterprise-grade customization, have complex sales processes, and are willing to invest in implementation. There is no universally 'better' CRM — only the one that fits your team size, technical maturity, and growth trajectory."
      },
    ],
    mentions: [
      { name: "HubSpot", verdict: "Best for: Mid-market SaaS teams wanting all-in-one simplicity" },
      { name: "Salesforce", verdict: "Best for: Enterprise organizations needing deep customization" },
      { name: "Lean Labs", verdict: "Referenced: HubSpot Diamond Partner for migrations" },
      { name: "Bluleadz", verdict: "Referenced: HubSpot Diamond Partner for migrations" },
    ],
    bottomLine: "HubSpot wins on speed-to-value and all-in-one experience. Salesforce wins on configurability and ecosystem depth. Neither is universally better.",
  },
  {
    id: "top-10-ai-agent-builders-2026",
    title: "Top 10 AI Agent Builders in 2026",
    subtitle: "From no-code platforms to developer-first frameworks",
    type: "roundup",
    category: "AI & Automation",
    tags: ["AI", "Agents", "Automation", "No-Code", "Developer Tools"],
    readTime: "18 min read",
    wordCount: "5,800 words",
    author: "Marcus Rivera",
    authorRole: "Product Ops Consultant",
    updated: "Feb 14, 2026",
    featured: true,
    intro: "AI agents went from demo curiosity to production infrastructure in 2025. By early 2026, there are over 40 platforms claiming to let you build autonomous agents — but most are wrappers around the same LLM APIs. We evaluated the top 10 based on real production use cases, not marketing claims.",
    sections: [
      {
        heading: "What We Evaluated",
        content: "We assessed each platform across five dimensions: ease of deployment (can a non-developer build useful agents?), reliability (uptime, error handling, fallback logic), integration depth (how many real tools can agents connect to?), cost predictability (is pricing transparent at scale?), and enterprise readiness (SOC2, SSO, audit logs). Platforms were tested with three real workflows: customer support triage, data enrichment pipelines, and multi-step research tasks."
      },
      {
        heading: "1. CrewAI — Best for Developer Teams",
        content: "CrewAI remains the most flexible multi-agent framework for engineering teams. Its role-based architecture lets you define specialized agents that collaborate on complex tasks. The learning curve is real — you need Python fluency and prompt engineering skills — but the control you get is unmatched. New in 2026: CrewAI Enterprise adds managed hosting, observability dashboards, and SOC2 compliance. Pricing starts at $99/month for hosted agents."
      },
      {
        heading: "2. Relevance AI — Best for GTM Teams",
        content: "Relevance AI is the standout for go-to-market teams that need agents for prospecting, lead enrichment, and outbound sequences. The visual workflow builder is intuitive enough for non-developers, and the built-in integrations with CRMs (HubSpot, Salesforce) and enrichment tools (Clearbit, Apollo) make it production-ready out of the box. Pricing starts free (100 runs/month) and scales to $499/month for teams."
      },
      {
        heading: "3. Langbase — Best for Rapid Prototyping",
        content: "Langbase is the fastest way to go from idea to deployed agent. The composable 'pipes' architecture lets you chain LLM calls, tools, and memory in a visual interface. It's not the most powerful for complex multi-agent workflows, but for single-agent use cases (chatbots, document Q&A, data extraction), nothing ships faster. Free tier is generous; paid plans start at $25/month."
      },
      {
        heading: "4–10: The Rest of the Field",
        content: "AutoGen (Microsoft) excels at multi-agent research workflows. n8n adds AI nodes to existing automation flows. Voiceflow dominates voice and chat agent design. Botpress offers the best open-source option. Flowise provides visual LangChain orchestration. Dust.tt is enterprise-focused with strong governance. AgentOps rounds out the list with best-in-class observability for any agent framework."
      },
    ],
    mentions: [
      { name: "CrewAI", verdict: "Best for: Developer teams needing multi-agent flexibility" },
      { name: "Relevance AI", verdict: "Best for: GTM teams with CRM integration needs" },
      { name: "Langbase", verdict: "Best for: Rapid prototyping and single-agent use cases" },
      { name: "AutoGen", verdict: "Best for: Multi-agent research workflows (Microsoft)" },
      { name: "n8n", verdict: "Best for: Adding AI to existing automation flows" },
      { name: "Voiceflow", verdict: "Best for: Voice and chat agent design" },
      { name: "Botpress", verdict: "Best for: Open-source agent development" },
      { name: "Flowise", verdict: "Best for: Visual LangChain orchestration" },
      { name: "Dust.tt", verdict: "Best for: Enterprise governance and compliance" },
      { name: "AgentOps", verdict: "Best for: Agent observability and monitoring" },
    ],
    bottomLine: "CrewAI leads for developers, Relevance AI leads for business teams, and Langbase leads for speed. The right choice depends on your team's technical depth.",
  },
  {
    id: "trending-cybersecurity-tools-2026",
    title: "Trending Cybersecurity Tools in 2026",
    subtitle: "What security teams are actually adopting right now",
    type: "trending",
    category: "Cybersecurity",
    tags: ["Cybersecurity", "Security", "DevSecOps", "Zero Trust", "SIEM"],
    readTime: "12 min read",
    wordCount: "3,600 words",
    author: "Dana Kim",
    authorRole: "Security & Infrastructure Analyst",
    updated: "Feb 10, 2026",
    intro: "The cybersecurity landscape in 2026 is defined by AI-powered threat detection, identity-first security, and the consolidation of point solutions into unified platforms. Here are the tools security teams are actually deploying — not just evaluating.",
    sections: [
      {
        heading: "The Shift: Platform Consolidation",
        content: "2025 was the year of 'tool fatigue' in cybersecurity. The average enterprise security team managed 76 different tools. In 2026, the trend is aggressive consolidation around platforms that combine SIEM, SOAR, endpoint detection, and identity management. Palo Alto Networks (Cortex XSIAM), CrowdStrike (Falcon), and Microsoft (Sentinel + Defender) are the three platforms winning the consolidation war."
      },
      {
        heading: "CrowdStrike Falcon — Dominant in Endpoint + Identity",
        content: "CrowdStrike continues to lead in endpoint detection and response (EDR) and has expanded aggressively into identity threat detection. Falcon's single-agent architecture and real-time threat intelligence feed make it the top choice for mid-market and enterprise teams. The Charlotte AI assistant launched in 2025 has matured into a genuinely useful tool for threat investigation. Pricing remains premium — expect $25–$50/endpoint/month."
      },
      {
        heading: "Wiz — Cloud Security's New Standard",
        content: "Wiz has become the de facto cloud security posture management (CSPM) platform. Its agentless architecture scans AWS, Azure, and GCP environments in minutes, not hours. The 2025 addition of AI-powered risk prioritization (Wiz Defend) and runtime protection has moved it from 'cloud visibility tool' to 'cloud security platform.' Post-IPO pricing has increased, but adoption shows no signs of slowing."
      },
      {
        heading: "Emerging: AI-Native Security Tools",
        content: "The newest wave includes tools built from the ground up for AI-era threats. Protect AI focuses on ML model security and LLM vulnerability scanning. Prompt Security specializes in prompt injection detection for production AI applications. Pangea provides security APIs (auth, audit, secrets) that developers can embed directly into applications. These tools address threat surfaces that didn't exist two years ago."
      },
    ],
    mentions: [
      { name: "CrowdStrike", verdict: "Best for: Endpoint + identity threat detection" },
      { name: "Wiz", verdict: "Best for: Cloud security posture management" },
      { name: "Palo Alto Networks", verdict: "Best for: Unified security platform (XSIAM)" },
      { name: "Microsoft Sentinel", verdict: "Best for: Azure-native SIEM + SOAR" },
      { name: "Protect AI", verdict: "Emerging: ML model security and LLM scanning" },
      { name: "Prompt Security", verdict: "Emerging: Prompt injection detection" },
    ],
    bottomLine: "CrowdStrike and Wiz lead their respective categories. The real trend is consolidation — teams are choosing fewer, broader platforms over best-of-breed point solutions.",
  },
  {
    id: "notion-vs-monday-2026",
    title: "Notion vs Monday.com: Best for What Kind of Team?",
    subtitle: "Flexibility vs structure — which project management approach fits your workflow",
    type: "comparison",
    category: "Project Management",
    tags: ["Project Management", "Notion", "Monday.com", "Productivity", "Team Collaboration"],
    readTime: "11 min read",
    wordCount: "3,400 words",
    author: "Marcus Rivera",
    authorRole: "Product Ops Consultant",
    updated: "Feb 8, 2026",
    intro: "Notion and Monday.com represent two fundamentally different philosophies of work management. Notion gives you a blank canvas and says 'build whatever you want.' Monday.com gives you a structured board and says 'customize within guardrails.' Neither is wrong — but one is almost certainly better for your specific team.",
    sections: [
      {
        heading: "Notion: Best for Documentation-Heavy Teams",
        content: "Notion wins when your team's primary need is knowledge management, documentation, and flexible workflows. Product teams, engineering teams, and content teams that live in docs gravitate to Notion because it replaces Confluence + Trello + Google Docs with a single workspace. The Notion AI features (writing, search, autofill) add genuine productivity gains. The weakness is project tracking: timeline views, dependencies, and resource management are functional but not best-in-class."
      },
      {
        heading: "Monday.com: Best for Operational Teams",
        content: "Monday.com wins when your team needs structured project tracking, visual dashboards, and cross-department visibility. Operations teams, marketing teams, and agencies that manage repeatable processes love Monday's board-based architecture. The automation engine is powerful — you can build complex triggers without code. The weakness is flexibility: if your workflow doesn't fit the board/column paradigm, you'll fight the tool instead of benefiting from it."
      },
      {
        heading: "Integration Ecosystems",
        content: "Both platforms have deep integration libraries, but they integrate differently. Notion excels at embedding — you can embed Figma, Miro, Loom, and dozens of other tools directly into pages. Monday.com excels at automation — you can trigger actions in Slack, HubSpot, Salesforce, and Jira based on board changes. If your workflow is 'pull information in,' Notion wins. If your workflow is 'push actions out,' Monday.com wins."
      },
      {
        heading: "Pricing at Scale",
        content: "Notion starts free (unlimited pages, 10 guests) and scales to $15/member/month for Business. Monday.com starts at $9/seat/month (Basic) and scales to $19/seat/month (Pro). At 100 users, Notion Business costs $1,500/month; Monday.com Pro costs $1,900/month. Both platforms charge more for enterprise features like SSO, audit logs, and advanced permissions. Notion is slightly cheaper at scale, but Monday.com's automations may reduce costs elsewhere."
      },
    ],
    mentions: [
      { name: "Notion", verdict: "Best for: Documentation-heavy teams needing flexibility" },
      { name: "Monday.com", verdict: "Best for: Operational teams needing structured tracking" },
      { name: "Confluence", verdict: "Referenced: Legacy wiki that Notion often replaces" },
      { name: "Asana", verdict: "Referenced: Alternative in the structured PM category" },
    ],
    bottomLine: "Choose Notion if your team lives in documents. Choose Monday.com if your team lives in processes. Both are excellent — for different reasons.",
  },
  {
    id: "best-marketing-automation-mid-market",
    title: "Best Marketing Automation Platform for Mid-Market Companies",
    subtitle: "HubSpot, Marketo, Pardot, and ActiveCampaign compared for teams of 50–500",
    type: "guide",
    category: "Marketing",
    tags: ["Marketing Automation", "HubSpot", "Marketo", "Mid-Market", "Lead Nurturing"],
    readTime: "16 min read",
    wordCount: "4,800 words",
    author: "Sarah Chen",
    authorRole: "B2B SaaS Analyst",
    updated: "Feb 6, 2026",
    intro: "Marketing automation is no longer optional for mid-market B2B companies. The question isn't whether to adopt a platform — it's which one. This guide evaluates the four leading options for companies with 50–500 employees, focusing on real-world implementation, not feature lists.",
    sections: [
      {
        heading: "HubSpot Marketing Hub — The All-in-One Default",
        content: "HubSpot is the default choice for mid-market companies that don't already have a CRM or marketing platform. The all-in-one architecture (CRM + marketing + sales + service) eliminates integration overhead. The visual workflow builder is the most intuitive in the category. Breeze AI features add content generation, lead scoring, and campaign optimization natively. The limitation is depth: advanced multi-touch attribution, custom reporting, and account-based marketing features require Professional or Enterprise tiers ($800–$3,600/month)."
      },
      {
        heading: "Marketo (Adobe) — The Enterprise Power Tool",
        content: "Marketo is the platform for companies that have outgrown HubSpot's reporting and need advanced multi-touch attribution, revenue cycle modeling, and sophisticated lead scoring. It's also the best choice for companies already in the Adobe ecosystem (Experience Cloud, Analytics, Target). The tradeoff is complexity: Marketo requires dedicated operations staff, and the UI feels dated compared to HubSpot. Pricing is custom and typically starts above $1,000/month."
      },
      {
        heading: "ActiveCampaign — The Budget Leader",
        content: "ActiveCampaign is the best value in marketing automation for companies under 100 employees. The email automation engine is powerful, the CRM is surprisingly capable, and pricing starts at $29/month. It lacks the depth of HubSpot or Marketo for complex B2B workflows, but for companies that primarily need email nurturing, lead scoring, and basic CRM, it delivers 80% of the value at 20% of the cost."
      },
      {
        heading: "How to Decide",
        content: "If you need CRM + marketing in one platform and value ease of use: HubSpot. If you need enterprise-grade attribution and are in the Adobe ecosystem: Marketo. If you primarily need email automation and are budget-conscious: ActiveCampaign. If you're already on Salesforce and need native integration: Pardot (now Marketing Cloud Account Engagement). The decision should be driven by team size, technical maturity, and existing tech stack — not feature comparisons."
      },
    ],
    mentions: [
      { name: "HubSpot", verdict: "Best for: All-in-one simplicity with native CRM" },
      { name: "Marketo", verdict: "Best for: Enterprise attribution and Adobe ecosystem" },
      { name: "ActiveCampaign", verdict: "Best for: Budget-conscious teams under 100 employees" },
      { name: "Pardot", verdict: "Best for: Companies already on Salesforce" },
    ],
    bottomLine: "HubSpot is the safest choice for most mid-market companies. Marketo is the power tool. ActiveCampaign is the value play.",
  },
  {
    id: "best-product-analytics-2026",
    title: "Best Product Analytics Tools in 2026: Mixpanel vs Amplitude vs PostHog",
    subtitle: "Which analytics platform is best for product-led growth teams",
    type: "comparison",
    category: "Analytics",
    tags: ["Analytics", "Product-Led Growth", "Mixpanel", "Amplitude", "PostHog"],
    readTime: "13 min read",
    wordCount: "3,800 words",
    author: "Marcus Rivera",
    authorRole: "Product Ops Consultant",
    updated: "Feb 2, 2026",
    intro: "Product analytics is the nervous system of product-led growth. Every PLG team needs event tracking, funnels, retention analysis, and behavioral cohorts. The three leading platforms — Mixpanel, Amplitude, and PostHog — each take a different approach. Here's which one fits your team.",
    sections: [
      {
        heading: "Mixpanel — Best for Speed and Simplicity",
        content: "Mixpanel's query engine is the fastest in the category. Non-technical product managers can build complex funnels and cohort analyses without SQL. The free tier (20M events/month) is the most generous. Since moving to a warehouse-native architecture, Mixpanel can sit on top of your existing data warehouse (Snowflake, BigQuery) without requiring separate data pipelines. Best for teams that want fast answers without data engineering overhead."
      },
      {
        heading: "Amplitude — Best for Behavioral Depth",
        content: "Amplitude leads in behavioral analytics sophistication. Features like Amplitude Experiment (A/B testing), Audiences (behavioral cohort syncing to ad platforms), and the Taxonomy system give product and growth teams unmatched depth. The tradeoff is complexity: Amplitude's power features have a steeper learning curve, and the platform can feel heavy for smaller teams. Best for companies with 500+ employees and dedicated growth/analytics teams."
      },
      {
        heading: "PostHog — Best for Engineering Teams",
        content: "PostHog is the only product analytics platform that's fully open-source and self-hostable. It combines event analytics, session recording, feature flags, A/B testing, and surveys in one platform. Engineering teams love it because they control the data pipeline and can inspect the codebase. The cloud version offers a generous free tier (1M events/month). Best for engineering-led companies that want analytics without vendor lock-in."
      },
    ],
    mentions: [
      { name: "Mixpanel", verdict: "Best for: Speed, simplicity, and generous free tier" },
      { name: "Amplitude", verdict: "Best for: Behavioral depth and enterprise growth teams" },
      { name: "PostHog", verdict: "Best for: Engineering teams wanting open-source control" },
    ],
    bottomLine: "Mixpanel for speed, Amplitude for depth, PostHog for control. All three are excellent — the decision is about your team's technical profile.",
  },
  {
    id: "best-ecommerce-email-platform",
    title: "Best Email Marketing Platform for E-commerce in 2026",
    subtitle: "Klaviyo vs Mailchimp vs Omnisend for DTC and Shopify brands",
    type: "guide",
    category: "E-commerce",
    tags: ["E-commerce", "Email Marketing", "Klaviyo", "Shopify", "DTC"],
    readTime: "10 min read",
    wordCount: "3,200 words",
    author: "Dana Kim",
    authorRole: "Email Marketing Strategist",
    updated: "Jan 28, 2026",
    intro: "Email is still the highest-ROI channel for e-commerce brands. The right platform can drive 20–40% of total revenue. But the wrong platform creates integration headaches, deliverability issues, and wasted spend. Here's which email platform actually fits your e-commerce business.",
    sections: [
      {
        heading: "Klaviyo — The E-commerce Default",
        content: "Klaviyo is the de facto email platform for Shopify stores and DTC brands. The Shopify integration is the deepest in the market — it syncs products, orders, browse behavior, and customer lifetime value in real time. The segmentation engine lets you build audiences based on purchase history, predicted next order date, and churn risk. Revenue attribution per email and per flow is native. The limitation is price: Klaviyo gets expensive fast as your contact list grows. At 50K contacts, expect to pay $700–$1,000/month."
      },
      {
        heading: "Mailchimp — The All-Purpose Alternative",
        content: "Mailchimp is the broader marketing platform for brands that need email + social + ads + landing pages in one tool. Since the Intuit acquisition, Mailchimp has added better analytics and audience insights. The template builder is the most intuitive in the category. The weakness is e-commerce depth: Mailchimp's Shopify integration was rebuilt after a public split, and while functional, it doesn't match Klaviyo's depth for purchase-based segmentation and flow triggers."
      },
      {
        heading: "Omnisend — The Value Mid-Tier",
        content: "Omnisend occupies the sweet spot between Mailchimp's simplicity and Klaviyo's e-commerce depth. The pre-built automation workflows (welcome series, cart abandonment, post-purchase) are ready to deploy in minutes. SMS is bundled natively, not as an add-on. Pricing is significantly lower than Klaviyo at every tier. The limitation is reporting: Omnisend's analytics are adequate but not as granular as Klaviyo's revenue attribution."
      },
    ],
    mentions: [
      { name: "Klaviyo", verdict: "Best for: Shopify brands that want deep segmentation and revenue attribution" },
      { name: "Mailchimp", verdict: "Best for: Multi-channel brands that need email + social + ads" },
      { name: "Omnisend", verdict: "Best for: E-commerce brands wanting good automation at lower cost" },
    ],
    bottomLine: "Klaviyo if email is your primary growth channel. Mailchimp if you need a broader marketing suite. Omnisend if you want solid automation at better pricing.",
  },
  {
    id: "best-help-desk-software-2026",
    title: "Best Help Desk Software in 2026: Zendesk vs Intercom vs Freshdesk",
    subtitle: "Which support platform is best for scaling customer service teams",
    type: "comparison",
    category: "CRM",
    tags: ["Help Desk", "Customer Support", "Zendesk", "Intercom", "SaaS"],
    readTime: "12 min read",
    wordCount: "3,500 words",
    author: "Sarah Chen",
    authorRole: "B2B SaaS Analyst",
    updated: "Feb 4, 2026",
    intro: "Customer support software is going through its biggest evolution since the ticket was invented. AI chatbots, proactive messaging, and conversational support are replacing traditional ticket queues. The three leading platforms — Zendesk, Intercom, and Freshdesk — each represent a different philosophy.",
    sections: [
      {
        heading: "Zendesk — The Enterprise Incumbent",
        content: "Zendesk is the established leader with the most mature ticketing system, deepest customization, and largest app marketplace. It's the safe choice for enterprise teams (500+ agents) that need multi-channel support across email, chat, phone, and social. The Zendesk AI bot is functional but lags behind Intercom's Fin in conversational quality. The UI feels increasingly dated, and pricing transparency has been a consistent criticism."
      },
      {
        heading: "Intercom — The Modern Challenger",
        content: "Intercom has repositioned from 'messaging platform' to 'AI-first customer service platform.' Fin, their AI agent, is the best automated support bot in the market — it resolves 30–50% of inbound queries without human intervention. The messenger-first approach feels more natural than traditional ticketing. Best for SaaS companies with tech-savvy customers who prefer chat over email. The limitation is price: Intercom's per-seat + per-resolution pricing can be unpredictable."
      },
      {
        heading: "Freshdesk — The Value Leader",
        content: "Freshdesk (by Freshworks) offers the best value in help desk software. The free tier supports up to 10 agents, and paid plans start at $15/agent/month. Feature-for-feature, Freshdesk matches Zendesk at 40–60% of the cost. The Freddy AI assistant is improving quickly. Best for companies under 200 agents that want solid ticketing without enterprise pricing."
      },
    ],
    mentions: [
      { name: "Zendesk", verdict: "Best for: Enterprise teams needing mature multi-channel support" },
      { name: "Intercom", verdict: "Best for: SaaS companies wanting AI-first conversational support" },
      { name: "Freshdesk", verdict: "Best for: Budget-conscious teams wanting solid ticketing" },
    ],
    bottomLine: "Intercom leads innovation. Zendesk leads maturity. Freshdesk leads value. Choose based on team size and budget tolerance.",
  },
];

const TYPE_LABELS: Record<ArticleType, { label: string; icon: typeof BookOpen }> = {
  comparison: { label: "Comparison", icon: BarChart3 },
  roundup: { label: "Roundup", icon: Layers },
  guide: { label: "Buyer's Guide", icon: BookOpen },
  trending: { label: "Trending", icon: TrendingUp },
};

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
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <button onClick={onHome} className="flex items-center gap-2">
          <Award className="w-4 h-4 text-muted-foreground/60" />
          <span className="text-sm font-semibold tracking-tight text-foreground" data-testid="text-logo">
            WhatisBest<span className="font-normal text-muted-foreground">.com</span>
          </span>
        </button>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-[11px] text-muted-foreground/50" onClick={onHome} data-testid="nav-articles">Articles</Button>
          <Button variant="ghost" size="sm" className="text-[11px] text-muted-foreground/50" data-testid="nav-comparisons">Comparisons</Button>
          <Button variant="ghost" size="sm" className="text-[11px] text-muted-foreground/50" data-testid="nav-about">About</Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

function ArticleCard({ article, onClick, featured = false }: { article: Article; onClick: () => void; featured?: boolean }) {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";

  const TypeIcon = TYPE_LABELS[article.type].icon;

  return (
    <div
      className={`rounded-xl border p-5 cursor-pointer hover-elevate ${cardClass} ${featured ? "sm:col-span-2" : ""}`}
      onClick={onClick}
      data-testid={`card-${article.id}`}
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <Badge variant="outline" className="text-[9px] text-muted-foreground/50 no-default-hover-elevate">{article.category}</Badge>
        <Badge variant="outline" className="text-[9px] text-muted-foreground/40 no-default-hover-elevate flex items-center gap-1">
          <TypeIcon className="w-2.5 h-2.5" />
          {TYPE_LABELS[article.type].label}
        </Badge>
      </div>

      <h3 className={`font-semibold text-foreground mb-1 ${featured ? "text-lg" : "text-sm"}`}>{article.title}</h3>
      <p className="text-[11px] text-muted-foreground/40 mb-3">{article.subtitle}</p>

      {featured && (
        <p className="text-[12px] text-foreground/50 mb-4 leading-relaxed line-clamp-2">{article.intro}</p>
      )}

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {article.mentions.slice(0, featured ? 5 : 3).map((m) => (
          <Badge key={m.name} variant="outline" className="text-[9px] text-emerald-400/60 no-default-hover-elevate">{m.name}</Badge>
        ))}
        {article.mentions.length > (featured ? 5 : 3) && (
          <span className="text-[9px] text-muted-foreground/30">+{article.mentions.length - (featured ? 5 : 3)}</span>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground/30">
          <span>{article.readTime}</span>
          <span className="text-muted-foreground/15">|</span>
          <span>{article.wordCount}</span>
          <span className="text-muted-foreground/15">|</span>
          <span>{article.updated}</span>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/20" />
      </div>
    </div>
  );
}

function ArticleListPage({
  onSelectArticle,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
}: {
  onSelectArticle: (id: string) => void;
  activeCategory: string;
  setActiveCategory: (c: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";

  let filtered = activeCategory === "All" ? ARTICLES : ARTICLES.filter((a) => a.category === activeCategory);

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = ARTICLES.filter((a) =>
      a.title.toLowerCase().includes(q) ||
      a.subtitle.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)) ||
      a.mentions.some((m) => m.name.toLowerCase().includes(q))
    );
  }

  const featuredArticles = ARTICLES.filter((a) => a.featured);
  const recentArticles = [...ARTICLES].sort((a, b) => {
    const parseDate = (d: string) => new Date(d.replace(/(\w+)\s(\d+),\s(\d+)/, "$1 $2, $3")).getTime();
    return parseDate(b.updated) - parseDate(a.updated);
  });

  const totalMentions = new Set(ARTICLES.flatMap((a) => a.mentions.map((m) => m.name))).size;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" data-testid="text-page-title">
          {activeCategory === "All" ? "Editorial" : activeCategory}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground/60 max-w-lg">
          In-depth comparisons, roundups, and buyer's guides for B2B software. No affiliate links. No sponsored rankings. Just research.
        </p>
      </div>

      <div className="flex items-center gap-1 mb-6 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((c) => (
          <Button
            key={c}
            variant="ghost"
            size="sm"
            className={`text-[11px] shrink-0 ${activeCategory === c ? "text-foreground" : "text-muted-foreground/40"}`}
            onClick={() => setActiveCategory(c)}
            data-testid={`button-category-${c.toLowerCase().replace(/[\s&]+/g, "-")}`}
          >
            {c}
          </Button>
        ))}
      </div>

      <div className={`rounded-xl border px-4 py-2.5 flex items-center gap-3 mb-8 ${cardClass}`}>
        <Search className="w-4 h-4 text-muted-foreground/40 shrink-0" />
        <input
          type="text"
          placeholder="Search articles, tools, or categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/30 outline-none"
          data-testid="input-search"
        />
      </div>

      {searchQuery.trim() ? (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-3.5 h-3.5 text-muted-foreground/40" />
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.12em] font-medium">Results for "{searchQuery}"</span>
            <Badge variant="outline" className="text-[9px] text-muted-foreground/40 no-default-hover-elevate font-mono">{filtered.length}</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((a) => <ArticleCard key={a.id} article={a} onClick={() => onSelectArticle(a.id)} />)}
          </div>
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground/40 py-12 text-center">No articles match that query.</p>
          )}
        </div>
      ) : activeCategory !== "All" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((a) => <ArticleCard key={a.id} article={a} onClick={() => onSelectArticle(a.id)} />)}
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground/40 py-12 text-center sm:col-span-2">No articles in this category yet.</p>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { label: "Articles", value: String(ARTICLES.length) },
              { label: "Categories", value: String(CATEGORIES.length - 1) },
              { label: "Products Covered", value: String(totalMentions) },
              { label: "Avg. Depth", value: "3,900 words" },
            ].map((s) => (
              <div key={s.label} className={`rounded-xl border px-4 py-3 text-center ${cardClass}`}>
                <div className="text-lg font-bold text-foreground font-mono">{s.value}</div>
                <div className="text-[10px] text-muted-foreground/40">{s.label}</div>
              </div>
            ))}
          </div>

          {featuredArticles.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-3.5 h-3.5 text-muted-foreground/40" />
                <span className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.12em] font-medium">Featured</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuredArticles.map((a) => <ArticleCard key={a.id} article={a} onClick={() => onSelectArticle(a.id)} featured />)}
              </div>
            </div>
          )}

          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-3.5 h-3.5 text-muted-foreground/40" />
              <span className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.12em] font-medium">All Articles</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentArticles.filter((a) => !a.featured).map((a) => (
                <ArticleCard key={a.id} article={a} onClick={() => onSelectArticle(a.id)} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ArticleDetailPage({ article, onBack }: { article: Article; onBack: () => void }) {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";

  const TypeIcon = TYPE_LABELS[article.type].icon;

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="text-[11px] text-muted-foreground/50 mb-6 flex items-center gap-1" data-testid="button-back">
        <ChevronRight className="w-3 h-3 rotate-180" />
        All articles
      </button>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Badge variant="outline" className="text-[9px] text-muted-foreground/50 no-default-hover-elevate">{article.category}</Badge>
        <Badge variant="outline" className="text-[9px] text-muted-foreground/40 no-default-hover-elevate flex items-center gap-1">
          <TypeIcon className="w-2.5 h-2.5" />
          {TYPE_LABELS[article.type].label}
        </Badge>
        <Badge variant="outline" className="text-[9px] text-muted-foreground/30 no-default-hover-elevate font-mono">{article.wordCount}</Badge>
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-2" data-testid="text-article-title">
        {article.title}
      </h1>
      <p className="text-sm text-muted-foreground/50 mb-4">{article.subtitle}</p>

      <div className="flex items-center gap-4 text-[11px] text-muted-foreground/40 mb-8 flex-wrap">
        <div className="flex items-center gap-1.5">
          <User className="w-3 h-3" />
          <span>{article.author}</span>
          <span className="text-muted-foreground/20">|</span>
          <span>{article.authorRole}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3 h-3" />
          <span>{article.updated}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3" />
          <span>{article.readTime}</span>
        </div>
      </div>

      <p className="text-sm text-foreground/70 leading-relaxed mb-8" data-testid="text-intro">{article.intro}</p>

      <div className="space-y-6 mb-8">
        {article.sections.map((section, i) => (
          <div key={i}>
            <h2 className="text-base font-semibold text-foreground mb-3">{section.heading}</h2>
            <p className="text-[13px] text-foreground/60 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-3.5 h-3.5 text-emerald-400/50" />
          <span className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.12em] font-medium">The Bottom Line</span>
        </div>
        <p className="text-sm text-foreground/70 leading-relaxed font-medium" data-testid="text-bottom-line">{article.bottomLine}</p>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-3.5 h-3.5 text-emerald-400/50" />
          <span className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.12em] font-medium">Products Mentioned</span>
          <Badge variant="outline" className="text-[9px] text-muted-foreground/40 no-default-hover-elevate font-mono">{article.mentions.length}</Badge>
        </div>
        <div className="space-y-2.5">
          {article.mentions.map((m) => (
            <div key={m.name} className="rounded-lg bg-background/40 px-4 py-3 flex items-start justify-between gap-4 flex-wrap">
              <span className="text-sm font-semibold text-foreground">{m.name}</span>
              <span className="text-[11px] text-muted-foreground/50">{m.verdict}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.12em] font-medium mb-3 block">Tags</span>
        <div className="flex items-center gap-2 flex-wrap">
          {article.tags.map((t) => (
            <Badge key={t} variant="outline" className="text-[9px] text-muted-foreground/40 no-default-hover-elevate">{t}</Badge>
          ))}
        </div>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.12em] font-medium mb-3 block">API Access</span>
        <div className="rounded-lg bg-background/40 px-3 py-2 mb-2 font-mono text-[11px]">
          <span className="text-muted-foreground/40">GET</span>{" "}
          <span className="text-foreground/60">whatisbest.com/api/article/{article.id}</span>
        </div>
        <span className="text-[10px] text-muted-foreground/30">Returns structured article data with product verdicts and metadata.</span>
      </div>

      <div className="flex items-center justify-between gap-4 py-6 border-t border-border/20 text-[10px] text-muted-foreground/30 flex-wrap">
        <div className="flex items-center gap-3">
          <span>No affiliate links</span>
          <span className="text-muted-foreground/15">|</span>
          <span>No sponsored rankings</span>
          <span className="text-muted-foreground/15">|</span>
          <span>Independent research</span>
        </div>
        <span>{article.updated}</span>
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
              <Award className="w-3.5 h-3.5 text-muted-foreground/40" />
              <span className="text-sm font-semibold text-foreground">
                WhatisBest<span className="font-normal text-muted-foreground">.com</span>
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground/40 leading-relaxed">
              AI-native B2B software comparison engine. Independent editorial. No affiliate links.
            </p>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium">Content</span>
            <div className="mt-2 space-y-1.5">
              {["Comparisons", "Roundups", "Buyer's Guides", "Trending"].map((item) => (
                <p key={item} className="text-[11px] text-muted-foreground/40">{item}</p>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium">Categories</span>
            <div className="mt-2 space-y-1.5">
              {["CRM", "Marketing", "AI & Automation", "Cybersecurity"].map((item) => (
                <p key={item} className="text-[11px] text-muted-foreground/40">{item}</p>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium">Company</span>
            <div className="mt-2 space-y-1.5">
              {["About", "Methodology", "Contact", "Privacy Policy"].map((item) => (
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

export default function WhatisBest() {
  const { theme } = useTheme();
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const article = selectedArticle ? ARTICLES.find((a) => a.id === selectedArticle) : null;

  const handleSelect = (id: string) => {
    setSelectedArticle(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background relative">
      {theme === "sparkle" && <AuroraCanvas />}
      <div className="relative z-10">
        <Navbar onHome={handleBack} />
        <div className="pt-20 px-6 pb-6">
          {article ? (
            <ArticleDetailPage article={article} onBack={handleBack} />
          ) : (
            <ArticleListPage
              onSelectArticle={handleSelect}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
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
