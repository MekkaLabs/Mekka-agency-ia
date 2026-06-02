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

const fieldCls =
  "mt-1 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-accent/60 focus:bg-white/[0.05] focus:outline-none";

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
      "id,name,company_name,email,pipeline_stage,next_action,created_at,updated_at,first_response_at",
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
  // Server component runs once per request; capturing now is deterministic.
  // eslint-disable-next-line react-hooks/purity
  const nowMs = Date.now();

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Leads</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {leads.length} {leads.length === 1 ? "lead" : "leads"} listados
            {stage ? ` em ${STAGE_LABELS[stage] ?? stage}` : ""}
            {q ? ` para "${q}"` : ""}.
          </p>
        </div>
        <Link
          href="/admin/leads/novo"
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-bg transition hover:bg-white/90"
        >
          + Novo lead
        </Link>
      </header>

      <form
        method="get"
        className="flex flex-wrap items-end gap-3 rounded-xl border border-white/[0.08] bg-surface/50 p-4"
      >
        <div className="min-w-[220px] flex-1">
          <label htmlFor="q" className="block text-xs font-medium text-ink-muted">
            Buscar nome ou empresa
          </label>
          <input
            id="q"
            name="q"
            defaultValue={q}
            placeholder="ex: Carla, Advocacia X"
            className={fieldCls}
          />
        </div>
        <div>
          <label
            htmlFor="stage"
            className="block text-xs font-medium text-ink-muted"
          >
            Etapa
          </label>
          <select id="stage" name="stage" defaultValue={stage} className={fieldCls}>
            {STAGE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-elevated">
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-ink transition hover:bg-white/10"
        >
          Filtrar
        </button>
        {(q || stage) && (
          <Link
            href="/admin/leads"
            className="text-sm text-ink-muted underline-offset-4 hover:text-ink hover:underline"
          >
            limpar
          </Link>
        )}
      </form>

      {error ? (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          Erro ao carregar leads: {error.message}
        </p>
      ) : leads.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 bg-surface/40 p-8 text-center">
          <p className="text-sm text-ink-muted">
            {q || stage
              ? "Nenhum lead encontrado com esses filtros."
              : "Nenhum lead ainda. Quem chegou pelo site cai aqui automático, ou cadastre manualmente."}
          </p>
          <div className="mt-4 flex justify-center gap-3">
            {(q || stage) && (
              <Link
                href="/admin/leads"
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
              >
                Limpar filtros
              </Link>
            )}
            <Link
              href="/admin/leads/novo"
              className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-bg hover:bg-white/90"
            >
              + Cadastrar lead manualmente
            </Link>
          </div>
        </div>
      ) : (
        <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/[0.08] bg-surface/50">
          {leads.map((lead) => {
            const waitingHours =
              lead.first_response_at === null &&
              !["fechado", "descartado"].includes(lead.pipeline_stage)
                ? Math.round(
                    (nowMs - new Date(lead.created_at).getTime()) / 3600000,
                  )
                : null;
            return (
              <li key={lead.id}>
                <Link
                  href={`/admin/leads/${lead.id}`}
                  className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-white/[0.03]"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-medium text-ink">
                        {lead.name}
                      </span>
                      <span className="text-ink-faint">&middot;</span>
                      <span className="truncate text-ink-muted">
                        {lead.company_name}
                      </span>
                      {waitingHours !== null && waitingHours >= 1 ? (
                        <span className="rounded-full border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-xs text-red-300">
                          aguardando {waitingHours}h
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-0.5 truncate text-sm text-ink-faint">
                      {lead.next_action ?? lead.email}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 text-xs">
                    <StageBadge stage={lead.pipeline_stage} />
                    <span className="text-ink-faint">
                      {formatDate(lead.created_at)}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function StageBadge({ stage }: { stage: string }) {
  const tone = stageTone(stage);
  return (
    <span className={`rounded-full border px-2 py-0.5 ${tone}`}>
      {STAGE_LABELS[stage] ?? stage}
    </span>
  );
}

function stageTone(stage: string) {
  if (stage === "novo_lead")
    return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300";
  if (stage === "fechado")
    return "border-sky-500/20 bg-sky-500/10 text-sky-300";
  if (stage === "descartado")
    return "border-white/10 bg-white/5 text-ink-faint";
  return "border-amber-500/20 bg-amber-500/10 text-amber-300";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}
