import { ButtonLink } from "@/components/atoms/button-link";
import { SectionHeading } from "@/components/atoms/section-heading";
import { FeatureCard } from "@/components/molecules/feature-card";

type HomeSectionsProps = {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  secondaryExternal: boolean;
};

const orbitCapsules = [
  "Marketing Digital",
  "Branding",
  "Marketing e Planejamento",
  "Web, automação e operação",
];

const painPoints = [
  "Sua equipe demora para responder e perde oportunidades.",
  "O comercial depende demais de memória e boa vontade.",
  "A operação está espalhada em mensagens, planilhas e pessoas-chave.",
  "O marketing produz menos do que poderia porque tudo vira retrabalho.",
];

const modules = [
  {
    title: "Atendimento com IA",
    description:
      "Para responder mais rápido, organizar conversas e parar de perder lead por demora.",
  },
  {
    title: "Vendas com IA",
    description:
      "Para estruturar follow-up, propostas, qualificação e rotina comercial com mais consistência.",
  },
  {
    title: "Marketing com IA",
    description:
      "Para acelerar campanhas, copy, criativos e materiais de venda sem inflar a equipe.",
  },
  {
    title: "Operação com IA",
    description:
      "Para organizar processos, documentos, respostas e memória operacional do negócio.",
  },
];

const processSteps = [
  "Você entra pelo diagnóstico e mostra onde o negócio está travando.",
  "A Mekka mapeia gargalos, prioridades e o primeiro ponto de impacto.",
  "Implantamos uma primeira camada prática de IA em um problema real.",
  "Ajustamos, medimos e expandimos só depois que houver resultado e confiança.",
];

const proofAngles = [
  {
    title: "Prova de método",
    description:
      "A Mekka não entra fazendo tudo. Entra com diagnóstico, mapa de gargalos, primeira implantação e expansão controlada.",
  },
  {
    title: "Prova operacional",
    description:
      "O objetivo não é impressionar com tecnologia. É reduzir demora, retrabalho e dependência de improviso.",
  },
  {
    title: "Prova de bastidor",
    description:
      "Por trás, a operação usa CRM, backoffice, playbooks e agentes especializados para executar com consistência.",
  },
];

const faqs = [
  {
    question: "Isso é só para empresa grande?",
    answer:
      "Não. A melhor entrada é justamente onde há dor clara e necessidade de ganhar tempo e organizar melhor a operação.",
  },
  {
    question: "Preciso entender IA para contratar?",
    answer:
      "Não. A Mekka monta a camada operacional por trás e traduz isso em melhoria prática para o negócio.",
  },
  {
    question: "Isso é só um chatbot?",
    answer:
      "Não. Chat pode ser uma parte, mas a entrega é uma estrutura para atendimento, vendas, marketing e operação.",
  },
  {
    question: "Quanto tempo leva para ver valor?",
    answer:
      "O caminho começa por um diagnóstico e pela escolha de um gargalo claro para atacar primeiro.",
  },
];

