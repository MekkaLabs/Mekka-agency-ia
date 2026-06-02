"use client";

import { useActionState, useEffect, useRef } from "react";
import { addLeadNote, type ActionState } from "../../../actions";
import { fieldCls, primaryBtn, errorMsgSm } from "../../_components/form-styles";

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
      className="rounded-xl border border-white/[0.08] bg-surface/50 p-4"
    >
      <textarea
        name="body"
        rows={3}
        required
        placeholder="o que voce conversou, decidiu ou precisa lembrar..."
        className={fieldCls}
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        {state.status === "error" && state.message ? (
          <p className={errorMsgSm}>{state.message}</p>
        ) : (
          <span className="text-xs text-ink-faint">
            {state.status === "ok" ? state.message : ""}
          </span>
        )}
        <button type="submit" disabled={pending} className={primaryBtn}>
          {pending ? "Adicionando..." : "Adicionar nota"}
        </button>
      </div>
    </form>
  );
}
