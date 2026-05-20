"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export async function requestDiagnostic(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirect("/diagnostico?error=Supabase%20nao%20configurado");
  }

  const name = String(formData.get("name") ?? "").trim();
  const company_name = String(formData.get("company_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const pain_point = String(formData.get("pain_point") ?? "").trim();
  const interest = "diagnostico_ia_empresa";

  const supabase = await createClient();

  const { error } = await supabase.from("leads").insert({
    name,
    company_name,
    email,
    phone,
    source: "site_formulario_diagnostico",
    pain_point,
    interest,
    pipeline_stage: "novo_lead",
  });

  if (error) {
    redirect(`/diagnostico?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/diagnostico?success=1");
}
