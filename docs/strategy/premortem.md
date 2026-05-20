# Premortem - Mekka Labs Agency AI

## Pergunta central

Se a Mekka falhar nos proximos 6 a 12 meses, por que ela falhou mesmo tendo uma boa tese e uma stack promissora?

## Cenario de falha

A Mekka relanca com um discurso atraente sobre IA, monta um site bonito, organiza parte da operacao interna, mas nao transforma isso em rotina de vendas e entrega previsivel. O mercado acha a proposta interessante, mas pouco urgente. Os leads entram em volume insuficiente, a conversao e baixa, a entrega fica artesanal e o fundador continua sendo o gargalo de quase tudo.

## Leitura executiva

O fracasso mais provavel nao viria por falta de tecnologia.

Viria pela combinacao de:

- posicionamento ainda pouco concreto para o mercado
- conversao fraca do interesse em diagnostico vendido
- entrega nao suficientemente padronizada
- falta de prova comercial simples
- operacao dependendo demais do fundador

## Hipoteses principais de falha

### 1. A proposta continua clara para o time, mas abstrata para o mercado

Risco:

- a Mekka entende muito bem o que faz, mas o cliente continua ouvindo algo amplo demais

Sinais:

- reunioes com curiosidade, mas baixa conversao
- cliente pedindo exemplos concretos para entender a oferta
- dificuldade de responder "o que voces resolvem primeiro?"

Impacto:

- queda na conversao de visitas para conversas
- queda na conversao de conversas para diagnostico

Contramedidas:

- enfatizar o trilho inicial `Diagnostico -> Atendimento com IA`
- declarar sintomas concretos na home
- vender a transformacao em 30 dias, nao a tese completa

### 2. A home gera interesse, mas nao gera acao suficiente

Risco:

- o site comunica bem, mas os CTAs nao levam para canais reais ou nao reduzem atrito suficiente

Sinais:

- muito acesso e pouco lead
- clique alto em CTA secundario e envio baixo no principal
- abandono do formulario

Impacto:

- baixa densidade comercial
- dificuldade de aprender com o mercado

Contramedidas:

- configurar WhatsApp e agenda reais
- rastrear cliques e envios
- testar CTA principal entre agenda e diagnostico
- reduzir campos e friccao se necessario

### 3. O ICP fica amplo demais

Risco:

- a Mekka tenta parecer relevante para todo tipo de empresa

Sinais:

- mensagens comerciais mudando muito entre conversas
- propostas diferentes demais entre si
- dificuldade para criar prova e narrativa

Impacto:

- perda de clareza
- pior taxa de fechamento

Contramedidas:

- escolher 1 ICP primario
- escolher 1 dor dominante
- adaptar site e oferta para esse recorte primeiro

### 4. O cliente compra o diagnostico, mas nao avanca para implantacao

Risco:

- o diagnostico vira fim em si mesmo em vez de porta para modulos de maior valor

Sinais:

- muitos diagnosticos sem proposta posterior
- baixa conversao de diagnostico em implantacao
- pouca urgencia apos a leitura inicial

Impacto:

- receita limitada
- funil quebrado no meio

Contramedidas:

- desenhar saida padrao do diagnostico
- entregar prioridade, plano e recomendacao de primeiro modulo
- sempre fechar o diagnostico com uma proxima proposta concreta

### 5. A entrega vira artesanal e consome margem

Risco:

- cada projeto vira uma consultoria do zero

Sinais:

- muito retrabalho
- dificuldade de estimar prazos
- notas espalhadas e pouco reaproveitamento

Impacto:

- operacao pesada
- margem comprimida
- incapacidade de escalar

Contramedidas:

- templates de diagnostico, proposta, kickoff e acompanhamento
- playbooks por modulo
- checklist de onboarding e entrega
- tasks e notas padronizadas no CRM

### 6. O CRM existe, mas nao entra no ritual diario

Risco:

- o sistema vira vitrine e nao ferramenta de operacao

Sinais:

- pipeline desatualizado
- proximas acoes vazias
- notas fora do sistema

Impacto:

- perda de contexto
- gargalo de memoria
- operacao reativa

Contramedidas:

- definir ritual diario de atualizacao
- deixar dashboard mostrar fila real de acao
- adicionar filtros, busca, notas e historico
- impedir que lead qualificado fique sem proxima acao

### 7. Falta prova simples de resultado

Risco:

- a proposta parece plausivel, mas nao convincente

Sinais:

- muito "interessante"
- pouco "vamos fazer"
- muita necessidade de explicacao em call

Impacto:

- aumento da friccao comercial
- ciclo mais lento

Contramedidas:

- transformar cada entrega em mini case
- publicar antes e depois operacional
- usar linguagem de sintomas e ganhos reais

### 8. O fundador continua como hub de tudo

Risco:

- toda venda, decisao, desenho e ajuste depende de uma pessoa

Sinais:

- backlog travado
- demora em respostas
- contexto preso na cabeca do fundador

Impacto:

- limite de escala muito cedo
- risco operacional alto

Contramedidas:

- documentar SOPs
- padronizar operacao no Obsidian
- usar CRM como memoria oficial
- transformar entregas em estrutura, nao improviso

### 9. O sistema fica mais sofisticado do que o comercial precisa

Risco:

- o time melhora muito o admin e pouco a capacidade de vender

Sinais:

- mais evolucao interna do que leads
- backlog tecnico crescendo mais rapido que pipeline
- features sem impacto direto em conversao ou entrega

Impacto:

- energia mal alocada
- produto interno bom, negocio fraco

Contramedidas:

- priorizar sempre por impacto em receita ou margem
- usar a regra `conversao antes de complexidade`
- revisar backlog por valor comercial

## Sinais de alerta para monitorar

### Semana a semana

- numero de leads entrando
- numero de diagnosticos agendados
- numero de diagnosticos vendidos
- numero de propostas enviadas
- numero de implantacoes fechadas
- tempo medio sem proxima acao em leads ativos

### Mes a mes

- taxa de conversao de lead para diagnostico
- taxa de conversao de diagnostico para implantacao
- tempo para primeira entrega de valor
- quantidade de ativos reaproveitaveis criados

## Melhorias preventivas recomendadas

### Frente comercial

- definir ICP primario
- configurar CTA real
- criar proposta padrao
- criar mini cases de bastidor

### Frente de site

- reforcar prova
- explicitar sintomas do ICP
- declarar ganho inicial em 30 dias
- medir comportamento do CTA

### Frente de sistema

- conectar Supabase real
- filtros e busca no CRM
- deals e tarefas
- notas em toda a operacao

### Frente de entrega

- template de diagnostico
- template de proposta
- checklist de onboarding
- playbook do modulo `Atendimento com IA`

## Decisao central

Se houver duvida sobre o que fazer primeiro, a resposta deve ser:

1. o que aumenta conversao
2. o que reduz improviso comercial
3. o que reduz improviso operacional
4. so depois o que aumenta sofisticacao tecnica

## Resumo do premortem

O maior risco da Mekka nao e a IA falhar.

O maior risco e a empresa parecer promissora, mas ainda nao inevitavel.

Para evitar isso, a Mekka precisa:

- parecer mais concreta
- vender uma entrada simples
- provar valor rapido
- operar com memoria e rotina
- transformar o CRM em habito, nao em vitrine
