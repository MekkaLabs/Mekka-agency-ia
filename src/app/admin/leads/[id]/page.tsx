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
          <LeadNextActionForm leadId={lead.id} current={lead.next_action} />
          <LeadRespondButton leadId={lead.id} />
        </div>
      </section>

      <section>
        <h2 className="text-xs uppercase tracking-[0.18em] text-ink-faint">
          Notas internas
        </h2>

        <div className="mt-4">
          <LeadNoteForm leadId={lead.id} />
        </div>

        {notes.length === 0 ? (
          <p className="mt-4 rounded-xl border border-dashed border-white/10 bg-surface/40 p-5 text-sm text-ink-muted">
            Nenhuma nota ainda.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {notes.map((note) => (
              <li
                key={note.id}
                className="rounded-xl border border-white/[0.08] bg-surface/50 p-4"
              >
                <p className="whitespace-pre-wrap text-sm text-ink">
                  {note.body}
                </p>
                <p className="mt-2 text-xs text-ink-faint">
                  {new Date(note.created_at).toLocaleString("pt-BR")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
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
