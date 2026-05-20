import Link from "next/link";
import { getSiteConfig } from "@/lib/site-config";

const strategicSignals = [
  { value: "4", label: "frentes de implantacao" },
  { value: "1", label: "oferta de entrada enxuta" },
  { value: "100%", label: "foco em operacao real" },
];

const heroBenefits = [
  "Mais resposta e menos lead perdido",
  "Mais ritmo comercial e menos follow-up esquecido",
  "Mais processo e menos improviso na operacao",
];

const painPoints = [
  "Sua equipe demora para responder e perde oportunidades.",
  "O comercial depende demais de memoria e boa vontade.",
  "A operacao esta espalhada em mensagens, planilhas e pessoas-chave.",
  "O marketing produz menos do que poderia porque tudo vira retrabalho.",
];

const diagnosisDeliverables = [
  "Leitura da operacao atual",
  "Mapa dos gargalos mais caros",
  "Prioridades de implantacao",
  "Plano da primeira camada de IA",
];

const operatingPrinciples = [
  "Atacar primeiro o gargalo que custa mais tempo e energia.",
  "Transformar improviso em processo editavel.",
  "Usar IA como camada operacional, nao como efeito especial.",
];

const modules = [
  {
    title: "Atendimento com IA",
    description:
      "Para responder mais rapido, organizar conversas e parar de perder lead por demora.",
  },
  {
    title: "Vendas com IA",
    description:
      "Para estruturar follow-up, propostas, qualificacao e rotina comercial com mais consistencia.",
  },
  {
    title: "Marketing com IA",
    description:
      "Para acelerar campanhas, copy, criativos e materiais de venda sem inflar a equipe.",
  },
  {
    title: "Operacao com IA",
    description:
      "Para organizar processos, documentos, respostas e memoria operacional do negocio.",
  },
];

const processSteps = [
  "Voce entra pelo diagnostico e mostra onde o negocio esta travando.",
  "A Mekka mapeia gargalos, prioridades e o primeiro ponto de impacto.",
  "Implantamos uma primeira camada pratica de IA em um problema real.",
  "Ajustamos, medimos e expandimos so depois que houver resultado e confianca.",
];

const proofAngles = [
  {
    title: "Prova de metodo",
    description:
      "A Mekka nao entra fazendo tudo. Entra com diagnostico, mapa de gargalos, primeira implantacao e expansao controlada.",
  },
  {
    title: "Prova operacional",
    description:
      "O objetivo nao e impressionar com tecnologia. E reduzir demora, retrabalho e dependencia de improviso.",
  },
  {
    title: "Prova de bastidor",
    description:
      "Por tras, a operacao usa CRM, backoffice, playbooks e agentes especializados para executar com consistencia.",
  },
];

const faqs = [
  {
    question: "Isso e so para empresa grande?",
    answer:
      "Nao. A melhor entrada e justamente onde ha dor clara e necessidade de ganhar tempo e organizar melhor a operacao.",
  },
  {
    question: "Preciso entender IA para contratar?",
    answer:
      "Nao. A Mekka monta a camada operacional por tras e traduz isso em melhoria pratica para o negocio.",
  },
  {
    question: "Isso e so um chatbot?",
    answer:
      "Nao. Chat pode ser uma parte, mas a entrega e uma estrutura para atendimento, vendas, marketing e operacao.",
  },
  {
    question: "Quanto tempo leva para ver valor?",
    answer:
      "O caminho comeca por um diagnostico e pela escolha de um gargalo claro para atacar primeiro.",
  },
  {
    question: "Como eu comeco sem risco grande?",
    answer:
      "Comecando pelo Diagnostico de IA para a Empresa, que reduz risco, clareia prioridade e organiza o primeiro passo.",
  },
];

