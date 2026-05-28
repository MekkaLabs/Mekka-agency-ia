"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export type SignInState = {
  status: "idle" | "error";
  message?: string;
};

export async function signIn(
  _prev: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return {
      status: "error",
      message: "Preencha email e senha.",
    };
  }

  if (!hasSupabaseEnv()) {
    return {
      status: "error",
      message: "Supabase nao configurado. Crie .env.local com NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      status: "error",
      message: "Email ou senha invalidos.",
    };
  }

  redirect("/admin");
}

export async function signOut(): Promise<void> {
  if (hasSupabaseEnv()) {
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
    } catch (e) {
      // Nao queremos travar o logout se o Supabase falhar transiente.
      // O redirect abaixo derruba a sessao do client de qualquer forma.
      console.error("[signOut] erro ignorado durante signOut", e);
    }
  }
  redirect("/login");
}
