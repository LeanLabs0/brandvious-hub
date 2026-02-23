import { useState, useRef, useEffect, useCallback } from "react";
import {
  Search,
  Sun,
  Moon,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Calendar,
  MapPin,
  Building2,
  Users,
  Globe,
  Link2,
  ExternalLink,
  ArrowRight,
  Clock,
  Database,
  Hash,
  Tag,
  Layers,
  Shield,
  Zap,
  Code2,
  FileJson,
  Send,
  Copy,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

interface Entity {
  id: string;
  name: string;
  type: string;
  industry: string;
  founded: string;
  hq: string;
  description: string;
  ceo: string;
  employees: string;
  website: string;
  parentCompany?: string;
  ticker?: string;
  updated: string;
  coreFacts: { label: string; value: string }[];
  knownFor: string[];
  sameAs: string[];
  relationships: { entity: string; type: string }[];
  naturalLanguage: string[];
}

const ENTITIES: Entity[] = [
  {
    id: "lean-labs",
    name: "Lean Labs",
    type: "Organization",
    industry: "Marketing Services",
    founded: "2013",
    hq: "Overland Park, Kansas, USA",
    description: "Lean Labs is a growth marketing agency specializing in B2B SaaS and technology companies. The company focuses on growth-driven website design and demand generation for mid-market B2B brands using HubSpot as their primary marketing and CRM platform.",
    ceo: "Kevin Barber",
    employees: "10–50",
    website: "leanlabs.com",
    ticker: undefined,
    parentCompany: undefined,
    updated: "2026-02-13",
    coreFacts: [
      { label: "Type", value: "Private company (Agency)" },
      { label: "Founded", value: "2013" },
      { label: "Headquarters", value: "Overland Park, Kansas, USA" },
      { label: "Industry", value: "Marketing Services" },
      { label: "Specialization", value: "B2B SaaS Growth Marketing" },
      { label: "Primary Platform", value: "HubSpot" },
      { label: "Size", value: "10–50 employees" },
      { label: "Founder / CEO", value: "Kevin Barber" },
    ],
    knownFor: [
      "Growth-Driven Website Design",
      "B2B SaaS Demand Generation",
      "HubSpot Diamond Partner services",
      "Inbound marketing & content strategy",
      "Conversion rate optimization",
    ],
    sameAs: [
      "linkedin.com/company/lean-labs",
      "twitter.com/LeanLabs",
      "crunchbase.com/organization/lean-labs",
    ],
    relationships: [
      { entity: "HubSpot", type: "Diamond Partner" },
      { entity: "Salesforce", type: "Competitor (Ecosystem)" },
      { entity: "New Breed Revenue", type: "Competitor" },
      { entity: "SmartBug Media", type: "Competitor" },
      { entity: "Bluleadz", type: "Competitor" },
      { entity: "Kevin Barber", type: "Founder / CEO" },
    ],
    naturalLanguage: [
      "Lean Labs is a growth marketing agency founded in 2013 by Kevin Barber, headquartered in Overland Park, Kansas.",
      "Lean Labs is a HubSpot Diamond Solutions Partner, one of approximately 100 Diamond Partners worldwide.",
      "Lean Labs specializes in growth-driven website design and demand generation for mid-market B2B SaaS companies.",
    ],
  },
  {
    id: "hubspot",
    name: "HubSpot",
    type: "Organization",
    industry: "Tech / SaaS",
    founded: "2006",
    hq: "Cambridge, Massachusetts, USA",
    description: "HubSpot is a leading CRM and marketing automation platform that provides software for inbound marketing, sales, customer service, and content management. The company serves over 200,000 customers across 135+ countries.",
    ceo: "Yamini Rangan",
    employees: "7,000+",
    website: "hubspot.com",
    ticker: "HUBS",
    updated: "2026-02-15",
    coreFacts: [
      { label: "Type", value: "Public company (NYSE: HUBS)" },
      { label: "Founded", value: "2006" },
      { label: "Headquarters", value: "Cambridge, Massachusetts, USA" },
      { label: "Industry", value: "CRM / Marketing Automation" },
      { label: "Employees", value: "7,000+" },
      { label: "Customers", value: "200,000+" },
      { label: "CEO", value: "Yamini Rangan" },
      { label: "Founders", value: "Brian Halligan & Dharmesh Shah" },
    ],
    knownFor: [
      "Inbound marketing methodology",
      "All-in-one CRM platform",
      "Free CRM tier",
      "Partner ecosystem (Solutions Partners)",
      "Breeze AI assistant",
      "HubSpot Academy certifications",
    ],
    sameAs: [
      "wikidata.org/wiki/Q4993417",
      "linkedin.com/company/hubspot",
      "crunchbase.com/organization/hubspot",
    ],
    relationships: [
      { entity: "Salesforce", type: "Competitor" },
      { entity: "Lean Labs", type: "Diamond Partner" },
      { entity: "Bluleadz", type: "Diamond Partner" },
      { entity: "Brian Halligan", type: "Co-founder" },
      { entity: "Dharmesh Shah", type: "Co-founder / CTO" },
    ],
    naturalLanguage: [
      "HubSpot is a publicly traded CRM and marketing automation company founded in 2006 by Brian Halligan and Dharmesh Shah.",
      "HubSpot is headquartered in Cambridge, Massachusetts and serves over 200,000 customers globally.",
      "HubSpot pioneered the inbound marketing methodology and offers a free CRM tier.",
    ],
  },
  {
    id: "salesforce",
    name: "Salesforce",
    type: "Organization",
    industry: "Tech / SaaS",
    founded: "1999",
    hq: "San Francisco, California, USA",
    description: "Salesforce is the world's largest CRM platform, providing cloud-based solutions for sales, service, marketing, commerce, and IT operations. The company pioneered the software-as-a-service (SaaS) model.",
    ceo: "Marc Benioff",
    employees: "73,000+",
    website: "salesforce.com",
    ticker: "CRM",
    updated: "2026-02-14",
    coreFacts: [
      { label: "Type", value: "Public company (NYSE: CRM)" },
      { label: "Founded", value: "1999" },
      { label: "Headquarters", value: "San Francisco, California, USA" },
      { label: "Industry", value: "CRM / Enterprise Software" },
      { label: "Employees", value: "73,000+" },
      { label: "Revenue", value: "$34.9B (FY2025)" },
      { label: "CEO", value: "Marc Benioff" },
      { label: "Founder", value: "Marc Benioff" },
    ],
    knownFor: [
      "Pioneering SaaS model",
      "AppExchange marketplace",
      "Einstein AI platform",
      "Salesforce Tower (San Francisco)",
      "Acquisitions (Slack, Tableau, MuleSoft)",
      "Trailhead learning platform",
    ],
    sameAs: [
      "wikidata.org/wiki/Q941127",
      "linkedin.com/company/salesforce",
      "crunchbase.com/organization/salesforce",
    ],
    relationships: [
      { entity: "HubSpot", type: "Competitor" },
      { entity: "Slack", type: "Subsidiary" },
      { entity: "Tableau", type: "Subsidiary" },
      { entity: "Marc Benioff", type: "Founder / CEO" },
    ],
    naturalLanguage: [
      "Salesforce is the world's largest CRM company, founded in 1999 by Marc Benioff in San Francisco.",
      "Salesforce pioneered the software-as-a-service model and has over 73,000 employees worldwide.",
      "Salesforce acquired Slack in 2021 for $27.7 billion, making it one of the largest enterprise software acquisitions.",
    ],
  },
  {
    id: "bluleadz",
    name: "Bluleadz",
    type: "Organization",
    industry: "Marketing Services",
    founded: "2009",
    hq: "Tampa, Florida, USA",
    description: "Bluleadz is a full-service inbound marketing agency and HubSpot Diamond Solutions Partner. The company helps B2B companies with website design, content marketing, and lead generation through the HubSpot ecosystem.",
    ceo: "Eric Baum",
    employees: "10–50",
    website: "bluleadz.com",
    updated: "2026-02-13",
    coreFacts: [
      { label: "Type", value: "Private company (Agency)" },
      { label: "Founded", value: "2009" },
      { label: "Headquarters", value: "Tampa, Florida, USA" },
      { label: "Industry", value: "Marketing Services" },
      { label: "Specialization", value: "Inbound Marketing" },
      { label: "Primary Platform", value: "HubSpot" },
      { label: "Size", value: "10–50 employees" },
      { label: "Founder", value: "Eric Baum" },
    ],
    knownFor: [
      "HubSpot Diamond Partner",
      "Full-service inbound marketing",
      "B2B lead generation",
      "Website design and development",
      "Content marketing strategy",
    ],
    sameAs: [
      "linkedin.com/company/bluleadz",
      "crunchbase.com/organization/bluleadz",
    ],
    relationships: [
      { entity: "HubSpot", type: "Diamond Partner" },
      { entity: "Lean Labs", type: "Competitor" },
      { entity: "SmartBug Media", type: "Competitor" },
      { entity: "New Breed Revenue", type: "Competitor" },
    ],
    naturalLanguage: [
      "Bluleadz is a full-service inbound marketing agency founded in 2009, headquartered in Tampa, Florida.",
      "Bluleadz is a HubSpot Diamond Solutions Partner specializing in B2B lead generation and website design.",
    ],
  },
  {
    id: "ford",
    name: "Ford Motor Company",
    type: "Organization",
    industry: "Automotive",
    founded: "1903",
    hq: "Dearborn, Michigan, USA",
    description: "Ford Motor Company is an American multinational automobile manufacturer. The company sells automobiles and commercial vehicles under the Ford brand and luxury cars under the Lincoln brand. Ford is the second-largest U.S.-based automaker.",
    ceo: "Jim Farley",
    employees: "177,000+",
    website: "ford.com",
    ticker: "F",
    updated: "2026-02-11",
    coreFacts: [
      { label: "Type", value: "Public company (NYSE: F)" },
      { label: "Founded", value: "1903" },
      { label: "Headquarters", value: "Dearborn, Michigan, USA" },
      { label: "Industry", value: "Automotive" },
      { label: "Employees", value: "177,000+" },
      { label: "Revenue", value: "$176B (FY2024)" },
      { label: "CEO", value: "Jim Farley" },
      { label: "Founder", value: "Henry Ford" },
    ],
    knownFor: [
      "Ford F-150 (best-selling truck)",
      "Mustang (iconic sports car)",
      "Assembly line manufacturing",
      "Ford Pro (commercial fleet)",
      "EV lineup (Mach-E, Lightning)",
    ],
    sameAs: [
      "wikidata.org/wiki/Q44294",
      "linkedin.com/company/ford-motor-company",
      "crunchbase.com/organization/ford-motor",
    ],
    relationships: [
      { entity: "General Motors", type: "Competitor" },
      { entity: "Tesla", type: "Competitor (EV)" },
      { entity: "Rivian", type: "Investment / Competitor" },
      { entity: "Henry Ford", type: "Founder" },
    ],
    naturalLanguage: [
      "Ford Motor Company is an American automaker founded in 1903 by Henry Ford in Dearborn, Michigan.",
      "Ford is the second-largest U.S.-based automaker with over 177,000 employees worldwide.",
      "Ford's F-150 is the best-selling vehicle in the United States for over 40 consecutive years.",
    ],
  },
  {
    id: "amazon",
    name: "Amazon",
    type: "Organization",
    industry: "E-commerce",
    founded: "1994",
    hq: "Seattle, Washington, USA",
    description: "Amazon is the world's largest e-commerce and cloud computing company. Founded by Jeff Bezos as an online bookstore, it has expanded into virtually every consumer and enterprise technology category including AWS, streaming, grocery, and AI.",
    ceo: "Andy Jassy",
    employees: "1,500,000+",
    website: "amazon.com",
    ticker: "AMZN",
    updated: "2026-02-10",
    coreFacts: [
      { label: "Type", value: "Public company (NASDAQ: AMZN)" },
      { label: "Founded", value: "1994" },
      { label: "Headquarters", value: "Seattle, Washington, USA" },
      { label: "Industry", value: "E-commerce / Cloud" },
      { label: "Employees", value: "1,500,000+" },
      { label: "Revenue", value: "$574B (FY2024)" },
      { label: "CEO", value: "Andy Jassy" },
      { label: "Founder", value: "Jeff Bezos" },
    ],
    knownFor: [
      "Amazon Web Services (AWS)",
      "Amazon Prime",
      "Alexa voice assistant",
      "Kindle e-reader",
      "Whole Foods Market",
      "Amazon Go stores",
    ],
    sameAs: [
      "wikidata.org/wiki/Q3884",
      "linkedin.com/company/amazon",
      "crunchbase.com/organization/amazon",
    ],
    relationships: [
      { entity: "Shopify", type: "Competitor (E-commerce)" },
      { entity: "Microsoft", type: "Competitor (Cloud)" },
      { entity: "Google", type: "Competitor (Cloud)" },
      { entity: "Jeff Bezos", type: "Founder" },
    ],
    naturalLanguage: [
      "Amazon is the world's largest e-commerce company, founded by Jeff Bezos in 1994 in Seattle, Washington.",
      "Amazon Web Services (AWS) is the world's leading cloud computing platform with over 30% market share.",
    ],
  },
  {
    id: "new-breed-revenue",
    name: "New Breed Revenue",
    type: "Organization",
    industry: "Marketing Services",
    founded: "2002",
    hq: "Burlington, Vermont, USA",
    description: "New Breed Revenue is a revenue performance management firm and HubSpot Elite Solutions Partner. The company helps B2B SaaS and tech companies optimize their entire revenue lifecycle from marketing through sales and customer success.",
    ceo: "Patrick Biddiscombe",
    employees: "50–100",
    website: "newbreedrevenue.com",
    updated: "2026-02-13",
    coreFacts: [
      { label: "Type", value: "Private company (Agency)" },
      { label: "Founded", value: "2002" },
      { label: "Headquarters", value: "Burlington, Vermont, USA" },
      { label: "Industry", value: "Marketing Services" },
      { label: "Specialization", value: "Revenue Performance Management" },
      { label: "Primary Platform", value: "HubSpot" },
      { label: "Size", value: "50–100 employees" },
      { label: "CEO", value: "Patrick Biddiscombe" },
    ],
    knownFor: [
      "HubSpot Elite Solutions Partner",
      "Revenue operations strategy",
      "B2B SaaS demand generation",
      "Sales enablement",
      "Customer success optimization",
    ],
    sameAs: [
      "linkedin.com/company/new-breed",
      "crunchbase.com/organization/new-breed-marketing",
    ],
    relationships: [
      { entity: "HubSpot", type: "Elite Partner" },
      { entity: "Lean Labs", type: "Competitor" },
      { entity: "Bluleadz", type: "Competitor" },
      { entity: "SmartBug Media", type: "Competitor" },
    ],
    naturalLanguage: [
      "New Breed Revenue is a revenue performance management firm founded in 2002, headquartered in Burlington, Vermont.",
      "New Breed is a HubSpot Elite Solutions Partner, the highest tier in the HubSpot partner program.",
    ],
  },
  {
    id: "smartbug-media",
    name: "SmartBug Media",
    type: "Organization",
    industry: "Marketing Services",
    founded: "2007",
    hq: "Newport Beach, California, USA",
    description: "SmartBug Media is an intelligent inbound marketing agency and HubSpot Diamond Solutions Partner. The company provides full-lifecycle revenue operations services including content, web development, paid media, and PR for B2B companies.",
    ceo: "Ryan Malone",
    employees: "100–250",
    website: "smartbugmedia.com",
    updated: "2026-02-13",
    coreFacts: [
      { label: "Type", value: "Private company (Agency)" },
      { label: "Founded", value: "2007" },
      { label: "Headquarters", value: "Newport Beach, California, USA" },
      { label: "Industry", value: "Marketing Services" },
      { label: "Specialization", value: "Full-lifecycle Revenue Operations" },
      { label: "Primary Platform", value: "HubSpot" },
      { label: "Size", value: "100–250 employees" },
      { label: "CEO", value: "Ryan Malone" },
    ],
    knownFor: [
      "HubSpot Diamond Partner (most awards)",
      "Intelligent inbound marketing",
      "Full-lifecycle revenue operations",
      "Fully remote workforce model",
      "Content marketing & PR",
    ],
    sameAs: [
      "linkedin.com/company/smartbug-media",
      "crunchbase.com/organization/smartbug-media",
    ],
    relationships: [
      { entity: "HubSpot", type: "Diamond Partner" },
      { entity: "Lean Labs", type: "Competitor" },
      { entity: "Bluleadz", type: "Competitor" },
      { entity: "New Breed Revenue", type: "Competitor" },
    ],
    naturalLanguage: [
      "SmartBug Media is an intelligent inbound marketing agency founded in 2007, headquartered in Newport Beach, California.",
      "SmartBug Media has won more HubSpot Impact Awards than any other partner agency.",
    ],
  },
];

const INDUSTRIES = Array.from(new Set(ENTITIES.map((e) => e.industry)));

const RELATIONSHIP_GROUPS = [
  {
    title: "HubSpot Ecosystem",
    description: "Partners, products, and integrations",
    items: [
      { entity: "HubSpot", role: "Platform" },
      { entity: "Lean Labs", role: "Diamond Partner" },
      { entity: "Bluleadz", role: "Diamond Partner" },
      { entity: "New Breed Revenue", role: "Elite Partner" },
      { entity: "SmartBug Media", role: "Diamond Partner" },
      { entity: "Salesforce", role: "Competitor" },
    ],
  },
  {
    title: "Founders & Leadership",
    description: "People connected to listed entities",
    items: [
      { entity: "HubSpot", role: "Brian Halligan & Dharmesh Shah" },
      { entity: "Salesforce", role: "Marc Benioff" },
      { entity: "Lean Labs", role: "Kevin Barber" },
      { entity: "Amazon", role: "Jeff Bezos" },
      { entity: "Ford Motor Company", role: "Henry Ford (Historical)" },
    ],
  },
  {
    title: "E-commerce & Cloud",
    description: "Companies in digital commerce and infrastructure",
    items: [
      { entity: "Amazon", role: "E-commerce / Cloud" },
      { entity: "Shopify", role: "E-commerce" },
      { entity: "Salesforce", role: "Cloud / CRM" },
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

function Navbar({ onHome, onBrowse }: { onHome: () => void; onBrowse: () => void }) {
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
          <Database className="w-4 h-4 text-muted-foreground/60" />
          <span className="text-sm font-semibold tracking-tight text-foreground" data-testid="text-logo">
            entities<span className="font-normal text-muted-foreground">.org</span>
          </span>
        </button>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-[11px] text-muted-foreground/70" onClick={onHome} data-testid="nav-home">Home</Button>
          <Button variant="ghost" size="sm" className="text-[11px] text-muted-foreground/70" onClick={onBrowse} data-testid="nav-entities">
            Entities <ChevronDown className="w-3 h-3 ml-0.5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-[11px] text-muted-foreground/70" data-testid="nav-api">API</Button>
          <Button variant="ghost" size="sm" className="text-[11px] text-muted-foreground/70" data-testid="nav-docs">Docs</Button>
          <Button variant="ghost" size="sm" className="text-[11px] text-muted-foreground/70" data-testid="nav-support">Support</Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

function EntityPreviewCard({ onSelectEntity }: { onSelectEntity: (id: string) => void }) {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";

  const sf = ENTITIES.find((e) => e.id === "salesforce")!;

  return (
    <div className={`rounded-xl border p-5 ${cardClass}`} data-testid="entity-preview-card">
      <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
        <span className="text-base font-bold text-foreground">{sf.name}</span>
        <Badge variant="outline" className="text-[9px] text-muted-foreground/60 no-default-hover-elevate">{sf.type}</Badge>
      </div>

      <div className="space-y-2.5 mt-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />
          <span className="text-[12px] text-foreground/80 flex-1">{sf.hq}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />
          <span className="text-[12px] text-foreground/80 flex-1">Marc Benioff</span>
          <span className="text-[10px] text-muted-foreground/50">Founder</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />
          <span className="text-[12px] text-foreground/80 flex-1">CRM / Enterprise Software</span>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground/60 leading-relaxed mt-3 line-clamp-2">
        {sf.description}
      </p>

      <div className="mt-3 flex items-center gap-1.5 flex-wrap">
        <span className="text-[10px] text-muted-foreground/50">Related:</span>
        {sf.relationships.map((rel) => {
          const linked = ENTITIES.find((e) => e.name === rel.entity);
          return (
            <button
              key={rel.entity}
              className="text-[10px] text-foreground/60 hover:text-foreground transition-colors"
              onClick={() => linked && onSelectEntity(linked.id)}
              data-testid={`preview-link-${rel.entity.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {rel.entity}{rel !== sf.relationships[sf.relationships.length - 1] ? "," : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function HeroSection({ onBrowse, onSelectEntity }: { onBrowse: () => void; onSelectEntity: (id: string) => void }) {
  return (
    <div className="max-w-5xl mx-auto pt-24 pb-16" data-testid="section-hero">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl leading-[1.1]" data-testid="text-hero-title">
            The entity registry for the AI web.
          </h1>
          <p className="mt-5 text-sm text-muted-foreground/70 leading-relaxed max-w-xl" data-testid="text-hero-subtitle">
            Entities.org is an open registry of structured, machine-readable records for real organizations. Each record contains facts, type-aware relationships, links to canonical sources, and schema.org-compliant JSON-LD. Records are available as public pages, JSON-LD at crawlable URLs, and as an open API. No authentication required.
          </p>
          <div className="flex items-center gap-4 mt-6 flex-wrap">
            <button
              onClick={onBrowse}
              className="text-sm text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1"
              data-testid="button-browse-registry"
            >
              Browse the registry <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              className="text-sm text-muted-foreground/60 hover:text-foreground transition-colors flex items-center gap-1"
              data-testid="button-view-api"
            >
              View API documentation <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="lg:col-span-2">
          <EntityPreviewCard onSelectEntity={onSelectEntity} />
        </div>
      </div>
    </div>
  );
}

function StatsRow() {
  const stats = [
    { value: "5,412", label: "Entities" },
    { value: "18", label: "Industries" },
    { value: "41,200", label: "Relationships" },
    { value: "Open", label: "License" },
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 border-t border-border/20" data-testid="section-stats">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center" data-testid={`stat-${s.label.toLowerCase()}`}>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground/60 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RelationshipsSection({ onSelectEntity }: { onSelectEntity: (id: string) => void }) {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";
  const [activeTab, setActiveTab] = useState(0);
  const group = RELATIONSHIP_GROUPS[activeTab];

  return (
    <div className="max-w-5xl mx-auto py-16 border-t border-border/20" data-testid="section-relationships">
      <span className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.15em] font-medium">ALL ENTITIES</span>
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-1">
        Typed relationships, not flat lists.
      </h2>
      <p className="mt-2 text-sm text-muted-foreground/60 max-w-xl leading-relaxed">
        Entity records feature structured relationship graphs — typed edges connecting organizations, people, products, and platforms. Relationships are directional, labeled where possible, and traversable via the API.
      </p>

      <div className="flex items-center gap-1 mt-8 flex-wrap">
        {RELATIONSHIP_GROUPS.map((g, i) => (
          <Button
            key={g.title}
            variant={activeTab === i ? "outline" : "ghost"}
            size="sm"
            className="text-xs"
            onClick={() => setActiveTab(i)}
            data-testid={`tab-rel-${i}`}
          >
            {g.title}
          </Button>
        ))}
      </div>

      <p className="mt-4 text-sm text-foreground/80 font-medium">
        {group.title}: {group.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        {group.items.map((item) => {
          const entityObj = ENTITIES.find((e) => e.name === item.entity);
          return (
            <button
              key={item.entity + item.role}
              className={`rounded-xl border p-4 text-left hover-elevate ${cardClass}`}
              onClick={() => entityObj && onSelectEntity(entityObj.id)}
              data-testid={`rel-card-${item.entity.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <span className="text-sm font-semibold text-foreground block">{item.entity}</span>
              <span className="text-[11px] text-muted-foreground/60">{item.role}</span>
            </button>
          );
        })}
      </div>

      <button className="mt-6 text-sm text-muted-foreground/60 hover:text-foreground transition-colors flex items-center gap-1" data-testid="link-browse-relationships">
        Browse all relationships <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function RegistrySection({ onSelectEntity }: { onSelectEntity: (id: string) => void }) {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";
  const [activeTab, setActiveTab] = useState(0);

  const recentAdditions = [...ENTITIES].sort((a, b) => b.updated.localeCompare(a.updated));
  const industriesByGroup: Record<string, Entity[]> = {};
  ENTITIES.forEach((e) => {
    if (!industriesByGroup[e.industry]) industriesByGroup[e.industry] = [];
    industriesByGroup[e.industry].push(e);
  });
  const allEntities = [...ENTITIES].sort((a, b) => a.name.localeCompare(b.name));

  const tabs = ["Recent additions", "By industry", "Full index"];

  return (
    <div className="max-w-5xl mx-auto py-16 border-t border-border/20" id="registry" data-testid="section-registry">
      <span className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.15em] font-medium">FULL REGISTRY</span>
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-1">
        Browse the registry.
      </h2>
      <p className="mt-2 text-sm text-muted-foreground/60 max-w-xl leading-relaxed">
        The full entity index is publicly browsable. Each record links to its page, JSON-LD endpoint, and API response.
      </p>

      <div className="flex items-center gap-1 mt-8 flex-wrap">
        {tabs.map((tab, i) => (
          <Button
            key={tab}
            variant={activeTab === i ? "outline" : "ghost"}
            size="sm"
            className="text-xs"
            onClick={() => setActiveTab(i)}
            data-testid={`tab-registry-${i}`}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === 0 && (
          <div className="space-y-0">
            {recentAdditions.map((entity) => (
              <button
                key={entity.id}
                onClick={() => onSelectEntity(entity.id)}
                className="w-full flex items-start justify-between gap-4 py-3 border-b border-border/20 text-left group hover-elevate rounded-md px-2 -mx-2"
                data-testid={`entity-row-${entity.id}`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-semibold text-foreground">{entity.name}</span>
                    <span className="text-[11px] text-muted-foreground/60">{entity.industry}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground/50 mt-0.5 line-clamp-1">{entity.description}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0 pt-1">
                  <span className="text-[10px] text-muted-foreground/70 font-mono hidden sm:inline">{entity.updated}</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground/35 group-hover:text-muted-foreground/70 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(industriesByGroup).map(([industry, entities]) => (
              <div key={industry} className={`rounded-xl border p-4 ${cardClass}`} data-testid={`industry-${industry.toLowerCase().replace(/[\s/]+/g, "-")}`}>
                <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                  <h3 className="text-sm font-semibold text-foreground">{industry}</h3>
                  <Badge variant="outline" className="text-[9px] text-muted-foreground/70 no-default-hover-elevate font-mono">{entities.length}</Badge>
                </div>
                <div className="space-y-1.5">
                  {entities.map((e) => (
                    <button
                      key={e.id}
                      onClick={() => onSelectEntity(e.id)}
                      className="flex items-center gap-2 w-full text-left group"
                      data-testid={`industry-link-${e.id}`}
                    >
                      <ChevronRight className="w-3 h-3 text-muted-foreground/70" />
                      <span className="text-[12px] text-foreground/80 group-hover:text-foreground transition-colors">{e.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 2 && (
          <div className="space-y-0">
            {allEntities.map((entity) => (
              <button
                key={entity.id}
                onClick={() => onSelectEntity(entity.id)}
                className="w-full flex items-center justify-between gap-4 py-3 border-b border-border/20 text-left group hover-elevate rounded-md px-2 -mx-2"
                data-testid={`entity-row-${entity.id}`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-wrap">
                  <span className="text-sm font-semibold text-foreground">{entity.name}</span>
                  <span className="text-[11px] text-muted-foreground/60">{entity.industry}</span>
                  <span className="text-[10px] text-muted-foreground/70 hidden sm:inline">{entity.hq}</span>
                </div>
                <ArrowRight className="w-3 h-3 text-muted-foreground/35 group-hover:text-muted-foreground/70 transition-colors shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>

      <button className="mt-6 text-sm text-muted-foreground/60 hover:text-foreground transition-colors flex items-center gap-1" data-testid="link-full-index">
        Full index <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function DataFormatSection() {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";

  const cards = [
    {
      title: "Schema.org JSON-LD",
      description: "Machine-readable structured data. Compatible with AI systems, crawlers, and RAG pipelines directly.",
      icon: FileJson,
    },
    {
      title: "Open API",
      description: "REST endpoint at api/entities/{slug}. No key required. Returns full records with schema, relationships, and metadata.",
      icon: Code2,
    },
    {
      title: "Clean SAT",
      description: "Verified entities are included in the registry feed for direct AI agent discovery.",
      icon: Shield,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-16 border-t border-border/20" data-testid="section-data-format">
      <span className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.15em] font-medium">DATA FORMAT</span>
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-1">
        What each record contains.
      </h2>
      <p className="mt-2 text-sm text-muted-foreground/60 max-w-xl leading-relaxed">
        Every entity record contains a standard name, entity type, and a fact set (core facts, a schema.org-compliant representation, sameAs links for cross-referencing, natural language summaries, structured relationship lists, and meta fields (created, modified, status, contributor)).
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        {cards.map((card) => (
          <div key={card.title} className={`rounded-xl border p-5 ${cardClass}`}>
            <card.icon className="w-4 h-4 text-muted-foreground/60 mb-3" />
            <h3 className="text-sm font-semibold text-foreground mb-1">{card.title}</h3>
            <p className="text-[11px] text-muted-foreground/60 leading-relaxed">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApiSection() {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";
  const [copied, setCopied] = useState(false);

  const endpoint = "https://entities.org/api/entity/stripe";
  const handleCopy = () => {
    navigator.clipboard.writeText(endpoint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const jsonExample = `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Salesforce",
  "foundingDate": "1999",
  "location": {
    "@type": "Place",
    "name": "San Francisco, California, USA"
  },
  "industry": "CRM / Enterprise Software",
  "tickerSymbol": "CRM",
  "url": "https://salesforce.com",
  "sameAs": [
    "https://wikidata.org/wiki/Q941127",
    "https://linkedin.com/company/salesforce",
    "https://crunchbase.com/organization/salesforce"
  ],
  "dateModified": "2026-02-14"
}`;

  return (
    <div className="max-w-5xl mx-auto py-16 border-t border-border/20" data-testid="section-api">
      <span className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.15em] font-medium">DEVELOPER</span>
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-1">
        Open API. No auth.
      </h2>
      <p className="mt-2 text-sm text-muted-foreground/60 max-w-xl leading-relaxed">
        The registry API is publicly accessible without authentication. Queries return Streaming JSON-LD with sameAs cross-links, per-field source citations, relationship edges, and timestamped modification history.
      </p>

      <div className={`rounded-xl border px-4 py-3 mt-8 flex items-center justify-between gap-3 ${cardClass}`}>
        <code className="text-sm font-mono text-foreground/80 truncate" data-testid="text-api-endpoint">{endpoint}</code>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          data-testid="button-copy-endpoint"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>

      <div className={`rounded-xl border mt-4 overflow-hidden ${cardClass}`}>
        <div className="px-4 py-2 border-b border-border/20">
          <span className="text-[10px] text-muted-foreground/60 font-mono">Response — application/ld+json</span>
        </div>
        <pre className="p-4 font-mono text-[11px] leading-relaxed overflow-x-auto text-foreground/70" data-testid="text-api-response">
          {jsonExample}
        </pre>
      </div>

      <button className="mt-6 text-sm text-muted-foreground/60 hover:text-foreground transition-colors flex items-center gap-1" data-testid="link-api-docs">
        Full API documentation <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function SubmitSection() {
  return (
    <div className="max-w-5xl mx-auto py-16 border-t border-border/20" data-testid="section-submit">
      <span className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.15em] font-medium">CONTRIBUTE</span>
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-1">
        Submitting an entity.
      </h2>
      <p className="mt-2 text-sm text-muted-foreground/60 max-w-xl leading-relaxed">
        Any organization, person, or product may be submitted for review. Each record is verified from public sources. Entities that cannot be authenticated from public sources will not be published.
      </p>
      <div className="flex items-center gap-4 mt-6 flex-wrap">
        <button className="text-sm text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1" data-testid="link-submit-entity">
          Submit an entity <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button className="text-sm text-muted-foreground/60 hover:text-foreground transition-colors flex items-center gap-1" data-testid="link-view-faqs">
          View FAQs <ArrowRight className="w-3.5 h-3.5" />
        </button>
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
              <Database className="w-3.5 h-3.5 text-muted-foreground/60" />
              <span className="text-sm font-semibold text-foreground">
                entities<span className="font-normal text-muted-foreground">.org</span>
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
              Structured entity data for machines and people. Open, verified, and built for the AI web.
            </p>
            <p className="text-[10px] text-muted-foreground/70 mt-2">
              Land O' Lakes, Florida
            </p>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-medium">Registry</span>
            <div className="mt-2 space-y-1.5">
              {["Entity Index", "A-Z List", "Leaderboard", "Submit", "Pricing"].map((item) => (
                <p key={item} className="text-[11px] text-muted-foreground/60">{item}</p>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-medium">Platform</span>
            <div className="mt-2 space-y-1.5">
              {["API Documentation", "LLM Integration"].map((item) => (
                <p key={item} className="text-[11px] text-muted-foreground/60">{item}</p>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-medium">Company</span>
            <div className="mt-2 space-y-1.5">
              {["About", "Privacy Policy", "Terms of Service"].map((item) => (
                <p key={item} className="text-[11px] text-muted-foreground/60">{item}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-border/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[10px] text-muted-foreground/50">
            &copy; 2026 Entities.org
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-muted-foreground/50">Privacy</span>
            <span className="text-[10px] text-muted-foreground/50">Terms</span>
            <span className="text-[10px] text-muted-foreground/50">Status</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function EntityDetailPage({ entity, onBack, onSelectEntity }: { entity: Entity; onBack: () => void; onSelectEntity: (id: string) => void }) {
  const { theme } = useTheme();
  const cardClass = theme === "sparkle"
    ? "border-purple-900/20 bg-card/40"
    : "border-border/60 bg-card/80 dark:border-border/40 dark:bg-card/40";

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="text-[11px] text-muted-foreground/70 mb-6 flex items-center gap-1"
        data-testid="button-back"
      >
        <ChevronRight className="w-3 h-3 rotate-180" />
        All entities
      </button>

      <div className="mb-1">
        <Badge variant="outline" className="text-[9px] text-muted-foreground/70 no-default-hover-elevate mb-3">
          {entity.type} Entity
        </Badge>
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" data-testid="text-entity-name">
        {entity.name}
      </h1>
      <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground/60 flex-wrap">
        <div className="flex items-center gap-1">
          <Tag className="w-3 h-3" />
          <span>{entity.industry}</span>
        </div>
        <span className="text-muted-foreground/40">|</span>
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          <span>{entity.hq}</span>
        </div>
        <span className="text-muted-foreground/40">|</span>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>Last updated {entity.updated}</span>
        </div>
      </div>

      <div className="mt-6 mb-8">
        <p className="text-sm text-muted-foreground/60 leading-relaxed max-w-2xl" data-testid="text-entity-description">
          {entity.description}
        </p>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.12em] font-medium mb-4 block">Core Facts</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
          {entity.coreFacts.map((f) => (
            <div key={f.label} className="flex items-start justify-between gap-3 py-1.5 border-b border-border/10">
              <span className="text-[11px] text-muted-foreground/60">{f.label}</span>
              <span className="text-[11px] text-foreground/80 text-right">{f.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.12em] font-medium mb-3 block">Known For</span>
        <div className="space-y-1.5">
          {entity.knownFor.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <ChevronRight className="w-3 h-3 text-muted-foreground/70 shrink-0" />
              <span className="text-[12px] text-foreground/80">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.12em] font-medium mb-3 block">Relationships</span>
        <div className="space-y-1.5">
          {entity.relationships.map((rel) => {
            const linked = ENTITIES.find((e) => e.name === rel.entity);
            return (
              <div
                key={rel.entity + rel.type}
                className={`flex items-center justify-between gap-3 py-1.5 border-b border-border/10 ${linked ? "cursor-pointer group" : ""}`}
                onClick={() => linked && onSelectEntity(linked.id)}
              >
                <div className="flex items-center gap-2">
                  <Link2 className="w-3 h-3 text-muted-foreground/70 shrink-0" />
                  <span className={`text-[12px] ${linked ? "text-foreground/80 group-hover:text-foreground transition-colors" : "text-foreground/80"}`}>
                    {rel.entity}
                  </span>
                  {linked && <ExternalLink className="w-2.5 h-2.5 text-muted-foreground/35 invisible group-hover:visible" />}
                </div>
                <span className="text-[10px] text-muted-foreground/70">{rel.type}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.12em] font-medium mb-3 block">
          sameAs Links
        </span>
        <div className="space-y-1.5">
          {entity.sameAs.map((link) => (
            <div key={link} className="flex items-center gap-2">
              <Globe className="w-3 h-3 text-muted-foreground/70 shrink-0" />
              <span className="text-[11px] text-muted-foreground/60 font-mono">{link}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.12em] font-medium mb-3 block">
          Natural Language Statements
        </span>
        <p className="text-[10px] text-muted-foreground/70 mb-3">
          Pre-formatted sentences AI can cite directly. Each statement is fact-checked and timestamped.
        </p>
        <div className="space-y-2">
          {entity.naturalLanguage.map((stmt, i) => (
            <div key={i} className="rounded-lg bg-background/40 px-3 py-2">
              <p className="text-[11px] text-foreground/80 leading-relaxed">{stmt}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.12em] font-medium mb-3 block">
          API Access
        </span>
        <div className="rounded-lg bg-background/40 px-3 py-2 mb-2 font-mono text-[11px]">
          <span className="text-muted-foreground/60">GET</span>{" "}
          <span className="text-foreground/80">entities.org/api/entity/{entity.id}</span>
        </div>
        <span className="text-[10px] text-muted-foreground/70">Returns structured JSON-LD for this entity. Content-Type: application/ld+json</span>
      </div>

      <div className={`rounded-xl border p-5 mb-6 ${cardClass}`}>
        <span className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.12em] font-medium mb-3 block">
          Schema Preview
        </span>
        <div className="rounded-lg bg-background/40 p-4 font-mono text-[10px] leading-relaxed overflow-x-auto">
          <div className="text-foreground/65">{"{"}</div>
          <div className="pl-3"><span className="text-emerald-500/80">"@context"</span>: <span className="text-foreground/70">"https://schema.org"</span>,</div>
          <div className="pl-3"><span className="text-emerald-500/80">"@type"</span>: <span className="text-foreground/70">"{entity.type}"</span>,</div>
          <div className="pl-3"><span className="text-emerald-500/80">"name"</span>: <span className="text-foreground/70">"{entity.name}"</span>,</div>
          <div className="pl-3"><span className="text-emerald-500/80">"foundingDate"</span>: <span className="text-foreground/70">"{entity.founded}"</span>,</div>
          <div className="pl-3"><span className="text-emerald-500/80">"location"</span>: <span className="text-foreground/70">"{entity.hq}"</span>,</div>
          <div className="pl-3"><span className="text-emerald-500/80">"industry"</span>: <span className="text-foreground/70">"{entity.industry}"</span>,</div>
          {entity.ticker && (
            <div className="pl-3"><span className="text-emerald-500/80">"tickerSymbol"</span>: <span className="text-foreground/70">"{entity.ticker}"</span>,</div>
          )}
          <div className="pl-3"><span className="text-emerald-500/80">"url"</span>: <span className="text-foreground/70">"https://{entity.website}"</span>,</div>
          <div className="pl-3"><span className="text-emerald-500/80">"sameAs"</span>: [</div>
          {entity.sameAs.map((link, i) => (
            <div key={link} className="pl-6">
              <span className="text-foreground/70">"https://{link}"{i < entity.sameAs.length - 1 ? "," : ""}</span>
            </div>
          ))}
          <div className="pl-3">],</div>
          <div className="pl-3"><span className="text-emerald-500/80">"dateModified"</span>: <span className="text-foreground/70">"{entity.updated}"</span></div>
          <div className="text-foreground/65">{"}"}</div>
        </div>
      </div>
    </div>
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

export default function EntitiesHome() {
  const { theme } = useTheme();
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

  const entity = selectedEntity ? ENTITIES.find((e) => e.id === selectedEntity) : null;

  const handleSelect = (id: string) => {
    setSelectedEntity(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedEntity(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBrowse = () => {
    const el = document.getElementById("registry");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background relative">
      {theme === "sparkle" && <AuroraCanvas />}
      <div className="relative z-10">
        <Navbar onHome={handleBack} onBrowse={handleBrowse} />
        <div className="px-6 pb-6">
          {entity ? (
            <div className="pt-20">
              <EntityDetailPage entity={entity} onBack={handleBack} onSelectEntity={handleSelect} />
            </div>
          ) : (
            <>
              <HeroSection onBrowse={handleBrowse} onSelectEntity={handleSelect} />
              <StatsRow />
              <RelationshipsSection onSelectEntity={handleSelect} />
              <RegistrySection onSelectEntity={handleSelect} />
              <DataFormatSection />
              <ApiSection />
              <SubmitSection />
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