export default function Home() {
  const site = getSiteConfig();
  const primaryCtaHref = site.schedulingUrl ?? "/diagnostico";
  const primaryCtaLabel = site.schedulingUrl
    ? "Agendar Diagnostico de IA"
    : "Enviar Diagnostico de IA";
  const secondaryCtaHref = site.whatsappUrl ?? `mailto:${site.contactEmail}`;
  const secondaryCtaLabel = site.whatsappUrl
    ? "Falar no WhatsApp"
    : "Falar por email";

  return (
    <main className="page-shell">
      <header className="site-topbar">
        <Link href="/" className="site-mark">
          <span className="site-mark-badge">ML</span>
          <span>Mekka Labs</span>
        </Link>
        <nav className="site-nav">
          <a href="#servicos">Modulos</a>
          <a href="#metodo">Metodo</a>
          <a href="#faq">FAQ</a>
          <a href="/login">Backoffice</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="hero-badge-row">
            <p className="eyebrow">Mekka Labs</p>
            <span className="hero-status-pill">Growth, criacao e sistemas de IA</span>
          </div>
          <h1>
            Uma equipe de IA trabalhando por tras da sua empresa para atender
            melhor, vender mais e organizar a operacao.
          </h1>
          <p className="lead">
            A Mekka Labs identifica gargalos, monta a primeira camada de IA e
            coloca mais velocidade, consistencia e capacidade na sua operacao
            sem exigir um time tecnico interno.
          </p>
          <div className="hero-actions">
            <a href={primaryCtaHref} className="primary-link">
              {primaryCtaLabel}
            </a>
            <a
              href={secondaryCtaHref}
              target={secondaryCtaHref.startsWith("http") ? "_blank" : undefined}
              rel={secondaryCtaHref.startsWith("http") ? "noreferrer" : undefined}
              className="secondary-link"
            >
              {secondaryCtaLabel}
            </a>
          </div>
          <ul className="bullet-list hero-benefits">
            {heroBenefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="hero-inline-meta">
            <p className="helper-copy">Dominio principal: {site.domain}</p>
            <div className="hero-micro-proof">
              {strategicSignals.map((item) => (
                <div key={item.label} className="micro-proof-item">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-panel">
            <span className="card-kicker">Primeira oferta</span>
            <h2>Diagnostico de IA para a Empresa</h2>
            <p>
              A porta de entrada da Mekka para descobrir onde sua empresa pode
              ganhar tempo, reduzir gargalos e estruturar a primeira implantacao.
            </p>
            <ul>
              {diagnosisDeliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="hero-card-note">
            <span>Leitura inicial</span>
            <strong>Atendimento, vendas, marketing e operacao</strong>
          </div>
        </div>
      </section>

      <section className="signal-band">
        <div>
          <span className="signal-label">Para quem isso faz sentido</span>
          <strong>Empresas que ja existem e sentem o peso do caos operacional</strong>
        </div>
        <p>
          Se o problema hoje e demora, follow-up fraco, retrabalho ou excesso de
          dependencia de pessoas-chave, a Mekka entra para estruturar isso com IA.
        </p>
      </section>

      <section className="section split-band">
        <div className="split-band-copy">
          <p className="eyebrow">Principios de operacao</p>
          <h2>Menos promessa vaga. Mais sistema pratico para o dia a dia.</h2>
        </div>
        <div className="split-band-list">
          {operatingPrinciples.map((item) => (
            <article key={item} className="split-band-card">
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">O problema</p>
          <h2>O custo do improviso cresce quando a empresa cresce</h2>
        </div>
        <div className="problem-grid">
          {painPoints.map((item) => (
            <article key={item} className="problem-card">
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section two-column">
        <div className="panel">
          <p className="eyebrow">Oferta de entrada</p>
          <h2>Comece pequeno, em um problema claro</h2>
          <p>
            A Mekka nao comeca vendendo uma transformacao abstrata. Comeca com
            diagnostico, clareza de prioridade e um primeiro passo pratico.
          </p>
          <ul className="bullet-list">
            {diagnosisDeliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="hero-actions">
            <a href={primaryCtaHref} className="primary-link">
              {primaryCtaLabel}
            </a>
            <a
              href={secondaryCtaHref}
              target={secondaryCtaHref.startsWith("http") ? "_blank" : undefined}
              rel={secondaryCtaHref.startsWith("http") ? "noreferrer" : undefined}
              className="secondary-link"
            >
              {secondaryCtaLabel}
            </a>
          </div>
        </div>

        <div className="panel">
          <p className="eyebrow">O que o cliente compra</p>
          <h2>Resultado de negocio, nao stack</h2>
          <ul className="bullet-list">
            <li>Mais capacidade operacional</li>
            <li>Mais consistencia no atendimento e nas vendas</li>
            <li>Mais velocidade para executar</li>
            <li>Menos dependencia de improviso</li>
            <li>Menos caos interno para crescer</li>
          </ul>
        </div>
      </section>

      <section id="servicos" className="section">
        <div className="section-heading">
          <p className="eyebrow">Modulos</p>
          <h2>Quatro caminhos de implantacao</h2>
        </div>
        <div className="service-grid">
          {modules.map((service) => (
            <article key={service.title} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="metodo" className="section">
        <div className="section-heading">
          <p className="eyebrow">Como funciona</p>
          <h2>Metodo simples para nao assustar nem prometer magia</h2>
        </div>
        <div className="process-grid">
          {processSteps.map((step, index) => (
            <article key={step} className="process-card">
              <span className="process-index">0{index + 1}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section two-column">
        <div className="panel">
          <p className="eyebrow">Prova</p>
          <h2>Mesmo sem grandes cases, a pagina precisa gerar confianca</h2>
          <div className="proof-list">
            {proofAngles.map((item) => (
              <article key={item.title} className="proof-card">
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div id="faq" className="panel accent-panel">
          <p className="eyebrow">FAQ rapido</p>
          <h2>O que um empresario precisa entender antes de falar com a Mekka</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <article key={faq.question} className="faq-item">
                <strong>{faq.question}</strong>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="final-cta">
          <p className="eyebrow">Proximo passo</p>
          <h2>Descubra onde sua empresa pode ganhar tempo e vender melhor com IA</h2>
          <p>
            Comece com o diagnostico. A Mekka entra pelo problema mais caro,
            estrutura a primeira camada e prepara o terreno para crescer com mais
            consistencia.
          </p>
          <div className="hero-actions final-actions">
            <a href={primaryCtaHref} className="primary-link">
              {primaryCtaLabel}
            </a>
            <a
              href={secondaryCtaHref}
              target={secondaryCtaHref.startsWith("http") ? "_blank" : undefined}
              rel={secondaryCtaHref.startsWith("http") ? "noreferrer" : undefined}
              className="secondary-link"
            >
              {secondaryCtaLabel}
            </a>
            <a href="/login" className="secondary-link">
              Entrar na area interna
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
