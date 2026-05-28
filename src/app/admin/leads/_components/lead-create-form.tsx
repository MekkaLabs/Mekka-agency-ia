"use client";

import { useActionState } from "react";
import { createLeadInternal, type ActionState } from "../../actions";

const initialState: ActionState = { status: "idle" };

export function LeadCreateForm() {
  const [state, formAction, pending] = useActionState(
    createLeadInternal,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
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
            inputMode="tel"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-900 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="source" className="block text-sm font-medium">
          Origem
        </label>
        <select
          id="source"
          name="source"
          defaultValue="manual"
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-900 focus:outline-none md:w-64"
        >
          <option value="manual">Manual</option>
          <option value="indicacao">Indicacao</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Email</option>
          <option value="evento">Evento</option>
          <option value="linkedin">LinkedIn</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      <div>
        <label htmlFor="pain_point" className="block text-sm font-medium">
          Dor declarada <span className="text-neutral-400">(opcional)</span>
        </label>
        <textarea
          id="pain_point"
          name="pain_point"
          rows={3}
          placeholder="o que voce sabe sobre o que esta lead precisa..."
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
        className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Criando..." : "Criar lead"}
      </button>
    </form>
  );
}
