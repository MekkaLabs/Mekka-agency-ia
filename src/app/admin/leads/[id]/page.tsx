import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import {
  addLeadNote,
  markLeadResponded,
  updateLeadNextAction,
  updateLeadStage,
  type LeadStage,
} from "../../actions";

const STAGE_OPTIONS: { value: LeadStage; label: string }[] = [
  { value: "novo_lead", label: "Novo" },
  { value: "em_contato", label: "Em contato" },
  { value: "qualificado", label: "Qualificado" },
  { value: "diagnostico_agendado", label: "Diagnostico" },
  { value: "proposta_enviada", label: "Proposta" },
  { value: "fechado", label: "Fechado" },
  { value: "descartado", label: "Descartado" },
];

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

  async function changeStage(formData: FormData) {
    "use server";
    const stage = String(formData.get("stage") ?? "") as LeadStage;
    if (stage) await updateLeadStage(id, stage);
  }

  async function changeNextAction(formData: FormData) {
    "use server";
    const value = String(formData.get("next_action") ?? "");
    await updateLeadNextAction(id, value);
  }

  async function respond() {
    "use server";
    await markLeadResponded(id);
  }

  async function createNote(formData: FormData) {
    "use server";
    const body = String(formData.get("body") ?? "");
    await addLeadNote(id, body);
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/leads"
          className="text-sm text-neutral-500 underline hover:text-neutral-900"
        >
          &larr; todos os leads
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">{lead.name}</h1>
        <p className="text-neutral-600">{lead.company_name}</p>
      </div>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-md border border-neutral-200 bg-white p-5">
          <h2 className="text-xs uppercase tracking-[0.18em] text-neutral-500">
            Contato
          </h2>
          <dl className="mt-3 space-y-2 text-sm">
            <Row label="Email" value={lead.email} />
            <Row label="Telefone" value={lead.phone ?? "—"} />
            <Row label="Origem" value={lead.source} />
            <Row
              label="Criado em"
              value={new Date(lead.created_at).toLocaleString("pt-BR")}
            />
          </dl>
        </div>

        <div className="rounded-md border border-neutral-200 bg-white p-5">
          <h2 className="text-xs uppercase tracking-[0.18em] text-neutral-500">
            Dor declarada
          </h2>
          <p className="mt-3 whitespace-pre-wrap text-sm text-neutral-700">
            {lead.pain_point ?? <em className="text-neutral-400">vazio</em>}
          </p>
        </div>
      </section>

      <section className="rounded-md border border-neutral-200 bg-white p-5">
        <h2 className="text-xs uppercase tracking-[0.18em] text-neutral-500">
          Etapa e proxima acao
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <form action={changeStage} className="flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-neutral-600">
                Etapa
              </label>
              <select
                name="stage"
                defaultValue={lead.pipeline_stage}
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
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
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-50"
            >
              Salvar
            </button>
          </form>

          <form action={changeNextAction} className="flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-neutral-600">
                Proxima acao
              </label>
              <input
                name="next_action"
                defaultValue={lead.next_action ?? ""}
                placeholder="ex: ligar amanha 10h"
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-50"
            >
              Salvar
            </button>
          </form>

          <form action={respond} className="md:self-end">
            <button
              type="submit"
              className="w-full rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Marcar respondido
            </button>
          </form>
        </div>
      </section>

      <section>
        <h2 className="text-xs uppercase tracking-[0.18em] text-neutral-500">
          Notas internas
        </h2>

        <form
          action={createNote}
          className="mt-4 rounded-md border border-neutral-200 bg-white p-4"
        >
          <textarea
            name="body"
            rows={3}
            required
            placeholder="o que voce conversou, decidiu ou precisa lembrar..."
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
          />
          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Adicionar nota
            </button>
          </div>
        </form>

        {notes.length === 0 ? (
          <p className="mt-4 rounded-md border border-dashed border-neutral-300 bg-white p-5 text-sm text-neutral-500">
            Nenhuma nota ainda.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {notes.map((note) => (
              <li
                key={note.id}
                className="rounded-md border border-neutral-200 bg-white p-4"
              >
                <p className="whitespace-pre-wrap text-sm text-neutral-800">
                  {note.body}
                </p>
                <p className="mt-2 text-xs text-neutral-400">
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
      <dt className="text-neutral-500">{label}</dt>
      <dd className="text-right text-neutral-900">{value}</dd>
    </div>
  );
}
