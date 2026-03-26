import { useState } from "react";
import {
  Search,
  Sun,
  Moon,
  Sparkles,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  BookOpen,
  Calendar,
  Clock,
  Layers,
  BarChart3,
  Zap,
  Shield,
  Globe,
  Award,
  Target,
  Lightbulb,
  Building2,
  Car,
  Heart,
  ShoppingCart,
  Megaphone,
  Scale,
  Home as HomeIcon,
  Radio,
  Cpu,
  ArrowUpRight,
  ChevronDown,
  Hash,
  Cloud,
  Code,
  CreditCard,
  Users,
  Database,
  Truck,
  Factory,
  Bot,
  UserPlus,
  GraduationCap,
  MessageSquare,
  Store,
  Calculator,
  Landmark,
  Beaker,
  Pill,
  ClipboardList,
  Brain,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

interface Sector {
  id: string;
  name: string;
  icon: typeof Building2;
  description: string;
  articleCount: number;
  brandCount: number;
  sampleTopics: string[];
}

interface SectorCluster {
  id: string;
  name: string;
  sectors: Sector[];
}

const CLUSTERS: SectorCluster[] = [
  {
    id: "technology",
    name: "Technology",
    sectors: [
      {
        id: "artificial-intelligence",
        name: "Artificial Intelligence",
        icon: Brain,
        description: "AI platforms, machine learning tools, and intelligent automation",
        articleCount: 34,
        brandCount: 112,
        sampleTopics: ["Top 10 AI Agent Builders", "Best AI Writing Assistants", "Enterprise AI Platforms Compared", "AI Customer Service Tools Ranked"],
      },
      {
        id: "cloud-computing",
        name: "Cloud Computing",
        icon: Cloud,
        description: "Cloud infrastructure, hosting platforms, and managed services",
        articleCount: 28,
        brandCount: 84,
        sampleTopics: ["AWS vs Azure vs GCP for Mid-Market", "Best Cloud Cost Management Tools", "Multi-Cloud Strategy Platforms", "Top Serverless Platforms"],
      },
      {
        id: "cybersecurity",
        name: "Cybersecurity",
        icon: Shield,
        description: "Security platforms, threat detection, and compliance tools",
        articleCount: 26,
        brandCount: 78,
        sampleTopics: ["Best SIEM Platforms for Enterprise", "Zero Trust Security Solutions", "Endpoint Detection Tools Compared", "Top Identity Management Platforms"],
      },
      {
        id: "developer-tools",
        name: "Developer Tools",
        icon: Code,
        description: "IDEs, DevOps platforms, CI/CD pipelines, and developer infrastructure",
        articleCount: 22,
        brandCount: 67,
        sampleTopics: ["Best CI/CD Platforms in 2026", "Top Code Review Tools", "Developer Productivity Platforms", "API Management Solutions Ranked"],
      },
      {
        id: "saas",
        name: "SaaS",
        icon: Layers,
        description: "Software-as-a-service platforms across business functions",
        articleCount: 52,
        brandCount: 168,
        sampleTopics: ["HubSpot vs Salesforce for Mid-Market", "Best Project Management Software", "Top DataOps Platforms", "SaaS Spend Management Tools"],
      },
    ],
  },
  {
    id: "commerce",
    name: "Commerce",
    sectors: [
      {
        id: "ecommerce",
        name: "E-commerce",
        icon: ShoppingCart,
        description: "Online marketplaces, DTC platforms, and commerce infrastructure",
        articleCount: 32,
        brandCount: 89,
        sampleTopics: ["Shopify vs BigCommerce vs WooCommerce", "Best E-commerce Email Platforms", "Top Inventory Management Tools", "Marketplace Fee Comparison 2026"],
      },
      {
        id: "fintech",
        name: "Fintech",
        icon: CreditCard,
        description: "Payment processing, banking technology, and financial infrastructure",
        articleCount: 24,
        brandCount: 62,
        sampleTopics: ["Best Payment Processors for B2B", "Top Billing Automation Platforms", "Expense Management Software Ranked", "Embedded Finance Platforms Compared"],
      },
      {
        id: "retail",
        name: "Retail",
        icon: Store,
        description: "Retail technology, POS systems, and omnichannel platforms",
        articleCount: 18,
        brandCount: 54,
        sampleTopics: ["Best POS Systems for Multi-Location", "Retail Analytics Platforms Compared", "Top Clienteling Tools", "Unified Commerce Solutions Ranked"],
      },
      {
        id: "procurement",
        name: "Procurement",
        icon: ClipboardList,
        description: "Sourcing platforms, spend management, and vendor intelligence",
        articleCount: 14,
        brandCount: 38,
        sampleTopics: ["Best Procurement Software for Enterprise", "Top Vendor Management Platforms", "Spend Analytics Tools Compared", "Source-to-Pay Solutions Ranked"],
      },
    ],
  },
  {
    id: "industry",
    name: "Industry",
    sectors: [
      {
        id: "automotive",
        name: "Automotive",
        icon: Car,
        description: "OEMs, fleet technology, EV infrastructure, and automotive supply chain",
        articleCount: 24,
        brandCount: 67,
        sampleTopics: ["Best EVs for Fleet Operations", "Automotive CRM Solutions Compared", "Connected Vehicle Platforms", "OEM Parts Management Software"],
      },
      {
        id: "construction",
        name: "Construction",
        icon: Building2,
        description: "Construction management, project delivery, and field operations",
        articleCount: 16,
        brandCount: 42,
        sampleTopics: ["Best Construction Project Management", "Top Estimating Software", "Field Service Management Tools", "Construction ERP Platforms Ranked"],
      },
      {
        id: "energy",
        name: "Energy",
        icon: Zap,
        description: "Energy management, oil & gas technology, and grid infrastructure",
        articleCount: 14,
        brandCount: 36,
        sampleTopics: ["Best Energy Management Software", "Top SCADA Platforms", "Utility Billing Systems Compared", "Energy Trading Platforms Ranked"],
      },
      {
        id: "manufacturing",
        name: "Manufacturing",
        icon: Factory,
        description: "Industrial automation, MES platforms, and supply chain execution",
        articleCount: 20,
        brandCount: 58,
        sampleTopics: ["Best MES Software for Discrete Manufacturing", "Industrial IoT Platforms Compared", "Top Quality Management Systems", "Manufacturing ERP Solutions Ranked"],
      },
      {
        id: "robotics",
        name: "Robotics",
        icon: Bot,
        description: "Industrial robotics, automation systems, and autonomous platforms",
        articleCount: 10,
        brandCount: 28,
        sampleTopics: ["Best Warehouse Automation Platforms", "Collaborative Robot Vendors Compared", "Top Autonomous Mobile Robots", "RPA vs Physical Automation"],
      },
    ],
  },
  {
    id: "services",
    name: "Services",
    sectors: [
      {
        id: "accounting",
        name: "Accounting",
        icon: Calculator,
        description: "Accounting software, audit platforms, and financial management tools",
        articleCount: 16,
        brandCount: 44,
        sampleTopics: ["QuickBooks vs Xero vs NetSuite", "Best Tax Automation Software", "Top Audit Management Platforms", "Accounting Firm Practice Management"],
      },
      {
        id: "digital-marketing",
        name: "Digital Marketing",
        icon: Megaphone,
        description: "Marketing automation, agencies, growth consulting, and RevOps",
        articleCount: 36,
        brandCount: 112,
        sampleTopics: ["Best HubSpot Partner Agencies", "Top Marketing Automation Platforms", "SEO Platforms for Agencies", "Agency Project Management Tools"],
      },
      {
        id: "financial-services",
        name: "Financial Services",
        icon: Landmark,
        description: "Advisory firms, wealth management, and financial planning platforms",
        articleCount: 18,
        brandCount: 48,
        sampleTopics: ["Best CRM for Financial Advisors", "Top Portfolio Management Software", "Financial Planning Tools Compared", "Client Reporting Platforms Ranked"],
      },
      {
        id: "hr-technology",
        name: "HR Technology",
        icon: Users,
        description: "HRIS platforms, talent management, and workforce planning",
        articleCount: 22,
        brandCount: 64,
        sampleTopics: ["Best HRIS for Mid-Market Companies", "Top Applicant Tracking Systems", "Performance Management Platforms", "Employee Engagement Tools Ranked"],
      },
      {
        id: "information-services",
        name: "Information Services",
        icon: Database,
        description: "Data providers, business intelligence, and market intelligence platforms",
        articleCount: 12,
        brandCount: 32,
        sampleTopics: ["Best Business Intelligence Platforms", "Top Data Enrichment Providers", "Market Intelligence Tools Compared", "Competitive Intelligence Software Ranked"],
      },
      {
        id: "legal-technology",
        name: "Legal Technology",
        icon: Scale,
        description: "Legal practice management, compliance platforms, and regulatory tools",
        articleCount: 18,
        brandCount: 43,
        sampleTopics: ["Best Legal Practice Management Software", "Immigration Case Management Tools", "Compliance Training Platforms", "Top E-Discovery Solutions"],
      },
      {
        id: "professional-training",
        name: "Professional Training",
        icon: GraduationCap,
        description: "Corporate training, LMS platforms, and professional development",
        articleCount: 14,
        brandCount: 38,
        sampleTopics: ["Best Corporate LMS Platforms", "Top Sales Training Software", "Compliance Training Solutions", "AI-Powered Learning Platforms"],
      },
      {
        id: "public-relations",
        name: "Public Relations",
        icon: MessageSquare,
        description: "PR agencies, media monitoring, and communications platforms",
        articleCount: 12,
        brandCount: 34,
        sampleTopics: ["Best Media Monitoring Tools", "Top PR Distribution Platforms", "Crisis Communications Software", "Influencer Management Tools Ranked"],
      },
      {
        id: "sales-enablement",
        name: "Sales Enablement",
        icon: Target,
        description: "Sales intelligence, revenue operations, and enablement platforms",
        articleCount: 20,
        brandCount: 56,
        sampleTopics: ["Best Sales Intelligence Platforms", "Top Revenue Operations Tools", "Sales Engagement Platforms Compared", "Conversation Intelligence Software"],
      },
      {
        id: "staffing",
        name: "Staffing",
        icon: UserPlus,
        description: "Recruiting agencies, staffing technology, and workforce solutions",
        articleCount: 10,
        brandCount: 28,
        sampleTopics: ["Best Staffing Agency Software", "Top VMS Platforms", "Recruiting CRM Solutions Compared", "Contingent Workforce Management Tools"],
      },
    ],
  },
  {
    id: "life-sciences",
    name: "Life Sciences",
    sectors: [
      {
        id: "biotech",
        name: "Biotech",
        icon: Beaker,
        description: "Biotechnology, genomics, and life science research platforms",
        articleCount: 14,
        brandCount: 36,
        sampleTopics: ["Best Lab Information Management Systems", "Top Bioprocessing Software", "Genomics Data Platforms Compared", "Drug Discovery AI Tools"],
      },
      {
        id: "healthcare",
        name: "Healthcare",
        icon: Heart,
        description: "Healthcare IT, clinical platforms, and health system technology",
        articleCount: 28,
        brandCount: 74,
        sampleTopics: ["Best Clinical Trial Management Software", "Top EHR Systems for Mid-Size Practices", "Telehealth Platforms Compared", "HIPAA-Compliant Cloud Providers"],
      },
      {
        id: "pharmaceuticals",
        name: "Pharmaceuticals",
        icon: Pill,
        description: "Pharma CRM, regulatory compliance, and drug lifecycle management",
        articleCount: 16,
        brandCount: 42,
        sampleTopics: ["Best Pharma CRM Platforms", "Top Regulatory Submission Software", "Drug Safety Monitoring Tools", "Clinical Data Management Compared"],
      },
    ],
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    sectors: [
      {
        id: "logistics",
        name: "Logistics",
        icon: Truck,
        description: "Supply chain visibility, freight management, and logistics platforms",
        articleCount: 16,
        brandCount: 44,
        sampleTopics: ["Best TMS for Mid-Market Shippers", "Top Supply Chain Visibility Platforms", "Last-Mile Delivery Software Compared", "Warehouse Management Systems Ranked"],
      },
      {
        id: "real-estate-technology",
        name: "Real Estate Technology",
        icon: HomeIcon,
        description: "Property technology, real estate analytics, and property management",
        articleCount: 14,
        brandCount: 38,
        sampleTopics: ["Best Property Data Platforms", "Real Estate Lead Generation Tools", "PropTech CRM Comparison", "Commercial Real Estate Analytics"],
      },
      {
        id: "telecommunications",
        name: "Telecommunications",
        icon: Radio,
        description: "Business connectivity, UCaaS, and network infrastructure",
        articleCount: 10,
        brandCount: 28,
        sampleTopics: ["Best Business Internet Providers", "UCaaS Platforms Compared", "Managed SD-WAN Solutions", "Top VoIP Providers for Enterprise"],
      },
    ],
  },
];

const ALL_SECTORS: Sector[] = CLUSTERS.flatMap(c => c.sectors);

type ArticleType = "comparison" | "roundup" | "guide" | "trending";

interface Article {
  id: string;
  title: string;
  subtitle: string;
  type: ArticleType;
  sectorId: string;
  tags: string[];
  readTime: string;
  author: string;
  updated: string;
  featured?: boolean;
  intro: string;
  mentions: { name: string; verdict: string }[];
  bottomLine: string;
  sections: { heading: string; content: string }[];
}

const ARTICLES: Article[] = [
  {
    id: "hubspot-vs-salesforce-2026",
    title: "HubSpot vs Salesforce: Which CRM Is Best for Your Team in 2026?",
    subtitle: "A deep-dive comparison for mid-market and enterprise buyers",
    type: "comparison",
    sectorId: "saas",
    tags: ["CRM", "HubSpot", "Salesforce", "Mid-Market"],
    readTime: "14 min",
    author: "Sarah Chen",
    updated: "Feb 12, 2026",
    featured: true,
    intro: "The CRM market in 2026 remains a two-horse race at the top. HubSpot and Salesforce together command over 40% of the global CRM market — but they serve fundamentally different buyers.",
    mentions: [
      { name: "HubSpot", verdict: "Best for mid-market teams wanting all-in-one simplicity" },
      { name: "Salesforce", verdict: "Best for enterprise organizations needing deep customization" },
    ],
    bottomLine: "Most mid-market teams (50–500 employees) will get more value from HubSpot faster. Salesforce becomes necessary when workflow customization requirements exceed what HubSpot's operations hub can handle.",
    sections: [
      { heading: "Who HubSpot Is Best For", content: "Mid-market SaaS companies (50–500 employees) that want a unified marketing + sales + service platform without a dedicated admin team." },
      { heading: "Who Salesforce Is Best For", content: "Enterprise organizations (500+ employees) that need deep customization, industry-specific workflows, and an ecosystem of 5,000+ apps." },
    ],
  },
  {
    id: "top-10-ai-agent-builders",
    title: "Top 10 AI Agent Builders in 2026",
    subtitle: "From no-code platforms to developer-first frameworks",
    type: "roundup",
    sectorId: "artificial-intelligence",
    tags: ["AI", "Agents", "Automation", "Developer Tools"],
    readTime: "18 min",
    author: "Marcus Rivera",
    updated: "Feb 14, 2026",
    featured: true,
    intro: "AI agents went from demo curiosity to production infrastructure in 2025. We evaluated the top 10 based on real production use cases.",
    mentions: [
      { name: "CrewAI", verdict: "Best for developer teams needing multi-agent flexibility" },
      { name: "Relevance AI", verdict: "Best for GTM teams with CRM integration needs" },
      { name: "Langbase", verdict: "Best for rapid prototyping and single-agent use cases" },
    ],
    bottomLine: "CrewAI is the most production-ready multi-agent framework as of Q1 2026. Relevance AI is the only platform here with native CRM connectors. Langbase ships the fastest for single-agent prototypes.",
    sections: [],
  },
  {
    id: "best-ev-fleet-operations",
    title: "Best EVs for Fleet Operations in 2026",
    subtitle: "Total cost of ownership comparison for commercial fleets",
    type: "guide",
    sectorId: "automotive",
    tags: ["EV", "Fleet", "Tesla", "Ford", "Rivian"],
    readTime: "16 min",
    author: "James Hartley",
    updated: "Feb 10, 2026",
    featured: true,
    intro: "Fleet electrification is no longer a question of if — it's a question of which vehicles deliver the best total cost of ownership for your specific use case.",
    mentions: [
      { name: "Tesla", verdict: "Best for long-range highway fleets" },
      { name: "Ford", verdict: "Best for mixed-use commercial fleets" },
      { name: "Rivian", verdict: "Best for last-mile delivery" },
    ],
    bottomLine: "Ford's E-Transit and Lightning cover the widest range of commercial use cases. Tesla's range advantage matters most on highway-heavy routes. Rivian's delivery van was purpose-built for Amazon's last-mile spec.",
    sections: [],
  },
  {
    id: "clinical-trial-management-software",
    title: "Best Clinical Trial Management Software (CTMS) in 2026",
    subtitle: "Comparing platforms for Phase I–IV trials across pharma and biotech",
    type: "comparison",
    sectorId: "healthcare",
    tags: ["CTMS", "Clinical Trials", "Pharma", "Biotech"],
    readTime: "15 min",
    author: "Dr. Priya Mehta",
    updated: "Feb 8, 2026",
    intro: "Managing clinical trials requires specialized software that handles regulatory compliance, patient recruitment, and site management. The right CTMS can cut trial timelines by 20–30%.",
    mentions: [
      { name: "Medidata", verdict: "Best for large pharma running global multi-site trials" },
      { name: "Veeva Vault", verdict: "Best for companies already in the Veeva ecosystem" },
      { name: "Oracle Health Sciences", verdict: "Best for complex adaptive trial designs" },
    ],
    bottomLine: "Medidata runs 70% of the world's top 25 pharma company trials. Veeva makes sense if you're already using Vault for regulatory. Oracle handles the most complex adaptive trial designs but requires dedicated admin resources.",
    sections: [],
  },
  {
    id: "best-hubspot-partner-agencies",
    title: "Best HubSpot Partner Agencies for Mid-Market Growth",
    subtitle: "Diamond and Elite partners compared by specialty and results",
    type: "roundup",
    sectorId: "digital-marketing",
    tags: ["HubSpot", "Agency", "Inbound Marketing", "RevOps"],
    readTime: "12 min",
    author: "Sarah Chen",
    updated: "Feb 6, 2026",
    featured: true,
    intro: "There are 6,000+ HubSpot partner agencies globally. We narrowed it to the top performers based on client retention, revenue impact, and implementation quality.",
    mentions: [
      { name: "SmartBug Media", verdict: "Best for full-funnel inbound marketing" },
      { name: "Lean Labs", verdict: "Best for high-growth SaaS website redesigns" },
      { name: "New Breed Revenue", verdict: "Best for revenue operations architecture" },
    ],
    bottomLine: "SmartBug runs the most comprehensive inbound programs across the full funnel. Lean Labs specializes in SaaS website redesigns that move pipeline metrics. New Breed focuses exclusively on revenue operations architecture.",
    sections: [],
  },
  {
    id: "legal-practice-management-2026",
    title: "Best Legal Practice Management Software in 2026",
    subtitle: "Clio, MyCase, PracticePanther, and InfoTrack compared",
    type: "comparison",
    sectorId: "legal-technology",
    tags: ["Legal", "Practice Management", "InfoTrack", "Clio"],
    readTime: "11 min",
    author: "Rachel Torres",
    updated: "Feb 4, 2026",
    intro: "Law firms are finally modernizing operations. The right practice management platform can reduce administrative overhead by 30% and improve client communication.",
    mentions: [
      { name: "Clio", verdict: "Best for small-to-mid law firms wanting an all-in-one platform" },
      { name: "InfoTrack", verdict: "Best for firms needing deep court filing and search integration" },
      { name: "eImmigration", verdict: "Best for immigration law firms managing case workflows" },
    ],
    bottomLine: "Clio is the most widely adopted all-in-one platform for general practice firms under 50 attorneys. InfoTrack is the only option with direct court filing integration across 2,000+ courts. eImmigration handles the specific form and deadline complexity of immigration cases.",
    sections: [],
  },
  {
    id: "property-data-platforms",
    title: "Best Property Data Platforms for Real Estate Professionals",
    subtitle: "PropertyRadar, Reonomy, and CoreLogic compared for different use cases",
    type: "comparison",
    sectorId: "real-estate-technology",
    tags: ["PropTech", "Real Estate Data", "PropertyRadar", "Lead Gen"],
    readTime: "10 min",
    author: "Alex Morgan",
    updated: "Feb 2, 2026",
    intro: "Real estate professionals live and die by data quality. The right property data platform gives you ownership records, transaction history, and predictive analytics.",
    mentions: [
      { name: "PropertyRadar", verdict: "Best for hyperlocal lead generation and community data" },
      { name: "Reonomy", verdict: "Best for commercial real estate intelligence" },
      { name: "CoreLogic", verdict: "Best for enterprise-grade property analytics" },
    ],
    bottomLine: "PropertyRadar has the most granular community-level data for local investors and direct lenders. Reonomy covers commercial real estate with ownership and transaction data. CoreLogic provides the deepest historical analytics but requires an enterprise contract.",
    sections: [],
  },
  {
    id: "construction-pm-software",
    title: "Best Construction Project Management Software in 2026",
    subtitle: "Procore, Buildertrend, and CoConstruct for different project scales",
    type: "guide",
    sectorId: "construction",
    tags: ["Construction", "Project Management", "Procore"],
    readTime: "13 min",
    author: "James Hartley",
    updated: "Jan 30, 2026",
    intro: "Construction project management is a $3.2B software market growing at 14% annually. The right platform can reduce project overruns by 25%.",
    mentions: [
      { name: "Procore", verdict: "Best for large commercial construction firms" },
      { name: "Buildertrend", verdict: "Best for residential builders and remodelers" },
      { name: "CoConstruct", verdict: "Best for custom home builders" },
    ],
    bottomLine: "Procore handles multi-million-dollar commercial projects with subcontractor coordination at scale. Buildertrend is purpose-built for residential builders doing $1M–$50M annually. CoConstruct is the smallest-team option for custom home builders.",
    sections: [],
  },
  {
    id: "business-internet-providers",
    title: "Best Business Internet Providers in 2026",
    subtitle: "Comparing fiber, cable, and dedicated options for growing companies",
    type: "roundup",
    sectorId: "telecommunications",
    tags: ["ISP", "Business Internet", "Fiber"],
    readTime: "9 min",
    author: "Dana Kim",
    updated: "Jan 28, 2026",
    intro: "Business internet is not consumer broadband with a bigger bill. The right provider delivers guaranteed uptime, symmetric speeds, and responsive support.",
    mentions: [
      { name: "Atlantech Online", verdict: "Best for DC-area businesses needing local fiber" },
      { name: "Lumen", verdict: "Best for multi-site enterprises needing national footprint" },
      { name: "Comcast Business", verdict: "Best for small businesses wanting bundled voice + internet" },
    ],
    bottomLine: "Atlantech delivers the best service quality and uptime SLAs in the DC metro area, but only operates regionally. Lumen has the national fiber footprint for multi-site companies. Comcast Business offers the lowest entry price when bundling voice and internet.",
    sections: [],
  },
  {
    id: "best-ecommerce-email-2026",
    title: "Best Email Marketing Platform for E-commerce in 2026",
    subtitle: "Klaviyo vs Mailchimp vs Omnisend for DTC and Shopify brands",
    type: "guide",
    sectorId: "ecommerce",
    tags: ["E-commerce", "Email", "Klaviyo", "Shopify", "DTC"],
    readTime: "10 min",
    author: "Dana Kim",
    updated: "Jan 26, 2026",
    featured: true,
    intro: "Email is still the highest-ROI channel for e-commerce brands. The right platform can drive 20–40% of total revenue.",
    mentions: [
      { name: "Klaviyo", verdict: "Best for Shopify brands wanting deep segmentation" },
      { name: "Mailchimp", verdict: "Best for multi-channel brands needing email + social + ads" },
      { name: "Omnisend", verdict: "Best for e-commerce brands wanting good automation at lower cost" },
    ],
    bottomLine: "Klaviyo's Shopify integration and behavioral segmentation drive the highest per-send revenue for DTC brands. Mailchimp covers email, social, and ads in one platform. Omnisend delivers 80% of Klaviyo's automation capability at roughly half the price.",
    sections: [],
  },
  {
    id: "dataops-platforms-2026",
    title: "Top DataOps Platforms for Industrial Integration",
    subtitle: "HighByte, Fivetran, and dbt compared for manufacturing data",
    type: "comparison",
    sectorId: "saas",
    tags: ["DataOps", "HighByte", "Manufacturing", "Integration"],
    readTime: "14 min",
    author: "Marcus Rivera",
    updated: "Jan 24, 2026",
    intro: "Manufacturing and industrial companies generate massive operational data. DataOps platforms bridge the gap between OT and IT systems.",
    mentions: [
      { name: "HighByte", verdict: "Best for industrial data modeling and OT/IT convergence" },
      { name: "Fivetran", verdict: "Best for cloud-native data pipeline automation" },
      { name: "dbt", verdict: "Best for analytics engineering and transformation" },
    ],
    bottomLine: "HighByte is purpose-built for industrial OT/IT data modeling — no other platform handles ISA-95 contexts natively. Fivetran automates 500+ cloud data connectors with zero-maintenance pipelines. dbt is the standard for analytics engineering but requires SQL fluency.",
    sections: [],
  },
  {
    id: "compliance-training-platforms",
    title: "Best Compliance Training Platforms in 2026",
    subtitle: "LRN, SAI Global, and NAVEX compared for enterprise ethics programs",
    type: "roundup",
    sectorId: "professional-training",
    tags: ["Compliance", "Training", "LRN", "Ethics"],
    readTime: "11 min",
    author: "Rachel Torres",
    updated: "Jan 22, 2026",
    intro: "Compliance training is shifting from checkbox exercises to behavior-change programs. The best platforms combine adaptive learning, real scenarios, and clear reporting.",
    mentions: [
      { name: "LRN Corporation", verdict: "Best for culture-focused ethics and compliance programs" },
      { name: "NAVEX", verdict: "Best for integrated compliance management suites" },
      { name: "SAI Global", verdict: "Best for risk-based compliance training" },
    ],
    bottomLine: "LRN produces the highest-quality content — their programs measurably shift employee behavior, not just check boxes. NAVEX bundles compliance training into a full GRC suite. SAI Global focuses on risk-based training tied to specific regulatory frameworks.",
    sections: [],
  },
  {
    id: "immigration-case-management",
    title: "Best Immigration Case Management Software",
    subtitle: "eImmigration, INSZoom, and Docketwise compared for immigration law firms",
    type: "comparison",
    sectorId: "legal-technology",
    tags: ["Immigration", "Legal", "eImmigration", "Case Management"],
    readTime: "10 min",
    author: "Rachel Torres",
    updated: "Jan 20, 2026",
    intro: "Immigration law requires specialized case management that tracks visa timelines, government forms, and client communications across complex multi-step processes.",
    mentions: [
      { name: "eImmigration", verdict: "Best for high-volume corporate immigration practices" },
      { name: "INSZoom", verdict: "Best for firms wanting established workflow templates" },
      { name: "Docketwise", verdict: "Best for modern UX and form auto-population" },
    ],
    bottomLine: "eImmigration handles the highest volume — firms processing 1,000+ petitions per year. INSZoom has the most mature workflow templates for standard visa categories. Docketwise is the newest platform with the cleanest interface and automatic form population.",
    sections: [],
  },
  {
    id: "best-sales-intelligence-2026",
    title: "Best Sales Intelligence Platforms in 2026",
    subtitle: "ZoomInfo vs Apollo vs Cognism for B2B prospecting",
    type: "comparison",
    sectorId: "sales-enablement",
    tags: ["Sales Intelligence", "ZoomInfo", "Apollo", "Prospecting"],
    readTime: "13 min",
    author: "Marcus Rivera",
    updated: "Jan 18, 2026",
    featured: true,
    intro: "B2B sales teams live or die by their data. The right intelligence platform means the difference between hitting quota and missing it by 30%.",
    mentions: [
      { name: "ZoomInfo", verdict: "Best for enterprise teams needing the deepest contact database" },
      { name: "Apollo", verdict: "Best for startups wanting sales engagement + data in one tool" },
      { name: "Cognism", verdict: "Best for European markets and GDPR-compliant prospecting" },
    ],
    bottomLine: "ZoomInfo has the largest B2B contact database at 260M+ profiles but costs $15K–$40K/yr. Apollo gives you 80% of that data plus built-in sales engagement for under $5K/yr. Cognism is the only platform here with verified European mobile numbers and full GDPR compliance.",
    sections: [],
  },
  {
    id: "best-hris-mid-market",
    title: "Best HRIS for Mid-Market Companies in 2026",
    subtitle: "BambooHR vs Rippling vs Gusto for growing teams",
    type: "guide",
    sectorId: "hr-technology",
    tags: ["HRIS", "BambooHR", "Rippling", "HR"],
    readTime: "12 min",
    author: "Sarah Chen",
    updated: "Jan 16, 2026",
    intro: "Mid-market companies (100–1,000 employees) need HR platforms that scale without enterprise complexity. The right HRIS saves 15+ hours per week on administrative tasks.",
    mentions: [
      { name: "BambooHR", verdict: "Best for companies wanting simplicity and great onboarding" },
      { name: "Rippling", verdict: "Best for companies wanting HR + IT + Finance unified" },
      { name: "Gusto", verdict: "Best for smaller teams prioritizing payroll ease" },
    ],
    bottomLine: "BambooHR is the fastest to implement — most companies are live within 2 weeks. Rippling is the only platform that unifies HR, IT device management, and finance in one system. Gusto is built payroll-first and is the most affordable option for teams under 100.",
    sections: [],
  },
  {
    id: "aws-vs-azure-vs-gcp",
    title: "AWS vs Azure vs GCP: Cloud Platform Comparison for 2026",
    subtitle: "Pricing, services, and real-world performance across use cases",
    type: "comparison",
    sectorId: "cloud-computing",
    tags: ["AWS", "Azure", "GCP", "Cloud"],
    readTime: "20 min",
    author: "Marcus Rivera",
    updated: "Jan 14, 2026",
    featured: true,
    intro: "The big three cloud providers now collectively serve over 65% of global cloud infrastructure spend. Each has distinct strengths that matter for different workloads.",
    mentions: [
      { name: "AWS", verdict: "Best for breadth of services and mature ecosystem" },
      { name: "Microsoft Azure", verdict: "Best for Microsoft-centric enterprises" },
      { name: "Google Cloud", verdict: "Best for data analytics and AI/ML workloads" },
    ],
    bottomLine: "AWS offers 200+ services — more than any other provider — and has the most mature partner ecosystem. Azure integrates natively with Active Directory, Office 365, and the Microsoft stack most enterprises already run. GCP's BigQuery and Vertex AI are measurably ahead for analytics-heavy workloads.",
    sections: [],
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

function Navbar({ activeSector, onHome, onSelectSector }: {
  activeSector: string | null;
  onHome: () => void;
  onSelectSector: (id: string) => void;
}) {
  const { theme } = useTheme();
  const [showSectors, setShowSectors] = useState(false);

  const activeSectorData = activeSector ? ALL_SECTORS.find(s => s.id === activeSector) : null;

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
        <button onClick={onHome} className="flex items-center gap-2" data-testid="link-home">
          <Award className="w-4 h-4 text-muted-foreground/60" />
          <span className="text-sm font-semibold tracking-tight text-foreground">
            WhatisBest<span className="font-normal text-muted-foreground">.com</span>
          </span>
        </button>
        <div className="flex items-center gap-1">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="text-[13px] text-muted-foreground/70 flex items-center gap-1"
              onClick={() => setShowSectors(!showSectors)}
              data-testid="button-sectors-dropdown"
            >
              Sectors <ChevronDown className="w-3 h-3" />
            </Button>
            {showSectors && (
              <div
                className="absolute top-full right-0 mt-1 w-[340px] max-h-[70vh] overflow-y-auto rounded-xl border border-border/40 bg-background/95 backdrop-blur-xl shadow-xl p-3 z-50"
                onMouseLeave={() => setShowSectors(false)}
              >
                {CLUSTERS.map((cluster) => (
                  <div key={cluster.id} className="mb-3 last:mb-0">
                    <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground/40 font-medium px-3 py-1.5">{cluster.name}</div>
                    {cluster.sectors.map((s) => {
                      const Icon = s.icon;
                      return (
                        <button
                          key={s.id}
                          className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-muted/50 flex items-center gap-3 transition-colors"
                          onClick={() => { onSelectSector(s.id); setShowSectors(false); }}
                          data-testid={`nav-sector-${s.id}`}
                        >
                          <Icon className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />
                          <span className="text-sm text-foreground">{s.name}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" className="text-[13px] text-muted-foreground/70" onClick={onHome} data-testid="nav-explore">Explore</Button>
          <ThemeToggle />
        </div>
      </div>
      {activeSectorData && (
        <div className="border-t border-border/20">
          <div className="max-w-6xl mx-auto px-6 py-1.5 flex items-center gap-2 text-[13px]">
            <button onClick={onHome} className="text-muted-foreground/70 hover:text-muted-foreground transition-colors" data-testid="breadcrumb-home">All Sectors</button>
            <ChevronRight className="w-3 h-3 text-muted-foreground/70" />
            <span className="text-foreground/70 font-medium">{activeSectorData.name}</span>
          </div>
        </div>
      )}
    </nav>
  );
}

function ArticleCard({ article, onClick }: { article: Article; onClick: () => void }) {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";
  const TypeIcon = TYPE_LABELS[article.type].icon;
  const sector = ALL_SECTORS.find(s => s.id === article.sectorId);

  return (
    <div
      className={`rounded-xl border p-5 cursor-pointer hover-elevate ${cardClass}`}
      onClick={onClick}
      data-testid={`card-article-${article.id}`}
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {sector && (
          <Badge variant="outline" className="text-[13px] text-muted-foreground/60 no-default-hover-elevate">
            {sector.name}
          </Badge>
        )}
        <Badge variant="outline" className="text-[13px] text-muted-foreground/60 no-default-hover-elevate flex items-center gap-1">
          <TypeIcon className="w-2.5 h-2.5" />
          {TYPE_LABELS[article.type].label}
        </Badge>
      </div>

      <h3 className="text-base font-semibold text-foreground mb-1">{article.title}</h3>
      <p className="text-sm text-muted-foreground/70 mb-3">{article.subtitle}</p>
      <p className="text-sm text-foreground/75 mb-4 leading-relaxed line-clamp-2">{article.intro}</p>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {article.mentions.slice(0, 3).map((m) => (
          <Badge key={m.name} variant="outline" className="text-[13px] text-emerald-500/70 no-default-hover-elevate">{m.name}</Badge>
        ))}
        {article.mentions.length > 3 && (
          <span className="text-[13px] text-muted-foreground/60">+{article.mentions.length - 3}</span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground/60">
        <span>{article.readTime} · {article.updated}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </div>
  );
}

function HomePage({ onSelectSector, onSelectArticle }: {
  onSelectSector: (id: string) => void;
  onSelectArticle: (id: string) => void;
}) {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";

  const [searchQuery, setSearchQuery] = useState("");

  const totalArticles = ALL_SECTORS.reduce((a, s) => a + s.articleCount, 0);
  const totalBrands = ALL_SECTORS.reduce((a, s) => a + s.brandCount, 0);
  const featuredArticles = ARTICLES.filter(a => a.featured);

  const searchResults = searchQuery.trim()
    ? ARTICLES.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.mentions.some(m => m.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        a.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground/50 mb-4">AI-Native B2B Intelligence</p>
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl mb-5 leading-[1.1]" data-testid="text-page-title">
          B2B software research{" "}
          <span className="text-muted-foreground/50">without the affiliate links.</span>
        </h1>
        <p className="text-lg text-muted-foreground/60 max-w-2xl leading-relaxed">
          Comparisons, roundups, and buyer's guides across {ALL_SECTORS.length} industries and {totalBrands.toLocaleString()} brands. No sponsored rankings. Independent research only.
        </p>
      </div>

      <div className={`rounded-xl border px-4 py-2.5 flex items-center gap-3 mb-12 ${cardClass}`}>
        <Search className="w-4 h-4 text-muted-foreground/50 shrink-0" />
        <input
          type="text"
          placeholder="Search across all sectors — brands, tools, or topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 outline-none"
          data-testid="input-search"
        />
      </div>

      {searchQuery.trim() ? (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-3.5 h-3.5 text-muted-foreground/50" />
            <span className="text-sm text-muted-foreground/50 uppercase tracking-[0.12em]">Results for "{searchQuery}"</span>
            <Badge variant="outline" className="text-[13px] text-muted-foreground/60 no-default-hover-elevate font-mono">{searchResults.length}</Badge>
          </div>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {searchResults.map(a => <ArticleCard key={a.id} article={a} onClick={() => onSelectArticle(a.id)} />)}
            </div>
          ) : (
            <p className="text-base text-muted-foreground/60 py-12 text-center">No articles match that query across any sector.</p>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16">
            {[
              { label: "Sectors", value: String(ALL_SECTORS.length) },
              { label: "Articles", value: String(totalArticles) },
              { label: "Brands Covered", value: totalBrands.toLocaleString() },
              { label: "Avg. Depth", value: "3,900 words" },
            ].map((s) => (
              <div key={s.label} className={`rounded-xl border px-4 py-3 text-center ${cardClass}`}>
                <div className="text-xl font-bold text-foreground font-mono">{s.value}</div>
                <div className="text-sm text-muted-foreground/60">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
              {CLUSTERS.map((cluster) => (
                <div key={cluster.id} data-testid={`cluster-${cluster.id}`}>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">{cluster.name}</h2>
                  <div className="space-y-0">
                    {cluster.sectors.map((sector) => {
                      const Icon = sector.icon;
                      const sectorArticleCount = ARTICLES.filter(a => a.sectorId === sector.id).length;
                      return (
                        <button
                          key={sector.id}
                          className="w-full text-left group flex items-center justify-between py-3 border-b border-border/10 hover:border-border/30 transition-colors"
                          onClick={() => onSelectSector(sector.id)}
                          data-testid={`sector-link-${sector.id}`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors shrink-0" />
                            <span className="text-base font-medium text-foreground group-hover:text-foreground/80 transition-colors">{sector.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground/40 font-mono">{sector.articleCount}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/20 group-hover:text-muted-foreground/60 transition-colors" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {featuredArticles.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-4 h-4 text-muted-foreground/50" />
                <span className="text-sm text-muted-foreground/50 uppercase tracking-[0.15em] font-medium">Featured Across Sectors</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuredArticles.map(a => <ArticleCard key={a.id} article={a} onClick={() => onSelectArticle(a.id)} />)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function SectorPage({ sectorId, onSelectArticle, onSelectSector }: {
  sectorId: string;
  onSelectArticle: (id: string) => void;
  onSelectSector: (id: string) => void;
}) {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";

  const sector = ALL_SECTORS.find(s => s.id === sectorId);
  if (!sector) return null;

  const Icon = sector.icon;
  const sectorArticles = ARTICLES.filter(a => a.sectorId === sectorId);
  const parentCluster = CLUSTERS.find(c => c.sectors.some(s => s.id === sectorId));
  const relatedSectors = parentCluster
    ? parentCluster.sectors.filter(s => s.id !== sectorId)
    : ALL_SECTORS.filter(s => s.id !== sectorId).slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Icon className="w-5 h-5 text-muted-foreground/50" />
          {parentCluster && (
            <span className="text-sm text-muted-foreground/40 uppercase tracking-[0.12em]">{parentCluster.name}</span>
          )}
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-3" data-testid="text-sector-title">
          {sector.name}
        </h1>
        <p className="text-lg text-muted-foreground/60 max-w-2xl leading-relaxed">{sector.description}</p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground/50 mt-4">
          <span className="font-mono">{sector.articleCount} articles</span>
          <span className="text-muted-foreground/20">·</span>
          <span className="font-mono">{sector.brandCount} brands covered</span>
        </div>
      </div>

      <div className={`rounded-xl border p-5 mb-8 ${cardClass}`}>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-3.5 h-3.5 text-muted-foreground/50" />
          <span className="text-sm text-muted-foreground/50 uppercase tracking-[0.12em] font-medium">Popular Topics</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {sector.sampleTopics.map((t) => (
            <div key={t} className="text-sm text-foreground/75 flex items-center gap-2 py-1.5">
              <Hash className="w-3 h-3 text-muted-foreground/40 shrink-0" />
              {t}
            </div>
          ))}
        </div>
      </div>

      {sectorArticles.length > 0 ? (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="w-3.5 h-3.5 text-muted-foreground/50" />
            <span className="text-sm text-muted-foreground/50 uppercase tracking-[0.12em] font-medium">Articles</span>
            <Badge variant="outline" className="text-[13px] text-muted-foreground/60 no-default-hover-elevate font-mono">{sectorArticles.length}</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sectorArticles.map(a => <ArticleCard key={a.id} article={a} onClick={() => onSelectArticle(a.id)} />)}
          </div>
        </div>
      ) : (
        <div className={`rounded-xl border p-8 text-center mb-12 ${cardClass}`}>
          <p className="text-base text-muted-foreground/60">Articles for this sector are in development.</p>
          <p className="text-sm text-muted-foreground/30 mt-1">{sector.articleCount} planned articles covering {sector.brandCount} brands.</p>
        </div>
      )}

      {relatedSectors.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <Globe className="w-3.5 h-3.5 text-muted-foreground/50" />
            <span className="text-sm text-muted-foreground/50 uppercase tracking-[0.12em] font-medium">
              {parentCluster ? `More in ${parentCluster.name}` : "Explore Other Sectors"}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {relatedSectors.map((s) => {
              const SectorIcon = s.icon;
              return (
                <button
                  key={s.id}
                  className={`rounded-xl border p-4 text-left hover-elevate ${cardClass}`}
                  onClick={() => onSelectSector(s.id)}
                  data-testid={`related-sector-${s.id}`}
                >
                  <SectorIcon className="w-4 h-4 text-muted-foreground/50 mb-2" />
                  <div className="text-sm font-medium text-foreground">{s.name}</div>
                  <div className="text-[13px] text-muted-foreground/50 font-mono">{s.articleCount} articles</div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ArticleDetailPage({ article, onBack, onSelectSector }: {
  article: Article;
  onBack: () => void;
  onSelectSector: (id: string) => void;
}) {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";

  const TypeIcon = TYPE_LABELS[article.type].icon;
  const sector = ALL_SECTORS.find(s => s.id === article.sectorId);

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="text-sm text-muted-foreground/50 mb-6 flex items-center gap-1" data-testid="button-back">
        <ChevronRight className="w-3 h-3 rotate-180" />
        Back to {sector?.name || "sector"}
      </button>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {sector && (
          <button onClick={() => onSelectSector(sector.id)}>
            <Badge variant="outline" className="text-sm text-muted-foreground/60 no-default-hover-elevate cursor-pointer">
              {sector.name}
            </Badge>
          </button>
        )}
        <Badge variant="outline" className="text-sm text-muted-foreground/60 no-default-hover-elevate flex items-center gap-1">
          <TypeIcon className="w-3 h-3" />
          {TYPE_LABELS[article.type].label}
        </Badge>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-3" data-testid="text-article-title">
        {article.title}
      </h1>
      <p className="text-lg text-muted-foreground/60 mb-6">{article.subtitle}</p>

      <div className="flex items-center gap-4 text-sm text-muted-foreground/50 mb-8 pb-8 border-b border-border/20">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>{article.updated}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>{article.readTime}</span>
        </div>
      </div>

      <p className="text-base text-foreground/80 leading-relaxed mb-8" data-testid="text-intro">{article.intro}</p>

      {article.sections.length > 0 && (
        <div className="space-y-6 mb-8">
          {article.sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-semibold text-foreground mb-3">{section.heading}</h2>
              <p className="text-sm text-foreground/80 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      )}

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-3.5 h-3.5 text-emerald-500/70" />
          <span className="text-sm text-muted-foreground/50 uppercase tracking-[0.12em] font-medium">The Bottom Line</span>
        </div>
        <p className="text-base text-foreground/80 leading-relaxed font-medium" data-testid="text-bottom-line">{article.bottomLine}</p>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-muted-foreground/50 uppercase tracking-[0.12em] font-medium">Products Mentioned</span>
          <Badge variant="outline" className="text-[13px] text-muted-foreground/60 no-default-hover-elevate font-mono">{article.mentions.length}</Badge>
        </div>
        <div className="space-y-2.5">
          {article.mentions.map((m) => (
            <div key={m.name} className="rounded-lg bg-background/40 px-4 py-3 flex items-start justify-between gap-4 flex-wrap">
              <span className="text-sm font-semibold text-foreground">{m.name}</span>
              <span className="text-[13px] text-muted-foreground/60">{m.verdict}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-sm text-muted-foreground/50 uppercase tracking-[0.12em] font-medium mb-3 block">Tags</span>
        <div className="flex items-center gap-2 flex-wrap">
          {article.tags.map((t) => (
            <Badge key={t} variant="outline" className="text-[13px] text-muted-foreground/60 no-default-hover-elevate">{t}</Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 py-6 border-t border-border/20 text-sm text-muted-foreground/50">
        <div className="flex items-center gap-3">
          <span>No affiliate links</span>
          <span className="text-muted-foreground/20">|</span>
          <span>No sponsored rankings</span>
          <span className="text-muted-foreground/20">|</span>
          <span>Independent research</span>
        </div>
      </div>
    </div>
  );
}

export default function WhatisBestV3() {
  const [view, setView] = useState<"home" | "sector" | "article">("home");
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [activeArticle, setActiveArticle] = useState<string | null>(null);

  const handleSelectSector = (id: string) => {
    setActiveSector(id);
    setActiveArticle(null);
    setView("sector");
    window.scrollTo(0, 0);
  };

  const handleSelectArticle = (id: string) => {
    const article = ARTICLES.find(a => a.id === id);
    if (article) {
      setActiveArticle(id);
      setActiveSector(article.sectorId);
      setView("article");
      window.scrollTo(0, 0);
    }
  };

  const handleHome = () => {
    setView("home");
    setActiveSector(null);
    setActiveArticle(null);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (view === "article" && activeSector) {
      setView("sector");
      setActiveArticle(null);
      window.scrollTo(0, 0);
    } else {
      handleHome();
    }
  };

  const article = activeArticle ? ARTICLES.find(a => a.id === activeArticle) : null;

  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="whatisbest-v3-page">
      <Navbar
        activeSector={view !== "home" ? activeSector : null}
        onHome={handleHome}
        onSelectSector={handleSelectSector}
      />

      <main className={`px-6 pb-16 ${view !== "home" || activeSector ? "pt-28" : "pt-24"}`}>
        {view === "home" && (
          <HomePage onSelectSector={handleSelectSector} onSelectArticle={handleSelectArticle} />
        )}
        {view === "sector" && activeSector && (
          <SectorPage sectorId={activeSector} onSelectArticle={handleSelectArticle} onSelectSector={handleSelectSector} />
        )}
        {view === "article" && article && (
          <ArticleDetailPage article={article} onBack={handleBack} onSelectSector={handleSelectSector} />
        )}
      </main>

      <footer className="border-t border-border/20 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground/50">
          <div className="flex items-center gap-2">
            <Award className="w-3 h-3" />
            <span>WhatisBest.com — A Brandvious Product</span>
          </div>
          <div className="flex items-center gap-3">
            <span>No affiliate links</span>
            <span className="text-muted-foreground/20">|</span>
            <span>No sponsored rankings</span>
            <span className="text-muted-foreground/20">|</span>
            <span>Independent research</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