export function HomeSections({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  secondaryExternal,
}: HomeSectionsProps) {
  return (
    <>
      <section
        id="orbita"
        className="mt-8 rounded-[32px] border border-white/8 bg-[radial-gradient(circle_at_left,rgba(163,230,53,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-6 md:p-8"
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Em órbita"
            title="Os terrenos onde a Mekka entra para destravar crescimento"
            description="Uma camada Mekka bem desenhada conecta posicionamento, receita e operação para o negócio conseguir crescer sem depender de caos."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {orbitCapsules.map((item, index) => (
              <div
                key={item}
                className="rounded-[26px] border border-white/8 bg-black/20 px-5 py-5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-zinc-500">
                  órbita 0{index + 1}
                </p>
                <p className="mt-4 font-[var(--font-space-grotesk)] text-xl font-semibold uppercase tracking-[-0.04em] text-zinc-100">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading
          eyebrow="O problema"
          title="O custo do improviso cresce quando a empresa cresce"
          description="Se o problema hoje é demora, follow-up fraco, retrabalho ou excesso de dependência de pessoas-chave, a Mekka entra para estruturar isso com IA."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {painPoints.map((item, index) => (
            <FeatureCard
              key={item}
              eyebrow={`fricção 0${index + 1}`}
              title="Gargalo operacional"
              description={item}
            />
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-8">
          <SectionHeading
            eyebrow="Oferta de entrada"
            title="Comece pequeno, em um problema claro"
            description="A Mekka não começa vendendo uma transformação abstrata. Começa com diagnóstico, clareza de prioridade e um primeiro passo prático."
          />
          <div className="mt-8 grid gap-3">
            <div className="rounded-[22px] border border-white/8 bg-black/20 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                primeiro ganho
              </p>
              <p className="mt-3 text-sm leading-7 text-zinc-300">
                Encontrar o gargalo que hoje custa tempo, resposta e energia da equipe.
              </p>
            </div>
            <div className="rounded-[22px] border border-white/8 bg-black/20 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                primeira camada
              </p>
              <p className="mt-3 text-sm leading-7 text-zinc-300">
                Implantar uma solução editável, com ritmo operacional e sem complexidade desnecessária.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
            <ButtonLink
              href={secondaryHref}
              variant="secondary"
              external={secondaryExternal}
            >
              {secondaryLabel}
            </ButtonLink>
          </div>
        </div>

        <div
          id="servicos"
          className="rounded-[32px] border border-cyan-400/15 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_26%),linear-gradient(180deg,rgba(6,16,20,0.92),rgba(3,7,9,0.94))] p-8"
        >
          <SectionHeading
            eyebrow="Módulos"
            title="Quatro caminhos de implantação"
            description="A mesma identidade Mekka, agora organizada como sistema: atendimento, vendas, marketing e operação."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {modules.map((item, index) => (
              <FeatureCard
                key={item.title}
                eyebrow={`módulo 0${index + 1}`}
                title={item.title}
                description={item.description}
                tone={index === 0 ? "highlight" : "default"}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="metodo" className="mt-20">
        <SectionHeading
          eyebrow="Como funciona"
          title="Método simples para não assustar nem prometer magia"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <article
              key={step}
              className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-6"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.26em] text-lime-300">
                0{index + 1}
              </span>
              <p className="mt-5 text-base leading-7 text-zinc-300">{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-6 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Prova"
            title="Mesmo sem grandes cases, a página precisa gerar confiança"
            description="A assinatura premium aqui vem de clareza, método e leitura operacional. Não de promessas vagas nem de efeito visual vazio."
          />
          <div className="mt-8 grid gap-4">
            {proofAngles.map((item, index) => (
              <FeatureCard
                key={item.title}
                eyebrow={`evidência 0${index + 1}`}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>

        <div
          id="faq"
          className="rounded-[32px] border border-lime-300/12 bg-gradient-to-br from-lime-300/8 to-transparent p-8"
        >
          <SectionHeading
            eyebrow="FAQ"
            title="O que um empresário precisa entender antes de falar com a Mekka"
          />
          <div className="mt-8 grid gap-4">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-[24px] border border-white/8 bg-black/20 p-5"
              >
                <strong className="block font-[var(--font-space-grotesk)] text-xl font-semibold uppercase tracking-[-0.03em] text-white">
                  {faq.question}
                </strong>
                <p className="mt-3 text-sm leading-7 text-zinc-400 md:text-base">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 rounded-[38px] border border-lime-300/12 bg-[radial-gradient(circle_at_top,rgba(163,230,53,0.12),transparent_32%),radial-gradient(circle_at_bottom,rgba(56,189,248,0.12),transparent_30%),linear-gradient(180deg,rgba(9,16,12,0.96),rgba(3,6,4,0.98))] px-8 py-12 text-center md:px-14">
        <SectionHeading
          eyebrow="Próximo passo"
          title="Descubra onde sua empresa pode ganhar tempo e vender melhor com IA"
          description="Comece com o diagnóstico. A Mekka entra pelo problema mais caro, estrutura a primeira camada e prepara o terreno para crescer com mais consistência."
          align="center"
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
          <ButtonLink
            href={secondaryHref}
            variant="secondary"
            external={secondaryExternal}
          >
            {secondaryLabel}
          </ButtonLink>
          <ButtonLink href="/login" variant="secondary">
            Entrar na área interna
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
