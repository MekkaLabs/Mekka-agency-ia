# Recuperacao de Dominio, DNS e SSL

## Decisao atual

- dominio principal preferido: `agenciamekka.com.br`
- dominio legado opcional: `mekkalabs.com.br`

## Diagnostico atual

- `http://mekkalabs.com.br` redireciona para `https://mekkalabs.com.br`
- a resposta hoje vem de `LiteSpeed / Hostinger`
- o certificado SSL do dominio esta expirado
- portanto o dominio nao esta servindo a partir da Vercel neste momento

## O que precisa acontecer

1. confirmar qual projeto da Vercel ja atende `agenciamekka.com.br`
2. manter `agenciamekka.com.br` como dominio principal do relancamento
3. decidir se `mekkalabs.com.br` vai redirecionar para o principal ou ficar desligado
4. se for manter o legado, apontar o DNS dele para a Vercel e remover registros antigos
5. aguardar a emissao automatica do certificado SSL pela Vercel

## Configuracao recomendada

### Apex domain

- `A` para `76.76.21.21`

### WWW

- `CNAME` para `cname.vercel-dns.com`

## Checklist de corte

- confirmar qual projeto Vercel vai receber o dominio
- validar `agenciamekka.com.br` no painel da Vercel
- definir redirect canonico de `mekkalabs.com.br` se ele continuar ativo
- atualizar DNS no provedor atual
- remover redirects ou proxy antigos da Hostinger
- validar que a Vercel marcou o dominio como `Valid Configuration`
- aguardar a emissao do SSL
- testar:
  - `https://agenciamekka.com.br`
  - `https://www.agenciamekka.com.br`
  - `https://mekkalabs.com.br` se permanecer ativo
  - redirect canonicamente escolhido

## Observacao importante

Segundo a documentacao oficial da Vercel, o SSL e emitido automaticamente para dominios corretamente configurados.
Se o certificado continuar expirado, quase sempre o problema e DNS incorreto, proxy intermediario ou dominio ainda servindo do host antigo.

## Referencias

- [Vercel Domains Overview](https://vercel.com/docs/domains)
- [Vercel Troubleshooting Custom Domains](https://vercel.com/docs/errors/error-list#domain-errors)
