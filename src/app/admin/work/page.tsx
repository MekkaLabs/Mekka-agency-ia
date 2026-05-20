import {
  createProject,
  deleteProject,
  updateProject,
} from "@/app/admin/actions";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { projectStatuses, projectTypes } from "@/lib/crm";

type AdminWorkPageProps = {
  searchParams: Promise<{
    error?: string;
    success?: string;
    q?: string;
    status?: string;
    type?: string;
    company_id?: string;
  }>;
};

export default async function AdminWorkPage({
  searchParams,
}: AdminWorkPageProps) {
  const params = await searchParams;
  const queryText = params.q?.trim() ?? "";
  const selectedStatus =
    params.status &&
    projectStatuses.includes(params.status as (typeof projectStatuses)[number])
      ? params.status
      : "all";
  const selectedType =
    params.type &&
    projectTypes.includes(params.type as (typeof projectTypes)[number])
      ? params.type
      : "all";
  const selectedCompanyId = params.company_id?.trim() ?? "";

  let workItems: {
    id: string;
    name: string;
    type: string;
    module: string | null;
    status: string;
    next_step: string | null;
    due_date: string | null;
    company: { name: string } | null;
  }[] = [];
  let companies: { id: string; name: string }[] = [];

  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    const [{ data: projectsData }, { data: companiesData }] = await Promise.all([
      supabase
        .from("projects")
        .select(
          "id, name, type, module, status, next_step, due_date, company_id, company:companies(name)",
        )
        .order("created_at", { ascending: false })
        .limit(100),
      supabase.from("companies").select("id, name").order("name"),
    ]);

    companies = companiesData ?? [];
    workItems =
      projectsData
        ?.map((project) => {
          const companyValue = project.company as
            | { name?: string }[]
            | { name?: string }
            | null;

          return {
            id: String(project.id),
            name: String(project.name),
            type: String(project.type),
            module: project.module ? String(project.module) : null,
            status: String(project.status),
            next_step: project.next_step ? String(project.next_step) : null,
            due_date: project.due_date ? String(project.due_date) : null,
            company: Array.isArray(companyValue)
              ? companyValue[0]?.name
                ? { name: String(companyValue[0].name) }
                : null
              : companyValue?.name
                ? { name: String(companyValue.name) }
                : null,
            company_id: project.company_id ? String(project.company_id) : "",
          };
        })
        .filter((project) => {
          const matchesQuery =
            !queryText ||
            [
              project.name,
              project.type,
              project.module,
              project.next_step,
              project.company?.name ?? "",
            ]
              .join(" ")
              .toLowerCase()
              .includes(queryText.toLowerCase());
          const matchesStatus =
            selectedStatus === "all" || project.status === selectedStatus;
          const matchesType = selectedType === "all" || project.type === selectedType;
          const matchesCompany =
            !selectedCompanyId || project.company_id === selectedCompanyId;

          return matchesQuery && matchesStatus && matchesType && matchesCompany;
        }) ?? [];
  }

  return (
    <main className="admin-main">
      <section className="admin-columns admin-columns-top">
        <article className="admin-card">
          <div className="section-heading">
            <p className="eyebrow">Novo trabalho</p>
            <h2>Abrir diagnostico ou implantacao</h2>
            <p className="helper-copy">
              Cada entrega nasce como item rastreavel para nao depender de
              memoria ou conversas espalhadas.
            </p>
          </div>

          <form className="admin-form" action={createProject}>
            <div className="form-grid two-up">
              <label>
                <span>Nome do trabalho</span>
                <input name="name" type="text" required />
              </label>
              <label>
                <span>Tipo</span>
                <select name="type" defaultValue="diagnostico">
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Empresa</span>
                <select name="company_id" defaultValue="">
                  <option value="">Sem vinculo ainda</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Status</span>
                <select name="status" defaultValue="novo">
                  {projectStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Modulo</span>
                <input
                  name="module"
                  type="text"
                  placeholder="Ex.: atendimento, vendas, operacao"
                />
              </label>
              <label>
                <span>Prazo</span>
                <input name="due_date" type="date" />
              </label>
            </div>

            <label>
              <span>Proximo passo</span>
              <input
                name="next_step"
                type="text"
                placeholder="Ex.: kickoff, auditoria, setup do bot, proposta"
              />
            </label>
            <label>
              <span>Inicio</span>
              <input name="start_date" type="date" />
            </label>

            {params.error ? <p className="form-error">{params.error}</p> : null}
            {params.success ? (
              <p className="form-success">{params.success}</p>
            ) : null}

            <button type="submit" className="primary-link auth-button">
              Salvar trabalho
            </button>
          </form>
        </article>

        <article className="admin-card">
          <div className="section-heading">
            <p className="eyebrow">Ritmo de delivery</p>
            <h2>Regra operacional</h2>
          </div>
          <ul className="bullet-list">
            <li>Abra um trabalho por entrega vendida, nao por cliente inteiro</li>
            <li>Defina sempre o proximo passo antes de fechar o dia</li>
            <li>Use `otimizacao` para fases de ajuste apos implantacao</li>
          </ul>
        </article>
      </section>

      <section className="admin-card">
        <div className="section-heading">
          <p className="eyebrow">Delivery</p>
          <h2>Trabalhos em andamento</h2>
          <p className="helper-copy">
            Filtre por empresa, tipo ou status para acompanhar entregas ativas.
          </p>
        </div>

        <form className="admin-form filter-bar" method="get">
          <div className="form-grid four-up">
            <label>
              <span>Buscar</span>
              <input
                name="q"
                type="search"
                defaultValue={queryText}
                placeholder="Trabalho, modulo, empresa ou proximo passo"
              />
            </label>
            <label>
              <span>Status</span>
              <select name="status" defaultValue={selectedStatus}>
                <option value="all">Todos</option>
                {projectStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Tipo</span>
              <select name="type" defaultValue={selectedType}>
                <option value="all">Todos</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Empresa</span>
              <select name="company_id" defaultValue={selectedCompanyId}>
                <option value="">Todas</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="filter-actions">
            <button type="submit" className="secondary-link auth-button">
              Aplicar filtros
            </button>
            <a href="/admin/work" className="ghost-button">
              Limpar filtros
            </a>
            <span className="helper-copy">
              {workItems.length} trabalho(s) encontrado(s)
            </span>
          </div>
        </form>

        <div className="record-list">
          {workItems.length === 0 ? (
            <article className="record-card">
              <p className="helper-copy">
                Nenhum trabalho encontrado com os filtros atuais. O proximo passo
                natural e abrir um diagnostico assim que o lead for qualificado.
              </p>
            </article>
          ) : null}

          {workItems.map((item) => (
            <article key={item.id} className="record-card">
              <div className="record-header">
                <div>
                  <strong>{item.name}</strong>
                  <p>
                    {item.type} • {item.module ?? "modulo nao definido"}
                    {item.company?.name ? ` • ${item.company.name}` : ""}
                  </p>
                </div>
                <span className="record-badge">{item.status}</span>
              </div>

              <div className="record-body">
                <p>
                  <strong>Proximo passo:</strong> {item.next_step ?? "-"}
                </p>
                <p>
                  <strong>Prazo:</strong> {item.due_date ?? "-"}
                </p>
              </div>

              <form className="inline-form" action={updateProject}>
                <input type="hidden" name="id" value={item.id} />
                <label>
                  <span>Status</span>
                  <select name="status" defaultValue={item.status}>
                    {projectStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Modulo</span>
                  <input
                    name="module"
                    type="text"
                    defaultValue={item.module ?? ""}
                  />
                </label>
                <label className="inline-grow">
                  <span>Proximo passo</span>
                  <input
                    name="next_step"
                    type="text"
                    defaultValue={item.next_step ?? ""}
                  />
                </label>
                <label>
                  <span>Prazo</span>
                  <input
                    name="due_date"
                    type="date"
                    defaultValue={item.due_date ?? ""}
                  />
                </label>
                <button type="submit" className="secondary-link auth-button">
                  Atualizar
                </button>
              </form>

              <form action={deleteProject}>
                <input type="hidden" name="id" value={item.id} />
                <button type="submit" className="ghost-button">
                  Remover trabalho
                </button>
              </form>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
