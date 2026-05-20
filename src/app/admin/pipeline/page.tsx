import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

const stages = [
  { key: "novo_lead", name: "Novos leads" },
  { key: "contato_iniciado", name: "Contato iniciado" },
  { key: "diagnostico_agendado", name: "Diagnostico agendado" },
  { key: "proposta_enviada", name: "Proposta enviada" },
  { key: "fechado", name: "Fechado" },
  { key: "perdido", name: "Perdido" },
];

export default async function AdminPipelinePage() {
  let leads: {
    id: string;
    company_name: string;
    name: string;
    pipeline_stage: string;
    next_action: string | null;
  }[] = [];

  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("leads")
      .select("id, company_name, name, pipeline_stage, next_action")
      .order("created_at", { ascending: false })
      .limit(100);

    leads = data ?? [];
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

        <div className="pipeline-grid">
          {stages.map((stage) => {
            const items = leads.filter((lead) => lead.pipeline_stage === stage.key);

            return (
              <article key={stage.key} className="pipeline-column">
                <div className="pipeline-column-header">
                  <h3>{stage.name}</h3>
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
