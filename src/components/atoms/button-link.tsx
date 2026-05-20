import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
}: ButtonLinkProps) {
  const className =
    variant === "primary"
      ? "group inline-flex items-center justify-center gap-2 rounded-full border border-lime-300/45 bg-[linear-gradient(135deg,#d7ff63_0%,#9cff57_48%,#65f5b2_100%)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-[0_0_28px_rgba(163,230,53,0.3)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(101,245,178,0.34)]"
      : "group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.08]";

  const content = (
    <>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="text-base transition duration-200 group-hover:translate-x-0.5"
      >
        {external ? "↗" : "→"}
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
