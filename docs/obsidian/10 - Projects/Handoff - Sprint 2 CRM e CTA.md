---
type: handoff
status: active
created: 2026-05-20
tags: [handoff, sprint-2, crm, cta]
project: mekka-labs-agency-ai
---

# Handoff - Sprint 2 CRM e CTA

## O que entrou nesta rodada

- checkpoint inicial do repo com o estado funcional da Sprint 2
- CTA publico configuravel por ambiente
- consolidacao do dominio principal em `agenciamekka.com.br`
- fallback comercial da home:
  - sem agenda configurada, CTA principal fica em `/diagnostico`
  - sem WhatsApp configurado, CTA secundario cai para email
- conversao de lead para conta direto no admin
- opcao de abrir `diagnostico` como `project` no momento da conversao
- dashboard interno conectado a sinais reais do CRM
- notas internas por lead

## Commits desta sessao

- `aeb02f7` `chore: checkpoint sprint 2 baseline`
- `27dcda8` `feat: make public ctas configurable`
- `9f05699` `feat: connect lead conversion and dashboard ops`
- `ff56496` `feat: add internal lead notes`

## Estado do produto agora

### Site publico

- home pronta para operar com dominio e CTAs configuraveis
- formulario `/diagnostico` segue como entrada principal
- ainda falta preencher dados reais de contato e agenda

### Admin

- `/admin` mostra metricas, fila de proximas acoes, resumo de pipeline, leads recentes e trabalhos
- `/admin/leads` permite:
  - criar lead
  - atualizar etapa e proxima acao
  - converter lead em conta
  - converter lead em conta e abrir diagnostico
  - registrar notas internas
  - remover lead
- `/admin/clients` permite criar, atualizar e remover contas
- `/admin/work` permite criar, atualizar e remover trabalhos
- `/admin/pipeline` le a etapa real dos leads

## Arquivos mais importantes atualizados hoje

- `src/lib/site-config.ts`
- `src/app/page.tsx`
- `src/app/admin/actions.ts`
- `src/app/admin/page.tsx`
- `src/app/admin/leads/page.tsx`
- `src/app/globals.css`
- `.env.local.example`

## O que falta para virar operacao real

1. criar o projeto real no Supabase
2. preencher `.env.local`
3. aplicar `supabase/schema.sql`
4. criar usuario interno no Auth
5. preencher:
   - `NEXT_PUBLIC_WHATSAPP_URL`
   - `NEXT_PUBLIC_SCHEDULING_URL`
   - `NEXT_PUBLIC_CONTACT_EMAIL`
6. validar o fluxo ponta a ponta:
   - home
   - `/diagnostico`
   - `/login`
   - `/admin/leads`
   - conversao de lead em conta/projeto

## Melhor proxima rodada

### Prioridade alta

- conectar Supabase real
- validar dados reais no admin
- trocar CTA publico para canais reais

### Prioridade media

- levar notas tambem para `clients` e `work`
- criar edicao de dados principais do lead alem de etapa
- adicionar filtros simples no admin
- preparar deploy e dominio final na Vercel

### Prioridade baixa

- deals
- tasks
- portal do cliente
- automacoes e webhooks

## Comando sugerido para retomar

Continuar a Sprint 2 do projeto `/Users/gustavovicente/Downloads/mekka-labs-agency-ai`, começando pela configuracao real do Supabase e preenchimento dos CTAs publicos, depois validar o fluxo `diagnostico -> lead -> conta -> diagnostico`.
