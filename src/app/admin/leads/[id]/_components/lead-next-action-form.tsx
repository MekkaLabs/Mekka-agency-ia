"use client";

import { useActionState } from "react";
import { updateLeadNextAction, type ActionState } from "../../../actions";

const initialState: ActionState = { status: "idle" };

export function LeadNextActionForm({
  leadId,
  current,
}: {
  leadId: string;
  current: string | null;
}) {
  const bound = updateLeadNextAction.bind(null, leadId);
  const [state, formAction, pending] = useActionState(bound, initialState);

  return (
    <form action={formAction} className="space-y-2">
      <label className="block text-xs font-medium text-neutral-600">
        Proxima acao
      </label>
      <div className="flex items-stretch gap-2">
        <input
          name="next_action"
          defaultValue={current ?? ""}
          placeholder="ex: ligar amanha 10h"
          className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "..." : "Salvar"}
        </button>
      </div>
      {state.status === "error" && state.message ? (
        <p className="rounded-md bg-red-50 px-2 py-1 text-xs text-red-700">
          {state.message}
        </p>
      ) : null}
      {state.status === "ok" && state.message ? (
        <p className="rounded-md bg-emerald-50 px-2 py-1 text-xs text-emerald-700">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
