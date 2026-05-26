import { LeadForm } from "./_components/lead-form";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <header className="mb-16">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
          Mekka Labs
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
          Pare de perder cliente porque ninguem responde a tempo.
        </h1>
        <p className="mt-5 text-lg text-neutral-600 md:text-xl">
          Instalamos uma camada de IA que atende, qualifica e agenda 24/7
          em escritorios B2B que querem crescer sem depender de improviso.
        </p>
      </header>

      <section className="mb-16">
        <h2 className="text-sm uppercase tracking-[0.18em] text-neutral-500">
          Voce se reconhece?
        </h2>
        <ul className="mt-6 space-y-4 text-lg text-neutral-800">
          <li className="border-l-2 border-neutral-900 pl-4">
            Voce manda WhatsApp na segunda, responde na quarta. O lead ja
            fechou com outro.
          </li>
          <li className="border-l-2 border-neutral-900 pl-4">
            Quem responde primeiro e a Carla ou o Bruno. Quando saem de
            ferias, o pipeline para.
          </li>
          <li className="border-l-2 border-neutral-900 pl-4">
            Pipeline cheio de &quot;depois eu ligo&quot; que nunca volta.
          </li>
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="text-sm uppercase tracking-[0.18em] text-neutral-500">
          O que a Mekka instala
        </h2>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="font-semibold">Atendimento</h3>
            <p className="mt-1 text-neutral-700">
              Agentes de IA que respondem em menos de 1 minuto no WhatsApp e
              no site, 24/7.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Qualificacao</h3>
            <p className="mt-1 text-neutral-700">
              Cada lead chega no seu CRM ja com perfil, dor e proximo passo
              recomendado.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Follow-up</h3>
            <p className="mt-1 text-neutral-700">
              Rotina automatizada de retomada. Nenhum lead esquecido na
              gaveta.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16 rounded-md border border-neutral-200 bg-neutral-50 p-6">
        <h2 className="text-sm uppercase tracking-[0.18em] text-neutral-500">
          Sobre prova
        </h2>
        <p className="mt-3 text-neutral-700">
          A Mekka esta rodando os primeiros pilotos do trilho de Atendimento
          com IA agora. Casos publicos chegam nas proximas semanas. Se voce
          for um dos primeiros escritorios a participar, entra com condicao
          de fundador.
        </p>
      </section>

      <section id="contato" className="mb-8">
        <h2 className="text-sm uppercase tracking-[0.18em] text-neutral-500">
          Quero parar de perder lead
        </h2>
        <p className="mt-3 text-neutral-700">
          Deixe seus dados. Respondemos em ate 1 hora util.
        </p>
        <div className="mt-6">
          <LeadForm />
        </div>
      </section>

      <footer className="mt-16 border-t border-neutral-200 pt-6 text-sm text-neutral-500">
        <p>Mekka Labs &middot; agenciamekka.com.br</p>
      </footer>
    </main>
  );
}
