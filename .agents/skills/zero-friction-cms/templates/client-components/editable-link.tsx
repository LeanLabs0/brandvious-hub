// ============================================================================
// Zero-Friction CMS — OPTIONAL editable link (label + href). Place at
// `client/src/components/editable-link.tsx`. Requires shadcn Button, Input,
// Dialog. Pass your router's Link via linkComponent for SPA nav; external /
// mailto / tel always use a plain <a>.
// ============================================================================
import { useState, type ComponentType, type ReactNode } from "react";
import { useContent } from "@/contexts/content-context";
import { useEditMode } from "@/contexts/edit-mode-context";
import { Pencil, X, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface LinkComponentProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent) => void;
  "data-testid"?: string;
}

interface EditableLinkProps {
  id: string;
  defaultLabel: string;
  defaultHref?: string;
  className?: string;
  linkComponent?: ComponentType<LinkComponentProps>;
  target?: "_self" | "_blank";
}

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:|sms:)/i.test(href);
}

export function EditableLink({
  id,
  defaultLabel,
  defaultHref = "#",
  className,
  linkComponent: LinkComp,
  target,
}: EditableLinkProps) {
  const { getContent, setContent, isReady } = useContent();
  const { isEditMode } = useEditMode();
  const [open, setOpen] = useState(false);
  const [localLabel, setLocalLabel] = useState("");
  const [localHref, setLocalHref] = useState("");

  const currentLabel = getContent(`${id}.label`, defaultLabel);
  const currentHref = getContent(`${id}.href`, defaultHref);

  if (!isReady) {
    return (
      <span className={cn(className, "opacity-0")} aria-hidden data-testid={`link-editable-${id}-loading`}>
        {defaultLabel}
      </span>
    );
  }

  const openDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLocalLabel(currentLabel);
    setLocalHref(currentHref);
    setOpen(true);
  };

  const handleSave = async () => {
    if (localLabel !== currentLabel) await setContent(`${id}.label`, localLabel);
    if (localHref !== currentHref) await setContent(`${id}.href`, localHref);
    setOpen(false);
  };

  const useRouter = LinkComp && !isExternal(currentHref);
  const anchorTarget = target ?? (isExternal(currentHref) ? "_blank" : undefined);
  const anchorRel = anchorTarget === "_blank" ? "noopener noreferrer" : undefined;
  const editStyles = isEditMode
    ? "ring-2 ring-dashed ring-[hsl(var(--cms-accent,217_91%_60%))] ring-offset-2 cursor-pointer"
    : "";

  const inner = (
    <>
      {currentLabel}
      {isEditMode && <Pencil size={12} className="ml-2 opacity-60 inline" />}
    </>
  );

  return (
    <>
      {useRouter && LinkComp ? (
        <LinkComp
          href={currentHref}
          className={cn(className, editStyles)}
          onClick={isEditMode ? openDialog : undefined}
          data-testid={`link-editable-${id}`}
        >
          {inner}
        </LinkComp>
      ) : (
        <a
          href={currentHref}
          target={anchorTarget}
          rel={anchorRel}
          className={cn(className, editStyles)}
          onClick={isEditMode ? openDialog : undefined}
          data-testid={`link-editable-${id}`}
        >
          {inner}
        </a>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor={`cms-${id}-label`}>Link Text</label>
              <Input
                id={`cms-${id}-label`}
                value={localLabel}
                onChange={(e) => setLocalLabel(e.target.value)}
                data-testid={`input-edit-${id}-label`}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor={`cms-${id}-href`}>URL</label>
              <Input
                id={`cms-${id}-href`}
                value={localHref}
                onChange={(e) => setLocalHref(e.target.value)}
                placeholder="/path, https://..., mailto:..., tel:..."
                data-testid={`input-edit-${id}-href`}
              />
            </div>
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
