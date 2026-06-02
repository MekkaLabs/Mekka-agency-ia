import { Container } from "../ui/container";

export function Proof() {
  return (
    <section className="py-12">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-surface/50 p-10 md:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-6rem] top-[-6rem] h-72 w-72 rounded-full opacity-40 blur-[90px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(34,211,238,0.4), transparent)",
            }}
          />
          <div className="relative max-w-3xl">
            <p className="font-display text-2xl font-medium leading-snug md:text-3xl">
              &ldquo;A Mekka está rodando os primeiros pilotos do trilho de
              Atendimento com IA agora. Estamos abrindo um número limitado de
              vagas de fundador — com condição e acompanhamento de quem entra
              cedo.&rdquo;
            </p>
            <div className="mt-8 flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-bg">
                M
              </span>
              <div>
                <p className="text-sm font-medium">Time Mekka Labs</p>
                <p className="text-sm text-ink-faint">
                  Casos públicos chegam nas próximas semanas
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
