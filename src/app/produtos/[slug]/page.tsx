import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { CTA } from "@/components/site/cta";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Badge, Eyebrow } from "@/components/ui/badge";
import { ProductJsonLd } from "@/components/site/json-ld";
import { products, getProduct } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Produto não encontrado — Mekka Labs" };
  return {
    title: `${product.name} — Mekka Labs`,
    description: product.intro,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== product.slug);

  return (
    <div className="relative z-10">
      <ProductJsonLd product={product} />
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="glow-blob pointer-events-none absolute left-1/2 top-[-12rem] -z-0 h-[36rem] w-[52rem] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(139,92,246,0.4), rgba(34,211,238,0.1), transparent)",
            }}
          />
          <Container className="relative z-10 pb-16 pt-16 md:pt-20">
            <Link
              href="/#produtos"
              className="text-sm text-ink-faint transition-colors hover:text-ink"
            >
              ← Todos os produtos
            </Link>

            <div className="mt-8 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-elevated text-2xl">
                {product.icon}
              </span>
              <Badge>{product.name}</Badge>
            </div>

            <h1 className="font-display mt-7 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
              {product.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-muted">
              {product.intro}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#contato" variant="primary" size="lg">
                Quero esse módulo
              </ButtonLink>
              <ButtonLink href="/#produtos" variant="secondary" size="lg">
                Ver outros produtos
              </ButtonLink>
            </div>
          </Container>
        </section>

        {/* Dor / Solução */}
        <section className="py-20">
          <Container>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.08] bg-surface/50 p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-ink-faint">
                  A dor
                </p>
                <p className="mt-4 text-xl text-ink">{product.pain}</p>
              </div>
              <div className="rounded-2xl border border-accent/20 bg-gradient-to-b from-accent/[0.08] to-transparent p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-accent-soft">
                  O que a Mekka instala
                </p>
                <p className="mt-4 text-xl text-ink">{product.solution}</p>
              </div>
            </div>
          </Container>
        </section>

        {/* Como funciona */}
        <section className="py-12">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Como funciona</Eyebrow>
              <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Três passos até rodar.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {product.howItWorks.map((step, i) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-white/[0.08] bg-surface/50 p-6"
                >
                  <span className="font-display text-2xl font-semibold text-accent-soft">
                    0{i + 1}
                  </span>
                  <h3 className="font-display mt-4 text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted">{step.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* O que está incluído + Para quem */}
        <section className="py-20">
          <Container>
            <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
              <div>
                <Eyebrow>O que está incluído</Eyebrow>
                <ul className="mt-6 space-y-4">
                  {product.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-ink">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs text-accent-soft">
                        ✓
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-lg font-medium text-ink">
                  → {product.outcome}
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-surface/50 p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-ink-faint">
                  Pra quem é
                </p>
                <p className="mt-4 text-ink-muted">{product.forWho}</p>
              </div>
            </div>
          </Container>
        </section>

        {/* Outros produtos */}
        <section className="py-12">
          <Container>
            <Eyebrow>Mais módulos</Eyebrow>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/produtos/${p.slug}`}
                  className="card-lift group flex items-start gap-3 rounded-xl border border-white/[0.08] bg-surface/50 p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-elevated text-lg">
                    {p.icon}
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-semibold">
                      {p.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-ink-muted">
                      {p.tagline}
                    </p>
                  </div>
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
