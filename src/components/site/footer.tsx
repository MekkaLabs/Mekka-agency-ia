import Link from "next/link";
import { Container } from "../ui/container";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-bg">
              M
            </span>
            <span className="font-display text-[15px] font-semibold tracking-tight">
              Mekka Labs
            </span>
          </div>

          <nav className="flex flex-wrap items-center gap-6 text-sm text-ink-muted">
            <a href="#produtos" className="hover:text-ink">
              Produtos
            </a>
            <a href="#como-funciona" className="hover:text-ink">
              Como funciona
            </a>
            <a href="#contato" className="hover:text-ink">
              Contato
            </a>
            <Link href="/login" className="hover:text-ink">
              Entrar
            </Link>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/[0.06] pt-8 text-sm text-ink-faint md:flex-row md:items-center md:justify-between">
          <p>© {2026} Mekka Labs · agenciamekka.com.br</p>
          <p>IA aplicada à operação comercial de empresas reais.</p>
        </div>
      </Container>
    </footer>
  );
}
