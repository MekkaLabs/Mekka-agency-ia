export type HowStep = {
  title: string;
  desc: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  /** O sintoma que o cliente sente, em primeira pessoa. */
  pain: string;
  /** O que a Mekka instala. */
  solution: string;
  /** Entregas concretas. */
  bullets: string[];
  /** Resultado esperado em linguagem de ganho. */
  outcome: string;
  /** Ícone (emoji simples por enquanto, trocável por SVG depois). */
  icon: string;
  /** Produto de entrada / destaque na home. */
  featured?: boolean;

  /* --- Conteúdo da página dedicada --- */
  /** Headline da página do produto. */
  headline: string;
  /** Parágrafo de abertura da página. */
  intro: string;
  /** Como funciona, específico do produto (3 passos). */
  howItWorks: HowStep[];
  /** Para quem / em que cenário brilha. */
  forWho: string;
};

export const products: Product[] = [
  {
    slug: "atendimento",
    name: "Atendimento com IA",
    tagline: "Responde em segundos, 24/7, no WhatsApp e no site.",
    pain: "Você demora horas pra responder e o lead já fechou com outro.",
    solution:
      "Um agente que atende na hora, entende o contexto, qualifica e encaminha — sem o cliente esperar você acordar.",
    bullets: [
      "Resposta em menos de 1 minuto, qualquer hora",
      "Qualificação automática com perfil e dor",
      "Encaminhamento pro humano certo no momento certo",
      "Cada conversa registrada no seu CRM",
    ],
    outcome: "Zero lead esperando. Zero lead esquecido.",
    icon: "💬",
    featured: true,
    headline: "O primeiro a responder ganha. Que seja você — sempre.",
    intro:
      "No B2B de serviço, quem responde primeiro fecha. A camada de Atendimento da Mekka garante que nenhum contato espere — de madrugada, no fim de semana, no pico do dia. O agente entende o que o lead precisa, qualifica e já entrega pronto pro seu time agir.",
    howItWorks: [
      {
        title: "Conecta nos seus canais",
        desc: "WhatsApp, site e onde mais o lead chega. Sem trocar de número, sem migrar nada.",
      },
      {
        title: "Atende e qualifica",
        desc: "Responde em segundos, entende o contexto, faz as perguntas certas e identifica perfil e dor.",
      },
      {
        title: "Entrega pronto pro humano",
        desc: "Lead qualificado cai no seu CRM com próxima ação definida. Seu time só fecha.",
      },
    ],
    forWho:
      "Escritórios que recebem lead por WhatsApp e indicação e perdem negócio pela demora na primeira resposta.",
  },
  {
    slug: "prospeccao",
    name: "Prospecção com IA",
    tagline: "Um SDR que não dorme, não esquece e não desiste.",
    pain: "Você manda proposta e o cliente some. Ninguém faz follow-up.",
    solution:
      "Cadências de mensagem personalizadas que retomam o lead na hora certa, no canal certo, até obter resposta.",
    bullets: [
      "Cadências multicanal automáticas",
      "Follow-up que não deixa proposta morrer",
      "Mensagens personalizadas por perfil",
      "Reuniões agendadas direto na sua agenda",
    ],
    outcome: "Pipeline que anda sozinho enquanto você entrega.",
    icon: "🎯",
    headline: "A proposta não morre no silêncio. O follow-up acontece sozinho.",
    intro:
      "A maior parte das vendas B2B se perde entre a proposta enviada e o follow-up que ninguém faz. A camada de Prospecção retoma cada lead com a cadência certa, na linguagem certa, até virar um sim ou um não claro — sem depender da memória de ninguém.",
    howItWorks: [
      {
        title: "Mapeia o pipeline",
        desc: "Cada lead e proposta entra numa cadência adequada ao estágio e ao perfil.",
      },
      {
        title: "Retoma no tempo certo",
        desc: "Mensagens personalizadas em múltiplos canais, no ritmo que mantém o lead quente sem irritar.",
      },
      {
        title: "Agenda a reunião",
        desc: "Quando o lead responde, a reunião cai direto na sua agenda. Você entra só pra fechar.",
      },
    ],
    forWho:
      "Times comerciais que geram reunião mas perdem ritmo no follow-up e veem proposta esfriar.",
  },
  {
    slug: "suporte",
    name: "Suporte com IA",
    tagline: "Tira dúvida na hora, com a voz da sua empresa.",
    pain: "O time gasta o dia respondendo as mesmas perguntas.",
    solution:
      "Um agente treinado na sua base de conhecimento que resolve o repetitivo e libera o time pro que importa.",
    bullets: [
      "Base de conhecimento viva",
      "Respostas consistentes e na sua marca",
      "Escalonamento pro humano quando precisa",
      "Aprende com cada novo caso",
    ],
    outcome: "Suporte que escala sem contratar mais gente.",
    icon: "🛟",
    headline: "O repetitivo resolvido sozinho. Seu time no que importa.",
    intro:
      "Boa parte do suporte é a mesma pergunta repetida. A camada de Suporte aprende sua base de conhecimento e responde com consistência e na voz da empresa — escalando pro humano só quando realmente precisa.",
    howItWorks: [
      {
        title: "Aprende sua operação",
        desc: "Ingerimos documentos, FAQs e histórico pra criar uma base de conhecimento viva.",
      },
      {
        title: "Responde com consistência",
        desc: "Cada cliente recebe a mesma qualidade de resposta, no tom da sua marca, na hora.",
      },
      {
        title: "Escala quando precisa",
        desc: "Casos sensíveis ou fora do script vão pro humano certo, com todo o contexto.",
      },
    ],
    forWho:
      "Operações que afogam o time em dúvidas repetidas e querem escalar atendimento sem inchar a equipe.",
  },
  {
    slug: "conteudo",
    name: "Conteúdo com IA",
    tagline: "Produção comercial sem gargalo criativo.",
    pain: "Campanhas, textos e materiais sempre travam em alguém.",
    solution:
      "Uma rotina de produção com IA pra criar posts, emails, propostas e roteiros na sua identidade, em escala.",
    bullets: [
      "Posts, emails e roteiros sob demanda",
      "Tom de voz da marca preservado",
      "Apoio a páginas e criativos",
      "Da ideia ao publicado sem retrabalho",
    ],
    outcome: "Mais material, menos dependência de uma pessoa.",
    icon: "✍️",
    headline: "A produção não trava mais numa pessoa só.",
    intro:
      "Quando todo material depende de uma cabeça, a empresa produz no ritmo dela. A camada de Conteúdo transforma sua identidade em uma rotina de produção — posts, emails, propostas e roteiros — em escala e sem perder o tom.",
    howItWorks: [
      {
        title: "Captura sua voz",
        desc: "Definimos tom, referências e formatos pra que tudo saia com a cara da marca.",
      },
      {
        title: "Produz sob demanda",
        desc: "Posts, emails, roteiros e apoio a páginas e criativos quando você precisa.",
      },
      {
        title: "Da ideia ao publicado",
        desc: "Fluxo de revisão enxuto, do rascunho ao no ar, sem retrabalho.",
      },
    ],
    forWho:
      "Agências e escritórios que precisam produzir com volume mas vivem travados na agenda de uma pessoa.",
  },
  {
    slug: "analise",
    name: "Análise & Relatórios com IA",
    tagline: "Os números do negócio, lidos pra você.",
    pain: "Os dados existem, mas ninguém tem tempo de olhar.",
    solution:
      "Relatórios automáticos que traduzem operação em decisão — o que melhorou, o que travou, o que fazer.",
    bullets: [
      "Relatórios automáticos recorrentes",
      "Leitura em linguagem de decisão",
      "Alertas do que precisa de atenção",
      "Painel de operação sempre atualizado",
    ],
    outcome: "Decisão baseada em dado, não em achismo.",
    icon: "📊",
    headline: "Seus dados já existem. Falta alguém lendo por você.",
    intro:
      "Toda empresa acumula dado e nenhuma tem tempo de olhar. A camada de Análise transforma sua operação em relatórios que falam a língua da decisão: o que melhorou, o que travou, e o que fazer a seguir.",
    howItWorks: [
      {
        title: "Conecta as fontes",
        desc: "CRM, planilhas e ferramentas da operação viram uma visão única.",
      },
      {
        title: "Lê e traduz",
        desc: "Relatórios recorrentes em linguagem de decisão — não tabelas que ninguém abre.",
      },
      {
        title: "Alerta o que importa",
        desc: "O que precisa de atenção chega até você antes de virar problema.",
      },
    ],
    forWho:
      "Sócios e gestores que decidem no achismo porque ninguém tem tempo de transformar dado em leitura.",
  },
  {
    slug: "operacao",
    name: "Operação & Onboarding com IA",
    tagline: "Memória da empresa que não depende de ninguém.",
    pain: "Tudo depende de você ou de uma pessoa-chave.",
    solution:
      "Processos, respostas-padrão e onboarding documentados e operados por IA — a empresa para de viver na sua cabeça.",
    bullets: [
      "Processos e SOPs documentados",
      "Onboarding de novo funcionário com IA",
      "Respostas-padrão e memória operacional",
      "Menos retrabalho, mais consistência",
    ],
    outcome: "A operação roda mesmo quando você não está.",
    icon: "⚙️",
    headline: "A empresa para de viver na cabeça do dono.",
    intro:
      "Quando tudo depende de uma pessoa-chave, a empresa não escala — e fica refém. A camada de Operação documenta processos, cria memória e opera o onboarding com IA, pra que a operação rode mesmo quando você não está.",
    howItWorks: [
      {
        title: "Documenta o que está na cabeça",
        desc: "Processos, SOPs e respostas-padrão saem da memória e viram estrutura.",
      },
      {
        title: "Cria memória viva",
        desc: "Uma base operacional que a equipe e a IA consultam — e que cresce com o uso.",
      },
      {
        title: "Onboarda no automático",
        desc: "Novo funcionário entra com contexto e treino guiado por IA, sem travar ninguém.",
      },
    ],
    forWho:
      "Empresas onde o fundador é o gargalo de tudo e querem reduzir a dependência de pessoas-chave.",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
