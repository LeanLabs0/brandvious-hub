// Temporary icon candidate preview for /products flip cards. Delete after picking.
import {
  Type,
  PenTool,
  TextQuote,
  Quote,
  ClipboardType,
  Megaphone,
  DraftingCompass,
  Frame,
  Component,
  Shapes,
  Ruler,
  LayoutPanelLeft,
  type LucideIcon,
} from "lucide-react";

const groups: { title: string; options: { icon: LucideIcon; label: string }[] }[] = [
  {
    title: "CopyRocket",
    options: [
      { icon: Type, label: "Type (current)" },
      { icon: PenTool, label: "PenTool" },
      { icon: TextQuote, label: "TextQuote" },
      { icon: Quote, label: "Quote" },
      { icon: ClipboardType, label: "ClipboardType" },
      { icon: Megaphone, label: "Megaphone" },
    ],
  },
  {
    title: "DesignRocket",
    options: [
      { icon: DraftingCompass, label: "DraftingCompass (current)" },
      { icon: Frame, label: "Frame" },
      { icon: Component, label: "Component" },
      { icon: Shapes, label: "Shapes" },
      { icon: Ruler, label: "Ruler" },
      { icon: LayoutPanelLeft, label: "LayoutPanelLeft" },
    ],
  },
];

export default function IconPreview() {
  return (
    <div className="min-h-screen bg-[hsl(220,10%,4%)] text-white p-6" data-testid="icon-preview-page">
      {groups.map((g) => (
        <div key={g.title} className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">{g.title}</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {g.options.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="relative h-32 rounded-xl overflow-hidden border border-white/[0.07] bg-white/[0.03] p-3"
              >
                <Icon className="absolute -bottom-5 -right-5 w-24 h-24 text-white/[0.06] pointer-events-none" />
                <span className="absolute bottom-3 left-3 right-3">
                  <span className="block text-sm font-semibold text-white">{g.title}</span>
                  <span className="block text-[11px] text-sky-300/70 mt-1">{label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
