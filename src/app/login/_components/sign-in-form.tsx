"use client";

import { useActionState } from "react";
import { signIn, type SignInState } from "../actions";

const initialState: SignInState = { status: "idle" };

const fieldCls =
  "mt-1 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent/60 focus:bg-white/[0.05] focus:outline-none";

export function SignInForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-xs font-medium text-ink-muted">
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
        <label htmlFor="password" className="block text-xs font-medium text-ink-muted">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
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
        className="w-full rounded-full bg-ink px-4 py-3 text-sm font-semibold text-bg transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
