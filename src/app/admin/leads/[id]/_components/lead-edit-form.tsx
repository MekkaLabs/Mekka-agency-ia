"use client";

import { useActionState } from "react";
import { updateLeadCore, type ActionState } from "../../../actions";
import {
  fieldCls,
  labelCls,
  secondaryBtn,
  errorMsg,
  okMsg,
} from "../../_components/form-styles";

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
          <label htmlFor="name" className={labelCls}>
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={lead.name}
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
            defaultValue={lead.company_name}
            className={fieldCls}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={lead.email}
            className={fieldCls}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Telefone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            defaultValue={lead.phone ?? ""}
            className={fieldCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="pain_point" className={labelCls}>
          Dor declarada
        </label>
        <textarea
          id="pain_point"
          name="pain_point"
          rows={3}
          defaultValue={lead.pain_point ?? ""}
          className={fieldCls}
        />
      </div>

      {state.status === "error" && state.message ? (
        <p className={errorMsg}>{state.message}</p>
      ) : null}
      {state.status === "ok" && state.message ? (
        <p className={okMsg}>{state.message}</p>
      ) : null}

      <button type="submit" disabled={pending} className={secondaryBtn}>
        {pending ? "Salvando..." : "Salvar dados"}
      </button>
    </form>
  );
}
