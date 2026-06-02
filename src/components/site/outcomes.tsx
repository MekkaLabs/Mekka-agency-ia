import { Container } from "../ui/container";
import { Eyebrow } from "../ui/badge";

const rows = [
  {
    before: "Lead manda WhatsApp segunda, é respondido quarta.",
    after: "Respondido em segundos, qualquer dia e hora.",
  },
  {
    before: "Pipeline depende da Carla lembrar de cada follow-up.",
    after: "Cadência automática retoma cada lead sozinha.",
  },
  {
    before: "Proposta enviada, cliente some, ninguém cobra.",
    after: "Follow-up estruturado até obter um sim ou um não.",
  },
  {
    before: "Tudo vive na cabeça do sócio.",
    after: "Processo documentado e operado pela camada de IA.",
  },
];

export function Outcomes() {
  return (
    <section id="resultados" className="scroll-mt-20 py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>O que muda em 30 dias</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Antes e depois da camada de IA.
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-3xl overflow-hidden rounded-2xl border border-white/[0.08]">
          <div className="grid grid-cols-2 border-b border-white/[0.08] bg-surface/60 text-xs font-semibold uppercase tracking-[0.16em]">
            <p className="border-r border-white/[0.08] p-4 text-ink-faint">
              Hoje
            </p>
            <p className="p-4 text-accent-soft">Com a Mekka</p>
          </div>
          {rows.map((r) => (
            <div
              key={r.before}
              className="grid grid-cols-2 border-b border-white/[0.06] last:border-0"
            >
              <p className="border-r border-white/[0.06] p-5 text-sm text-ink-faint line-through decoration-white/20">
                {r.before}
              </p>
              <p className="bg-accent/[0.04] p-5 text-sm text-ink">
                {r.after}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
