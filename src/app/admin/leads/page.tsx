import {
  convertLeadToAccount,
  createLead,
  createNote,
  deleteLead,
  deleteNote,
  updateLead,
} from "@/app/admin/actions";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { leadStageLabels, leadStages } from "@/lib/crm";

const sourceOptions = [
  "all",
  "site_formulario_diagnostico",
  "manual_admin",
] as const;

type AdminLeadsPageProps = {
  searchParams: Promise<{
    error?: string;
    success?: string;
    q?: string;
    stage?: string;
    source?: string;
  }>;
};

export default async function AdminLeadsPage({
  searchParams,
}: AdminLeadsPageProps) {
  const params = await searchParams;
  const queryText = params.q?.trim() ?? "";
  const selectedStage =
    params.stage && leadStages.includes(params.stage as (typeof leadStages)[number])
      ? params.stage
      : "all";
  const selectedSource =
    params.source && sourceOptions.includes(params.source as (typeof sourceOptions)[number])
      ? params.source
      : "all";

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
    created_at: string;
  }[] = [];
  const notesByLead: Record<
    string,
    { id: string; body: string; created_at: string }[]
  > = {};

  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    let leadsQuery = supabase
      .from("leads")
      .select(
        "id, company_name, name, email, phone, source, pain_point, interest, next_action, pipeline_stage, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(100);

    if (queryText) {
      leadsQuery = leadsQuery.or(
        [
          `company_name.ilike.%${queryText}%`,
          `name.ilike.%${queryText}%`,
          `email.ilike.%${queryText}%`,
          `phone.ilike.%${queryText}%`,
          `pain_point.ilike.%${queryText}%`,
          `interest.ilike.%${queryText}%`,
        ].join(","),
      );
    }

    if (selectedStage !== "all") {
      leadsQuery = leadsQuery.eq("pipeline_stage", selectedStage);
    }

    if (selectedSource !== "all") {
      leadsQuery = leadsQuery.eq("source", selectedSource);
    }

    const { data } = await leadsQuery;
    leads = data ?? [];

    if (leads.length > 0) {
      const { data: notes } = await supabase
        .from("notes")
        .select("id, related_id, body, created_at")
        .eq("related_type", "lead")
        .in(
          "related_id",
          leads.map((lead) => lead.id),
        )
        .order("created_at", { ascending: false })
        .limit(200);

      for (const note of notes ?? []) {
        const relatedId = String(note.related_id);
        const entry = {
          id: String(note.id),
          body: String(note.body),
          created_at: String(note.created_at),
        };

        if (!notesByLead[relatedId]) {
          notesByLead[relatedId] = [];
        }

        notesByLead[relatedId].push(entry);
      }
    }
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
                      {leadStageLabels[stage]}
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
          <p className="helper-copy">
            Filtre por etapa, origem ou texto livre para validar o funil ponta a
            ponta e agir mais rapido.
          </p>
        </div>

        <form className="admin-form filter-bar" method="get">
          <div className="form-grid three-up">
            <label>
              <span>Buscar</span>
              <input
                name="q"
                type="search"
                defaultValue={queryText}
                placeholder="Empresa, contato, email, dor ou interesse"
              />
            </label>
            <label>
              <span>Etapa</span>
              <select name="stage" defaultValue={selectedStage}>
                <option value="all">Todas</option>
                {leadStages.map((stage) => (
                  <option key={stage} value={stage}>
                    {leadStageLabels[stage]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Origem</span>
              <select name="source" defaultValue={selectedSource}>
                <option value="all">Todas</option>
                <option value="site_formulario_diagnostico">
                  site_formulario_diagnostico
                </option>
                <option value="manual_admin">manual_admin</option>
              </select>
            </label>
          </div>
          <div className="filter-actions">
            <button type="submit" className="secondary-link auth-button">
              Aplicar filtros
            </button>
            <a href="/admin/leads" className="ghost-button">
              Limpar filtros
            </a>
            <span className="helper-copy">{leads.length} lead(s) encontrado(s)</span>
          </div>
        </form>

        <div className="record-list">
          {leads.length === 0 ? (
            <article className="record-card">
              <p className="helper-copy">
                Nenhum lead encontrado com os filtros atuais. Use `/diagnostico`
                para enviar o primeiro ou crie manualmente acima.
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
                <span className="record-badge">
                  {leadStageLabels[lead.pipeline_stage] ?? lead.pipeline_stage}
                </span>
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
                <p>
                  <strong>Entrada:</strong>{" "}
                  {new Date(lead.created_at).toLocaleString("pt-BR")}
                </p>
              </div>

              <form className="inline-form" action={updateLead}>
                <input type="hidden" name="id" value={lead.id} />
                <label>
                  <span>Etapa</span>
                  <select name="pipeline_stage" defaultValue={lead.pipeline_stage}>
                    {leadStages.map((stage) => (
                      <option key={stage} value={stage}>
                        {leadStageLabels[stage]}
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

              <div className="record-actions">
                <form className="inline-form inline-form-compact" action={convertLeadToAccount}>
                  <input type="hidden" name="id" value={lead.id} />
                  <input type="hidden" name="company_status" value="diagnostico" />
                  <label>
                    <span>Conversao</span>
                    <select name="create_project" defaultValue="1">
                      <option value="1">Criar conta + abrir diagnostico</option>
                      <option value="0">Criar so a conta</option>
                    </select>
                  </label>
                  <button type="submit" className="secondary-link auth-button">
                    Converter lead
                  </button>
                </form>

                <form action={deleteLead}>
                  <input type="hidden" name="id" value={lead.id} />
                  <button type="submit" className="ghost-button">
                    Remover lead
                  </button>
                </form>
              </div>

              <div className="notes-block">
                <div className="notes-header">
                  <strong>Notas internas</strong>
                  <span>{(notesByLead[lead.id] ?? []).length} registrada(s)</span>
                </div>

                <form className="note-form" action={createNote}>
                  <input type="hidden" name="related_type" value="lead" />
                  <input type="hidden" name="related_id" value={lead.id} />
                  <input type="hidden" name="return_path" value="/admin/leads" />
                  <label>
                    <span>Nova nota</span>
                    <textarea
                      name="body"
                      rows={3}
                      placeholder="Ex.: lead respondeu, pediu proposta, nao atendeu, reagendar amanha"
                      required
                    />
                  </label>
                  <button type="submit" className="secondary-link auth-button">
                    Salvar nota
                  </button>
                </form>

                <div className="note-list">
                  {(notesByLead[lead.id] ?? []).length === 0 ? (
                    <p className="helper-copy">
                      Nenhuma nota ainda. Registre contexto para nao perder memoria
                      comercial.
                    </p>
                  ) : null}

                  {(notesByLead[lead.id] ?? []).map((note) => (
                    <article key={note.id} className="note-item">
                      <div className="note-meta">
                        <span>
                          {new Date(note.created_at).toLocaleString("pt-BR")}
                        </span>
                        <form action={deleteNote}>
                          <input type="hidden" name="id" value={note.id} />
                          <input
                            type="hidden"
                            name="return_path"
                            value="/admin/leads"
                          />
                          <button type="submit" className="ghost-button">
                            Remover nota
                          </button>
                        </form>
                      </div>
                      <p>{note.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
