"use server";

import { revalidatePath } from "next/cache";
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

async function requireSupabase() {
  if (!hasSupabaseEnv()) {
    throw new Error("Supabase nao configurado.");
  }
  return createClient();
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
