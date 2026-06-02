import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

const STAGE_LABELS: Record<string, string> = {
  novo_lead: "Novo",
  em_contato: "Em contato",
  qualificado: "Qualificado",
  diagnostico_agendado: "Diagnostico",
  proposta_enviada: "Proposta",
  fechado: "Fechado",
  descartado: "Descartado",
};

function formatRelative(iso: string) {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.round(diffMs / 60000);
  if (diffMin < 1) return "agora";
  if (diffMin < 60) return `${diffMin} min`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 48) return `${diffHr}h`;
  const diffDay = Math.round(diffHr / 24);
  return `${diffDay}d`;
}

function formatDuration(ms: number) {
  const min = Math.round(ms / 60000);
  if (min < 60) return `${min} min`;
  const hr = Math.round((min / 60) * 10) / 10;
  if (hr < 48) return `${hr}h`;
  const days = Math.round((hr / 24) * 10) / 10;
  return `${days}d`;
}

export default async function AdminDashboard() {
  if (!hasSupabaseEnv()) return null;
  const supabase = await createClient();
  const now = new Date();
  const todayMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).toISOString();
  const monthStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
  ).toISOString();
  const hourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
  const todayDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const [
    newTodayQuery,
    activeQuery,
    waitingQuery,
    ttfrQuery,
    overdueQuery,
    queueQuery,
  ] = await Promise.all([
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .gte("created_at", todayMidnight),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .not("pipeline_stage", "in", "(fechado,descartado)"),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .is("first_response_at", null)
      .not("pipeline_stage", "in", "(fechado,descartado)")
      .lt("created_at", hourAgo),
    supabase
      .from("leads")
      .select("created_at,first_response_at")
      .not("first_response_at", "is", null)
      .gte("first_response_at", monthStart),
    supabase
      .from("leads")
      .select("id,name,company_name,next_action,next_action_due,pipeline_stage")
      .not("next_action_due", "is", null)
      .lt("next_action_due", todayDate)
      .not("pipeline_stage", "in", "(fechado,descartado)")
      .order("next_action_due", { ascending: true })
      .limit(10),
    supabase
      .from("leads")
      .select(
        "id,name,company_name,next_action,pipeline_stage,updated_at,created_at,first_response_at",
      )
      .not("next_action", "is", null)
      .not("pipeline_stage", "in", "(fechado,descartado)")
      .order("updated_at", { ascending: true })
      .limit(5),
  ]);

  const newToday = newTodayQuery.count ?? 0;
  const active = activeQuery.count ?? 0;
  const waiting = waitingQuery.count ?? 0;
  const overdue = overdueQuery.data ?? [];
  const queue = queueQuery.data ?? [];
  const nowMs = now.getTime();

  function daysSince(iso: string) {
    return Math.floor((nowMs - new Date(iso).getTime()) / 86400000);
  }

  // Media de TTFR no mes corrente.
  const ttfrSamples = ttfrQuery.data ?? [];
  let ttfrLabel = "—";
  if (ttfrSamples.length > 0) {
    const totalMs = ttfrSamples.reduce((sum, l) => {
      const created = new Date(l.created_at).getTime();
      const responded = new Date(
        l.first_response_at as unknown as string,
      ).getTime();
      return sum + Math.max(0, responded - created);
    }, 0);
    ttfrLabel = formatDuration(totalMs / ttfrSamples.length);
  }

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Os quatro números que importam hoje e a fila do que precisa de
          resposta.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Novos hoje" value={String(newToday)} />
        <StatCard label="Ativos" value={String(active)} />
        <StatCard
          label="Aguardando 1a resposta (>1h)"
          value={String(waiting)}
          tone={waiting > 0 ? "warn" : "neutral"}
        />
        <StatCard
          label="Ação atrasada"
          value={String(overdue.length)}
          tone={overdue.length > 0 ? "warn" : "neutral"}
          sub="prazo vencido"
        />
      </section>

      {overdue.length > 0 ? (
        <section>
          <h2 className="text-sm uppercase tracking-[0.18em] text-red-300">
            Pendências atrasadas
          </h2>
          <ul className="mt-4 divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-red-500/20 bg-red-500/[0.04]">
            {overdue.map((lead) => (
              <li key={lead.id}>
                <Link
                  href={`/admin/leads/${lead.id}`}
                  className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-white/[0.03]"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-medium text-ink">
                        {lead.name}
                      </span>
                      <span className="text-ink-faint">&middot;</span>
                      <span className="truncate text-ink-muted">
                        {lead.company_name}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-ink-faint">
                      {lead.next_action}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-xs text-red-300">
                    venceu{" "}
                    {new Date(
                      lead.next_action_due as unknown as string,
                    ).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm uppercase tracking-[0.18em] text-ink-faint">
            Próximas ações
          </h2>
          <Link
            href="/admin/leads"
            className="text-sm text-ink-muted underline-offset-4 hover:text-ink hover:underline"
          >
            ver todos
          </Link>
        </div>

        {queue.length === 0 ? (
          <p className="mt-4 rounded-xl border border-dashed border-white/10 bg-surface/40 p-6 text-sm text-ink-muted">
            Nenhuma próxima ação na fila. Quando você tiver leads com{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5">
              next_action
            </code>{" "}
            definida, aparecem aqui.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/[0.08] bg-surface/50">
            {queue.map((lead) => {
              const waitingHours =
                lead.first_response_at === null
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
                    <div className="min-w-0">
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
                        ) : daysSince(lead.updated_at) >= 3 ? (
                          <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-xs text-amber-300">
                            parado {daysSince(lead.updated_at)}d
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-0.5 truncate text-sm text-ink-faint">
                        {lead.next_action}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3 text-xs text-ink-faint">
                      <span>
                        {STAGE_LABELS[lead.pipeline_stage] ??
                          lead.pipeline_stage}
                      </span>
                      <span>{formatRelative(lead.updated_at)}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  tone = "neutral",
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "neutral" | "warn";
}) {
  return (
    <div
      className={`rounded-xl border bg-surface/50 p-5 ${
        tone === "warn" ? "border-amber-500/30" : "border-white/[0.08]"
      }`}
    >
      <p className="text-xs uppercase tracking-[0.15em] text-ink-faint">
        {label}
      </p>
      <p
        className={`font-display mt-2 text-3xl font-semibold ${
          tone === "warn" ? "text-amber-300" : "text-ink"
        }`}
      >
        {value}
      </p>
      {sub ? <p className="mt-1 text-xs text-ink-faint">{sub}</p> : null}
    </div>
  );
}
