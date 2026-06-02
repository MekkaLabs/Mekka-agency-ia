import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { signOut } from "../login/actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!hasSupabaseEnv()) {
    return (
      <main className="relative z-10 mx-auto max-w-2xl px-6 py-16">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-faint">
          Mekka Labs Admin
        </p>
        <h1 className="font-display mt-3 text-2xl font-semibold">
          Supabase não configurado
        </h1>
        <p className="mt-3 text-ink-muted">
          Preencha{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5">.env.local</code>{" "}
          com as credenciais do projeto para acessar o admin. Use{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5">
            .env.local.example
          </code>{" "}
          como referência.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm text-ink-faint underline hover:text-ink"
        >
          Voltar para o site
        </Link>
      </main>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="relative z-10 min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-bg/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-bg">
                M
              </span>
              <span className="font-display text-[15px] font-semibold tracking-tight">
                Mekka Admin
              </span>
            </Link>
            <nav className="flex items-center gap-5 text-sm text-ink-muted">
              <Link href="/admin" className="hover:text-ink">
                Dashboard
              </Link>
              <Link href="/admin/leads" className="hover:text-ink">
                Leads
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-ink-faint sm:inline">
              {user.email}
            </span>
            <form action={signOut}>
              <button
                type="submit"
                className="text-sm text-ink-muted transition-colors hover:text-ink"
              >
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-6 py-10">{children}</div>
    </div>
  );
}
