import {
  createCompany,
  deleteCompany,
  updateCompany,
} from "@/app/admin/actions";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

const companyStatuses = [
  "lead",
  "diagnostico",
  "proposta",
  "cliente_ativo",
  "pausado",
];

type AdminClientsPageProps = {
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
};

export default async function AdminClientsPage({
  searchParams,
}: AdminClientsPageProps) {
  const params = await searchParams;

  let clients: {
    id: string;
    name: string;
    segment: string | null;
    size: string | null;
    website: string | null;
    status: string;
  }[] = [];

  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("companies")
      .select("id, name, segment, size, website, status")
      .order("created_at", { ascending: false })
      .limit(50);

    clients = data ?? [];
  }

  return (
    <main className="admin-main">
      <section className="admin-columns admin-columns-top">
        <article className="admin-card">
          <div className="section-heading">
            <p className="eyebrow">Nova conta</p>
            <h2>Cadastrar empresa</h2>
            <p className="helper-copy">
              Transforme leads qualificados em contas rastreaveis no CRM.
            </p>
          </div>

          <form className="admin-form" action={createCompany}>
            <div className="form-grid two-up">
              <label>
                <span>Empresa</span>
                <input name="name" type="text" required />
              </label>
              <label>
                <span>Status</span>
                <select name="status" defaultValue="lead">
                  {companyStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Segmento</span>
                <input name="segment" type="text" />
              </label>
              <label>
                <span>Porte</span>
                <input name="size" type="text" placeholder="Ex.: 10-30 pessoas" />
              </label>
            </div>

            <label>
              <span>Website</span>
              <input name="website" type="url" placeholder="https://empresa.com" />
            </label>

            {params.error ? <p className="form-error">{params.error}</p> : null}
            {params.success ? (
              <p className="form-success">{params.success}</p>
            ) : null}

            <button type="submit" className="primary-link auth-button">
              Salvar empresa
            </button>
          </form>
        </article>

        <article className="admin-card">
          <div className="section-heading">
            <p className="eyebrow">Uso sugerido</p>
            <h2>Quando virar cliente</h2>
          </div>
          <ul className="bullet-list">
            <li>Crie a conta assim que o lead mostrar fit real</li>
            <li>Use `diagnostico` e `proposta` para marcar maturidade comercial</li>
            <li>Promova para `cliente_ativo` quando houver contrato ou kickoff</li>
          </ul>
        </article>
      </section>

      <section className="admin-card">
        <div className="section-heading">
          <p className="eyebrow">Clientes</p>
          <h2>Contas registradas</h2>
        </div>

        <div className="record-list">
          {clients.length === 0 ? (
            <article className="record-card">
              <p className="helper-copy">
                Nenhuma conta cadastrada ainda. O fluxo ideal e promover leads
                qualificados para empresa e depois abrir trabalhos.
              </p>
            </article>
          ) : null}

          {clients.map((client) => (
            <article key={client.id} className="record-card">
              <div className="record-header">
                <div>
                  <strong>{client.name}</strong>
                  <p>
                    {client.segment ?? "segmento nao informado"}
                    {client.size ? ` • ${client.size}` : ""}
                  </p>
                </div>
                <span className="record-badge">{client.status}</span>
              </div>

              <form className="inline-form" action={updateCompany}>
                <input type="hidden" name="id" value={client.id} />
                <label>
                  <span>Status</span>
                  <select name="status" defaultValue={client.status}>
                    {companyStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Segmento</span>
                  <input
                    name="segment"
                    type="text"
                    defaultValue={client.segment ?? ""}
                  />
                </label>
                <label className="inline-grow">
                  <span>Website</span>
                  <input
                    name="website"
                    type="url"
                    defaultValue={client.website ?? ""}
                  />
                </label>
                <button type="submit" className="secondary-link auth-button">
                  Atualizar
                </button>
              </form>

              <form action={deleteCompany}>
                <input type="hidden" name="id" value={client.id} />
                <button type="submit" className="ghost-button">
                  Remover empresa
                </button>
              </form>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
