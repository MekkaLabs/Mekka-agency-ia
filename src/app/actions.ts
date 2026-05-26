"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export type CaptureLeadState = {
  status: "idle" | "error";
  message?: string;
};

export async function captureLead(
  _prev: CaptureLeadState,
  formData: FormData,
): Promise<CaptureLeadState> {
  const name = String(formData.get("name") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const painPoint = String(formData.get("pain_point") ?? "").trim() || null;

  if (!name || !company || !email) {
    return {
      status: "error",
      message: "Preencha nome, empresa e email.",
    };
  }

  if (!hasSupabaseEnv()) {
    console.error("[captureLead] Supabase env missing — lead não foi gravado.", {
      name,
      company,
      email,
    });
    return {
      status: "error",
      message:
        "Não foi possível enviar agora. Tente novamente em alguns minutos ou escreva para contato@agenciamekka.com.br.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    name,
    company_name: company,
    email,
    phone,
    pain_point: painPoint,
    source: "site",
    pipeline_stage: "novo_lead",
    next_action: "Responder em ate 1h util",
  });

  if (error) {
    console.error("[captureLead] insert error", error);
    return {
      status: "error",
      message:
        "Algo deu errado no envio. Tente de novo em instantes — se persistir, fale com contato@agenciamekka.com.br.",
    };
  }

  redirect("/obrigado");
}
