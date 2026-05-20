type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.36em] text-lime-300/90">
        {eyebrow}
      </p>
      <h2 className="font-[var(--font-space-grotesk)] text-4xl font-bold uppercase leading-[0.95] tracking-[-0.05em] text-white md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-7 text-zinc-400 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
