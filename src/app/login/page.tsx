import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SignInForm } from "./_components/sign-in-form";

export default function Login() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <Container className="flex flex-1 flex-col justify-center py-16">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-bg">
              M
            </span>
            <span className="font-display text-[15px] font-semibold tracking-tight">
              Mekka Labs
            </span>
          </Link>

          <h1 className="font-display mt-8 text-2xl font-semibold tracking-tight">
            Entrar no admin
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            Acesso interno da equipe.
          </p>

          <div className="mt-8 rounded-2xl border border-white/[0.08] bg-surface/50 p-6">
            <SignInForm />
          </div>

          <p className="mt-6 text-center text-sm text-ink-faint">
            <Link href="/" className="hover:text-ink">
              ← Voltar para o site
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
