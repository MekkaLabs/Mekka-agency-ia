import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export default function Obrigado() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <Container className="flex flex-1 flex-col items-center justify-center py-20 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 text-2xl">
          ✓
        </span>
        <h1 className="font-display mt-8 text-3xl font-semibold tracking-tight md:text-4xl">
          Recebemos seu contato.
        </h1>
        <p className="mt-4 max-w-md text-lg text-ink-muted">
          Respondemos em até 1 hora útil. Fim de semana ou feriado, retornamos
          no próximo dia útil.
        </p>
        <p className="mt-2 max-w-md text-ink-faint">
          Quer adiantar contexto? Escreva para{" "}
          <a
            href="mailto:contato@agenciamekka.com.br"
            className="text-accent-soft underline-offset-4 hover:underline"
          >
            contato@agenciamekka.com.br
          </a>
          .
        </p>
        <div className="mt-10">
          <ButtonLink href="/" variant="secondary">
            Voltar para o início
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
