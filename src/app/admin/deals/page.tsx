import {
  createDeal,
  deleteDeal,
  updateDeal,
} from "@/app/admin/actions";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import {
  dealOfferTypes,
  dealStatuses,
  formatCurrencyBRL,
} from "@/lib/crm";

type AdminDealsPageProps = {
  searchParams: Promise<{
    error?: string;
    success?: string;
    q?: string;
    status?: string;
  }>;
};

export default async function AdminDealsPage({
  searchParams,
}: AdminDealsPageProps) {
  const params = await searchParams;
  const queryText = params.q?.trim().toLowerCase() ?? "";
  const selectedStatus =
    params.status &&
    dealStatuses.includes(params.status as (typeof dealStatuses)[number])
      ? params.status
      : "all";

  let deals: {
    id: string;
    offer_type: string;
    status: string;
    value: number | null;
    expected_close_date: string | null;
    companyName: string | null;
    leadName: string | null;
    leadCompanyName: string | null;
  }[] = [];
  let leads: { id: string; name: string; company_name: string }[] = [];
  let companies: { id: string; name: string }[] = [];

  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    const [{ data: dealsData }, { data: leadsData }, { data: companiesData }] =
      await Promise.all([
        supabase
          .from("deals")
          .select(
            "id, offer_type, status, value, expected_close_date, company:companies(name), lead:leads(name, company_name)",
          )
          .order("created_at", { ascending: false })
          .limit(100),
        supabase
          .from("leads")
          .select("id, name, company_name")
          .order("created_at", { ascending: false })
          .limit(100),
        supabase.from("companies").select("id, name").order("name"),
      ]);

    leads = leadsData ?? [];
    companies = companiesData ?? [];
    deals =
      dealsData
        ?.map((deal) => {
          const companyValue = deal.company as
            | { name?: string }[]
            | { name?: string }
            | null;
          const leadValue = deal.lead as
            | { name?: string; company_name?: string }[]
            | { name?: string; company_name?: string }
            | null;
          const companyName = Array.isArray(companyValue)
            ? companyValue[0]?.name ?? null
            : companyValue?.name ?? null;
          const leadName = Array.isArray(leadValue)
            ? leadValue[0]?.name ?? null
            : leadValue?.name ?? null;
          const leadCompanyName = Array.isArray(leadValue)
            ? leadValue[0]?.company_name ?? null
            : leadValue?.company_name ?? null;

          return {
            id: String(deal.id),
            offer_type: String(deal.offer_type),
            status: String(deal.status),
            value:
              typeof deal.value === "number"
                ? deal.value
                : deal.value === null
                  ? null
                  : Number(deal.value),
            expected_close_date: deal.expected_close_date
              ? String(deal.expected_close_date)
              : null,
            companyName: companyName ? String(companyName) : null,
            leadName: leadName ? String(leadName) : null,
            leadCompanyName: leadCompanyName ? String(leadCompanyName) : null,
          };
        })
        .filter((deal) => {
          const matchesQuery =
            !queryText ||
            [
              deal.offer_type,
              deal.companyName ?? "",
              deal.leadName ?? "",
              deal.leadCompanyName ?? "",
            ]
              .join(" ")
              .toLowerCase()
              .includes(queryText);
          const matchesStatus =
            selectedStatus === "all" || deal.status === selectedStatus;

          return matchesQuery && matchesStatus;
        }) ?? [];
  }

  const openValue = deals
    .filter((deal) => !["ganho", "perdido"].includes(deal.status))
    .reduce((sum, deal) => sum + (deal.value ?? 0), 0);

  return (
    <main className="admin-main">
      <section className="admin-columns admin-columns-top">
        <article className="admin-card admin-card-spotlight">
          <div className="section-heading">
            <p className="eyebrow">Novo deal</p>
            <h2>Registrar proposta comercial</h2>
            <p className="helper-copy">
              Use deals para acompanhar proposta, negociacao, previsao de receita
              e conversao em projeto.
            </p>
          </div>

          <form className="admin-form" action={createDeal}>
            <div className="form-grid two-up">
              <label>
                <span>Tipo de oferta</span>
                <select name="offer_type" defaultValue="diagnostico_ia">
                  {dealOfferTypes.map((offerType) => (
                    <option key={offerType} value={offerType}>
                      {offerType}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Status</span>
                <select name="status" defaultValue="rascunho">
                  {dealStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Conta</span>
                <select name="company_id" defaultValue="">
                  <option value="">Selecionar depois</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Lead de origem</span>
                <select name="lead_id" defaultValue="">
                  <option value="">Sem lead vinculado</option>
                  {leads.map((lead) => (
                    <option key={lead.id} value={lead.id}>
                      {lead.company_name} • {lead.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Valor previsto</span>
                <input
                  name="value"
                  type="text"
                  inputMode="decimal"
                  placeholder="Ex.: 2500 ou 2500,00"
                />
              </label>
              <label>
                <span>Fechamento esperado</span>
                <input name="expected_close_date" type="date" />
              </label>
            </div>

            {params.error ? <p className="form-error">{params.error}</p> : null}
            {params.success ? (
              <p className="form-success">{params.success}</p>
            ) : null}

            <button type="submit" className="primary-link auth-button">
              Salvar deal
            </button>
          </form>
        </article>

        <article className="admin-card admin-card-muted">
          <div className="section-heading">
            <p className="eyebrow">Forecast</p>
            <h2>Leitura comercial rapida</h2>
          </div>
          <ul className="bullet-list">
            <li>Deals em aberto: {deals.filter((deal) => !["ganho", "perdido"].includes(deal.status)).length}</li>
            <li>Receita potencial em aberto: {formatCurrencyBRL(openValue)}</li>
            <li>Ganhos: {deals.filter((deal) => deal.status === "ganho").length}</li>
            <li>Perdidos: {deals.filter((deal) => deal.status === "perdido").length}</li>
          </ul>
        </article>
      </section>

      <section className="admin-card admin-card-surface">
        <div className="section-heading">
          <p className="eyebrow">Deals</p>
          <h2>Propostas e negociações</h2>
          <p className="helper-copy">
            Filtre por status ou texto para acompanhar o que esta perto de virar
            receita.
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
                placeholder="Oferta, empresa ou lead"
              />
            </label>
            <label>
              <span>Status</span>
              <select name="status" defaultValue={selectedStatus}>
                <option value="all">Todos</option>
                {dealStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="filter-actions">
            <button type="submit" className="secondary-link auth-button">
              Aplicar filtros
            </button>
            <a href="/admin/deals" className="ghost-button">
              Limpar filtros
            </a>
            <span className="helper-copy">{deals.length} deal(s) encontrado(s)</span>
          </div>
        </form>

        <div className="record-list">
          {deals.length === 0 ? (
            <article className="record-card">
              <p className="helper-copy">
                Nenhum deal encontrado. O passo natural depois da qualificacao e
                abrir uma proposta com valor e data prevista de fechamento.
              </p>
            </article>
          ) : null}

          {deals.map((deal) => (
            <article key={deal.id} className="record-card">
              <div className="record-header">
                <div>
                  <strong>{deal.offer_type}</strong>
                  <p>
                    {deal.companyName ?? deal.leadCompanyName ?? "Conta nao vinculada"}
                    {deal.leadName ? ` • ${deal.leadName}` : ""}
                  </p>
                </div>
                <span className="record-badge">{deal.status}</span>
              </div>

              <div className="record-body">
                <p>
                  <strong>Valor:</strong> {formatCurrencyBRL(deal.value)}
                </p>
                <p>
                  <strong>Fechamento esperado:</strong>{" "}
                  {deal.expected_close_date ?? "-"}
                </p>
              </div>

              <form className="inline-form" action={updateDeal}>
                <input type="hidden" name="id" value={deal.id} />
                <label>
                  <span>Status</span>
                  <select name="status" defaultValue={deal.status}>
                    {dealStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Valor</span>
                  <input
                    name="value"
                    type="text"
                    inputMode="decimal"
                    defaultValue={deal.value ?? ""}
                  />
                </label>
                <label className="inline-grow">
                  <span>Fechamento esperado</span>
                  <input
                    name="expected_close_date"
                    type="date"
                    defaultValue={deal.expected_close_date ?? ""}
                  />
                </label>
                <button type="submit" className="secondary-link auth-button">
                  Atualizar
                </button>
              </form>

              <form action={deleteDeal}>
                <input type="hidden" name="id" value={deal.id} />
                <button type="submit" className="ghost-button">
                  Remover deal
                </button>
              </form>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
