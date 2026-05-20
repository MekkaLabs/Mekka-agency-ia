import { ButtonLink } from "@/components/atoms/button-link";
import { StatPill } from "@/components/molecules/stat-pill";

type HomeHeroProps = {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  secondaryExternal: boolean;
  domain: string;
};

const stats = [
  { value: "4", label: "frentes em orbita" },
  { value: "01", label: "porta de entrada clara" },
  { value: "24/7", label: "mindset de sistema" },
];

const operatingSignals = [
  "Atendimento mais rapido e com contexto",
  "Playbooks comerciais com memoria",
  "Operacao mais leve para crescer sem caos",
];

const deliverables = [
  "Leitura da operação atual",
  "Mapa dos gargalos mais caros",
  "Prioridades de implantação",
  "Plano da primeira camada de IA",
];

export function HomeHero({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  secondaryExternal,
  domain,
}: HomeHeroProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1.18fr)_minmax(360px,0.82fr)]">
      <div className="relative overflow-hidden rounded-[36px] border border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(215,255,99,0.18),transparent_24%),radial-gradient(circle_at_80%_18%,rgba(56,189,248,0.14),transparent_28%),linear-gradient(180deg,rgba(5,11,11,0.98),rgba(2,4,4,0.94))] p-8 shadow-[0_28px_100px_rgba(0,0,0,0.42)] md:p-12">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-300/30 to-transparent" />
        <div className="absolute -left-14 top-24 h-44 w-44 rounded-full bg-lime-300/10 blur-3xl" />
        <div className="absolute right-[-52px] top-10 h-56 w-56 rounded-full bg-cyan-400/12 blur-3xl" />
        <div className="absolute inset-y-8 right-8 hidden w-[38%] rounded-[30px] border border-white/6 bg-white/[0.02] xl:block" />

        <div className="relative z-10 mb-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-lime-300/20 bg-lime-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-lime-300">
            Pronto para decolar?
          </span>
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-cyan-200">
            Growth, criação e sistemas de IA
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-zinc-300">
            Diagnostico primeiro
          </span>
        </div>

        <div className="relative z-10 grid gap-10 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-zinc-500">
              Growth engine + AI operations
            </p>
            <h1 className="mt-5 max-w-4xl font-[var(--font-space-grotesk)] text-5xl font-bold uppercase leading-[0.88] tracking-[-0.07em] text-white md:text-7xl">
              Uma equipe de IA trabalhando por trás da sua empresa.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-xl">
              A Mekka Labs identifica gargalos, monta a primeira camada de IA e
              coloca mais velocidade, consistência e capacidade na sua operação sem
              exigir um time técnico interno.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
              <ButtonLink
                href={secondaryHref}
                variant="secondary"
                external={secondaryExternal}
              >
                {secondaryLabel}
              </ButtonLink>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {stats.map((stat) => (
                <StatPill key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>

            <div className="mt-10 grid gap-4 rounded-[28px] border border-white/8 bg-white/[0.03] p-5 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
                  Domínio principal
                </p>
                <p className="mt-2 font-[var(--font-space-grotesk)] text-2xl font-semibold uppercase tracking-[-0.04em] text-white">
                  {domain}
                </p>
              </div>
              <div className="space-y-2">
                {operatingSignals.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/7 bg-black/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative hidden xl:block">
            <div className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
                Mekka OS layer
              </p>
              <div className="mt-5 grid gap-4">
                <div className="rounded-[24px] border border-white/8 bg-black/25 p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                    Entrada
                  </span>
                  <p className="mt-3 font-[var(--font-space-grotesk)] text-xl font-semibold uppercase tracking-[-0.04em] text-white">
                    Diagnóstico comercial e operacional
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/8 bg-black/25 p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                    Camada 01
                  </span>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">
                    Atendimento, vendas e operação saem do improviso e entram em
                    um fluxo rastreável.
                  </p>
                </div>
                <div className="rounded-[24px] border border-cyan-300/18 bg-cyan-300/8 p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-100">
                    Expansão
                  </span>
                  <p className="mt-3 text-sm leading-7 text-white">
                    Só escalamos o sistema depois do primeiro ganho operacional
                    ficar claro.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[36px] border border-lime-300/15 bg-[radial-gradient(circle_at_top,rgba(163,230,53,0.12),transparent_30%),linear-gradient(180deg,rgba(13,22,17,0.98),rgba(4,8,8,0.98))] p-8 shadow-[0_28px_100px_rgba(0,0,0,0.42)]">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime-300">
          Ponto de partida
        </p>
        <h2 className="mt-4 font-[var(--font-space-grotesk)] text-3xl font-bold uppercase tracking-[-0.05em] text-white md:text-4xl">
          Diagnóstico de IA para a Empresa
        </h2>
        <p className="mt-5 text-base leading-8 text-zinc-400">
          A porta de entrada da Mekka para descobrir onde sua empresa pode ganhar
          tempo, reduzir gargalos e estruturar a primeira implantação.
        </p>

        <ul className="mt-8 space-y-3">
          {deliverables.map((item) => (
            <li
              key={item}
              className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm uppercase tracking-[0.12em] text-zinc-200"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-[28px] border border-cyan-400/15 bg-cyan-400/10 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
            Launch control
          </p>
          <p className="mt-3 font-[var(--font-space-grotesk)] text-xl font-semibold uppercase tracking-[-0.04em] text-white">
            Atendimento, vendas, marketing e operação
          </p>
        </div>

        <div className="mt-6 rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            O que sai desta rodada
          </p>
          <div className="mt-4 grid gap-3">
            <div className="flex items-start justify-between gap-4 border-b border-white/6 pb-3">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
                clareza
              </span>
              <span className="text-right text-sm text-white">
                onde atacar primeiro para gerar ganho real
              </span>
            </div>
            <div className="flex items-start justify-between gap-4 border-b border-white/6 pb-3">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
                plano
              </span>
              <span className="text-right text-sm text-white">
                primeira camada de IA sem projeto inflado
              </span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
                ritmo
              </span>
              <span className="text-right text-sm text-white">
                uma operação mais rápida, rastreável e editável
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
