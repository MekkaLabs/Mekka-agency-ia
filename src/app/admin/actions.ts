"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

function ensureSupabase(path: string) {
  if (!hasSupabaseEnv()) {
    redirect(`${path}?error=Supabase%20nao%20configurado`);
  }
}

function getRequiredField(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getOptionalField(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value.length > 0 ? value : null;
}

function touchAdminViews() {
  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  revalidatePath("/admin/clients");
  revalidatePath("/admin/work");
  revalidatePath("/admin/pipeline");
}

async function findOrCreateCompanyFromLead(leadId: string, companyStatus: string) {
  const supabase = await createClient();
  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .select("id, company_name, pain_point")
    .eq("id", leadId)
    .single();

  if (leadError || !lead) {
    return {
      errorMessage: leadError?.message ?? "Lead nao encontrado",
      companyId: null,
      companyName: null,
      painPoint: null,
    };
  }

  const { data: existingCompany } = await supabase
    .from("companies")
    .select("id, name")
    .eq("name", lead.company_name)
    .limit(1)
    .maybeSingle();

  if (existingCompany) {
    return {
      errorMessage: null,
      companyId: existingCompany.id,
      companyName: existingCompany.name,
      painPoint: lead.pain_point,
    };
  }

  const { data: company, error: companyError } = await supabase
    .from("companies")
    .insert({
      name: lead.company_name,
      status: companyStatus,
    })
    .select("id, name")
    .single();

  if (companyError || !company) {
    return {
      errorMessage: companyError?.message ?? "Nao foi possivel criar a empresa",
      companyId: null,
      companyName: null,
      painPoint: lead.pain_point,
    };
  }

  return {
    errorMessage: null,
    companyId: company.id,
    companyName: company.name,
    painPoint: lead.pain_point,
  };
}

export async function createLead(formData: FormData) {
  ensureSupabase("/admin/leads");

  const name = getRequiredField(formData, "name");
  const company_name = getRequiredField(formData, "company_name");
  const email = getRequiredField(formData, "email");
  const phone = getOptionalField(formData, "phone");
  const source = getRequiredField(formData, "source") || "manual_admin";
  const pain_point = getOptionalField(formData, "pain_point");
  const interest = getOptionalField(formData, "interest");
  const pipeline_stage =
    getRequiredField(formData, "pipeline_stage") || "novo_lead";
  const next_action = getOptionalField(formData, "next_action");

  if (!name || !company_name || !email) {
    redirect("/admin/leads?error=Preencha%20nome%2C%20empresa%20e%20email");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    name,
    company_name,
    email,
    phone,
    source,
    pain_point,
    interest,
    pipeline_stage,
    next_action,
  });

  if (error) {
    redirect(`/admin/leads?error=${encodeURIComponent(error.message)}`);
  }

  touchAdminViews();
  redirect("/admin/leads?success=Lead%20criado");
}

