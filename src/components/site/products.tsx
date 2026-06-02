import Link from "next/link";
import { Container } from "../ui/container";
import { Eyebrow } from "../ui/badge";
import { products } from "@/lib/products";

export function Products() {
  return (
    <section id="produtos" className="scroll-mt-20 py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>A equipe de IA</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Seis agentes que trabalham
            <br className="hidden md:block" /> nos bastidores da sua empresa.
          </h2>
          <p className="mt-5 text-lg text-ink-muted">
            Comece pelo Atendimento — a dor mais aguda — e adicione módulos
            conforme a operação pede. Você não contrata um time de IA. A Mekka
            vira essa camada pra você.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/produtos/${p.slug}`}
              className={`card-lift group relative flex flex-col rounded-2xl border p-6 ${
                p.featured
                  ? "border-accent/30 bg-gradient-to-b from-accent/[0.08] to-transparent"
                  : "border-white/[0.08] bg-surface/50"
              }`}
            >
              {p.featured ? (
                <span className="absolute right-5 top-5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent-soft">
                  Comece por aqui
                </span>
              ) : null}

              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-elevated text-xl">
                {p.icon}
              </span>

              <h3 className="font-display mt-5 text-lg font-semibold">
                {p.name}
              </h3>
              <p className="mt-1.5 text-sm text-accent-soft">{p.tagline}</p>

              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                <span className="text-ink-faint">A dor: </span>
                {p.pain}
              </p>

              <ul className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
                {p.bullets.slice(0, 3).map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-sm text-ink-muted"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>

              <p className="mt-auto pt-5 text-sm font-medium text-ink">
                → {p.outcome}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-accent-soft opacity-0 transition-opacity group-hover:opacity-100">
                Saiba mais →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
