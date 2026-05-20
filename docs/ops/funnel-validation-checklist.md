# Checklist de Validacao do Funil

## Objetivo

Validar o fluxo completo:

- diagnostico publico
- lead no CRM
- conta criada
- diagnostico aberto
- deal registrado

## Precondicoes

- `.env.local` preenchido com credenciais reais
- `supabase/schema.sql` aplicado
- usuario interno criado no Supabase Auth
- app rodando em `http://localhost:3000`

## Passo a passo

1. Home publica
   - abrir `/`
   - clicar no CTA principal
   - confirmar que o destino e a agenda real ou o fallback planejado
   - clicar no CTA secundario
   - confirmar que o destino e o WhatsApp real ou o email configurado

2. Diagnostico publico
   - abrir `/diagnostico`
   - preencher nome, empresa, email, WhatsApp e gargalo principal
   - enviar formulario
   - confirmar mensagem de sucesso

3. Lead no CRM
   - abrir `/admin/leads`
   - localizar o lead pela busca
   - validar origem `site_formulario_diagnostico`
   - validar etapa inicial `novo_lead`
   - registrar uma nota interna

4. Conversao em conta
   - na lista de leads, usar `Criar conta + abrir diagnostico`
   - confirmar mensagem de sucesso

5. Conta criada
   - abrir `/admin/clients`
   - localizar a empresa pela busca
   - validar status `diagnostico`

6. Diagnostico aberto
   - abrir `/admin/work`
   - localizar o item `Diagnostico IA - {empresa}`
   - validar tipo `diagnostico`
   - validar `next_step`

7. Pipeline atualizado
   - abrir `/admin/pipeline`
   - confirmar que o lead foi para `diagnostico_agendado`

8. Deal criado
   - abrir `/admin/deals`
   - cadastrar um deal com conta, valor e fechamento esperado
   - validar forecast em tela
   - testar busca e filtro por status

## Sinais de aceite

- lead entra no banco sem erro
- login interno funciona
- conversao cria conta sem duplicacao desnecessaria
- abertura de diagnostico cria projeto uma vez
- filtros retornam os registros certos
- deals aceitam valor, status e data prevista
