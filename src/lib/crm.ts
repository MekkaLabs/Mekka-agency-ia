export const leadStages = [
  "novo_lead",
  "contato_iniciado",
  "diagnostico_agendado",
  "proposta_enviada",
  "fechado",
  "perdido",
] as const;

export const leadStageLabels: Record<string, string> = {
  novo_lead: "Novos leads",
  contato_iniciado: "Contato iniciado",
  diagnostico_agendado: "Diagnostico agendado",
  proposta_enviada: "Proposta enviada",
  fechado: "Fechado",
  perdido: "Perdido",
};

export const companyStatuses = [
  "lead",
  "diagnostico",
  "proposta",
  "cliente_ativo",
  "pausado",
] as const;

export const projectStatuses = [
  "novo",
  "diagnostico",
  "implantacao",
  "otimizacao",
  "concluido",
] as const;

export const projectTypes = [
  "diagnostico",
  "implantacao",
  "retainer",
] as const;

export const dealStatuses = [
  "rascunho",
  "qualificacao",
  "proposta_enviada",
  "negociacao",
  "ganho",
  "perdido",
] as const;

export const dealOfferTypes = [
  "diagnostico_ia",
  "implantacao_atendimento",
  "implantacao_vendas",
  "implantacao_marketing",
  "retainer_operacao",
] as const;

export function formatCurrencyBRL(value: number | null) {
  if (value === null) {
    return "-";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
