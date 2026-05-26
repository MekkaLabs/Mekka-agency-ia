import Link from "next/link";

export default function Obrigado() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
        Mekka Labs
      </p>
      <h1 className="mt-4 text-3xl font-semibold md:text-4xl">
        Recebemos seu contato.
      </h1>
      <p className="mt-4 text-lg text-neutral-700">
        Respondemos em ate 1 hora util. Se for fim de semana ou feriado,
        damos retorno no proximo dia util.
      </p>
      <p className="mt-2 text-neutral-600">
        Enquanto isso, fique a vontade para mandar mais contexto para{" "}
        <a
          href="mailto:contato@agenciamekka.com.br"
          className="underline hover:text-neutral-900"
        >
          contato@agenciamekka.com.br
        </a>
        .
      </p>
      <Link
        href="/"
        className="mt-10 inline-block text-sm text-neutral-500 underline hover:text-neutral-900"
      >
        Voltar para o inicio
      </Link>
    </main>
  );
}
