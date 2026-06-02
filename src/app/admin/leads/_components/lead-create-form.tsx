"use client";

import { useActionState } from "react";
import { createLeadInternal, type ActionState } from "../../actions";
import { fieldCls, labelCls, primaryBtn, errorMsg } from "./form-styles";

const initialState: ActionState = { status: "idle" };

export function LeadCreateForm() {
  const [state, formAction, pending] = useActionState(
    createLeadInternal,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className={labelCls}>
          Nome
        </label>
        <input id="name" name="name" type="text" required className={fieldCls} />
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
          className={fieldCls}
        />
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
            className={fieldCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="source" className={labelCls}>
          Origem
        </label>
        <select
          id="source"
          name="source"
          defaultValue="manual"
          className={`${fieldCls} md:w-64`}
        >
          {[
            ["manual", "Manual"],
            ["indicacao", "Indicacao"],
            ["whatsapp", "WhatsApp"],
            ["email", "Email"],
            ["evento", "Evento"],
            ["linkedin", "LinkedIn"],
            ["outro", "Outro"],
          ].map(([v, l]) => (
            <option key={v} value={v} className="bg-elevated">
              {l}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="pain_point" className={labelCls}>
          Dor declarada <span className="text-ink-faint">(opcional)</span>
        </label>
        <textarea
          id="pain_point"
          name="pain_point"
          rows={3}
          placeholder="o que voce sabe sobre o que esta lead precisa..."
          className={fieldCls}
        />
      </div>

      {state.status === "error" && state.message ? (
        <p className={errorMsg}>{state.message}</p>
      ) : null}

      <button type="submit" disabled={pending} className={primaryBtn}>
        {pending ? "Criando..." : "Criar lead"}
      </button>
    </form>
  );
}
