import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

const metrics = [
  { label: "Leads novos", value: "18", detail: "ultimos 7 dias" },
  { label: "Diagnosticos abertos", value: "6", detail: "em andamento" },
  { label: "Implantacoes ativas", value: "4", detail: "modulos em execucao" },
  { label: "Receita em negociacao", value: "R$ 74k", detail: "pipeline atual" },
];

const tasks = [
  "Responder leads quentes em ate 15 minutos",
  "Converter diagnostico em proposta padrao",
  "Criar primeiro mini case de antes e depois",
  "Padronizar onboarding de Atendimento com IA",
];

export default async function AdminDashboardPage() {
  let metrics = [
    { label: "Leads novos", value: "0", detail: "ultimos 7 dias" },
    { label: "Clientes", value: "0", detail: "contas registradas" },
    { label: "Trabalhos", value: "0", detail: "diagnosticos e implantacoes" },
    { label: "Setup", value: "MVP", detail: "CRM interno em construcao" },
  ];

  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    const [leadsRes, companiesRes, projectsRes] = await Promise.all([
      supabase.from("leads").select("id", { count: "exact", head: true }),
      supabase.from("companies").select("id", { count: "exact", head: true }),
      supabase.from("projects").select("id", { count: "exact", head: true }),
    ]);

    metrics = [
      {
        label: "Leads novos",
        value: String(leadsRes.count ?? 0),
        detail: "capturados no CRM",
      },
      {
        label: "Clientes",
        value: String(companiesRes.count ?? 0),
        detail: "contas registradas",
      },
      {
        label: "Trabalhos",
        value: String(projectsRes.count ?? 0),
        detail: "diagnosticos e implantacoes",
      },
      {
        label: "Setup",
        value: "Ativo",
        detail: "Supabase conectado",
      },
    ];
  }

  return (
    <main className="admin-main">
      <section className="admin-grid">
        {metrics.map((metric) => (
          <article key={metric.label} className="admin-card metric-card">
            <p className="helper-copy">{metric.label}</p>
            <strong>{metric.value}</strong>
            <span>{metric.detail}</span>
          </article>
        ))}
      </section>

      <section className="admin-columns">
        <article className="admin-card">
          <p className="eyebrow">Foco do dia</p>
          <h2>Backoffice da agencia</h2>
          <ul className="bullet-list">
            {tasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </article>

        <article className="admin-card">
          <p className="eyebrow">Proxima camada</p>
          <h2>Arquitetura sugerida</h2>
          <ul className="bullet-list">
            <li>Supabase Auth para login interno</li>
            <li>Postgres para leads, clientes e projetos</li>
            <li>Pipeline comercial como entidade separada</li>
            <li>Notas internas e proximas acoes em cada registro</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
