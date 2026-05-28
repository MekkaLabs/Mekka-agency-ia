"use client";

import { useActionState } from "react";
import { markLeadResponded, type ActionState } from "../../../actions";

const initialState: ActionState = { status: "idle" };

export function LeadRespondButton({ leadId }: { leadId: string }) {
  const bound = markLeadResponded.bind(null, leadId);
  const [state, formAction, pending] = useActionState(bound, initialState);

  return (
    <form action={formAction} className="space-y-2 md:self-end">
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Marcando..." : "Marcar respondido"}
      </button>
      {state.status === "error" && state.message ? (
        <p className="rounded-md bg-red-50 px-2 py-1 text-xs text-red-700">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
