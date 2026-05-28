import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

const STAGE_OPTIONS = [
  { value: "", label: "Todas etapas" },
  { value: "novo_lead", label: "Novo" },
  { value: "em_contato", label: "Em contato" },
  { value: "qualificado", label: "Qualificado" },
  { value: "diagnostico_agendado", label: "Diagnostico" },
  { value: "proposta_enviada", label: "Proposta" },
  { value: "fechado", label: "Fechado" },
  { value: "descartado", label: "Descartado" },
];

const STAGE_LABELS: Record<string, string> = Object.fromEntries(
  STAGE_OPTIONS.filter((o) => o.value).map((o) => [o.value, o.label]),
);

type SearchParams = {
  q?: string;
  stage?: string;
};

export default async function LeadsList({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const stage = params.stage?.trim() ?? "";

  if (!hasSupabaseEnv()) return null;
  const supabase = await createClient();
  let query = supabase
    .from("leads")
    .select(
      "id,name,company_name,email,pipeline_stage,next_action,created_at,updated_at",
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (stage) {
    query = query.eq("pipeline_stage", stage);
  }
  if (q) {
    query = query.or(`name.ilike.%${q}%,company_name.ilike.%${q}%`);
  }

  const { data, error } = await query;
  const leads = data ?? [];

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Leads</h1>
          <p className="mt-1 text-sm text-neutral-600">
            {leads.length} {leads.length === 1 ? "lead" : "leads"} listados
            {stage ? ` em ${STAGE_LABELS[stage] ?? stage}` : ""}
            {q ? ` para "${q}"` : ""}.
          </p>
        </div>
        <Link
          href="/admin/leads/novo"
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
        >
          + Novo lead
        </Link>
      </header>

      <form
        method="get"
        className="flex flex-wrap items-end gap-3 rounded-md border border-neutral-200 bg-white p-4"
      >
        <div className="flex-1 min-w-[220px]">
          <label htmlFor="q" className="block text-xs font-medium text-neutral-600">
            Buscar nome ou empresa
          </label>
          <input
            id="q"
            name="q"
            defaultValue={q}
            placeholder="ex: Carla, Advocacia X"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="stage" className="block text-xs font-medium text-neutral-600">
            Etapa
          </label>
          <select
            id="stage"
            name="stage"
            defaultValue={stage}
            className="mt-1 rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
          >
            {STAGE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
        >
          Filtrar
        </button>
        {(q || stage) && (
          <Link
            href="/admin/leads"
            className="text-sm text-neutral-500 underline hover:text-neutral-900"
          >
            limpar
          </Link>
        )}
      </form>

      {error ? (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          Erro ao carregar leads: {error.message}
        </p>
      ) : leads.length === 0 ? (
        <div className="rounded-md border border-dashed border-neutral-300 bg-white p-8 text-center">
          <p className="text-sm text-neutral-600">
            {q || stage
              ? "Nenhum lead encontrado com esses filtros."
              : "Nenhum lead ainda. Quem chegou pelo site cai aqui automatico, ou cadastre manualmente."}
          </p>
          <div className="mt-4 flex justify-center gap-3">
            {(q || stage) && (
              <Link
                href="/admin/leads"
                className="rounded-md border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-50"
              >
                Limpar filtros
              </Link>
            )}
            <Link
              href="/admin/leads/novo"
              className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              + Cadastrar lead manualmente
            </Link>
          </div>
        </div>
      ) : (
        <ul className="divide-y divide-neutral-200 rounded-md border border-neutral-200 bg-white">
          {leads.map((lead) => (
            <li key={lead.id}>
              <Link
                href={`/admin/leads/${lead.id}`}
                className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-neutral-50"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-medium">{lead.name}</span>
                    <span className="text-neutral-400">&middot;</span>
                    <span className="truncate text-neutral-600">
                      {lead.company_name}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-sm text-neutral-500">
                    {lead.next_action ?? lead.email}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 text-xs">
                  <StageBadge stage={lead.pipeline_stage} />
                  <span className="text-neutral-400">
                    {formatDate(lead.created_at)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StageBadge({ stage }: { stage: string }) {
  const tone = stageTone(stage);
  return (
    <span
      className={`rounded-full border px-2 py-0.5 ${tone.bg} ${tone.border} ${tone.text}`}
    >
      {STAGE_LABELS[stage] ?? stage}
    </span>
  );
}

function stageTone(stage: string) {
  if (stage === "novo_lead")
    return {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
    };
  if (stage === "fechado")
    return {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
    };
  if (stage === "descartado")
    return {
      bg: "bg-neutral-100",
      border: "border-neutral-200",
      text: "text-neutral-500",
    };
  return {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}
