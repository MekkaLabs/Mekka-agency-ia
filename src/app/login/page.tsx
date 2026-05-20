import Link from "next/link";
import { login } from "./actions";
import { hasSupabaseEnv } from "@/lib/supabase/env";

const loginBenefits = [
  "Centralizar leads e proximas acoes",
  "Acompanhar diagnosticos e implantacoes",
  "Organizar clientes, notas e entregas",
];

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const configured = hasSupabaseEnv();

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <div className="auth-copy">
          <p className="eyebrow">Area interna Mekka Labs</p>
          <h1>Login da operacao</h1>
          <p className="lead">
            A area logada vai concentrar CRM, clientes, trabalhos e o
            backoffice operacional da agencia.
          </p>
          <ul className="bullet-list">
            {loginBenefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="auth-aside-card">
            <span>Mekka OS</span>
            <strong>CRM, forecast e delivery no mesmo painel</strong>
            <p>
              A area interna foi desenhada para reduzir troca de contexto e dar
              visibilidade do funil e da execucao.
            </p>
          </div>
        </div>

        <form className="auth-form" action={login}>
          {!configured ? (
            <p className="form-error">
              Supabase ainda nao configurado. Preencha `.env.local` e siga
              `docs/ops/supabase-setup.md`.
            </p>
          ) : null}
          <label>
            <span>Email</span>
            <input
              name="email"
              type="email"
              placeholder="voce@agenciamekka.com.br"
              required
              disabled={!configured}
            />
          </label>
          <label>
            <span>Senha</span>
            <input
              name="password"
              type="password"
              placeholder="Sua senha"
              required
              disabled={!configured}
            />
          </label>
          {params.error ? <p className="form-error">{params.error}</p> : null}
          <button
            type="submit"
            className="primary-link auth-button"
            disabled={!configured}
          >
            Entrar
          </button>
          <p className="helper-copy">
            Login preparado para Supabase Auth. Se preferir, primeiro envie um
            lead publico pelo diagnostico.
          </p>
          <Link href="/diagnostico" className="secondary-link auth-inline-link">
            Abrir formulario publico de diagnostico
          </Link>
        </form>
      </section>
    </main>
  );
}
