import { Container } from "../ui/container";
import { ButtonLink } from "../ui/button";
import { Badge } from "../ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Glow */}
      <div
        aria-hidden
        className="glow-blob pointer-events-none absolute left-1/2 top-[-10rem] -z-0 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full opacity-70 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(139,92,246,0.45), rgba(34,211,238,0.12), transparent)",
        }}
      />

      <Container className="relative z-10 pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="rise rise-1 flex justify-center">
            <Badge>Agência de IA aplicada à operação</Badge>
          </div>

          <h1 className="rise rise-2 font-display mt-7 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Pare de perder cliente porque
            <br className="hidden md:block" />{" "}
            <span className="text-gradient">ninguém responde a tempo.</span>
          </h1>

          <p className="rise rise-3 mx-auto mt-6 max-w-2xl text-lg text-ink-muted md:text-xl">
            A Mekka instala uma equipe de IA por trás da sua empresa — que
            atende, qualifica, vende e organiza a operação. Você cresce sem
            depender de improviso nem de uma pessoa-chave.
          </p>

          <div className="rise rise-4 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="#contato" variant="primary" size="lg">
              Quero parar de perder lead
            </ButtonLink>
            <ButtonLink href="#produtos" variant="secondary" size="lg">
              Ver o que a IA faz →
            </ButtonLink>
          </div>

          <p className="rise rise-4 mt-5 text-sm text-ink-faint">
            Resposta em até 1 hora útil · Sem compromisso
          </p>
        </div>

        {/* Product visual */}
        <div className="rise rise-4 mx-auto mt-16 max-w-4xl">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-surface/80 p-2 shadow-2xl backdrop-blur">
      <div className="rounded-xl border border-white/[0.06] bg-bg/60 p-5">
        <div className="flex items-center gap-2 border-b border-white/[0.06] pb-4">
          <span className="h-3 w-3 rounded-full bg-white/10" />
          <span className="h-3 w-3 rounded-full bg-white/10" />
          <span className="h-3 w-3 rounded-full bg-white/10" />
          <span className="ml-3 text-xs text-ink-faint">
            mekka · atendimento ao vivo
          </span>
        </div>

        <div className="space-y-3 pt-5">
          <ChatBubble side="them">
            Oi, vi o site de vocês. Quanto custa pra implantar IA no meu
            escritório?
          </ChatBubble>
          <ChatBubble side="us" meta="Mekka IA · respondeu em 8s">
            Boa! Pra te dar um número certo eu preciso entender 2 coisas
            rápidas: quantas pessoas no comercial e por onde chegam seus
            leads hoje? 👇
          </ChatBubble>
          <div className="flex flex-wrap gap-2 pt-1">
            {["Advocacia", "5–15 pessoas", "WhatsApp + indicação"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent-soft"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg border border-white/[0.06] bg-elevated px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-sm">
                ✓
              </span>
              <div>
                <p className="text-sm font-medium">Lead qualificado</p>
                <p className="text-xs text-ink-faint">
                  enviado pro CRM · próxima ação definida
                </p>
              </div>
            </div>
            <span className="text-xs text-accent-soft">agora</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({
  side,
  children,
  meta,
}: {
  side: "us" | "them";
  children: React.ReactNode;
  meta?: string;
}) {
  const isUs = side === "us";
  return (
    <div className={`flex ${isUs ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[80%]">
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm ${
            isUs
              ? "bg-gradient-to-br from-accent to-accent/80 text-white"
              : "border border-white/[0.08] bg-elevated text-ink"
          }`}
        >
          {children}
        </div>
        {meta ? (
          <p className="mt-1 pr-1 text-right text-[11px] text-ink-faint">
            {meta}
          </p>
        ) : null}
      </div>
    </div>
  );
}
