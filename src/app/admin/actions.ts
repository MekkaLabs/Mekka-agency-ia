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

const VALID_STAGES: LeadStage[] = [
  "novo_lead",
  "em_contato",
  "qualificado",
  "diagnostico_agendado",
  "proposta_enviada",
  "fechado",
  "descartado",
];

export async function updateLeadStage(
  leadId: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const stage = String(formData.get("stage") ?? "") as LeadStage;
  if (!VALID_STAGES.includes(stage)) {
    return { status: "error", message: "Etapa invalida." };
  }
  if (!hasSupabaseEnv()) {
    return { status: "error", message: "Supabase nao configurado." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update({ pipeline_stage: stage, updated_at: new Date().toISOString() })
    .eq("id", leadId);

  if (error) {
    return { status: "error", message: `Erro: ${error.message}` };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${leadId}`);
  return { status: "ok", message: "Etapa salva." };
}

export async function updateLeadNextAction(
  leadId: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const value = String(formData.get("next_action") ?? "").trim();
  if (!hasSupabaseEnv()) {
    return { status: "error", message: "Supabase nao configurado." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update({
      next_action: value || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", leadId);

  if (error) {
    return { status: "error", message: `Erro: ${error.message}` };
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/leads/${leadId}`);
  return { status: "ok", message: "Proxima acao salva." };
}

export async function markLeadResponded(
  leadId: string,
  _prev: ActionState,
): Promise<ActionState> {
  if (!hasSupabaseEnv()) {
    return { status: "error", message: "Supabase nao configurado." };
  }

  const supabase = await createClient();
  // Le first_response_at atual para nao sobrescrever em respostas posteriores.
  const { data: current, error: readErr } = await supabase
    .from("leads")
    .select("first_response_at")
    .eq("id", leadId)
    .single();

  if (readErr) {
    return { status: "error", message: `Erro ao ler lead: ${readErr.message}` };
  }

  const now = new Date().toISOString();
  const update: Record<string, unknown> = {
    pipeline_stage: "em_contato",
    next_action: "Aguardando retorno do lead",
    updated_at: now,
  };
  if (!current?.first_response_at) {
    update.first_response_at = now;
  }

  const { error } = await supabase.from("leads").update(update).eq("id", leadId);

  if (error) {
    return { status: "error", message: `Erro: ${error.message}` };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${leadId}`);
  return { status: "ok", message: "Marcado como respondido." };
}

export async function addLeadNote(
  leadId: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const body = String(formData.get("body") ?? "").trim();
  if (!body) {
    return { status: "error", message: "Escreva alguma coisa antes de salvar." };
  }
  if (!hasSupabaseEnv()) {
    return { status: "error", message: "Supabase nao configurado." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("notes").insert({
    related_type: "lead",
    related_id: leadId,
    body,
  });

  if (error) {
    return { status: "error", message: `Erro: ${error.message}` };
  }

  revalidatePath(`/admin/leads/${leadId}`);
  return { status: "ok", message: "Nota adicionada." };
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
