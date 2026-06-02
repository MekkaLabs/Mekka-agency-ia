import { Container } from "../ui/container";
import { Eyebrow } from "../ui/badge";

const steps = [
  {
    n: "01",
    title: "Diagnóstico",
    desc: "Lemos sua operação atual, mapeamos onde o lead esfria e onde o tempo vaza. Você sai com prioridades claras — não com um relatório que ninguém lê.",
    duration: "3 dias",
  },
  {
    n: "02",
    title: "Implantação",
    desc: "Instalamos o primeiro agente (normalmente Atendimento) conectado aos seus canais. Em dias, não meses. Sua equipe acompanha cada resposta.",
    duration: "1–2 semanas",
  },
  {
    n: "03",
    title: "Operação",
    desc: "A camada de IA roda, aprende e expande. Adicionamos módulos conforme a operação pede. A Mekka opera, otimiza e cresce com você.",
    duration: "contínuo",
  },
];

export function Process() {
  return (
    <section id="como-funciona" className="scroll-mt-20 py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Como funciona</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Do caos ao previsível em três passos.
          </h2>
        </div>

        <div className="mt-16 space-y-px overflow-hidden rounded-2xl border border-white/[0.08]">
          {steps.map((s) => (
            <div
              key={s.n}
              className="grid items-start gap-4 bg-surface/40 p-8 transition-colors hover:bg-surface/70 md:grid-cols-[auto_1fr_auto] md:gap-10 md:p-10"
            >
              <span className="font-display text-3xl font-semibold text-accent-soft md:text-4xl">
                {s.n}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold md:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-2xl text-ink-muted">{s.desc}</p>
              </div>
              <span className="rounded-full border border-white/10 bg-elevated px-3 py-1 text-xs text-ink-muted">
                {s.duration}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
