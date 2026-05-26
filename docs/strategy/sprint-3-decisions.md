# Sprint 3 — Decisões fundadoras

**Data:** 2026-05-26
**Branch:** `restart/sprint-3`
**Status:** vivo — atualizar conforme decisões avançam

Documento curto, datado, que vira a constituição do Sprint 3. Nenhuma linha de
código da Fase 3.1 em diante começa sem que as decisões abaixo estejam
explícitas aqui.

---

## Por que reset

Sprint 2 entregou volume técnico (home premium, /admin com 7 telas, sistema
visual elaborado) mas não entregou negócio: 0 lead real, 0 CTA conectado,
0 oferta vendida. O premortem item #9 — _"o sistema fica mais sofisticado do
que o comercial precisa"_ — virou o gargalo real. Os 5 commits de redesign
visual em 7 dias são a evidência.

Decisão: apagar UI do Sprint 2 (preservar Supabase clients, schema, docs,
AIOX, squads) e recomeçar com regra dura: **feio funcional > bonito inerte**.

---

## Decisão 1 — ICP primário

**Quem:** Serviço B2B · 5–50 funcionários · escritórios e operações profissionais.

**Sub-segmentos no alvo:**
- advocacia
- consultoria
- agências (marketing, design, comunicação)
- escritórios contábeis
- escritórios de arquitetura e engenharia

**Faixa:** faturamento R$ 50k–R$ 800k/mês.

**Por quê este e não outro:**
- alinha com `premortem`: _"operações de serviço que perdem lead por demora · comercial dependente de pessoas-chave"_
- alinha com `strategy-brief`: trilha "Diagnóstico → Atendimento com IA"
- ciclo de venda 2–4 semanas (não curto demais como local, não longo demais como SaaS)
- dor crítica e mensurável
- conversa com o repertório atual do fundador

**Quem fica de fora deste Sprint:** e-commerce DTC, negócios locais, SaaS B2B.

---

## Decisão 2 — Dor dominante

**A frase que o ICP fala em voz alta:**

> _"Meu lead esfria antes de eu responder."_

**Tradução comercial:**
- lead chega pelo site, indicação ou WhatsApp
- ninguém responde em <1h
- quando alguém responde, cliente já fechou com outro
- perda é mensurável (perdeu lead X, perdeu lead Y)
- todo sócio sente — é dor coletiva e urgente

**O que ESSA dor NÃO é:**
- não é "falta de IA"
- não é "não tenho processo"
- não é "minha operação é bagunçada"
- não é "follow-up morto" (essa é dor 2, fica pra depois)

**Por que esta dor e não outra:**
- aguda, urgente, recente (sócio lembra do último lead perdido)
- transformável em headline única
- conversa direto com a oferta natural da Mekka (atendimento com IA)
- mitiga premortem #1 (proposta abstrata) — esta dor é cirúrgica

---

## Decisão 3 — Oferta de entrada [ADIADA]

**Estado:** adiada para Fase 3.2/3.3.

**Razão da espera:** preço, prazo e escopo concretos da oferta vão ser
travados depois de 2–3 conversas com lead real do ICP, não em planning. O
strategy-brief sugere "Diagnóstico de IA", mas o premortem #4 avisa do risco
de diagnóstico não virar implantação — escolha precisa de evidência de campo,
não de mesa.

**O que assumimos provisoriamente até lá:**
- direção provável: oferta híbrida (diagnóstico curto + setup mínimo de atendimento)
- nome de trabalho interno: "Sprint de Resposta"
- nenhum preço público ainda

---

## Decisão 4 — Canais reais de CTA [ADIADA]

**Estado:** adiada para Fase 3.2/3.3.

**Substituição provisória no Sprint 3.1:** CTA único do site = **formulário
interno → grava direto no CRM**. Sem WhatsApp configurado, sem agenda
externa, sem email comercial específico ainda.

**Por que adiar:** WhatsApp Business, link de agenda (Cal.com/Calendly) e
email comercial dedicado dependem de decisões operacionais (qual número,
qual conta, quem responde) que não impactam o build do funil mínimo.

---

## Reordenação do Sprint 3

**Sequência original proposta:** 3.0 decisões → 3.1 site → 3.2 CRM → 3.3 prova.

**Sequência decidida em 2026-05-26:**

| Fase | Status | Escopo |
|---|---|---|
| 3.0 — Decisões duras (parcial) | ✅ concluída | ICP + Dor travados; oferta+canais adiados |
| 3.1 — Site + CRM em paralelo | 🟡 em definição | Site público enxuto + admin mínimo em cima do schema existente |
| 3.2 — Validação com lead real | ⏸️ aguarda 3.1 | Travar oferta+canais após 2–3 conversas |
| 3.3 — Prova e padronização | ⏸️ aguarda 3.2 | Mini cases reais, template de diagnóstico, roteiro |

**Por que mudou:** ICP + dor são suficientes pra escrever copy honesta e
operar CRM. Oferta concreta se descobre conversando, não planejando.

**Risco assumido (e mitigação):** essa reordenação flerta com o erro do
Sprint 2 — construir antes de validar. Mitigação dura: **proibido refatorar
UI no Sprint 3.1**. Se aparecer vontade de "deixar mais bonito", a regra é
"feio funcional > bonito inerte". Lint do próprio fundador.

---

## Princípios técnicos do Sprint 3.1 (a confirmar)

- Tailwind cru, sem atomic design, sem design system
- Sem libs de UI (sem shadcn, sem radix, sem motion)
- Server Actions do Next 16 pras mutações
- Reusar 100% do schema Supabase existente (sem migrations novas)
- Reusar 100% dos clients Supabase preservados em `src/lib/supabase/`
- Páginas que carregam <1s
- Feio é feature

---

## Lista do que NÃO faço no Sprint 3.1

- design system de qualquer espécie
- variações A/B de CTA
- tracking de pixel / analytics fancy
- testes automatizados (Playwright/Vitest)
- modo dark/light
- animações decorativas
- fonts custom (Inter system OK ou nada)
- multi-idioma
- páginas extras (sobre, blog, manifesto, careers)
- integrações externas (WhatsApp Business API, Calendly, etc.)

---

## Escopo da Fase 3.1 (aprovado 2026-05-26)

### Site público

| Rota | Função |
|---|---|
| `/` | Home única — headline + subhead + 3 sintomas + 3 bullets do que a Mekka faz + prova honesta + form de captura |
| `/obrigado` | Confirmação após envio do form |
| `/login` | Email/senha → Supabase Auth → `/admin` |

### CRM interno (`/admin/*`)

| Rota | Função |
|---|---|
| `/admin` | Dashboard: 3 números (leads novos hoje · ativos · sem next_action +24h) + top 5 próximas ações |
| `/admin/leads` | Lista + busca por nome/empresa + filtro `pipeline_stage` + "marcar respondido" inline |
| `/admin/leads/[id]` | Detail + histórico de notes + edição de next_action + mudar etapa |
| `/admin/logout` | Server Action |

### Tabelas usadas (do schema existente)

`leads`, `profiles`, `notes` (related_type='lead'). **Não tocadas neste sprint:** `companies`, `projects`, `deals`.

### Ordem de construção

1. Home + Server Action + `/obrigado` (este passo)
2. `/login` + middleware ajustado
3. `/admin` dashboard
4. `/admin/leads` lista
5. `/admin/leads/[id]` detail

Cada milestone é mostrado antes do próximo começar.
