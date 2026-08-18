import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, Lock } from "lucide-react";
import { NoiseOverlay } from "@/pages/home-new";
import {
  checkPrivatePassword,
  isPrivateAuthed,
  setPrivateAuthed,
} from "@/components/private-gate";

export default function Login() {
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const rawNext = new URLSearchParams(window.location.search).get("next") ?? "";
  const next = rawNext === "/private" || rawNext.startsWith("/private/") ? rawNext : "/private";

  useEffect(() => {
    if (isPrivateAuthed()) navigate(next, { replace: true });
  }, [navigate, next]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkPrivatePassword(password)) {
      setPrivateAuthed();
      navigate(next, { replace: true });
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(220,10%,4%)] text-white relative flex items-center justify-center px-6" data-testid="page-login">
      <NoiseOverlay />
      <div className="relative z-10 w-full max-w-sm">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-8 shadow-[0_2px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div
            className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
            style={{ background: "linear-gradient(90deg, transparent, rgba(160,120,255,0.5), transparent)" }}
          />
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-6">
            <Lock className="w-4 h-4 text-purple-300/80" />
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Private Access</p>
          <h1 className="text-2xl font-bold tracking-tight mb-6" data-testid="text-login-title">
            This area is for partners.
          </h1>
          <form onSubmit={submit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Password"
              autoFocus
              className="w-full rounded-lg border border-white/[0.1] bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-purple-300/40 focus:bg-black/60 transition-all"
              data-testid="input-password"
            />
            {error && (
              <p className="text-xs text-red-400/80" data-testid="text-login-error">
                Incorrect password.
              </p>
            )}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white border border-purple-300/25 bg-purple-400/[0.08] hover:bg-purple-400/[0.14] hover:border-purple-300/40 transition-all"
              data-testid="button-login"
            >
              Enter <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
        <p className="text-center mt-6">
          <a href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors" data-testid="link-back-home">
            Back to brandvious.com
          </a>
        </p>
      </div>
    </div>
  );
}
