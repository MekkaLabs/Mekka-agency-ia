import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { leadStageLabels, leadStages } from "@/lib/crm";

type AdminPipelinePageProps = {
  searchParams: Promise<{
    q?: string;
    source?: string;
  }>;
};

export default async function AdminPipelinePage({
  searchParams,
}: AdminPipelinePageProps) {
  const params = await searchParams;
  const queryText = params.q?.trim().toLowerCase() ?? "";
  const selectedSource = params.source?.trim() ?? "all";

  let leads: {
    id: string;
    company_name: string;
    name: string;
    source: string;
    pipeline_stage: string;
    next_action: string | null;
  }[] = [];

  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("leads")
      .select("id, company_name, name, source, pipeline_stage, next_action")
      .order("created_at", { ascending: false })
      .limit(200);

    leads =
      data?.filter((lead) => {
        const matchesQuery =
          !queryText ||
          [lead.company_name, lead.name, lead.next_action ?? "", lead.source]
            .join(" ")
            .toLowerCase()
            .includes(queryText);
        const matchesSource =
          selectedSource === "all" || lead.source === selectedSource;

        return matchesQuery && matchesSource;
      }) ?? [];
  }

  return (
    <main className="admin-main">
      <section className="admin-card">
        <div className="section-heading">
          <p className="eyebrow">Pipeline comercial</p>
          <h2>Visao de etapas</h2>
          <p className="helper-copy">
            Esta visao usa a coluna `pipeline_stage` da tabela `leads`.
          </p>
        </div>

        <form className="admin-form filter-bar" method="get">
          <div className="form-grid two-up">
            <label>
              <span>Buscar</span>
              <input
                name="q"
                type="search"
                defaultValue={params.q ?? ""}
                placeholder="Empresa, contato, origem ou proxima acao"
              />
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
            <a href="/admin/pipeline" className="ghost-button">
              Limpar filtros
            </a>
            <span className="helper-copy">{leads.length} lead(s) em vista</span>
          </div>
        </form>

        <div className="pipeline-grid pipeline-grid-six">
          {leadStages.map((stage) => {
            const items = leads.filter((lead) => lead.pipeline_stage === stage);

            return (
              <article key={stage} className="pipeline-column">
                <div className="pipeline-column-header">
                  <h3>{leadStageLabels[stage]}</h3>
                  <span>{items.length}</span>
                </div>
                <div className="pipeline-list">
                  {items.length === 0 ? (
                    <div className="pipeline-ticket pipeline-ticket-empty">
                      Nenhum lead nesta etapa
                    </div>
                  ) : null}
                  {items.map((item) => (
                    <div key={item.id} className="pipeline-ticket">
                      <strong>{item.company_name}</strong>
                      <p>{item.name}</p>
                      <span>{item.next_action ?? "Sem proxima acao definida"}</span>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
