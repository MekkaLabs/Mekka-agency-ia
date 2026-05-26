import Link from "next/link";
import { SignInForm } from "./_components/sign-in-form";

export default function Login() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
        Mekka Labs
      </p>
      <h1 className="mt-3 text-2xl font-semibold">Entrar no admin</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Acesso interno da equipe. Site publico em{" "}
        <Link href="/" className="underline hover:text-neutral-900">
          agenciamekka.com.br
        </Link>
        .
      </p>
      <div className="mt-8">
        <SignInForm />
      </div>
    </main>
  );
}
