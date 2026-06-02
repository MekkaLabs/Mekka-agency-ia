import { Container } from "../ui/container";
import { Eyebrow } from "../ui/badge";

export const faqItems = [
  {
    q: "A IA vai responder como um robô e afastar meu cliente?",
    a: "Não. O agente é treinado na sua forma de atender e na sua linguagem. Ele responde rápido, entende contexto e sabe a hora de passar pro humano. O cliente sente que foi bem atendido — não que falou com uma máquina.",
  },
  {
    q: "Preciso trocar meu número de WhatsApp ou minhas ferramentas?",
    a: "Não. Conectamos a camada de IA nos canais que você já usa. Sem migração, sem número novo, sem virar a operação de cabeça pra baixo. Você continua tocando o negócio enquanto instalamos por trás.",
  },
  {
    q: "Quanto tempo até estar funcionando?",
    a: "O diagnóstico leva poucos dias. O primeiro agente de atendimento normalmente entra no ar em 1 a 2 semanas — não em meses. Você acompanha cada resposta desde o começo.",
  },
  {
    q: "E quando a IA não souber responder?",
    a: "Ela escala pro humano certo, com todo o contexto da conversa. A IA resolve o repetitivo e o previsível; o que é sensível ou fora do script chega pro seu time pronto pra agir — não do zero.",
  },
  {
    q: "Meus dados e os dos meus clientes ficam seguros?",
    a: "Sim. Trabalhamos com acessos controlados e dados isolados por cliente. Nada da sua operação é usado fora dela. Segurança e confidencialidade são parte do setup, não um extra.",
  },
  {
    q: "Quanto custa?",
    a: "Depende do que sua operação precisa. Por isso começamos com um diagnóstico curto, que mostra onde a IA gera retorno antes de qualquer compromisso maior. Você decide avançar só vendo o valor concreto.",
  },
  {
    q: "Funciona pro meu tipo de empresa?",
    a: "Se você é um escritório ou operação de serviço B2B — advocacia, consultoria, contabilidade, agência, arquitetura, engenharia — e perde negócio por demora no atendimento ou follow-up, é exatamente pra você que a Mekka foi desenhada.",
  },
];

export function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section id="faq" className="scroll-mt-20 py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Perguntas frequentes</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            O que todo mundo pergunta antes.
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-3xl divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/[0.08]">
          {faqItems.map((item) => (
            <details key={item.q} className="group bg-surface/40">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-surface/70 md:px-8">
                <span className="font-display text-base font-medium md:text-lg">
                  {item.q}
                </span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-elevated text-ink-muted transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 text-ink-muted md:px-8">{item.a}</div>
            </details>
          ))}
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
