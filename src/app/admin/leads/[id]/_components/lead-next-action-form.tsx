"use client";

import { useActionState } from "react";
import { updateLeadNextAction, type ActionState } from "../../../actions";
import {
  fieldCls,
  labelCls,
  secondaryBtn,
  errorMsgSm,
  okMsgSm,
} from "../../_components/form-styles";

const initialState: ActionState = { status: "idle" };

export function LeadNextActionForm({
  leadId,
  current,
  due,
}: {
  leadId: string;
  current: string | null;
  due: string | null;
}) {
  const bound = updateLeadNextAction.bind(null, leadId);
  const [state, formAction, pending] = useActionState(bound, initialState);

  return (
    <form action={formAction} className="space-y-2">
      <label className={labelCls}>Próxima ação</label>
      <input
        name="next_action"
        defaultValue={current ?? ""}
        placeholder="ex: ligar amanhã 10h"
        className={`${fieldCls} mt-0`}
      />
      <div className="flex items-stretch gap-2">
        <input
          type="date"
          name="next_action_due"
          defaultValue={due ?? ""}
          className={`${fieldCls} mt-0 [color-scheme:dark]`}
          aria-label="Prazo da próxima ação"
        />
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
