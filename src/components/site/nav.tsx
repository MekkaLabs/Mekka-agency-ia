import Link from "next/link";
import { Container } from "../ui/container";
import { ButtonLink } from "../ui/button";

const links = [
  { href: "#produtos", label: "Produtos" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#resultados", label: "Resultados" },
  { href: "#faq", label: "Perguntas" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-bg/70 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-bg">
            M
          </span>
          <span className="font-display text-[17px] font-semibold tracking-tight">
            Mekka<span className="text-ink-faint"> Labs</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/login" variant="ghost" size="md">
            Entrar
          </ButtonLink>
          <ButtonLink href="#contato" variant="primary" size="md">
            Falar com a Mekka
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}
