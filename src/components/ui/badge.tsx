import { type ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-ink-muted backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px] shadow-accent/60" />
      {children}
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft">
      {children}
    </p>
  );
}
