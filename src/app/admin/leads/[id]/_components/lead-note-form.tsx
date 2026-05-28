"use client";

import { useActionState, useEffect, useRef } from "react";
import { addLeadNote, type ActionState } from "../../../actions";

const initialState: ActionState = { status: "idle" };

export function LeadNoteForm({ leadId }: { leadId: string }) {
  const bound = addLeadNote.bind(null, leadId);
  const [state, formAction, pending] = useActionState(bound, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Limpa o textarea apos um insert bem sucedido.
  useEffect(() => {
    if (state.status === "ok") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-md border border-neutral-200 bg-white p-4"
    >
      <textarea
        name="body"
        rows={3}
        required
        placeholder="o que voce conversou, decidiu ou precisa lembrar..."
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        {state.status === "error" && state.message ? (
          <p className="rounded-md bg-red-50 px-2 py-1 text-xs text-red-700">
            {state.message}
          </p>
        ) : (
          <span className="text-xs text-neutral-400">
            {state.status === "ok" ? state.message : ""}
          </span>
        )}
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Adicionando..." : "Adicionar nota"}
        </button>
      </div>
    </form>
  );
}
