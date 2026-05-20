import { HomeHero } from "@/components/organisms/home-hero";
import { HomeSections } from "@/components/organisms/home-sections";
import { SiteHeader } from "@/components/organisms/site-header";
import { getSiteConfig } from "@/lib/site-config";

export default function Home() {
  const site = getSiteConfig();
  const primaryHref = site.schedulingUrl ?? "/diagnostico";
  const primaryLabel = site.schedulingUrl
    ? "Agendar Diagnóstico de IA"
    : "Enviar Diagnóstico de IA";
  const secondaryHref = site.whatsappUrl ?? `mailto:${site.contactEmail}`;
  const secondaryLabel = site.whatsappUrl
    ? "Falar no WhatsApp"
    : "Falar por email";
  const secondaryExternal = secondaryHref.startsWith("http");

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(163,230,53,0.12),transparent_24%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_24%),linear-gradient(180deg,#030504_0%,#050908_40%,#09120e_100%)]">
      <div className="mx-auto w-full max-w-7xl px-4 pb-24 pt-5 sm:px-6 lg:px-8">
        <SiteHeader />
        <HomeHero
          primaryHref={primaryHref}
          primaryLabel={primaryLabel}
          secondaryHref={secondaryHref}
          secondaryLabel={secondaryLabel}
          secondaryExternal={secondaryExternal}
          domain={site.domain}
        />
        <HomeSections
          primaryHref={primaryHref}
          primaryLabel={primaryLabel}
          secondaryHref={secondaryHref}
          secondaryLabel={secondaryLabel}
          secondaryExternal={secondaryExternal}
        />
      </div>
    </main>
  );
}
