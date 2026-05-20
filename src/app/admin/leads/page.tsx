import { createLead, deleteLead, updateLead } from "@/app/admin/actions";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

const leadStages = [
  "novo_lead",
  "contato_iniciado",
  "diagnostico_agendado",
  "proposta_enviada",
  "fechado",
  "perdido",
];

type AdminLeadsPageProps = {
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
};

export default async function AdminLeadsPage({
  searchParams,
}: AdminLeadsPageProps) {
  const params = await searchParams;

  let leads: {
    id: string;
    company_name: string;
    name: string;
    email: string;
    phone: string | null;
    source: string;
    pain_point: string | null;
    interest: string | null;
    next_action: string | null;
    pipeline_stage: string;
  }[] = [];

  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("leads")
      .select(
        "id, company_name, name, email, phone, source, pain_point, interest, next_action, pipeline_stage",
      )
      .order("created_at", { ascending: false })
      .limit(50);

    leads = data ?? [];
  }

  return (
    <main className="admin-main">
      <section className="admin-columns admin-columns-top">
        <article className="admin-card">
          <div className="section-heading">
            <p className="eyebrow">Novo lead</p>
            <h2>Entrada manual no CRM</h2>
            <p className="helper-copy">
              Use este formulario para adicionar leads vindos de WhatsApp,
              networking ou indicacao.
            </p>
          </div>

          <form className="admin-form" action={createLead}>
            <div className="form-grid two-up">
              <label>
                <span>Nome</span>
                <input name="name" type="text" required />
              </label>
              <label>
                <span>Empresa</span>
                <input name="company_name" type="text" required />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" required />
              </label>
              <label>
                <span>WhatsApp</span>
                <input name="phone" type="text" />
              </label>
              <label>
                <span>Origem</span>
                <input
                  name="source"
                  type="text"
                  defaultValue="manual_admin"
                  required
                />
              </label>
              <label>
                <span>Etapa</span>
                <select name="pipeline_stage" defaultValue="novo_lead">
                  {leadStages.map((stage) => (
                    <option key={stage} value={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              <span>Dor principal</span>
              <textarea name="pain_point" rows={3} />
            </label>
            <label>
              <span>Interesse</span>
              <input
                name="interest"
                type="text"
                defaultValue="diagnostico_ia_empresa"
              />
            </label>
            <label>
              <span>Proxima acao</span>
              <input
                name="next_action"
                type="text"
                placeholder="Ex.: enviar proposta, marcar call, cobrar retorno"
              />
            </label>

            {params.error ? <p className="form-error">{params.error}</p> : null}
            {params.success ? (
              <p className="form-success">{params.success}</p>
            ) : null}

            <button type="submit" className="primary-link auth-button">
              Salvar lead
            </button>
          </form>
        </article>

        <article className="admin-card">
          <div className="section-heading">
            <p className="eyebrow">Checklist</p>
            <h2>Primeiras acoes por lead</h2>
          </div>
          <ul className="bullet-list">
            <li>Responder em menos de 15 minutos quando houver canal direto</li>
            <li>Classificar a dor principal antes de mandar proposta</li>
            <li>Transformar diagnostico em proximo passo claro</li>
            <li>Atualizar a etapa toda vez que houver avancos reais</li>
          </ul>
        </article>
      </section>

      <section className="admin-card">
        <div className="section-heading">
          <p className="eyebrow">CRM</p>
          <h2>Leads capturados</h2>
        </div>

        <div className="record-list">
          {leads.length === 0 ? (
            <article className="record-card">
              <p className="helper-copy">
                Nenhum lead carregado ainda. Use `/diagnostico` para enviar o
                primeiro ou crie manualmente acima.
              </p>
            </article>
          ) : null}

          {leads.map((lead) => (
            <article key={lead.id} className="record-card">
              <div className="record-header">
                <div>
                  <strong>{lead.company_name}</strong>
                  <p>
                    {lead.name} • {lead.email}
                    {lead.phone ? ` • ${lead.phone}` : ""}
                  </p>
                </div>
                <span className="record-badge">{lead.pipeline_stage}</span>
              </div>

              <div className="record-body">
                <p>
                  <strong>Origem:</strong> {lead.source}
                </p>
                <p>
                  <strong>Interesse:</strong> {lead.interest ?? "-"}
                </p>
                <p>
                  <strong>Dor:</strong> {lead.pain_point ?? "-"}
                </p>
              </div>

              <form className="inline-form" action={updateLead}>
                <input type="hidden" name="id" value={lead.id} />
                <label>
                  <span>Etapa</span>
                  <select name="pipeline_stage" defaultValue={lead.pipeline_stage}>
                    {leadStages.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="inline-grow">
                  <span>Proxima acao</span>
                  <input
                    name="next_action"
                    type="text"
                    defaultValue={lead.next_action ?? ""}
                  />
                </label>
                <button type="submit" className="secondary-link auth-button">
                  Atualizar
                </button>
              </form>

              <form action={deleteLead}>
                <input type="hidden" name="id" value={lead.id} />
                <button type="submit" className="ghost-button">
                  Remover lead
                </button>
              </form>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
