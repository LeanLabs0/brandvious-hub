import { useState } from "react";
import { useContent } from "@/contexts/content-context";
import { useEditMode } from "@/contexts/edit-mode-context";
import { Pencil, X, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface CardField {
  key: string;
  label: string;
  type: "text" | "textarea" | "url";
  defaultValue: string;
}

interface EditableCardProps {
  id: string;
  fields: CardField[];
  children: (values: Record<string, string>) => React.ReactNode;
  className?: string;
}

export function EditableCard({ id, fields, children, className }: EditableCardProps) {
  const { getContent, setContent, isReady } = useContent();
  const { isEditMode } = useEditMode();
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState<Record<string, string>>({});

  const current = fields.reduce((acc, f) => {
    acc[f.key] = getContent(`${id}.${f.key}`, f.defaultValue);
    return acc;
  }, {} as Record<string, string>);

  if (!isReady) {
    return (
      <div className={cn(className, "opacity-0")} aria-hidden data-testid={`card-editable-${id}-loading`}>
        {children(current)}
      </div>
    );
  }

  const openDialog = () => {
    setLocal({ ...current });
    setOpen(true);
  };

  const handleSave = async () => {
    for (const f of fields) {
      if (local[f.key] !== current[f.key]) {
        await setContent(`${id}.${f.key}`, local[f.key] ?? "");
      }
    }
    setOpen(false);
  };

  return (
    <>
      <div
        className={cn(
          "relative group",
          isEditMode &&
            "ring-2 ring-[hsl(var(--cms-accent,217_91%_60%)/0.5)] hover:ring-[hsl(var(--cms-accent,217_91%_60%))] rounded-sm transition-all",
          className
        )}
      >
        {children(current)}
        {isEditMode && (
          <button
            onClick={openDialog}
            className="absolute top-2 right-2 p-1.5 bg-[hsl(var(--cms-accent,217_91%_60%))] text-[hsl(var(--cms-accent-foreground,0_0%_100%))] rounded-sm opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity z-10 shadow-md"
            data-testid={`button-edit-card-${id}`}
            aria-label="Edit card"
          >
            <Pencil size={14} />
          </button>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {fields.map((f) => (
              <div key={f.key} className="space-y-2">
                <label className="text-sm font-medium" htmlFor={`cms-${id}-${f.key}`}>
                  {f.label}
                </label>
                {f.type === "textarea" ? (
                  <Textarea
                    id={`cms-${id}-${f.key}`}
                    value={local[f.key] ?? ""}
                    onChange={(e) => setLocal((p) => ({ ...p, [f.key]: e.target.value }))}
                    className="min-h-[100px]"
                    data-testid={`input-edit-${id}-${f.key}`}
                  />
                ) : (
                  <Input
                    id={`cms-${id}-${f.key}`}
                    type={f.type === "url" ? "url" : "text"}
                    value={local[f.key] ?? ""}
                    onChange={(e) => setLocal((p) => ({ ...p, [f.key]: e.target.value }))}
                    data-testid={`input-edit-${id}-${f.key}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)} data-testid="button-edit-cancel">
              <X size={16} className="mr-1" />
              Cancel
            </Button>
            <Button onClick={handleSave} data-testid="button-edit-save">
              <Check size={16} className="mr-1" />
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
