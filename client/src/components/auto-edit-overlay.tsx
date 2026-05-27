/**
 * AutoEditOverlay (v3)
 * --------------------
 * Mount once at the App root (inside <ContentProvider>) and every leaf text
 * element on every page becomes contentEditable while edit mode is on.
 * No per-element wrapping required.
 *
 * Persistence keys are derived as `auto::<pathname>::<tag-path>` where tag-path
 * is a tag + nth-of-type chain from <body>. Trade-off: keys are tied to DOM
 * position. If you restructure a page (move/reorder elements), the saved
 * override stops matching and the original JSX text returns. For text you
 * expect to keep across redesigns, prefer the explicit <Editable id="..."/>
 * wrapper instead.
 *
 * Router-agnostic: reads window.location.pathname and patches pushState/
 * replaceState to detect SPA navigation. Works with React Router, Wouter,
 * Next.js client-side routing, or no router at all.
 *
 * Skipped: elements with [data-cms-no-auto], existing <Editable> instances
 * ([data-testid^="text-editable-"]), the floating button itself, and content
 * inside svg/code/pre/inputs/textareas.
 *
 * NOTE: AnimatedAttacked text (constantly re-rendering elements) will get the
 * outline but edits will be overwritten by the next render. Don't expect
 * auto-edit to work for clocks, marquees, animated counters, etc.
 */
import { useEffect, useRef, useState } from "react";
import { useEditMode } from "@/contexts/edit-mode-context";
import { useContent } from "@/contexts/content-context";

const TEXT_SELECTORS =
  "h1, h2, h3, h4, h5, h6, p, li, a, button, label, blockquote, td, th, dt, dd, summary, figcaption";

const SKIP_SELECTOR =
  "svg, code, pre, script, style, input, textarea, select, [data-cms-no-auto], [data-testid^='text-editable-'], [data-testid='button-floating-edit']";

const BLOCK_CHILD_TAGS = new Set([
  "div", "section", "article", "aside", "nav", "header", "footer", "main",
  "ul", "ol", "form", "table",
]);

function isLeafText(el: Element): boolean {
  const text = el.textContent?.trim();
  if (!text) return false;
  if (text.length > 5000) return false;
  if (el.closest(SKIP_SELECTOR)) return false;
  for (const child of Array.from(el.children)) {
    const tag = child.tagName.toLowerCase();
    if (BLOCK_CHILD_TAGS.has(tag)) return false;
    if (child.matches(TEXT_SELECTORS)) return false;
  }
  return true;
}

function buildKey(pathname: string, el: Element): string {
  const parts: string[] = [];
  let cur: Element | null = el;
  let depth = 0;
  while (cur && cur !== document.body && depth < 30) {
    const parent: Element | null = cur.parentElement;
    if (!parent) break;
    const tag = cur.tagName.toLowerCase();
    const sameTag = Array.from(parent.children).filter((c) => c.tagName === cur!.tagName);
    const idx = sameTag.indexOf(cur);
    parts.unshift(`${tag}.${idx}`);
    cur = parent;
    depth += 1;
  }
  return `auto::${pathname}::${parts.join(">")}`;
}

/** Subscribe to SPA navigation without depending on a specific router. */
function usePathname(): string {
  const [pathname, setPathname] = useState(() =>
    typeof window === "undefined" ? "/" : window.location.pathname,
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setPathname(window.location.pathname);
    const origPush = history.pushState;
    const origReplace = history.replaceState;
    history.pushState = function (...args) {
      const r = origPush.apply(this, args as Parameters<typeof origPush>);
      update();
      return r;
    };
    history.replaceState = function (...args) {
      const r = origReplace.apply(this, args as Parameters<typeof origReplace>);
      update();
      return r;
    };
    window.addEventListener("popstate", update);
    return () => {
      history.pushState = origPush;
      history.replaceState = origReplace;
      window.removeEventListener("popstate", update);
    };
  }, []);
  return pathname;
}

export function AutoEditOverlay() {
  const { isEditMode, isEnabled } = useEditMode();
  const { content, setContent, isReady } = useContent();
  const pathname = usePathname();

  // Refs let effects read latest values without re-subscribing
  const contentRef = useRef(content);
  contentRef.current = content;
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;
  const setContentRef = useRef(setContent);
  setContentRef.current = setContent;

  // Tracks the last value we wrote to each element to suppress feedback loops
  const writtenRef = useRef(new WeakMap<Element, string>());

  // ---- (1) Apply stored overrides to the live DOM ----
  // Runs in BOTH dev and production so published-site visitors see saved edits.
  // The edit UI (effect #2 below) stays gated on isEditMode + isEnabled so the
  // editing button never appears on the public site.
  useEffect(() => {
    if (!isReady) return;
    let scheduled = false;
    let disposed = false;

    const apply = () => {
      scheduled = false;
      if (disposed) return;
      const current = contentRef.current;
      const path = pathnameRef.current;
      const prefix = `auto::${path}::`;
      const relevantKeys = Object.keys(current).filter((k) => k.startsWith(prefix));
      if (relevantKeys.length === 0) return;
      const relevant = new Set(relevantKeys);
      document.querySelectorAll<HTMLElement>(TEXT_SELECTORS).forEach((el) => {
        if (!isLeafText(el)) return;
        const key = buildKey(path, el);
        if (!relevant.has(key)) return;
        const stored = current[key];
        const lastWritten = writtenRef.current.get(el);
        if (el.textContent !== stored && lastWritten !== stored) {
          el.textContent = stored;
          writtenRef.current.set(el, stored);
        }
      });
    };

    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(apply);
    };

    schedule();
    const observer = new MutationObserver(() => schedule());
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, [content, isEnabled, isReady, pathname]);

  // ---- (2) Toggle contentEditable + outlines + blur handlers in edit mode ----
  useEffect(() => {
    if (!isEnabled || !isEditMode) return;

    const attached = new Map<HTMLElement, { onBlur: () => void; original: string; key: string }>();

    const enhance = () => {
      const path = pathnameRef.current;
      document.querySelectorAll<HTMLElement>(TEXT_SELECTORS).forEach((el) => {
        if (!isLeafText(el)) return;
        if (attached.has(el)) return;
        const original = el.textContent ?? "";
        const key = buildKey(path, el);
        el.setAttribute("contenteditable", "plaintext-only");
        el.setAttribute("spellcheck", "true");
        el.classList.add("cms-auto-editable");
        el.dataset.cmsAutoKey = key;
        const onBlur = () => {
          const v = el.textContent ?? "";
          const baseline = contentRef.current[key] ?? original;
          if (v !== baseline && v.trim().length > 0) {
            writtenRef.current.set(el, v);
            setContentRef.current(key, v).catch(() => {
              /* toast is handled inside ContentProvider */
            });
          }
        };
        el.addEventListener("blur", onBlur);
        attached.set(el, { onBlur, original, key });
      });
    };

    enhance();
    const observer = new MutationObserver(() => requestAnimationFrame(enhance));
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      attached.forEach(({ onBlur }, el) => {
        el.removeEventListener("blur", onBlur);
        el.removeAttribute("contenteditable");
        el.removeAttribute("spellcheck");
        el.classList.remove("cms-auto-editable");
        delete el.dataset.cmsAutoKey;
      });
      attached.clear();
    };
  }, [isEditMode, isEnabled, pathname]);

  return null;
}
