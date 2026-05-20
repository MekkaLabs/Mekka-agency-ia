import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/app/login/actions";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/clients", label: "Clientes" },
  { href: "/admin/deals", label: "Deals" },
  { href: "/admin/work", label: "Trabalhos" },
  { href: "/admin/pipeline", label: "Pipeline" },
];

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!hasSupabaseEnv()) {
    return (
      <main className="auth-shell">
        <section className="auth-panel">
          <div className="auth-copy">
            <p className="eyebrow">Supabase pendente</p>
            <h1>Configure o backend antes de usar o admin</h1>
            <p className="lead">
              A area interna ja esta pronta, mas precisa das chaves do Supabase
              e do schema SQL aplicado para autenticar e carregar os dados.
            </p>
            <ul className="bullet-list">
              <li>Crie o projeto no Supabase</li>
              <li>Preencha o arquivo `.env.local`</li>
              <li>Rode `supabase/schema.sql` no SQL Editor</li>
              <li>Crie um usuario interno no Auth</li>
            </ul>
          </div>

          <div className="auth-form">
            <p className="helper-copy">
              Guia completo: `docs/ops/supabase-setup.md`
            </p>
            <Link href="/login" className="primary-link auth-inline-link">
              Ir para login
            </Link>
            <Link href="/" className="secondary-link auth-inline-link">
              Voltar para o site
            </Link>
          </div>
        </section>
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
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="site-mark admin-mark">
            <span className="site-mark-badge site-mark-badge-alien">
              <span className="alien-eye alien-eye-left" />
              <span className="alien-eye alien-eye-right" />
              <span className="alien-mouth" />
            </span>
            <span className="site-mark-text">
              <strong>Mekka OS</strong>
              <small>Backoffice orbital</small>
            </span>
          </div>
          <p className="helper-copy">
            CRM, operacao e gestao da agencia no mesmo app.
          </p>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="admin-nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="admin-content">
        <header className="admin-header">
          <div>
            <p className="eyebrow">Backoffice Mekka Labs</p>
            <h1>CRM + Delivery + Operacao</h1>
          </div>
          <div className="admin-header-actions">
            <Link href="/" className="secondary-link">
              Voltar para o site
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button type="submit" className="secondary-link auth-button">
                Sair
              </button>
            </form>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
