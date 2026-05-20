import Link from "next/link";

type LogoMarkProps = {
  href?: string;
  subtitle?: string;
};

export function LogoMark({
  href = "/",
  subtitle = "Growth systems and AI operations",
}: LogoMarkProps) {
  return (
    <Link href={href} className="inline-flex items-center gap-4">
      <span className="relative grid h-15 w-15 place-items-center rounded-[22px] border border-lime-300/20 bg-[radial-gradient(circle_at_30%_25%,rgba(215,255,99,0.28),transparent_36%),linear-gradient(180deg,rgba(8,12,12,0.98),rgba(2,4,4,0.92))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_40px_rgba(163,230,53,0.14)]">
        <span className="absolute inset-[7px] rounded-[18px] border border-white/6" />
        <span className="absolute left-[13px] top-[15px] h-4 w-3 rounded-[60%_60%_80%_80%] bg-gradient-to-b from-lime-100 to-lime-500 shadow-[0_0_16px_rgba(163,230,53,0.55)]" />
        <span className="absolute right-[13px] top-[15px] h-4 w-3 rounded-[60%_60%_80%_80%] bg-gradient-to-b from-lime-100 to-lime-500 shadow-[0_0_16px_rgba(163,230,53,0.55)]" />
        <span className="absolute bottom-[12px] h-2.5 w-5 rounded-b-full border-b-2 border-white/85" />
      </span>
      <span className="grid gap-1">
        <strong className="font-[var(--font-space-grotesk)] text-sm font-bold uppercase tracking-[0.22em] text-white">
          Mekka Labs
        </strong>
        <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
          {subtitle}
        </span>
      </span>
    </Link>
  );
}
