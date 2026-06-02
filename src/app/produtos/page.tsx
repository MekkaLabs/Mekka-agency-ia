import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { CTA } from "@/components/site/cta";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/badge";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Os módulos de IA da Mekka: atendimento, prospecção, suporte, conteúdo, análise e operação — uma equipe de IAs trabalhando por trás da sua empresa.",
  alternates: { canonical: "/produtos" },
};

export default function ProductsIndex() {
  return (
    <div className="relative z-10">
      <Nav />
      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="glow-blob pointer-events-none absolute left-1/2 top-[-12rem] -z-0 h-[34rem] w-[50rem] -translate-x-1/2 rounded-full opacity-50 blur-[120px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(139,92,246,0.4), rgba(34,211,238,0.1), transparent)",
            }}
          />
          <Container className="relative z-10 pb-12 pt-16 md:pt-20">
            <Eyebrow>Produtos</Eyebrow>
            <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
              Uma equipe de IAs trabalhando por trás da sua empresa.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-muted">
              Cada módulo resolve uma dor concreta da operação. Comece pelo
              Atendimento — o resto entra conforme a empresa pede.
            </p>
          </Container>
        </section>

        <section className="pb-12">
          <Container>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href={`/produtos/${p.slug}`}
                  className="card-lift group flex flex-col rounded-2xl border border-white/[0.08] bg-surface/50 p-7"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-elevated text-xl">
                    {p.icon}
                  </span>
                  <h2 className="font-display mt-5 text-lg font-semibold">
                    {p.name}
                  </h2>
                  <p className="mt-2 text-sm text-ink-muted">{p.tagline}</p>
                  <span className="mt-5 text-sm text-accent-soft transition-transform group-hover:translate-x-0.5">
                    Ver módulo →
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}
