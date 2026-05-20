import Link from "next/link";
import { LogoMark } from "@/components/atoms/logo-mark";

const items = [
  { href: "#servicos", label: "Modulos" },
  { href: "#metodo", label: "Metodo" },
  { href: "#orbita", label: "Em orbita" },
  { href: "#faq", label: "FAQ" },
  { href: "/login", label: "Backoffice" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-4 z-30 mb-8 rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(4,8,8,0.9),rgba(3,6,7,0.82))] px-5 py-4 shadow-[0_20px_48px_rgba(0,0,0,0.26)] backdrop-blur-2xl">
      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-lime-300/30 to-transparent" />
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <LogoMark />
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-lime-300/14 bg-lime-300/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-lime-200">
              Mekka OS
            </span>
            <span className="rounded-full border border-cyan-300/14 bg-cyan-300/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-100/80">
              relaunch em orbita
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <nav className="flex flex-wrap items-center gap-4 md:gap-6">
            {items.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400 transition hover:text-lime-300"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400 transition hover:text-lime-300"
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>

          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:border-cyan-300/25 hover:bg-white/[0.08]"
          >
            Abrir diagnostico
          </Link>
        </div>
      </div>
    </header>
  );
}
