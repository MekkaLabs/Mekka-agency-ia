"use client";

import { useActionState } from "react";
import {
  updateLeadStage,
  type ActionState,
  type LeadStage,
} from "../../../actions";

const initialState: ActionState = { status: "idle" };

const STAGES: { value: LeadStage; label: string }[] = [
  { value: "novo_lead", label: "Novo" },
  { value: "em_contato", label: "Em contato" },
  { value: "qualificado", label: "Qualificado" },
  { value: "diagnostico_agendado", label: "Diagnostico" },
  { value: "proposta_enviada", label: "Proposta" },
  { value: "fechado", label: "Fechado" },
  { value: "descartado", label: "Descartado" },
];

export function LeadStageForm({
  leadId,
  current,
}: {
  leadId: string;
  current: string;
}) {
  const bound = updateLeadStage.bind(null, leadId);
  const [state, formAction, pending] = useActionState(bound, initialState);

  return (
    <form action={formAction} className="space-y-2">
      <label className="block text-xs font-medium text-neutral-600">
        Etapa
      </label>
      <div className="flex items-stretch gap-2">
        <select
          name="stage"
          defaultValue={current}
          className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
        >
          {STAGES.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={pending}
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "..." : "Salvar"}
        </button>
      </div>
      <FormMessage state={state} />
    </form>
  );
}

function FormMessage({ state }: { state: ActionState }) {
  if (state.status === "error" && state.message) {
    return (
      <p className="rounded-md bg-red-50 px-2 py-1 text-xs text-red-700">
        {state.message}
      </p>
    );
  }
  if (state.status === "ok" && state.message) {
    return (
      <p className="rounded-md bg-emerald-50 px-2 py-1 text-xs text-emerald-700">
        {state.message}
      </p>
    );
  }
  return null;
}
