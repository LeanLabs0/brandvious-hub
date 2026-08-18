import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "wouter";

const AUTH_KEY = "bv_private_auth";
const PASSWORD = "overdeliver";

export function isPrivateAuthed(): boolean {
  try {
    return sessionStorage.getItem(AUTH_KEY) === "1";
  } catch {
    return false;
  }
}

export function setPrivateAuthed(): void {
  try {
    sessionStorage.setItem(AUTH_KEY, "1");
  } catch {
    // storage unavailable; gate will simply re-ask next navigation
  }
}

export function checkPrivatePassword(candidate: string): boolean {
  return candidate.trim().toLowerCase() === PASSWORD;
}

/**
 * Wraps /private/* routes. Unauthenticated visitors are bounced to /login
 * with a ?next= param so they land back here after entering the password.
 * Client-side gate only — keeps the strategy pages out of the public site,
 * not a security boundary.
 */
export function PrivateGate({ children }: { children: ReactNode }) {
  const [, navigate] = useLocation();
  const [authed] = useState(isPrivateAuthed);

  useEffect(() => {
    if (!authed) {
      const next = encodeURIComponent(window.location.pathname);
      navigate(`/login?next=${next}`, { replace: true });
    }
  }, [authed, navigate]);

  if (!authed) return null;
  return <>{children}</>;
}
