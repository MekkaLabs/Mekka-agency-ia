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
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
