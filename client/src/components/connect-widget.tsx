import { useEffect, useRef, useState } from "react";
import { X, Send, Sparkles, ArrowRight } from "lucide-react";

// ---------------------------------------------------------------------------
// ConnectWidget: a premium conversational contact overlay — the evolution of
// the static HubSpot form. A guided chat collects name → email → message,
// then hands off to the visitor's email client with everything prefilled.
// Rendered as a centered cinematic overlay, not a corner chat widget.
// ---------------------------------------------------------------------------

type Msg = { from: "bot" | "user"; text: string };
type Step = "name" | "email" | "message" | "done";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_EMAIL = "hello@brandvious.com";

const quickReplies = ["Book a call", "Become a partner", "Question about the tools"];

export function ConnectWidget({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [step, setStep] = useState<Step>("name");
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // greet on open
  useEffect(() => {
    if (!open) return;
    reset();
    botSay("Hey — you've reached Brandvious. What's your name?", 600);
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // autofocus + escape to close
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 500);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // keep the latest message in view
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function reset() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setMessages([]);
    setStep("name");
    setInput("");
    setTyping(false);
    setName("");
    setEmail("");
    setNote("");
  }

  function botSay(text: string, delay = 700) {
    const showTyping = setTimeout(() => {
      setTyping(true);
      const deliver = setTimeout(() => {
        setTyping(false);
        setMessages((m) => [...m, { from: "bot", text }]);
      }, 900);
      timers.current.push(deliver);
    }, delay);
    timers.current.push(showTyping);
  }

  function send(raw?: string) {
    const text = (raw ?? input).trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");

    if (step === "name") {
      const first = text.split(" ")[0];
      setName(first);
      setStep("email");
      botSay(`Nice to meet you, ${first}. What's the best email to reach you?`);
    } else if (step === "email") {
      if (!EMAIL_RE.test(text)) {
        botSay("That email doesn't look quite right — mind double-checking it?");
        return;
      }
      setEmail(text);
      setStep("message");
      botSay("Perfect. What can we help you with?");
    } else if (step === "message") {
      setNote(text);
      setStep("done");
      botSay(`Thanks, ${name || "there"} — here's your summary. Send it over and we'll get back to you within one business day.`);
    } else {
      setNote((n) => (n ? `${n}\n${text}` : text));
      botSay("Noted. Anything else, or open the email draft below whenever you're ready.");
    }
  }

  if (!open) return null;

  const mailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Connect request from ${name || "Website visitor"}`
  )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${note}`)}`;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      role="dialog"
      aria-label="Connect with Brandvious"
    >
      {/* cinematic backdrop */}
      <div
        className="absolute inset-0 bg-[hsl(220,15%,3%)]/75 backdrop-blur-xl animate-[fade-in_0.35s_ease]"
        onClick={onClose}
      />

      {/* centered panel */}
      <div
        className="relative w-[540px] max-w-full h-[620px] max-h-[85dvh] flex flex-col rounded-3xl border border-white/[0.09] bg-[hsl(225,14%,6%)]/95 backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.7),0_0_80px_rgba(100,50,220,0.10)] overflow-hidden animate-[chat-pop_0.5s_cubic-bezier(0.16,1,0.3,1)]"
        data-testid="connect-widget"
      >
        {/* brand light-beam descending from the top edge */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-28 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(140,80,255,0.25), transparent)",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[280px] h-28 blur-[60px] pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(130,70,255,0.16), transparent)",
          }}
        />
        {/* purple hairline along the top edge */}
        <div
          className="absolute top-0 left-[12%] right-[12%] h-[1px] z-10"
          style={{ background: "linear-gradient(90deg, transparent, rgba(170,130,255,0.55), transparent)" }}
        />

        {/* header */}
        <div className="relative flex items-center gap-3.5 px-6 pt-6 pb-5 border-b border-white/[0.06]">
          <div
            className="relative w-11 h-11 rounded-full flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, rgba(140,80,255,0.4), rgba(80,40,200,0.22))",
              border: "1px solid rgba(170,130,255,0.35)",
              boxShadow: "0 0 24px rgba(120,60,255,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            <Sparkles className="w-[18px] h-[18px] text-purple-100" />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[hsl(225,14%,6%)]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-semibold text-white tracking-tight">Connect with Brandvious</p>
            <p className="text-[11.5px] text-white/40 mt-0.5">A guided conversation, not a form · replies within a day</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors"
            data-testid="connect-close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-3.5">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] px-4 py-3 text-[13.5px] leading-relaxed animate-[chat-msg_0.35s_ease-out] ${
                  m.from === "user"
                    ? "rounded-2xl rounded-tr-sm text-white border border-purple-300/20"
                    : "rounded-2xl rounded-tl-sm bg-white/[0.045] border border-white/[0.07] text-white/85"
                }`}
                style={
                  m.from === "user"
                    ? {
                        background: "linear-gradient(135deg, rgba(140,80,255,0.32), rgba(90,45,210,0.24))",
                        boxShadow: "0 4px 20px rgba(100,50,220,0.15)",
                      }
                    : undefined
                }
              >
                {m.text}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="px-4 py-3.5 rounded-2xl rounded-tl-sm bg-white/[0.045] border border-white/[0.07] flex items-center gap-1.5">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                    style={{ animationDelay: `${d * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          )}

          {step === "done" && !typing && (
            <div className="animate-[chat-msg_0.4s_ease-out] rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
              <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3">Summary</p>
              <p className="text-[13px] text-white/75"><span className="text-white/40">Name — </span>{name}</p>
              <p className="text-[13px] text-white/75 mt-1.5"><span className="text-white/40">Email — </span>{email}</p>
              <p className="text-[13px] text-white/75 mt-1.5 whitespace-pre-line"><span className="text-white/40">Message — </span>{note}</p>
              <div className="pt-4 flex items-center gap-3.5">
                <a
                  href={mailHref}
                  className="group relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12.5px] font-medium text-white transition-transform hover:scale-[1.03]"
                  style={{
                    background: "linear-gradient(135deg, rgba(150,90,255,0.95), rgba(100,50,220,0.95))",
                    boxShadow: "0 6px 24px rgba(110,55,230,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
                  }}
                  data-testid="connect-open-draft"
                >
                  Open email draft
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <button
                  onClick={() => {
                    reset();
                    botSay("No problem — let's start fresh. What's your name?", 300);
                  }}
                  className="text-[12px] text-white/40 hover:text-white/70 transition-colors"
                  data-testid="connect-start-over"
                >
                  Start over
                </button>
              </div>
            </div>
          )}
        </div>

        {/* quick replies during the message step */}
        {step === "message" && !typing && (
          <div className="px-5 pb-2.5 flex flex-wrap gap-2">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="text-[11.5px] rounded-full border border-purple-300/20 bg-purple-500/[0.08] text-purple-200/80 hover:bg-purple-500/[0.16] hover:text-purple-100 px-3.5 py-1.5 transition-colors"
                data-testid={`connect-chip-${q.toLowerCase().replace(/[\s.]/g, "-")}`}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* input */}
        <div className="px-5 pb-5 pt-3 border-t border-white/[0.06]">
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={
                step === "email"
                  ? "you@company.com"
                  : step === "done"
                    ? "Anything else to add…"
                    : "Type your reply…"
              }
              className="w-full rounded-full bg-white/[0.04] border border-white/[0.09] focus:border-purple-300/35 focus:outline-none focus:shadow-[0_0_20px_rgba(120,60,255,0.12)] pl-4 pr-12 py-3 text-[13.5px] text-white placeholder:text-white/25 transition-all"
              data-testid="connect-input"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || typing}
              aria-label="Send"
              className="absolute right-1.5 w-[34px] h-[34px] rounded-full flex items-center justify-center text-white disabled:opacity-30 transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(150,90,255,0.95), rgba(100,50,220,0.95))",
                boxShadow: "0 4px 16px rgba(110,55,230,0.3)",
              }}
              data-testid="connect-send"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ConnectButton: the bespoke trigger for the widget — shared by the footer
// and navbars. `compact` fits navbar height; default matches the footer.
// ---------------------------------------------------------------------------

export function ConnectButton({
  onClick,
  compact = false,
  className = "",
  testId = "v2-footer-link-connect",
}: {
  onClick: () => void;
  compact?: boolean;
  className?: string;
  testId?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative inline-flex items-center gap-2.5 rounded-full text-white/75 hover:text-white transition-colors duration-300 ${
        compact ? "pl-3.5 pr-4 py-2" : "pl-4 pr-5 py-2.5"
      } ${className}`}
      data-testid={testId}
    >
      {/* glass fill + ring */}
      <span className="absolute inset-0 rounded-full bg-white/[0.03] border border-white/[0.10] group-hover:bg-purple-500/[0.07] group-hover:border-purple-300/25 backdrop-blur-sm transition-all duration-300" />
      {/* top hairline glow */}
      <span
        className="absolute top-0 left-[18%] right-[18%] h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(170,130,255,0.45), transparent)" }}
      />
      {/* hover aura */}
      <span
        className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(120,60,255,0.18), transparent 70%)" }}
      />
      {/* shine sweep on hover */}
      <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </span>
      <Sparkles className="relative w-3.5 h-3.5 text-purple-300/70 group-hover:text-purple-300 transition-colors duration-300" />
      <span className={`relative tracking-wide font-medium ${compact ? "text-[12px]" : "text-[13px]"}`}>Connect with Us</span>
      <ArrowRight className="relative w-3.5 h-3.5 text-white/35 group-hover:text-purple-300/90 group-hover:translate-x-0.5 transition-all duration-300" />
    </button>
  );
}
