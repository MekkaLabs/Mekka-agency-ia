type StatPillProps = {
  value: string;
  label: string;
};

export function StatPill({ value, label }: StatPillProps) {
  return (
    <div className="rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <strong className="block font-[var(--font-space-grotesk)] text-2xl font-bold uppercase tracking-[-0.04em] text-white">
        {value}
      </strong>
      <span className="mt-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500">
        {label}
      </span>
    </div>
  );
}
