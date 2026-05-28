"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export type LeadStage =
  | "novo_lead"
  | "em_contato"
  | "qualificado"
  | "diagnostico_agendado"
  | "proposta_enviada"
  | "fechado"
  | "descartado";

export type ActionState = {
  status: "idle" | "ok" | "error";
  message?: string;
};

async function requireSupabase() {
  if (!hasSupabaseEnv()) {
    throw new Error("Supabase nao configurado.");
  }
  return createClient();
}

function normalizePhone(value: string): string | null {
  const cleaned = value.replace(/[^\d+()\-\s]/g, "").trim();
  return cleaned ? cleaned : null;
}

export async function updateLeadStage(leadId: string, stage: LeadStage) {
  const supabase = await requireSupabase();
  const { error } = await supabase
    .from("leads")
    .update({ pipeline_stage: stage, updated_at: new Date().toISOString() })
    .eq("id", leadId);

  if (error) throw error;
  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${leadId}`);
}

export async function updateLeadNextAction(leadId: string, nextAction: string) {
  const supabase = await requireSupabase();
  const { error } = await supabase
    .from("leads")
    .update({
      next_action: nextAction || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", leadId);

  if (error) throw error;
  revalidatePath("/admin");
  revalidatePath(`/admin/leads/${leadId}`);
}

export async function markLeadResponded(leadId: string) {
  const supabase = await requireSupabase();
  const { error } = await supabase
    .from("leads")
    .update({
      pipeline_stage: "em_contato",
      next_action: "Aguardando retorno do lead",
      updated_at: new Date().toISOString(),
    })
    .eq("id", leadId);

  if (error) throw error;
  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${leadId}`);
}

export async function addLeadNote(leadId: string, body: string) {
  const trimmed = body.trim();
  if (!trimmed) return;

  const supabase = await requireSupabase();
  const { error } = await supabase.from("notes").insert({
    related_type: "lead",
    related_id: leadId,
    body: trimmed,
  });

  if (error) throw error;
  revalidatePath(`/admin/leads/${leadId}`);
}

export async function createLeadInternal(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = normalizePhone(String(formData.get("phone") ?? ""));
  const painPoint = String(formData.get("pain_point") ?? "").trim() || null;
  const sourceRaw = String(formData.get("source") ?? "").trim();
  const source = sourceRaw || "manual";

  if (!name || !company || !email) {
    return {
      status: "error",
      message: "Preencha nome, empresa e email.",
    };
  }

  if (!hasSupabaseEnv()) {
    return {
      status: "error",
      message: "Supabase nao configurado.",
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .insert({
      name,
      company_name: company,
      email,
      phone,
      pain_point: painPoint,
      source,
      pipeline_stage: "novo_lead",
      next_action: "Responder em ate 1h util",
    })
    .select("id")
    .single();

  if (error || !data) {
    return {
      status: "error",
      message: `Erro ao criar lead: ${error?.message ?? "desconhecido"}`,
    };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  redirect(`/admin/leads/${data.id}`);
}

export async function updateLeadCore(
  leadId: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = normalizePhone(String(formData.get("phone") ?? ""));
  const painPoint = String(formData.get("pain_point") ?? "").trim() || null;

  if (!name || !company || !email) {
    return {
      status: "error",
      message: "Nome, empresa e email sao obrigatorios.",
    };
  }

  if (!hasSupabaseEnv()) {
    return {
      status: "error",
      message: "Supabase nao configurado.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update({
      name,
      company_name: company,
      email,
      phone,
      pain_point: painPoint,
      updated_at: new Date().toISOString(),
    })
    .eq("id", leadId);

  if (error) {
    return {
      status: "error",
      message: `Erro ao salvar: ${error.message}`,
    };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${leadId}`);
  return { status: "ok", message: "Dados atualizados." };
}
