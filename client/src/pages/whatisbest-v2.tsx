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
  User,
  Calendar,
  Clock,
  Tag,
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
  Wrench,
  Radio,
  Cpu,
  ArrowUpRight,
  ChevronDown,
  Hash,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

interface Sector {
  id: string;
  name: string;
  shortName: string;
  icon: typeof Building2;
  description: string;
  articleCount: number;
  brandCount: number;
  color: string;
  featuredBrands: string[];
  sampleTopics: string[];
}

const SECTORS: Sector[] = [
  {
    id: "tech-saas",
    name: "Technology & SaaS",
    shortName: "Tech",
    icon: Cpu,
    description: "Enterprise software, developer tools, cloud platforms, and B2B SaaS",
    articleCount: 48,
    brandCount: 156,
    color: "rgb(96, 165, 250)",
    featuredBrands: ["HubSpot", "Salesforce", "Stripe", "Slack", "Zoom", "HighByte", "Greentec", "LRN"],
    sampleTopics: [
      "Best CRM for Mid-Market Teams",
      "Top DataOps Platforms Compared",
      "Ethics & Compliance Software Ranked",
      "Industrial IoT Platforms for Manufacturing",
    ],
  },
  {
    id: "ecommerce-retail",
    name: "E-commerce & Retail",
    shortName: "E-commerce",
    icon: ShoppingCart,
    description: "Online marketplaces, DTC brands, retail technology, and commerce platforms",
    articleCount: 32,
    brandCount: 89,
    color: "rgb(251, 191, 36)",
    featuredBrands: ["Amazon", "Shopify", "eBay", "Etsy", "Walmart"],
    sampleTopics: [
      "Best E-commerce Email Platform for DTC",
      "Shopify vs BigCommerce vs WooCommerce",
      "Top Inventory Management Tools",
      "Marketplace Fee Comparison 2026",
    ],
  },
  {
    id: "automotive-mobility",
    name: "Automotive & Mobility",
    shortName: "Auto",
    icon: Car,
    description: "OEMs, EV manufacturers, fleet technology, and automotive supply chain",
    articleCount: 24,
    brandCount: 67,
    color: "rgb(248, 113, 113)",
    featuredBrands: ["Tesla", "Ford", "Toyota", "Rivian", "General Motors"],
    sampleTopics: [
      "Best EV for Fleet Operations",
      "OEM Parts Management Software",
      "Connected Vehicle Platforms Compared",
      "Top Automotive CRM Solutions",
    ],
  },
  {
    id: "healthcare-pharma",
    name: "Healthcare & Life Sciences",
    shortName: "Health",
    icon: Heart,
    description: "Pharmaceuticals, biotech, clinical trials, and healthcare technology",
    articleCount: 28,
    brandCount: 74,
    color: "rgb(52, 211, 153)",
    featuredBrands: ["Pfizer", "Moderna", "AstraZeneca", "Johnson & Johnson", "Merck"],
    sampleTopics: [
      "Best Clinical Trial Management Software",
      "Top Pharma CRM Platforms",
      "Drug Discovery AI Tools Ranked",
      "HIPAA-Compliant Cloud Providers",
    ],
  },
  {
    id: "marketing-agencies",
    name: "Marketing & Agencies",
    shortName: "Marketing",
    icon: Megaphone,
    description: "Digital agencies, marketing automation, growth consulting, and RevOps",
    articleCount: 36,
    brandCount: 112,
    color: "rgb(192, 132, 252)",
    featuredBrands: ["SmartBug Media", "Lean Labs", "Bluleadz", "Digital Momentum", "New Breed Revenue"],
    sampleTopics: [
      "Best HubSpot Partner Agencies",
      "Top Marketing Automation Platforms",
      "Agency Project Management Tools",
      "Best SEO Platforms for Agencies",
    ],
  },
  {
    id: "legal-compliance",
    name: "Legal & Compliance",
    shortName: "Legal",
    icon: Scale,
    description: "LegalTech, compliance platforms, regulatory tools, and legal services",
    articleCount: 18,
    brandCount: 43,
    color: "rgb(147, 197, 253)",
    featuredBrands: ["InfoTrack", "eImmigration", "LRN Corporation"],
    sampleTopics: [
      "Best Legal Practice Management Software",
      "Immigration Case Management Tools",
      "Compliance Training Platforms Compared",
      "Top E-Discovery Solutions 2026",
    ],
  },
  {
    id: "real-estate-proptech",
    name: "Real Estate & PropTech",
    shortName: "PropTech",
    icon: HomeIcon,
    description: "Property technology, real estate analytics, and property management platforms",
    articleCount: 14,
    brandCount: 38,
    color: "rgb(253, 186, 116)",
    featuredBrands: ["PropertyRadar", "Zillow", "Redfin", "CoStar"],
    sampleTopics: [
      "Best Property Data Platforms",
      "Real Estate Lead Generation Tools",
      "PropTech CRM Comparison",
      "Commercial Real Estate Analytics",
    ],
  },
  {
    id: "infrastructure-engineering",
    name: "Infrastructure & Engineering",
    shortName: "Engineering",
    icon: Wrench,
    description: "Construction tech, civil engineering, project delivery, and field operations",
    articleCount: 12,
    brandCount: 31,
    color: "rgb(156, 163, 175)",
    featuredBrands: ["Greenline", "Katapult Engineering", "Procore", "Autodesk"],
    sampleTopics: [
      "Best Construction Project Management",
      "Engineering Design Software Ranked",
      "Field Service Management Tools",
      "Geospatial Data Platforms Compared",
    ],
  },
  {
    id: "telecom",
    name: "Telecommunications",
    shortName: "Telecom",
    icon: Radio,
    description: "ISPs, managed services, unified communications, and network infrastructure",
    articleCount: 10,
    brandCount: 28,
    color: "rgb(129, 140, 248)",
    featuredBrands: ["Atlantech Online", "Lumen", "Comcast Business"],
    sampleTopics: [
      "Best Business Internet Providers",
      "UCaaS Platforms Compared",
      "Managed SD-WAN Solutions",
      "Top VoIP Providers for Enterprise",
    ],
  },
];

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
    sectorId: "tech-saas",
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
    bottomLine: "HubSpot wins on speed-to-value. Salesforce wins on configurability and ecosystem depth.",
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
    sectorId: "tech-saas",
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
    bottomLine: "CrewAI leads for developers, Relevance AI leads for business teams, Langbase leads for speed.",
    sections: [],
  },
  {
    id: "best-ev-fleet-operations",
    title: "Best EVs for Fleet Operations in 2026",
    subtitle: "Total cost of ownership comparison for commercial fleets",
    type: "guide",
    sectorId: "automotive-mobility",
    tags: ["EV", "Fleet", "Tesla", "Ford", "Rivian"],
    readTime: "16 min",
    author: "James Hartley",
    updated: "Feb 10, 2026",
    featured: true,
    intro: "Fleet electrification is no longer a question of if — it's a question of which vehicles deliver the best total cost of ownership for your specific use case.",
    mentions: [
      { name: "Tesla", verdict: "Best for: Long-range highway fleets" },
      { name: "Ford", verdict: "Best for: Mixed-use commercial fleets (E-Transit, F-150 Lightning)" },
      { name: "Rivian", verdict: "Best for: Last-mile delivery (Amazon partnership proven)" },
    ],
    bottomLine: "Ford leads on versatility, Tesla leads on range, Rivian leads on delivery-specific design.",
    sections: [],
  },
  {
    id: "clinical-trial-management-software",
    title: "Best Clinical Trial Management Software (CTMS) in 2026",
    subtitle: "Comparing platforms for Phase I–IV trials across pharma and biotech",
    type: "comparison",
    sectorId: "healthcare-pharma",
    tags: ["CTMS", "Clinical Trials", "Pharma", "Biotech"],
    readTime: "15 min",
    author: "Dr. Priya Mehta",
    updated: "Feb 8, 2026",
    intro: "Managing clinical trials requires specialized software that handles regulatory compliance, patient recruitment, and site management. The right CTMS can cut trial timelines by 20–30%.",
    mentions: [
      { name: "Medidata", verdict: "Best for: Large pharma running global multi-site trials" },
      { name: "Veeva Vault", verdict: "Best for: Companies already in the Veeva ecosystem" },
      { name: "Oracle Health Sciences", verdict: "Best for: Complex adaptive trial designs" },
    ],
    bottomLine: "Medidata leads in scale. Veeva leads in integration. Oracle leads in complexity handling.",
    sections: [],
  },
  {
    id: "best-hubspot-partner-agencies",
    title: "Best HubSpot Partner Agencies for Mid-Market Growth",
    subtitle: "Diamond and Elite partners compared by specialty and results",
    type: "roundup",
    sectorId: "marketing-agencies",
    tags: ["HubSpot", "Agency", "Inbound Marketing", "RevOps"],
    readTime: "12 min",
    author: "Sarah Chen",
    updated: "Feb 6, 2026",
    featured: true,
    intro: "There are 6,000+ HubSpot partner agencies globally. We narrowed it to the top performers based on client retention, revenue impact, and implementation quality.",
    mentions: [
      { name: "SmartBug Media", verdict: "Best for: Full-funnel inbound marketing" },
      { name: "Lean Labs", verdict: "Best for: High-growth SaaS website redesigns" },
      { name: "Bluleadz", verdict: "Best for: HubSpot migrations and onboarding" },
      { name: "New Breed Revenue", verdict: "Best for: Revenue operations architecture" },
      { name: "Digital Momentum", verdict: "Best for: Enterprise HubSpot implementations" },
    ],
    bottomLine: "SmartBug leads on breadth, Lean Labs leads on growth design, Bluleadz leads on migrations.",
    sections: [],
  },
  {
    id: "legal-practice-management-2026",
    title: "Best Legal Practice Management Software in 2026",
    subtitle: "Clio, MyCase, PracticePanther, and InfoTrack compared",
    type: "comparison",
    sectorId: "legal-compliance",
    tags: ["Legal", "Practice Management", "InfoTrack", "Clio"],
    readTime: "11 min",
    author: "Rachel Torres",
    updated: "Feb 4, 2026",
    intro: "Law firms are finally modernizing operations. The right practice management platform can reduce administrative overhead by 30% and improve client communication.",
    mentions: [
      { name: "Clio", verdict: "Best for: Small-to-mid law firms wanting an all-in-one platform" },
      { name: "InfoTrack", verdict: "Best for: Firms needing deep court filing and search integration" },
      { name: "eImmigration", verdict: "Best for: Immigration law firms managing case workflows" },
    ],
    bottomLine: "Clio leads on breadth. InfoTrack leads on court integration. eImmigration leads for immigration-specific workflows.",
    sections: [],
  },
  {
    id: "property-data-platforms",
    title: "Best Property Data Platforms for Real Estate Professionals",
    subtitle: "PropertyRadar, Reonomy, and CoreLogic compared for different use cases",
    type: "comparison",
    sectorId: "real-estate-proptech",
    tags: ["PropTech", "Real Estate Data", "PropertyRadar", "Lead Gen"],
    readTime: "10 min",
    author: "Alex Morgan",
    updated: "Feb 2, 2026",
    intro: "Real estate professionals live and die by data quality. The right property data platform gives you ownership records, transaction history, and predictive analytics.",
    mentions: [
      { name: "PropertyRadar", verdict: "Best for: Hyperlocal lead generation and community data" },
      { name: "Reonomy", verdict: "Best for: Commercial real estate intelligence" },
      { name: "CoreLogic", verdict: "Best for: Enterprise-grade property analytics" },
    ],
    bottomLine: "PropertyRadar leads for local investors and lenders. Reonomy leads for CRE. CoreLogic leads for enterprise.",
    sections: [],
  },
  {
    id: "construction-pm-software",
    title: "Best Construction Project Management Software in 2026",
    subtitle: "Procore, Buildertrend, and CoConstruct for different project scales",
    type: "guide",
    sectorId: "infrastructure-engineering",
    tags: ["Construction", "Project Management", "Procore", "Greenline"],
    readTime: "13 min",
    author: "James Hartley",
    updated: "Jan 30, 2026",
    intro: "Construction project management is a $3.2B software market growing at 14% annually. The right platform can reduce project overruns by 25%.",
    mentions: [
      { name: "Procore", verdict: "Best for: Large commercial construction firms" },
      { name: "Greenline", verdict: "Best for: Civil infrastructure and engineering projects" },
      { name: "Katapult Engineering", verdict: "Referenced: Engineering data collection platform" },
    ],
    bottomLine: "Procore leads for commercial builders. Greenline leads for civil engineering. Scale determines the right fit.",
    sections: [],
  },
  {
    id: "business-internet-providers",
    title: "Best Business Internet Providers in 2026",
    subtitle: "Comparing fiber, cable, and dedicated options for growing companies",
    type: "roundup",
    sectorId: "telecom",
    tags: ["ISP", "Business Internet", "Fiber", "Atlantech"],
    readTime: "9 min",
    author: "Dana Kim",
    updated: "Jan 28, 2026",
    intro: "Business internet is not consumer broadband with a bigger bill. The right provider delivers guaranteed uptime, symmetric speeds, and responsive support.",
    mentions: [
      { name: "Atlantech Online", verdict: "Best for: DC-area businesses needing local fiber with managed services" },
      { name: "Lumen", verdict: "Best for: Multi-site enterprises needing national footprint" },
      { name: "Comcast Business", verdict: "Best for: Small businesses wanting bundled voice + internet" },
    ],
    bottomLine: "Atlantech leads on service quality in its region. Lumen leads on national reach. Comcast leads on bundle value.",
    sections: [],
  },
  {
    id: "best-ecommerce-email-2026",
    title: "Best Email Marketing Platform for E-commerce in 2026",
    subtitle: "Klaviyo vs Mailchimp vs Omnisend for DTC and Shopify brands",
    type: "guide",
    sectorId: "ecommerce-retail",
    tags: ["E-commerce", "Email", "Klaviyo", "Shopify", "DTC"],
    readTime: "10 min",
    author: "Dana Kim",
    updated: "Jan 26, 2026",
    intro: "Email is still the highest-ROI channel for e-commerce brands. The right platform can drive 20–40% of total revenue.",
    mentions: [
      { name: "Klaviyo", verdict: "Best for: Shopify brands wanting deep segmentation" },
      { name: "Mailchimp", verdict: "Best for: Multi-channel brands needing email + social + ads" },
      { name: "Omnisend", verdict: "Best for: E-commerce brands wanting good automation at lower cost" },
    ],
    bottomLine: "Klaviyo if email is your primary growth channel. Mailchimp for broader marketing. Omnisend for value.",
    sections: [],
  },
  {
    id: "dataops-platforms-2026",
    title: "Top DataOps Platforms for Industrial Integration",
    subtitle: "HighByte, Fivetran, and dbt compared for manufacturing data",
    type: "comparison",
    sectorId: "tech-saas",
    tags: ["DataOps", "HighByte", "Manufacturing", "Integration"],
    readTime: "14 min",
    author: "Marcus Rivera",
    updated: "Jan 24, 2026",
    intro: "Manufacturing and industrial companies generate massive operational data. DataOps platforms bridge the gap between OT and IT systems.",
    mentions: [
      { name: "HighByte", verdict: "Best for: Industrial data modeling and OT/IT convergence" },
      { name: "Fivetran", verdict: "Best for: Cloud-native data pipeline automation" },
      { name: "dbt", verdict: "Best for: Analytics engineering and transformation" },
    ],
    bottomLine: "HighByte leads for industrial contexts. Fivetran leads for cloud ETL. dbt leads for transformation layers.",
    sections: [],
  },
  {
    id: "compliance-training-platforms",
    title: "Best Compliance Training Platforms in 2026",
    subtitle: "LRN, SAI Global, and NAVEX compared for enterprise ethics programs",
    type: "roundup",
    sectorId: "legal-compliance",
    tags: ["Compliance", "Training", "LRN", "Ethics"],
    readTime: "11 min",
    author: "Rachel Torres",
    updated: "Jan 22, 2026",
    intro: "Compliance training is shifting from checkbox exercises to behavior-change programs. The best platforms combine adaptive learning, real scenarios, and clear reporting.",
    mentions: [
      { name: "LRN Corporation", verdict: "Best for: Culture-focused ethics and compliance programs" },
      { name: "NAVEX", verdict: "Best for: Integrated compliance management suites" },
      { name: "SAI Global", verdict: "Best for: Risk-based compliance training" },
    ],
    bottomLine: "LRN leads on program quality and behavioral impact. NAVEX leads on integration. SAI leads on risk focus.",
    sections: [],
  },
  {
    id: "immigration-case-management",
    title: "Best Immigration Case Management Software",
    subtitle: "eImmigration, INSZoom, and Docketwise compared for immigration law firms",
    type: "comparison",
    sectorId: "legal-compliance",
    tags: ["Immigration", "Legal", "eImmigration", "Case Management"],
    readTime: "10 min",
    author: "Rachel Torres",
    updated: "Jan 20, 2026",
    intro: "Immigration law requires specialized case management that tracks visa timelines, government forms, and client communications across complex multi-step processes.",
    mentions: [
      { name: "eImmigration", verdict: "Best for: High-volume corporate immigration practices" },
      { name: "INSZoom", verdict: "Best for: Firms wanting established workflow templates" },
      { name: "Docketwise", verdict: "Best for: Modern UX and form auto-population" },
    ],
    bottomLine: "eImmigration leads for corporate immigration scale. INSZoom for templates. Docketwise for user experience.",
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
              className="text-[11px] text-muted-foreground/70 flex items-center gap-1"
              onClick={() => setShowSectors(!showSectors)}
              data-testid="button-sectors-dropdown"
            >
              Sectors <ChevronDown className="w-3 h-3" />
            </Button>
            {showSectors && (
              <div
                className="absolute top-full right-0 mt-1 w-[280px] rounded-xl border border-border/40 bg-background/95 backdrop-blur-xl shadow-xl p-2 z-50"
                onMouseLeave={() => setShowSectors(false)}
              >
                {SECTORS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted/50 flex items-center gap-3 transition-colors"
                      onClick={() => { onSelectSector(s.id); setShowSectors(false); }}
                      data-testid={`nav-sector-${s.id}`}
                    >
                      <Icon className="w-4 h-4 text-muted-foreground/60 shrink-0" />
                      <div>
                        <div className="text-[12px] font-medium text-foreground">{s.name}</div>
                        <div className="text-[10px] text-muted-foreground/50">{s.articleCount} articles</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" className="text-[11px] text-muted-foreground/70" onClick={onHome} data-testid="nav-explore">Explore</Button>
          <ThemeToggle />
        </div>
      </div>
      {activeSector && (
        <div className="border-t border-border/20">
          <div className="max-w-6xl mx-auto px-6 py-1.5 flex items-center gap-2 text-[11px]">
            <button onClick={onHome} className="text-muted-foreground/50 hover:text-muted-foreground transition-colors" data-testid="breadcrumb-home">All Sectors</button>
            <ChevronRight className="w-3 h-3 text-muted-foreground/30" />
            <span className="text-foreground/70 font-medium">{SECTORS.find(s => s.id === activeSector)?.name}</span>
          </div>
        </div>
      )}
    </nav>
  );
}

function SectorCard({ sector, onClick }: { sector: Sector; onClick: () => void }) {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";

  const Icon = sector.icon;

  return (
    <div
      className={`rounded-xl border p-5 cursor-pointer hover-elevate group ${cardClass}`}
      onClick={onClick}
      data-testid={`card-sector-${sector.id}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${sector.color}15` }}
        >
          <Icon className="w-5 h-5" style={{ color: sector.color }} />
        </div>
        <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors" />
      </div>

      <h3 className="text-sm font-semibold text-foreground mb-1">{sector.name}</h3>
      <p className="text-[11px] text-muted-foreground/50 mb-4 leading-relaxed">{sector.description}</p>

      <div className="flex items-center gap-3 text-[10px] text-muted-foreground/50 mb-4">
        <span className="font-mono">{sector.articleCount} articles</span>
        <span className="text-muted-foreground/25">·</span>
        <span className="font-mono">{sector.brandCount} brands</span>
      </div>

      <div className="space-y-1.5">
        {sector.sampleTopics.slice(0, 2).map((t) => (
          <div key={t} className="text-[10px] text-muted-foreground/40 flex items-center gap-1.5 truncate">
            <Hash className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArticleRow({ article, onClick }: { article: Article; onClick: () => void }) {
  const TypeIcon = TYPE_LABELS[article.type].icon;
  const sector = SECTORS.find(s => s.id === article.sectorId);

  return (
    <div
      className="flex items-start gap-4 py-4 border-b border-border/10 cursor-pointer hover:bg-muted/20 px-3 -mx-3 rounded-lg transition-colors group"
      onClick={onClick}
      data-testid={`row-article-${article.id}`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          {sector && (
            <Badge variant="outline" className="text-[9px] no-default-hover-elevate" style={{ color: sector.color, borderColor: `${sector.color}30` }}>
              {sector.shortName}
            </Badge>
          )}
          <Badge variant="outline" className="text-[9px] text-muted-foreground/60 no-default-hover-elevate flex items-center gap-1">
            <TypeIcon className="w-2.5 h-2.5" />
            {TYPE_LABELS[article.type].label}
          </Badge>
        </div>
        <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-foreground/90">{article.title}</h3>
        <p className="text-[11px] text-muted-foreground/50 mb-2">{article.subtitle}</p>
        <div className="flex items-center gap-2 flex-wrap">
          {article.mentions.slice(0, 3).map((m) => (
            <Badge key={m.name} variant="outline" className="text-[9px] text-emerald-500/70 no-default-hover-elevate">{m.name}</Badge>
          ))}
          {article.mentions.length > 3 && (
            <span className="text-[9px] text-muted-foreground/40">+{article.mentions.length - 3}</span>
          )}
        </div>
      </div>
      <div className="text-right shrink-0 pt-1">
        <div className="text-[10px] text-muted-foreground/40">{article.readTime}</div>
        <div className="text-[10px] text-muted-foreground/30 mt-0.5">{article.updated}</div>
      </div>
    </div>
  );
}

function ArticleCard({ article, onClick }: { article: Article; onClick: () => void }) {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";
  const TypeIcon = TYPE_LABELS[article.type].icon;
  const sector = SECTORS.find(s => s.id === article.sectorId);

  return (
    <div
      className={`rounded-xl border p-5 cursor-pointer hover-elevate ${cardClass}`}
      onClick={onClick}
      data-testid={`card-article-${article.id}`}
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {sector && (
          <Badge variant="outline" className="text-[9px] no-default-hover-elevate" style={{ color: sector.color, borderColor: `${sector.color}30` }}>
            {sector.shortName}
          </Badge>
        )}
        <Badge variant="outline" className="text-[9px] text-muted-foreground/60 no-default-hover-elevate flex items-center gap-1">
          <TypeIcon className="w-2.5 h-2.5" />
          {TYPE_LABELS[article.type].label}
        </Badge>
      </div>

      <h3 className="text-sm font-semibold text-foreground mb-1">{article.title}</h3>
      <p className="text-[11px] text-muted-foreground/50 mb-3">{article.subtitle}</p>
      <p className="text-[12px] text-foreground/60 mb-4 leading-relaxed line-clamp-2">{article.intro}</p>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {article.mentions.slice(0, 4).map((m) => (
          <Badge key={m.name} variant="outline" className="text-[9px] text-emerald-500/70 no-default-hover-elevate">{m.name}</Badge>
        ))}
      </div>

      <div className="flex items-center justify-between text-[10px] text-muted-foreground/40">
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

  const totalArticles = SECTORS.reduce((a, s) => a + s.articleCount, 0);
  const totalBrands = SECTORS.reduce((a, s) => a + s.brandCount, 0);
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
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 mb-3">AI-Native B2B Intelligence</p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-3" data-testid="text-page-title">
          Every sector. Every product.{" "}
          <span className="text-muted-foreground/50">One source of truth.</span>
        </h1>
        <p className="text-sm text-muted-foreground/50 max-w-xl leading-relaxed">
          In-depth comparisons, roundups, and buyer's guides across {SECTORS.length} industries and {totalBrands.toLocaleString()} brands. No affiliate links. No sponsored rankings. Just research.
        </p>
      </div>

      <div className={`rounded-xl border px-4 py-2.5 flex items-center gap-3 mb-8 ${cardClass}`}>
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
            <span className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.12em]">Results for "{searchQuery}"</span>
            <Badge variant="outline" className="text-[9px] text-muted-foreground/50 no-default-hover-elevate font-mono">{searchResults.length}</Badge>
          </div>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {searchResults.map(a => <ArticleCard key={a.id} article={a} onClick={() => onSelectArticle(a.id)} />)}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground/50 py-12 text-center">No articles match that query across any sector.</p>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {[
              { label: "Sectors", value: String(SECTORS.length) },
              { label: "Articles", value: String(totalArticles) },
              { label: "Brands Covered", value: totalBrands.toLocaleString() },
              { label: "Avg. Depth", value: "3,900 words" },
            ].map((s) => (
              <div key={s.label} className={`rounded-xl border px-4 py-3 text-center ${cardClass}`}>
                <div className="text-lg font-bold text-foreground font-mono">{s.value}</div>
                <div className="text-[10px] text-muted-foreground/50">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-10">
            <div className="flex items-center gap-2 mb-5">
              <Globe className="w-3.5 h-3.5 text-muted-foreground/50" />
              <span className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.12em] font-medium">Sectors</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SECTORS.map((s) => (
                <SectorCard key={s.id} sector={s} onClick={() => onSelectSector(s.id)} />
              ))}
            </div>
          </div>

          {featuredArticles.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-5">
                <Zap className="w-3.5 h-3.5 text-muted-foreground/50" />
                <span className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.12em] font-medium">Featured Across Sectors</span>
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

  const sector = SECTORS.find(s => s.id === sectorId);
  if (!sector) return null;

  const Icon = sector.icon;
  const sectorArticles = ARTICLES.filter(a => a.sectorId === sectorId);
  const relatedSectors = SECTORS.filter(s => s.id !== sectorId).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${sector.color}15` }}
          >
            <Icon className="w-6 h-6" style={{ color: sector.color }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl" data-testid="text-sector-title">
              {sector.name}
            </h1>
            <p className="text-[11px] text-muted-foreground/50">{sector.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-muted-foreground/50 mb-6">
          <span className="font-mono">{sector.articleCount} articles</span>
          <span className="text-muted-foreground/25">·</span>
          <span className="font-mono">{sector.brandCount} brands covered</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {sector.featuredBrands.map((b) => (
          <Badge key={b} variant="outline" className="text-[10px] no-default-hover-elevate" style={{ color: sector.color, borderColor: `${sector.color}25` }}>
            {b}
          </Badge>
        ))}
      </div>

      <div className={`rounded-xl border p-5 mb-8 ${cardClass}`}>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-3.5 h-3.5 text-muted-foreground/50" />
          <span className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.12em] font-medium">Popular Topics in {sector.shortName}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {sector.sampleTopics.map((t) => (
            <div key={t} className="text-[12px] text-foreground/60 flex items-center gap-2 py-1.5">
              <Hash className="w-3 h-3 text-muted-foreground/30 shrink-0" />
              {t}
            </div>
          ))}
        </div>
      </div>

      {sectorArticles.length > 0 ? (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-3.5 h-3.5 text-muted-foreground/50" />
            <span className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.12em] font-medium">Articles</span>
            <Badge variant="outline" className="text-[9px] text-muted-foreground/50 no-default-hover-elevate font-mono">{sectorArticles.length}</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sectorArticles.map(a => <ArticleCard key={a.id} article={a} onClick={() => onSelectArticle(a.id)} />)}
          </div>
        </div>
      ) : (
        <div className={`rounded-xl border p-8 text-center mb-10 ${cardClass}`}>
          <p className="text-sm text-muted-foreground/50">Articles for this sector are in development.</p>
          <p className="text-[11px] text-muted-foreground/35 mt-1">{sector.articleCount} planned articles covering {sector.brandCount} brands.</p>
        </div>
      )}

      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-3.5 h-3.5 text-muted-foreground/50" />
          <span className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.12em] font-medium">Explore Other Sectors</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedSectors.map((s) => (
            <SectorCard key={s.id} sector={s} onClick={() => onSelectSector(s.id)} />
          ))}
        </div>
      </div>
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
  const sector = SECTORS.find(s => s.id === article.sectorId);

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="text-[11px] text-muted-foreground/60 mb-6 flex items-center gap-1" data-testid="button-back">
        <ChevronRight className="w-3 h-3 rotate-180" />
        Back to {sector?.name || "articles"}
      </button>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {sector && (
          <button onClick={() => onSelectSector(sector.id)}>
            <Badge variant="outline" className="text-[9px] no-default-hover-elevate cursor-pointer" style={{ color: sector.color, borderColor: `${sector.color}30` }}>
              {sector.name}
            </Badge>
          </button>
        )}
        <Badge variant="outline" className="text-[9px] text-muted-foreground/60 no-default-hover-elevate flex items-center gap-1">
          <TypeIcon className="w-2.5 h-2.5" />
          {TYPE_LABELS[article.type].label}
        </Badge>
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-2" data-testid="text-article-title">
        {article.title}
      </h1>
      <p className="text-sm text-muted-foreground/60 mb-4">{article.subtitle}</p>

      <div className="flex items-center gap-4 text-[11px] text-muted-foreground/50 mb-8 flex-wrap">
        <div className="flex items-center gap-1.5">
          <User className="w-3 h-3" />
          <span>{article.author}</span>
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

      <p className="text-sm text-foreground/80 leading-relaxed mb-8" data-testid="text-intro">{article.intro}</p>

      {article.sections.length > 0 && (
        <div className="space-y-6 mb-8">
          {article.sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-base font-semibold text-foreground mb-3">{section.heading}</h2>
              <p className="text-[13px] text-foreground/75 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      )}

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-3.5 h-3.5 text-emerald-500/70" />
          <span className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.12em] font-medium">The Bottom Line</span>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed font-medium" data-testid="text-bottom-line">{article.bottomLine}</p>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-3.5 h-3.5 text-emerald-500/70" />
          <span className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.12em] font-medium">Products Mentioned</span>
          <Badge variant="outline" className="text-[9px] text-muted-foreground/50 no-default-hover-elevate font-mono">{article.mentions.length}</Badge>
        </div>
        <div className="space-y-2.5">
          {article.mentions.map((m) => (
            <div key={m.name} className="rounded-lg bg-background/40 px-4 py-3 flex items-start justify-between gap-4 flex-wrap">
              <span className="text-sm font-semibold text-foreground">{m.name}</span>
              <span className="text-[11px] text-muted-foreground/60">{m.verdict}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.12em] font-medium mb-3 block">Tags</span>
        <div className="flex items-center gap-2 flex-wrap">
          {article.tags.map((t) => (
            <Badge key={t} variant="outline" className="text-[9px] text-muted-foreground/50 no-default-hover-elevate">{t}</Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 py-6 border-t border-border/20 text-[10px] text-muted-foreground/40">
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

export default function WhatisBestV2() {
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
    <div className="min-h-screen bg-background text-foreground" data-testid="whatisbest-v2-page">
      <Navbar
        activeSector={view !== "home" ? activeSector : null}
        onHome={handleHome}
        onSelectSector={handleSelectSector}
      />

      <main className={`px-6 pb-16 ${view !== "home" || activeSector ? "pt-28" : "pt-20"}`}>
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
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-muted-foreground/40">
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
