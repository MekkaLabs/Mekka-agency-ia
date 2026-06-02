import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { LeadEditForm } from "./_components/lead-edit-form";
import { LeadStageForm } from "./_components/lead-stage-form";
import { LeadNextActionForm } from "./_components/lead-next-action-form";
import { LeadRespondButton } from "./_components/lead-respond-button";
import { LeadNoteForm } from "./_components/lead-note-form";

type Note = {
  id: string;
  body: string;
  created_at: string;
};

export default async function LeadDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!hasSupabaseEnv()) return null;
  const supabase = await createClient();

  const [leadRes, notesRes] = await Promise.all([
    supabase.from("leads").select("*").eq("id", id).single(),
    supabase
      .from("notes")
      .select("id,body,created_at")
      .eq("related_type", "lead")
      .eq("related_id", id)
      .order("created_at", { ascending: false }),
  ]);

  if (leadRes.error || !leadRes.data) notFound();
  const lead = leadRes.data;
  const notes: Note[] = notesRes.data ?? [];

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/leads"
          className="text-sm text-ink-muted underline-offset-4 hover:text-ink hover:underline"
        >
          &larr; todos os leads
        </Link>
        <h1 className="font-display mt-2 text-2xl font-semibold">
          {lead.name}
        </h1>
        <p className="text-ink-muted">{lead.company_name}</p>
      </div>

      <section className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="rounded-xl border border-white/[0.08] bg-surface/50 p-5">
          <h2 className="text-xs uppercase tracking-[0.18em] text-ink-faint">
            Dados do lead
          </h2>
          <div className="mt-4">
            <LeadEditForm lead={lead} />
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-surface/50 p-5">
          <h2 className="text-xs uppercase tracking-[0.18em] text-ink-faint">
            Meta
          </h2>
          <dl className="mt-3 space-y-2 text-sm">
            <Row label="Origem" value={lead.source} />
            <Row
              label="Criado"
              value={new Date(lead.created_at).toLocaleString("pt-BR")}
            />
            <Row
              label="Atualizado"
              value={new Date(lead.updated_at).toLocaleString("pt-BR")}
            />
          </dl>
        </div>
      </section>

      <section className="rounded-xl border border-white/[0.08] bg-surface/50 p-5">
        <h2 className="text-xs uppercase tracking-[0.18em] text-ink-faint">
          Etapa e próxima ação
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <LeadStageForm leadId={lead.id} current={lead.pipeline_stage} />
          <LeadNextActionForm
            leadId={lead.id}
            current={lead.next_action}
            due={lead.next_action_due ?? null}
          />
          <LeadRespondButton leadId={lead.id} />
        </div>
      </section>

      <section>
        <h2 className="text-xs uppercase tracking-[0.18em] text-ink-faint">
          Atividade
        </h2>

        <div className="mt-4">
          <LeadNoteForm leadId={lead.id} />
        </div>

        <Timeline lead={lead} notes={notes} />
      </section>
    </div>
  );
}

type TimelineEvent = {
  at: string;
  kind: "created" | "response" | "note";
  label: string;
  body?: string;
};

function Timeline({
  lead,
  notes,
}: {
  lead: {
    created_at: string;
    first_response_at: string | null;
    source: string;
  };
  notes: Note[];
}) {
  const events: TimelineEvent[] = [
    {
      at: lead.created_at,
      kind: "created",
      label: `Lead criado · origem ${lead.source}`,
    },
  ];
  if (lead.first_response_at) {
    events.push({
      at: lead.first_response_at,
      kind: "response",
      label: "Primeira resposta enviada",
    });
  }
  for (const n of notes) {
    events.push({ at: n.created_at, kind: "note", label: "Nota", body: n.body });
  }
  events.sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());

  const dot: Record<TimelineEvent["kind"], string> = {
    created: "bg-emerald-400",
    response: "bg-sky-400",
    note: "bg-accent",
  };

  return (
    <ol className="mt-6 space-y-0">
      {events.map((ev, i) => (
        <li key={`${ev.kind}-${ev.at}-${i}`} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${dot[ev.kind]}`} />
            {i < events.length - 1 ? (
              <span className="w-px flex-1 bg-white/10" />
            ) : null}
          </div>
          <div className="pb-6">
            <p className="text-sm text-ink">{ev.label}</p>
            {ev.body ? (
              <p className="mt-1 whitespace-pre-wrap rounded-lg border border-white/[0.08] bg-surface/50 p-3 text-sm text-ink-muted">
                {ev.body}
              </p>
            ) : null}
            <p className="mt-1 text-xs text-ink-faint">
              {new Date(ev.at).toLocaleString("pt-BR")}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-ink-faint">{label}</dt>
      <dd className="text-right text-ink">{value}</dd>
    </div>
  );
}
