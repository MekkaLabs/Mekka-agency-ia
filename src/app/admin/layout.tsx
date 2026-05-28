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
      <main className="mx-auto max-w-2xl px-6 py-16">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
          Mekka Labs Admin
        </p>
        <h1 className="mt-3 text-2xl font-semibold">
          Supabase nao configurado
        </h1>
        <p className="mt-3 text-neutral-700">
          Preencha <code className="rounded bg-neutral-100 px-1.5 py-0.5">.env.local</code>{" "}
          com as credenciais do projeto para acessar o admin. Use{" "}
          <code className="rounded bg-neutral-100 px-1.5 py-0.5">.env.local.example</code>{" "}
          como referencia.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm text-neutral-500 underline hover:text-neutral-900"
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
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="text-sm font-semibold tracking-tight"
            >
              Mekka Admin
            </Link>
            <nav className="flex items-center gap-4 text-sm text-neutral-600">
              <Link href="/admin" className="hover:text-neutral-900">
                Dashboard
              </Link>
              <Link href="/admin/leads" className="hover:text-neutral-900">
                Leads
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-neutral-500 sm:inline">
              {user.email}
            </span>
            <form action={signOut}>
              <button
                type="submit"
                className="text-sm text-neutral-500 hover:text-neutral-900"
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
