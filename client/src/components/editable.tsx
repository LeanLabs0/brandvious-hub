import { useState, useRef, useEffect } from "react";
import { useContent } from "@/contexts/content-context";
import { useEditMode } from "@/contexts/edit-mode-context";
import { cn } from "@/lib/utils";

interface EditableProps {
  id: string;
  defaultValue: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  className?: string;
  multiline?: boolean;
  allowEmpty?: boolean;
}

const ACCENT_BORDER = "border-[hsl(var(--cms-accent,217_91%_60%))]";
const ACCENT_RING = "ring-[hsl(var(--cms-accent,217_91%_60%))]";

export function Editable({
  id,
  defaultValue,
  tag: Tag = "span",
  className,
  multiline = false,
  allowEmpty = false,
}: EditableProps) {
  const { getContent, setContent, isReady } = useContent();
  const { isEditMode } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const cancelledRef = useRef(false);

  const currentValue = getContent(id, defaultValue);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  if (!isReady) {
    return (
      <Tag
        className={cn(className, "opacity-0")}
        aria-hidden
        data-testid={`text-editable-${id}-loading`}
        data-cms-no-auto=""
      >
        {defaultValue}
      </Tag>
    );
  }

  const handleClick = () => {
    if (isEditMode && !isEditing) {
      cancelledRef.current = false;
      setLocalValue(currentValue);
      setIsEditing(true);
    }
  };

  const handleBlur = async () => {
    setIsEditing(false);
    if (cancelledRef.current) {
      cancelledRef.current = false;
      return;
    }
    const trimmed = localValue;
    if (trimmed === currentValue) return;
    if (!allowEmpty && trimmed.trim() === "") return;
    await setContent(id, trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      inputRef.current?.blur();
    }
    if (e.key === "Escape") {
      cancelledRef.current = true;
      setLocalValue(currentValue);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    const inputClass = cn(
      "w-full bg-transparent border-2 outline-none rounded-sm px-2 py-1",
      ACCENT_BORDER,
      className,
    );
    return multiline ? (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn(inputClass, "min-h-[100px] resize-y whitespace-pre-wrap")}
        data-testid={`input-editable-${id}`}
      />
    ) : (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={inputClass}
        data-testid={`input-editable-${id}`}
      />
    );
  }

  const editStyles = isEditMode
    ? cn(
        "cursor-pointer border-2 border-dashed rounded-sm px-1 -mx-1 transition-colors",
        "border-opacity-50 hover:border-opacity-100",
        ACCENT_BORDER,
        ACCENT_RING,
      )
    : "";

  return (
    <Tag
      onClick={handleClick}
      className={cn(className, editStyles, multiline && "whitespace-pre-wrap")}
      data-testid={`text-editable-${id}`}
      data-cms-no-auto=""
    >
      {currentValue}
    </Tag>
  );
}
