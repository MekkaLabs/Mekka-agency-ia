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

export default async function AdminDashboard() {
  if (!hasSupabaseEnv()) return null;
  const supabase = await createClient();
  const now = new Date();
  const todayMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).toISOString();
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

  const [newTodayQuery, activeQuery, coldQuery, queueQuery] = await Promise.all(
    [
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
        .not("pipeline_stage", "in", "(fechado,descartado)")
        .lt("updated_at", dayAgo),
      supabase
        .from("leads")
        .select("id,name,company_name,next_action,pipeline_stage,updated_at")
        .not("next_action", "is", null)
        .not("pipeline_stage", "in", "(fechado,descartado)")
        .order("updated_at", { ascending: true })
        .limit(5),
    ],
  );

  const newToday = newTodayQuery.count ?? 0;
  const active = activeQuery.count ?? 0;
  const cold = coldQuery.count ?? 0;
  const queue = queueQuery.data ?? [];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Os tres numeros que importam hoje e a fila do que precisa de
          resposta.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Novos hoje" value={newToday} />
        <StatCard label="Ativos" value={active} />
        <StatCard
          label="Esfriando (+24h sem update)"
          value={cold}
          tone={cold > 0 ? "warn" : "neutral"}
        />
      </section>

      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm uppercase tracking-[0.18em] text-neutral-500">
            Proximas acoes
          </h2>
          <Link
            href="/admin/leads"
            className="text-sm text-neutral-500 underline hover:text-neutral-900"
          >
            ver todos
          </Link>
        </div>

        {queue.length === 0 ? (
          <p className="mt-4 rounded-md border border-dashed border-neutral-300 bg-white p-6 text-sm text-neutral-500">
            Nenhuma proxima acao na fila. Quando voce tiver leads com{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5">
              next_action
            </code>{" "}
            definida, aparecem aqui.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-neutral-200 rounded-md border border-neutral-200 bg-white">
            {queue.map((lead) => (
              <li key={lead.id}>
                <Link
                  href={`/admin/leads/${lead.id}`}
                  className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-neutral-50"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-medium">{lead.name}</span>
                      <span className="text-neutral-400">&middot;</span>
                      <span className="truncate text-neutral-600">
                        {lead.company_name}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-neutral-500">
                      {lead.next_action}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 text-xs text-neutral-400">
                    <span>{STAGE_LABELS[lead.pipeline_stage] ?? lead.pipeline_stage}</span>
                    <span>{formatRelative(lead.updated_at)}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: number;
  tone?: "neutral" | "warn";
}) {
  return (
    <div
      className={`rounded-md border bg-white p-5 ${
        tone === "warn" ? "border-amber-300" : "border-neutral-200"
      }`}
    >
      <p className="text-xs uppercase tracking-[0.15em] text-neutral-500">
        {label}
      </p>
      <p
        className={`mt-2 text-3xl font-semibold ${
          tone === "warn" ? "text-amber-700" : "text-neutral-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
