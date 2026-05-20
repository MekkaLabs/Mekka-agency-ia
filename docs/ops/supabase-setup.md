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

## Observacoes

- O policy `site can insert leads` permite que o formulario publico grave leads.
- A leitura e edicao de CRM ficam para usuarios autenticados.
- Depois podemos endurecer as policies por role.
- Se `NEXT_PUBLIC_SCHEDULING_URL` nao estiver preenchido, o CTA principal da home continua apontando para `/diagnostico`.
- Se `NEXT_PUBLIC_WHATSAPP_URL` nao estiver preenchido, o CTA secundario cai para email.
