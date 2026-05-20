# Setup Supabase

Baseado na documentacao oficial do Supabase para Next.js e SSR:

- https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- https://supabase.com/docs/guides/auth/server-side/creating-a-client

## O que ja foi preparado no projeto

- clientes Supabase para browser e server
- middleware para sessao
- login real com `signInWithPassword`
- protecao da area `/admin`
- formulario publico `/diagnostico` salvando em `leads`
- schema SQL inicial em `supabase/schema.sql`

## Passos

1. Crie um projeto no Supabase.
2. Copie `.env.local.example` para `.env.local`.
3. Preencha:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_SITE_DOMAIN`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_CONTACT_EMAIL`
   - `NEXT_PUBLIC_WHATSAPP_URL`
   - `NEXT_PUBLIC_SCHEDULING_URL`
4. No SQL Editor do Supabase, rode `supabase/schema.sql`.
5. Crie um usuario interno em Auth.
6. Rode `npm run dev`.
7. Teste:
   - `/diagnostico`
   - `/login`
   - `/admin`
   - `/admin/leads`
   - `/admin/deals`
   - `/admin/work`

## Observacoes

- O policy `site can insert leads` permite que o formulario publico grave leads.
- A leitura e edicao de CRM ficam para usuarios autenticados.
- Depois podemos endurecer as policies por role.
- Se `NEXT_PUBLIC_SCHEDULING_URL` nao estiver preenchido, o CTA principal da home continua apontando para `/diagnostico`.
- Se `NEXT_PUBLIC_WHATSAPP_URL` nao estiver preenchido, o CTA secundario cai para email.
- A home agora usa o CTA configuravel tanto no hero quanto no bloco de oferta, evitando links publicos inconsistentes.

## Validacao ponta a ponta

1. Preencha `.env.local` com:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_CONTACT_EMAIL`
   - `NEXT_PUBLIC_WHATSAPP_URL`
   - `NEXT_PUBLIC_SCHEDULING_URL`
2. Rode o schema atualizado em `supabase/schema.sql`.
3. Crie um usuario interno em Auth com email e senha.
4. Reinicie `npm run dev`.
5. Abra `/` e valide:
   - CTA principal indo para agenda real, se configurada
   - CTA secundario indo para WhatsApp real
6. Abra `/diagnostico` e envie um lead de teste.
7. Confirme em `/admin/leads`:
   - lead salvo com origem `site_formulario_diagnostico`
   - filtro por origem e busca funcionando
   - atualizacao de etapa funcionando
8. Converta o lead em conta e diagnostico.
9. Confirme em:
   - `/admin/clients`: conta criada
   - `/admin/work`: projeto de diagnostico criado
   - `/admin/pipeline`: lead movido para `diagnostico_agendado`
10. Abra `/admin/deals` e registre um deal de teste para validar forecast, filtros e atualizacao.
