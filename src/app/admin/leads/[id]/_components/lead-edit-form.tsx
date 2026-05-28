"use client";

import { useActionState } from "react";
import { updateLeadCore, type ActionState } from "../../../actions";

const initialState: ActionState = { status: "idle" };

type Lead = {
  id: string;
  name: string;
  company_name: string;
  email: string;
  phone: string | null;
  pain_point: string | null;
};

export function LeadEditForm({ lead }: { lead: Lead }) {
  const boundAction = updateLeadCore.bind(null, lead.id);
  const [state, formAction, pending] = useActionState(boundAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={lead.name}
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
            defaultValue={lead.company_name}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-900 focus:outline-none"
          />
        </div>
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
            defaultValue={lead.email}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-900 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Telefone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            defaultValue={lead.phone ?? ""}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-900 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="pain_point" className="block text-sm font-medium">
          Dor declarada
        </label>
        <textarea
          id="pain_point"
          name="pain_point"
          rows={3}
          defaultValue={lead.pain_point ?? ""}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-900 focus:outline-none"
        />
      </div>

      {state.status === "error" && state.message ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.message}
        </p>
      ) : null}
      {state.status === "ok" && state.message ? (
        <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Salvando..." : "Salvar dados"}
      </button>
    </form>
  );
}
