---
type: handoff
status: active
created: 2026-05-20
updated: 2026-05-20
tags: [handoff, sprint-2, crm, cta, relaunch]
project: mekka-labs-agency-ai
---

# Handoff - Projeto Mekka Labs

## Resumo executivo

O projeto ja saiu da fase de tese e entrou na fase de ativacao.

Hoje voce ja tem:

- tese comercial refinada
- home de conversao funcional
- oferta de entrada definida
- fluxo publico de lead
- CRM interno funcional em MVP
- dashboard admin com dados reais
- conversao de lead em conta e diagnostico
- notas internas por lead
- relatorio de proximas melhorias
- premortem expandido

O gargalo agora nao e mais "o que construir".
O gargalo agora e:

1. conectar operacao real
2. ativar canais reais
3. validar o funil ponta a ponta
4. transformar isso em rotina comercial

## Estado atual do produto

### Site publico

Rotas:

- `/`
- `/diagnostico`
- `/login`

Estado:

- home pronta para conversao
- CTA principal configuravel por ambiente
- fallback para `/diagnostico` se agenda real nao estiver configurada
- CTA secundario cai para email se WhatsApp nao estiver configurado
- dominio principal consolidado como `agenciamekka.com.br`

Pendencias:

- preencher WhatsApp real
- preencher agenda real
- reforcar prova comercial
- explicitar melhor o ICP

### Admin / CRM

Rotas:

- `/admin`
- `/admin/leads`
- `/admin/clients`
- `/admin/work`
- `/admin/pipeline`

Estado:

- auth e protecao prontos
- leads podem ser criados manualmente
- lead publico do `/diagnostico` ja entra no CRM
- lead pode ser atualizado
- lead pode ser convertido em conta
- lead pode ser convertido em conta e abrir um `project` de diagnostico
- notas internas por lead ativas
- clientes podem ser criados, atualizados e removidos
- trabalhos podem ser criados, atualizados e removidos
- pipeline le a etapa real dos leads
- dashboard mostra metricas, fila de acao, resumo de pipeline, leads recentes e trabalhos

Pendencias:

- filtros
- busca
- edicao mais profunda de lead
- notas em clientes e trabalhos
- deals
- tasks

## Estado tecnico

### Stack

- Next.js App Router
- React 19
- Supabase SSR
- Supabase Auth + Postgres como backend planejado

### Validacao atual

- `npm run lint` passando
- `CI=1 npm run build` passando

### Ambiente local

App local em execucao:

- `http://localhost:3000`

Rotas uteis:

- `http://localhost:3000/`
- `http://localhost:3000/diagnostico`
- `http://localhost:3000/login`
- `http://localhost:3000/admin`
- `http://localhost:3000/admin/leads`
- `http://localhost:3000/admin/clients`
- `http://localhost:3000/admin/work`
- `http://localhost:3000/admin/pipeline`

Observacao:

- sem `.env.local` real, o projeto continua mostrando os fallbacks de setup e nao quebra

## Arquivos mais importantes para abrir primeiro

### Produto e copy

- `src/app/page.tsx`
- `src/lib/site-config.ts`
- `docs/strategy/site-prd.md`
- `docs/strategy/strategy-brief.md`
- `docs/strategy/next-improvements-report.md`
- `docs/strategy/premortem.md`

### CRM e admin

- `src/app/admin/actions.ts`
- `src/app/admin/page.tsx`
- `src/app/admin/leads/page.tsx`
- `src/app/admin/clients/page.tsx`
- `src/app/admin/work/page.tsx`
- `src/app/admin/pipeline/page.tsx`
- `src/app/diagnostico/actions.ts`
- `supabase/schema.sql`

### Operacao e setup

- `.env.local.example`
- `docs/ops/supabase-setup.md`
- `docs/ops/domain-recovery.md`

### Obsidian

- `docs/obsidian/Home.md`
- `docs/obsidian/10 - Projects/Projeto - Mekka Labs Relaunch.md`
- `docs/obsidian/30 - Resources/Recurso - Proximas Melhorias Site e Sistema.md`
- `docs/obsidian/30 - Resources/Recurso - Premortem Mekka Labs.md`

## Principais entregas ja feitas

### Base do projeto

- repo inicializado e commitado
- home de conversao implementada
- login e area admin protegidos
- schema inicial do Supabase criado
- fallback sem `.env.local` tratado

### Melhorias desta fase

- CTA publico configuravel por ambiente
- dominio principal consolidado
- dashboard admin conectado a dados reais
- conversao de lead em conta e diagnostico
- notas internas por lead
- relatorio completo de proximas melhorias
- premortem expandido

## Commits principais

- `aeb02f7` `chore: checkpoint sprint 2 baseline`
- `27dcda8` `feat: make public ctas configurable`
- `9f05699` `feat: connect lead conversion and dashboard ops`
- `ff56496` `feat: add internal lead notes`
- `2a0d6a0` `docs: add sprint 2 handoff note`
- `ca57313` `docs: add improvements report and expanded premortem`

## Variaveis de ambiente esperadas

Arquivo base:

- `.env.local.example`

Campos previstos:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_DOMAIN`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_WHATSAPP_URL`
- `NEXT_PUBLIC_SCHEDULING_URL`

## O que falta para operar de verdade

1. criar o projeto real no Supabase
2. copiar `.env.local.example` para `.env.local`
3. preencher as credenciais reais
4. aplicar `supabase/schema.sql`
5. criar usuario interno no Auth
6. preencher CTA real:
   - WhatsApp
   - agenda
   - email
7. validar o funil completo no browser

## Melhorias prioritarias levantadas

### Site

1. ativar CTAs reais
2. reforcar prova concreta
3. explicitar melhor ICP
4. criar pagina da oferta de diagnostico
5. adicionar tracking comercial

### Sistema

1. conectar Supabase real
2. filtros e busca no CRM
3. edicao mais profunda de lead
4. notas em clientes e trabalhos
5. deals e previsao de receita
6. tasks e onboarding

## Premortem resumido

Os maiores riscos agora sao:

1. CTA sem ativacao real
2. ICP amplo demais
3. diagnostico nao virar implantacao
4. entrega artesanal
5. CRM nao virar ritual operacional
6. falta de prova comercial simples
7. dependencia excessiva do fundador

Regra de decisao recomendada:

1. priorizar conversao
2. depois priorizar rotina comercial
3. depois priorizar padronizacao operacional
4. so depois sofisticacao tecnica

## Melhor ordem de retomada

### Ordem recomendada

1. configurar Supabase real
2. preencher `.env.local`
3. ativar CTA real da home
4. validar o fluxo:
   - home
   - diagnostico
   - login
   - admin/leads
   - conversao em conta
   - abertura de diagnostico
5. depois partir para filtros, busca e deals

## Comando sugerido para a nova aba

Continuar o projeto `/Users/gustavovicente/Downloads/mekka-labs-agency-ai` a partir do handoff `docs/obsidian/10 - Projects/Handoff - Projeto Mekka Labs.md`, começando pela configuracao real do Supabase, preenchimento dos CTAs publicos e validacao completa do fluxo `diagnostico -> lead -> conta -> diagnostico`, depois evoluir o CRM com filtros, busca e deals.
