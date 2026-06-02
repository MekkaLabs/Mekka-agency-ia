import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { moveLeadStage, type LeadStage } from "../actions";

const STAGES: { value: LeadStage; label: string; accent: string }[] = [
  { value: "novo_lead", label: "Novo", accent: "text-emerald-300" },
  { value: "em_contato", label: "Em contato", accent: "text-amber-300" },
  { value: "qualificado", label: "Qualificado", accent: "text-amber-300" },
  {
    value: "diagnostico_agendado",
    label: "Diagnóstico",
    accent: "text-sky-300",
  },
  { value: "proposta_enviada", label: "Proposta", accent: "text-violet-300" },
  { value: "fechado", label: "Fechado", accent: "text-blue-300" },
  { value: "descartado", label: "Descartado", accent: "text-ink-faint" },
];

const ORDER = STAGES.map((s) => s.value);

type LeadRow = {
  id: string;
  name: string;
  company_name: string;
  pipeline_stage: LeadStage;
  next_action: string | null;
};

export default async function PipelinePage() {
  if (!hasSupabaseEnv()) return null;
  const supabase = await createClient();

  const { data } = await supabase
    .from("leads")
    .select("id,name,company_name,pipeline_stage,next_action")
    .order("updated_at", { ascending: false })
    .limit(300);

  const leads = (data ?? []) as LeadRow[];
  const byStage = new Map<LeadStage, LeadRow[]>();
  for (const s of ORDER) byStage.set(s, []);
  for (const lead of leads) {
    const list = byStage.get(lead.pipeline_stage);
    if (list) list.push(lead);
    else byStage.set(lead.pipeline_stage, [lead]);
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Pipeline</h1>
          <p className="mt-1 text-sm text-ink-muted">
            O funil inteiro de relance. Mova com as setas — atualiza na hora.
          </p>
        </div>
        <Link
          href="/admin/leads/novo"
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-bg transition hover:bg-white/90"
        >
          + Novo lead
        </Link>
      </header>

      <div className="-mx-6 overflow-x-auto px-6 pb-4">
        <div className="flex min-w-max gap-4">
          {STAGES.map((stage) => {
            const items = byStage.get(stage.value) ?? [];
            const idx = ORDER.indexOf(stage.value);
            const prev = idx > 0 ? ORDER[idx - 1] : null;
            const next = idx < ORDER.length - 1 ? ORDER[idx + 1] : null;

            return (
              <div key={stage.value} className="flex w-72 shrink-0 flex-col">
                <div className="mb-3 flex items-center justify-between px-1">
                  <span className={`text-sm font-semibold ${stage.accent}`}>
                    {stage.label}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-ink-muted">
                    {items.length}
                  </span>
                </div>

                <div className="flex flex-col gap-2 rounded-2xl border border-white/[0.06] bg-surface/30 p-2">
                  {items.length === 0 ? (
                    <p className="px-2 py-6 text-center text-xs text-ink-faint">
                      vazio
                    </p>
                  ) : (
                    items.map((lead) => (
                      <div
                        key={lead.id}
                        className="rounded-xl border border-white/[0.08] bg-surface/60 p-3"
                      >
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="block"
                        >
                          <p className="truncate text-sm font-medium text-ink hover:text-accent-soft">
                            {lead.name}
                          </p>
                          <p className="truncate text-xs text-ink-muted">
                            {lead.company_name}
                          </p>
                          {lead.next_action ? (
                            <p className="mt-1.5 truncate text-xs text-ink-faint">
                              → {lead.next_action}
                            </p>
                          ) : null}
                        </Link>

                        <div className="mt-2.5 flex items-center justify-between gap-2">
                          {prev ? (
                            <form action={moveLeadStage}>
                              <input type="hidden" name="leadId" value={lead.id} />
                              <input type="hidden" name="stage" value={prev} />
                              <button
                                type="submit"
                                title="Voltar etapa"
                                className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/5 text-ink-muted transition hover:bg-white/10 hover:text-ink"
                              >
                                ←
                              </button>
                            </form>
                          ) : (
                            <span className="h-6 w-6" />
                          )}

                          {next ? (
                            <form action={moveLeadStage}>
                              <input type="hidden" name="leadId" value={lead.id} />
                              <input type="hidden" name="stage" value={next} />
                              <button
                                type="submit"
                                title="Avançar etapa"
                                className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/5 text-ink-muted transition hover:bg-white/10 hover:text-ink"
                              >
                                →
                              </button>
                            </form>
                          ) : (
                            <span className="h-6 w-6" />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
