import { Container } from "../ui/container";
import { Eyebrow } from "../ui/badge";
import { LeadForm } from "@/app/_components/lead-form";

export function CTA() {
  return (
    <section id="contato" className="scroll-mt-20 py-24 md:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-surface to-bg p-8 md:p-14">
          <div
            aria-hidden
            className="glow-blob pointer-events-none absolute left-1/2 top-[-8rem] h-[28rem] w-[44rem] -translate-x-1/2 rounded-full opacity-50 blur-[110px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(139,92,246,0.45), transparent)",
            }}
          />
          <div className="relative grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <Eyebrow>Vamos começar</Eyebrow>
              <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Quero parar de perder lead.
              </h2>
              <p className="mt-4 text-ink-muted">
                Deixe seus dados. Respondemos em até 1 hora útil com os
                próximos passos pra instalar sua primeira camada de IA.
              </p>

              <ul className="mt-8 space-y-3 text-sm text-ink-muted">
                {[
                  "Diagnóstico antes de qualquer proposta",
                  "Começa pelo Atendimento, expande no seu ritmo",
                  "Sem compromisso e sem enrolação técnica",
                ].map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-xs text-accent-soft">
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-bg/60 p-6 backdrop-blur">
              <LeadForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
