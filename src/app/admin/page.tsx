import Link from "next/link";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { formatCurrencyBRL, leadStageLabels } from "@/lib/crm";

const fallbackTasks = [
  "Responder leads quentes em ate 15 minutos",
  "Converter diagnostico em proposta padrao",
  "Criar primeiro mini case de antes e depois",
  "Padronizar onboarding de Atendimento com IA",
];

export default async function AdminDashboardPage() {
  let metrics = [
    { label: "Leads novos", value: "0", detail: "capturados no CRM" },
    { label: "Clientes", value: "0", detail: "contas registradas" },
    { label: "Deals", value: "0", detail: "propostas em acompanhamento" },
    { label: "Trabalhos", value: "0", detail: "diagnosticos e implantacoes" },
    { label: "Setup", value: "MVP", detail: "CRM interno em construcao" },
  ];
  let tasks = fallbackTasks;
  let recentLeads: {
    id: string;
    company_name: string;
    pipeline_stage: string;
    next_action: string | null;
  }[] = [];
  let activeProjects: {
    id: string;
    name: string;
    status: string;
    next_step: string | null;
  }[] = [];
  let pipelineSummary: { label: string; count: number }[] = [];
  let openDealValue = "R$ 0,00";

  const quickActions = [
    {
      href: "/admin/leads",
      title: "Triar leads",
      description: "Buscar novos contatos, atualizar etapa e registrar contexto.",
    },
    {
      href: "/admin/deals",
      title: "Revisar deals",
      description: "Acompanhar propostas abertas e previsao de receita.",
    },
    {
      href: "/admin/work",
      title: "Mover delivery",
      description: "Abrir diagnosticos, atualizar prazo e proximo passo.",
    },
  ];

  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    const [
      leadsRes,
      companiesRes,
      dealsRes,
      projectsRes,
      recentLeadsRes,
      projectsDataRes,
      dealsDataRes,
    ] =
      await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("companies").select("id", { count: "exact", head: true }),
        supabase.from("deals").select("id", { count: "exact", head: true }),
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase
          .from("leads")
          .select("id, company_name, pipeline_stage, next_action")
          .order("created_at", { ascending: false })
          .limit(6),
        supabase
          .from("projects")
          .select("id, name, status, next_step")
          .order("created_at", { ascending: false })
          .limit(6),
        supabase
          .from("deals")
          .select("value, status")
          .order("created_at", { ascending: false })
          .limit(100),
      ]);

    recentLeads = recentLeadsRes.data ?? [];
    activeProjects = projectsDataRes.data ?? [];
    openDealValue = formatCurrencyBRL(
      (dealsDataRes.data ?? [])
        .filter((deal) => !["ganho", "perdido"].includes(String(deal.status)))
        .reduce((sum, deal) => {
          const numericValue =
            typeof deal.value === "number"
              ? deal.value
              : deal.value === null
                ? 0
                : Number(deal.value);

          return sum + (Number.isFinite(numericValue) ? numericValue : 0);
        }, 0),
    );

    const stageCounts = recentLeads.reduce<Record<string, number>>((acc, lead) => {
      acc[lead.pipeline_stage] = (acc[lead.pipeline_stage] ?? 0) + 1;
      return acc;
    }, {});

    pipelineSummary = Object.entries(leadStageLabels).map(([key, label]) => ({
      label,
      count: stageCounts[key] ?? 0,
    }));

    tasks = recentLeads
      .map((lead) =>
        lead.next_action
          ? `${lead.company_name}: ${lead.next_action}`
          : null,
      )
      .filter((task): task is string => Boolean(task))
      .slice(0, 4);

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
        label: "Deals",
        value: String(dealsRes.count ?? 0),
        detail: `pipeline aberto em ${openDealValue}`,
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
      <section className="admin-hero">
        <div className="admin-hero-copy">
          <p className="eyebrow">Painel operacional</p>
          <h2>Uma leitura unica do que precisa andar hoje</h2>
          <p className="helper-copy">
            O foco aqui e transformar sinais do CRM em decisao rapida, visibilidade
            de receita e ritmo de entrega.
          </p>
        </div>
        <div className="admin-hero-rail">
          <div className="admin-hero-chip">
            <span>Forecast aberto</span>
            <strong>{openDealValue}</strong>
          </div>
          <div className="admin-hero-chip">
            <span>Ritmo atual</span>
            <strong>
              {recentLeads.length > 0 ? `${recentLeads.length} leads recentes` : "MVP"}
            </strong>
          </div>
          <div className="admin-hero-chip">
            <span>Delivery no radar</span>
            <strong>
              {activeProjects.length > 0
                ? `${activeProjects.length} trabalho(s)`
                : "Nenhum trabalho"}
            </strong>
          </div>
        </div>
      </section>

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
        <article className="admin-card admin-card-spotlight">
          <p className="eyebrow">Foco do dia</p>
          <h2>Fila de proximas acoes</h2>
          <ul className="bullet-list">
            {(tasks.length > 0 ? tasks : fallbackTasks).map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </article>

        <article className="admin-card admin-card-muted">
          <p className="eyebrow">Pipeline</p>
          <h2>Resumo rapido</h2>
          <div className="mini-stats">
            {(pipelineSummary.length > 0
              ? pipelineSummary
              : [
                  { label: "Novos leads", count: 0 },
                  { label: "Diagnostico agendado", count: 0 },
                  { label: "Proposta enviada", count: 0 },
                  { label: "Fechado", count: 0 },
                ]
            ).map((item) => (
              <div key={item.label} className="mini-stat">
                <strong>{item.count}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="admin-columns">
        <article className="admin-card admin-card-spotlight">
          <p className="eyebrow">Acoes rapidas</p>
          <h2>Entradas principais do time</h2>
          <div className="quick-action-grid">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href} className="quick-action-card">
                <strong>{action.title}</strong>
                <p>{action.description}</p>
              </Link>
            ))}
          </div>
        </article>

        <article className="admin-card admin-card-muted">
          <p className="eyebrow">Saude operacional</p>
          <h2>O que o sistema esta lendo agora</h2>
          <div className="health-list">
            <div className="health-item">
              <strong>CRM</strong>
              <span>{recentLeads.length > 0 ? "Entradas recentes detectadas" : "Aguardando volume real"}</span>
            </div>
            <div className="health-item">
              <strong>Receita</strong>
              <span>{openDealValue} em deals fora de ganho ou perdido</span>
            </div>
            <div className="health-item">
              <strong>Delivery</strong>
              <span>
                {activeProjects.length > 0
                  ? `${activeProjects.length} trabalho(s) ativo(s) no radar`
                  : "Nenhum trabalho aberto ainda"}
              </span>
            </div>
          </div>
        </article>
      </section>

      <section className="admin-columns">
        <article className="admin-card">
          <p className="eyebrow">Leads recentes</p>
          <h2>Ultimos movimentos do comercial</h2>
          <div className="stack-list">
            {recentLeads.length === 0 ? (
              <article className="stack-item">
                <div>
                  <strong>Nenhum lead recente</strong>
                  <p>Quando o funil comecar a rodar, os ultimos leads aparecerao aqui.</p>
                </div>
              </article>
            ) : null}
            {recentLeads.map((lead) => (
              <article key={lead.id} className="stack-item">
                <div>
                  <strong>{lead.company_name}</strong>
                  <p>{lead.next_action ?? "Sem proxima acao definida"}</p>
                </div>
                <div className="stack-meta">
                  <span>{leadStageLabels[lead.pipeline_stage] ?? lead.pipeline_stage}</span>
                </div>
              </article>
            ))}
          </div>
        </article>

        <article className="admin-card">
          <p className="eyebrow">Delivery</p>
          <h2>Trabalhos ativos</h2>
          <div className="stack-list">
            {activeProjects.length === 0 ? (
              <article className="stack-item">
                <div>
                  <strong>Nenhum trabalho aberto</strong>
                  <p>Abra um diagnostico a partir de um lead qualificado para iniciar a fila.</p>
                </div>
              </article>
            ) : null}
            {activeProjects.map((project) => (
              <article key={project.id} className="stack-item">
                <div>
                  <strong>{project.name}</strong>
                  <p>{project.next_step ?? "Sem proximo passo definido"}</p>
                </div>
                <div className="stack-meta">
                  <span>{project.status}</span>
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
