type FeatureCardProps = {
  title: string;
  description: string;
  tone?: "default" | "highlight";
  eyebrow?: string;
};

export function FeatureCard({
  title,
  description,
  tone = "default",
  eyebrow,
}: FeatureCardProps) {
  const toneClass =
    tone === "highlight"
      ? "border-lime-300/25 bg-[radial-gradient(circle_at_top_left,rgba(215,255,99,0.18),transparent_38%),linear-gradient(180deg,rgba(16,24,18,0.98),rgba(4,9,8,0.92))]"
      : "border-white/8 bg-[linear-gradient(180deg,rgba(12,16,16,0.86),rgba(6,10,10,0.82))]";

  return (
    <article
      className={`rounded-[28px] border p-6 shadow-[0_18px_48px_rgba(0,0,0,0.24)] transition duration-200 hover:-translate-y-1 hover:border-cyan-300/22 ${toneClass}`}
    >
      {eyebrow ? (
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200/75">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="font-[var(--font-space-grotesk)] text-2xl font-semibold uppercase tracking-[-0.04em] text-white">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-zinc-400 md:text-base">
        {description}
      </p>
    </article>
  );
}
