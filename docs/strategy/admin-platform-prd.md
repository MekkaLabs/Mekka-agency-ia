# PRD - Plataforma Interna Mekka Labs

## Objetivo

Criar a camada interna da Mekka para operar o negocio:

- CRM de leads
- gestao de clientes
- gestao de diagnosticos e implantacoes
- area logada administrativa
- base para processos internos e recorrencia

## Objetivo de negocio

Permitir que a Mekka opere como uma agencia de IA com controle de:

- entrada de leads
- pipeline comercial
- entregas em andamento
- proximas acoes
- memoria operacional

## Decisao de produto

A plataforma interna deve nascer dentro do mesmo app do site.

Motivo:

- simplifica deploy
- reduz retrabalho
- centraliza autenticacao
- acelera MVP

## Arquitetura recomendada para MVP

- frontend: Next.js App Router
- autenticacao: login por email e senha
- banco: Postgres
- backend inicial recomendado: Supabase Auth + Database
- storage: documentos e anexos por cliente
- permissoes: admin interno primeiro; multiusuario depois

## Perfis de usuario no MVP

### 1. Admin

Pode:

- ver todos os leads
- editar pipeline
- criar clientes
- criar diagnosticos e projetos
- acessar configuracoes

### 2. Operacao

Pode:

- ver clientes e trabalhos
- atualizar status
- registrar notas
- acompanhar entregas

No primeiro corte, ambos podem ser tratados como equipe interna.

## Modulos do MVP

### 1. Login

Objetivo:

- proteger a area interna

Minimo:

- email
- senha
- recuperar acesso depois

### 2. Dashboard

Objetivo:

- mostrar visao do negocio em uma tela

Widgets minimos:

- leads novos
- leads qualificados
- diagnosticos abertos
- implantacoes ativas
- tarefas vencendo
- receita em andamento

### 3. Leads CRM

Objetivo:

- centralizar toda entrada comercial

Campos minimos:

- nome
- empresa
- email
- WhatsApp
- origem
- dor principal
- interesse principal
- status do pipeline
- proxima acao
- responsavel
- observacoes

### 4. Clientes

Objetivo:

- acompanhar contas ativas

Campos minimos:

- nome da empresa
- contato principal
- plano ou servico contratado
- status
- responsavel interno
- data de inicio
- proximos passos
- links importantes

### 5. Trabalhos

Objetivo:

- acompanhar diagnosticos, implantacoes e recorrencias

Tipos:

- diagnostico
- implantacao
- backoffice recorrente

Campos minimos:

- titulo
- cliente
- tipo
- modulo
- status
- prazo
- entregavel atual
- proxima acao
- notas internas

### 6. Pipeline

Objetivo:

- visualizar fluxo comercial

Etapas iniciais:

- novo lead
- contato iniciado
- qualificacao
- diagnostico agendado
- diagnostico vendido
- proposta enviada
- implantacao fechada
- perdido

## Fluxos principais

### Fluxo 1 - Lead ate venda

1. lead entra pelo site
2. lead cai no CRM
3. equipe classifica origem e dor
4. agendamento do diagnostico
5. diagnostico vendido
6. proposta de implantacao
7. cliente fechado

### Fluxo 2 - Cliente ate entrega

1. cliente criado
2. trabalho criado
3. modulo definido
4. status atualizado
5. entrega registrada
6. upsell ou recorrencia

## Entidades principais

- users
- leads
- companies
- contacts
- deals
- projects
- tasks
- notes
- documents

## Escopo de MVP

### Incluido

- login
- dashboard interno
- lista de leads
- lista de clientes
- lista de trabalhos
- pipeline simples

### Fora do primeiro corte

- automacoes complexas
- portal do cliente
- billing completo
- multiworkspace
- analytics profundos

## Perguntas abertas

1. O CRM vai ser apenas interno ou o cliente tambem entra depois?
2. O diagnostico vira um objeto separado de projeto ou um tipo de projeto?
3. O WhatsApp sera apenas link/manual ou integrado depois?
4. Quais campos sao obrigatorios para um lead virar cliente?

## Backlog sugerido

### Fase 1

- login
- dashboard
- leads
- clientes
- trabalhos

### Fase 2

- pipeline drag and drop
- notas internas
- anexos
- filtros

### Fase 3

- automacoes
- templates de proposta
- portal do cliente
- visao financeira
