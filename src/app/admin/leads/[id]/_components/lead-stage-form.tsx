"use client";

import { useActionState } from "react";
import {
  updateLeadStage,
  type ActionState,
  type LeadStage,
} from "../../../actions";
import {
  fieldCls,
  labelCls,
  secondaryBtn,
  errorMsgSm,
  okMsgSm,
} from "../../_components/form-styles";

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
      <label className={labelCls}>Etapa</label>
      <div className="flex items-stretch gap-2">
        <select name="stage" defaultValue={current} className={`${fieldCls} mt-0`}>
          {STAGES.map((o) => (
            <option key={o.value} value={o.value} className="bg-elevated">
              {o.label}
            </option>
          ))}
        </select>
        <button type="submit" disabled={pending} className={secondaryBtn}>
          {pending ? "..." : "Salvar"}
        </button>
      </div>
      {state.status === "error" && state.message ? (
        <p className={errorMsgSm}>{state.message}</p>
      ) : null}
      {state.status === "ok" && state.message ? (
        <p className={okMsgSm}>{state.message}</p>
      ) : null}
    </form>
  );
}
