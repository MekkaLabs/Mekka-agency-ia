"use client";

import { useActionState } from "react";
import { captureLead, type CaptureLeadState } from "../actions";

const initialState: CaptureLeadState = { status: "idle" };

export function LeadForm() {
  const [state, formAction, pending] = useActionState(
    captureLead,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Seu nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-900 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium">
          Empresa
        </label>
        <input
          id="company"
          name="company"
          type="text"
          required
          autoComplete="organization"
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-900 focus:outline-none"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-900 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Telefone <span className="text-neutral-400">(opcional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-900 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="pain_point" className="block text-sm font-medium">
          Qual sua maior dor com atendimento hoje?{" "}
          <span className="text-neutral-400">(opcional)</span>
        </label>
        <textarea
          id="pain_point"
          name="pain_point"
          rows={3}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-900 focus:outline-none"
        />
      </div>

      {state.status === "error" && state.message ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
      >
        {pending ? "Enviando..." : "Quero parar de perder lead"}
      </button>
    </form>
  );
}
