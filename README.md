# Mekka Labs Agency AI

Reposicionamento da Mekka Labs como agencia de growth, criacao comercial e sistemas de IA.

## O que ja foi estruturado

- novo site em Next.js para subir na Vercel
- `aiox-core` instalado como submodulo em `./aiox-core`
- `squads` instalados em `./squads`
- integracao local do Codex/AIOX em `./.codex`
- segundo cerebro Obsidian em `./docs/obsidian`
- runbooks para relancamento, DNS e novas ofertas
- PRD da home, CRM interno e area administrativa

## Rodar o site

```bash
npm install
npm run dev
```

Build de producao:

```bash
npm run build
npm run start
```

## Estrutura

| Caminho | Funcao |
|---|---|
| `src/app/` | site institucional novo |
| `aiox-core/` | submodulo do framework AIOX |
| `squads/` | squads especializados para estrategia, copy, brand, trafego e operacao |
| `.codex/` | skills e agentes locais para usar o AIOX neste repo |
| `docs/ops/` | runbooks de dominio, SSL e deploy |
| `docs/strategy/` | ofertas, posicionamento e backlog comercial |
| `docs/obsidian/` | segundo cerebro do projeto |
| `src/app/admin/` | shell inicial do CRM e area logada |

## Ativacao operacional

No Codex:

1. abra `/skills`
2. ative um dos skills `aiox-*`
3. use os squads de apoio em `./squads`

Sugestao de uso imediato:

- `aiox-pm` para organizar backlog e prioridades
- `aiox-architect` para arquitetura do site e stack
- `aiox-claude-mastery-chief` para ajustar a integracao agente + squads

## Proxima acao critica

O dominio principal escolhido para esta fase e `agenciamekka.com.br`.
O dominio `mekkalabs.com.br` fica como legado opcional enquanto o corte final
para a Vercel e a consolidacao da marca forem definidos.

## Plataforma interna

O projeto agora tambem tem a base da area administrativa:

- `/login`
- `/admin`
- `/admin/leads`
- `/admin/clients`
- `/admin/work`
- `/admin/pipeline`

Documentacao:

- `docs/strategy/admin-platform-prd.md`
- `docs/strategy/crm-data-model.md`