export async function updateLead(formData: FormData) {
  ensureSupabase("/admin/leads");

  const id = getRequiredField(formData, "id");
  const pipeline_stage = getRequiredField(formData, "pipeline_stage");
  const next_action = getOptionalField(formData, "next_action");

  if (!id || !pipeline_stage) {
    redirect("/admin/leads?error=Lead%20ou%20etapa%20invalida");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update({
      pipeline_stage,
      next_action,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    redirect(`/admin/leads?error=${encodeURIComponent(error.message)}`);
  }

  touchAdminViews();
  redirect("/admin/leads?success=Lead%20atualizado");
}

export async function deleteLead(formData: FormData) {
  ensureSupabase("/admin/leads");

  const id = getRequiredField(formData, "id");

  if (!id) {
    redirect("/admin/leads?error=Lead%20invalido");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").delete().eq("id", id);

  if (error) {
    redirect(`/admin/leads?error=${encodeURIComponent(error.message)}`);
  }

  touchAdminViews();
  redirect("/admin/leads?success=Lead%20removido");
}

export async function convertLeadToAccount(formData: FormData) {
  ensureSupabase("/admin/leads");

  const leadId = getRequiredField(formData, "id");
  const companyStatus = getRequiredField(formData, "company_status") || "diagnostico";
  const createProject = getRequiredField(formData, "create_project") === "1";

  if (!leadId) {
    redirect("/admin/leads?error=Lead%20invalido");
  }

  const conversion = await findOrCreateCompanyFromLead(leadId, companyStatus);

  if (conversion.errorMessage || !conversion.companyId || !conversion.companyName) {
    redirect(
      `/admin/leads?error=${encodeURIComponent(conversion.errorMessage ?? "Falha na conversao")}`,
    );
  }

  const supabase = await createClient();

  if (createProject) {
    const { data: existingProject } = await supabase
      .from("projects")
      .select("id")
      .eq("company_id", conversion.companyId)
      .eq("type", "diagnostico")
      .limit(1)
      .maybeSingle();

    if (!existingProject) {
      const { error: projectError } = await supabase.from("projects").insert({
        company_id: conversion.companyId,
        name: `Diagnostico IA - ${conversion.companyName}`,
        type: "diagnostico",
        module: "atendimento_e_vendas",
        status: "diagnostico",
        next_step: conversion.painPoint
          ? `Mapear gargalo principal: ${conversion.painPoint}`
          : "Agendar reuniao de diagnostico",
      });

      if (projectError) {
        redirect(`/admin/leads?error=${encodeURIComponent(projectError.message)}`);
      }
    }
  }

  const { error: leadError } = await supabase
    .from("leads")
    .update({
      pipeline_stage: createProject ? "diagnostico_agendado" : "contato_iniciado",
      next_action: createProject
        ? "Conduzir diagnostico e transformar em proposta"
        : "Qualificar conta e decidir abertura do diagnostico",
      updated_at: new Date().toISOString(),
    })
    .eq("id", leadId);

  if (leadError) {
    redirect(`/admin/leads?error=${encodeURIComponent(leadError.message)}`);
  }

  touchAdminViews();
  redirect(
    `/admin/leads?success=${encodeURIComponent(
      createProject
        ? "Lead convertido em conta e diagnostico aberto"
        : "Lead convertido em conta",
    )}`,
  );
}

export async function createCompany(formData: FormData) {
  ensureSupabase("/admin/clients");

  const name = getRequiredField(formData, "name");
  const segment = getOptionalField(formData, "segment");
  const size = getOptionalField(formData, "size");
  const website = getOptionalField(formData, "website");
  const status = getRequiredField(formData, "status") || "lead";

  if (!name) {
    redirect("/admin/clients?error=Nome%20da%20empresa%20e%20obrigatorio");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("companies").insert({
    name,
    segment,
    size,
    website,
    status,
  });

  if (error) {
    redirect(`/admin/clients?error=${encodeURIComponent(error.message)}`);
  }

  touchAdminViews();
  redirect("/admin/clients?success=Cliente%20criado");
}

export async function updateCompany(formData: FormData) {
  ensureSupabase("/admin/clients");

  const id = getRequiredField(formData, "id");
  const status = getRequiredField(formData, "status");
  const segment = getOptionalField(formData, "segment");
  const website = getOptionalField(formData, "website");

  if (!id || !status) {
    redirect("/admin/clients?error=Cliente%20ou%20status%20invalido");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("companies")
    .update({
      status,
      segment,
      website,
    })
    .eq("id", id);

  if (error) {
    redirect(`/admin/clients?error=${encodeURIComponent(error.message)}`);
  }

  touchAdminViews();
  redirect("/admin/clients?success=Cliente%20atualizado");
}

export async function deleteCompany(formData: FormData) {
  ensureSupabase("/admin/clients");

  const id = getRequiredField(formData, "id");

  if (!id) {
    redirect("/admin/clients?error=Cliente%20invalido");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("companies").delete().eq("id", id);

  if (error) {
    redirect(`/admin/clients?error=${encodeURIComponent(error.message)}`);
  }

  touchAdminViews();
  redirect("/admin/clients?success=Cliente%20removido");
}

export async function createProject(formData: FormData) {
  ensureSupabase("/admin/work");

  const name = getRequiredField(formData, "name");
  const type = getRequiredField(formData, "type");
  const moduleName = getOptionalField(formData, "module");
  const status = getRequiredField(formData, "status") || "novo";
  const next_step = getOptionalField(formData, "next_step");
  const start_date = getOptionalField(formData, "start_date");
  const due_date = getOptionalField(formData, "due_date");
  const company_id = getOptionalField(formData, "company_id");

  if (!name || !type) {
    redirect("/admin/work?error=Preencha%20nome%20e%20tipo%20do%20trabalho");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("projects").insert({
    company_id,
    name,
    type,
    module: moduleName,
    status,
    next_step,
    start_date,
    due_date,
  });

  if (error) {
    redirect(`/admin/work?error=${encodeURIComponent(error.message)}`);
  }

  touchAdminViews();
  redirect("/admin/work?success=Trabalho%20criado");
}

export async function updateProject(formData: FormData) {
  ensureSupabase("/admin/work");

  const id = getRequiredField(formData, "id");
  const status = getRequiredField(formData, "status");
  const moduleName = getOptionalField(formData, "module");
  const next_step = getOptionalField(formData, "next_step");
  const due_date = getOptionalField(formData, "due_date");

  if (!id || !status) {
    redirect("/admin/work?error=Trabalho%20ou%20status%20invalido");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update({
      status,
      module: moduleName,
      next_step,
      due_date,
    })
    .eq("id", id);

  if (error) {
    redirect(`/admin/work?error=${encodeURIComponent(error.message)}`);
  }

  touchAdminViews();
  redirect("/admin/work?success=Trabalho%20atualizado");
}

export async function deleteProject(formData: FormData) {
  ensureSupabase("/admin/work");

  const id = getRequiredField(formData, "id");

  if (!id) {
    redirect("/admin/work?error=Trabalho%20invalido");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    redirect(`/admin/work?error=${encodeURIComponent(error.message)}`);
  }

  touchAdminViews();
  redirect("/admin/work?success=Trabalho%20removido");
}
