import { requestDiagnostic } from "./actions";
import { hasSupabaseEnv } from "@/lib/supabase/env";

type DiagnosticPageProps = {
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
};

export default async function DiagnosticPage({
  searchParams,
}: DiagnosticPageProps) {
  const params = await searchParams;
  const configured = hasSupabaseEnv();

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <div className="auth-copy">
          <p className="eyebrow">Diagnostico de IA</p>
          <h1>Descubra onde sua empresa pode ganhar tempo e vender melhor</h1>
          <p className="lead">
            Preencha os dados abaixo para entrar no CRM da Mekka e iniciar a
            avaliacao do seu atendimento, vendas e operacao.
          </p>
          <ul className="bullet-list">
            <li>Mapeamento de gargalos principais</li>
            <li>Leitura inicial de atendimento e follow-up</li>
            <li>Primeira recomendacao de implantacao</li>
          </ul>
          <div className="auth-aside-card">
            <span>Formato de entrada</span>
            <strong>Formulario enxuto com resposta orientada a gargalo</strong>
            <p>
              O objetivo nao e coletar tudo. E entender rapido onde a empresa esta
              perdendo tempo, resposta ou consistencia.
            </p>
          </div>
        </div>

        <form className="auth-form" action={requestDiagnostic}>
          {!configured ? (
            <p className="form-error">
              Supabase ainda nao configurado. O formulario publico sera ativado
              assim que `.env.local` e o schema forem configurados.
            </p>
          ) : null}
          <label>
            <span>Nome</span>
            <input
              name="name"
              type="text"
              placeholder="Seu nome"
              required
              disabled={!configured}
            />
          </label>
          <label>
            <span>Empresa</span>
            <input
              name="company_name"
              type="text"
              placeholder="Nome da empresa"
              required
              disabled={!configured}
            />
          </label>
          <label>
            <span>Email</span>
            <input
              name="email"
              type="email"
              placeholder="voce@empresa.com"
              required
              disabled={!configured}
            />
          </label>
          <label>
            <span>WhatsApp</span>
            <input
              name="phone"
              type="text"
              placeholder="(11) 99999-9999"
              required
              disabled={!configured}
            />
          </label>
          <label>
            <span>Principal gargalo hoje</span>
            <textarea
              name="pain_point"
              placeholder="Ex.: demora no atendimento, follow-up fraco, operacao baguncada"
              rows={4}
              required
              disabled={!configured}
            />
          </label>

          {params.error ? (
            <p className="form-error">{params.error}</p>
          ) : null}
          {params.success ? (
            <p className="form-success">
              Diagnostico solicitado. Seu lead entrou no CRM da Mekka.
            </p>
          ) : null}

          <button
            type="submit"
            className="primary-link auth-button"
            disabled={!configured}
          >
            Enviar para o CRM
          </button>
          <p className="helper-copy">
            Depois do envio, o lead entra no CRM e pode seguir para conta,
            diagnostico e deal.
          </p>
        </form>
      </section>
    </main>
  );
}
