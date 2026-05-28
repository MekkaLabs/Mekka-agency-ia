"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export type CaptureLeadState = {
  status: "idle" | "error";
  message?: string;
};

// Regex minimo defensivo: estrutura local@dominio.tld, sem espacos.
// Nao tenta validar 100% do RFC 5322 — so filtrar lixo obvio do form publico.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanPhone(raw: string): string | null {
  const cleaned = raw.replace(/[^\d+()\-\s]/g, "").trim();
  return cleaned.length >= 8 ? cleaned : null;
}

export async function captureLead(
  _prev: CaptureLeadState,
  formData: FormData,
): Promise<CaptureLeadState> {
  const name = String(formData.get("name") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = cleanPhone(String(formData.get("phone") ?? ""));
  const painPoint = String(formData.get("pain_point") ?? "").trim() || null;

  if (!name || !company || !email) {
    return {
      status: "error",
      message: "Preencha nome, empresa e email.",
    };
  }

  if (!EMAIL_RE.test(email)) {
    return {
      status: "error",
      message: "Email parece invalido. Confira e tente de novo.",
    };
  }

  if (name.length > 120 || company.length > 120 || email.length > 254) {
    return {
      status: "error",
      message: "Algum campo passou do tamanho permitido.",
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
