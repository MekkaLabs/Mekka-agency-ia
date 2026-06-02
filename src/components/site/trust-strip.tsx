import { Container } from "../ui/container";

const stats = [
  { value: "< 1 min", label: "tempo de primeira resposta" },
  { value: "24/7", label: "operação sem pausa" },
  { value: "0", label: "lead esquecido na gaveta" },
  { value: "30 dias", label: "pra sentir a diferença" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-white/[0.06] bg-surface/40">
      <Container className="py-10">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-ink-faint">
          Feito para escritórios B2B — advocacia, contabilidade, consultoria e
          agências
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-semibold text-ink md:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
