"use client";

import { useActionState } from "react";
import { markLeadResponded, type ActionState } from "../../../actions";
import { primaryBtn, errorMsgSm } from "../../_components/form-styles";

const initialState: ActionState = { status: "idle" };

export function LeadRespondButton({ leadId }: { leadId: string }) {
  const bound = markLeadResponded.bind(null, leadId);
  const [state, formAction, pending] = useActionState(bound, initialState);

  return (
    <form action={formAction} className="space-y-2 md:self-end">
      <button
        type="submit"
        disabled={pending}
        className={`${primaryBtn} w-full`}
      >
        {pending ? "Marcando..." : "Marcar respondido"}
      </button>
      {state.status === "error" && state.message ? (
        <p className={errorMsgSm}>{state.message}</p>
      ) : null}
    </form>
  );
}
