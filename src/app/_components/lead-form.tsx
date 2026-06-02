"use client";

import { useActionState } from "react";
import { captureLead, type CaptureLeadState } from "../actions";

const initialState: CaptureLeadState = { status: "idle" };

const fieldCls =
  "mt-1 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent/60 focus:bg-white/[0.05] focus:outline-none";

const labelCls = "block text-xs font-medium text-ink-muted";

export function LeadForm() {
  const [state, formAction, pending] = useActionState(
    captureLead,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className={labelCls}>
          Seu nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={fieldCls}
        />
      </div>

      <div>
        <label htmlFor="company" className={labelCls}>
          Empresa
        </label>
        <input
          id="company"
          name="company"
          type="text"
          required
          autoComplete="organization"
          className={fieldCls}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldCls}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Telefone <span className="text-ink-faint">(opcional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={fieldCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="pain_point" className={labelCls}>
          Sua maior dor com atendimento hoje{" "}
          <span className="text-ink-faint">(opcional)</span>
        </label>
        <textarea
          id="pain_point"
          name="pain_point"
          rows={3}
          className={fieldCls}
        />
      </div>

      {state.status === "error" && state.message ? (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-ink px-5 py-3 text-sm font-semibold text-bg transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Enviando..." : "Quero parar de perder lead"}
      </button>

      <p className="text-center text-xs text-ink-faint">
        Respondemos em até 1 hora útil.
      </p>
    </form>
  );
}
