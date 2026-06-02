import type { Product } from "@/lib/products";

const BASE = "https://agenciamekka.com.br";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mekka Labs",
    url: BASE,
    description:
      "Agência de IA que instala uma camada de atendimento, vendas e operação para escritórios B2B.",
    areaServed: "BR",
    knowsAbout: [
      "Inteligência Artificial aplicada",
      "Atendimento com IA",
      "Qualificação de leads",
      "Automação comercial",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mekka Labs",
    url: BASE,
    inLanguage: "pt-BR",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ProductJsonLd({ product }: { product: Product }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: product.name,
    name: `${product.name} — Mekka Labs`,
    description: product.intro,
    provider: { "@type": "Organization", name: "Mekka Labs", url: BASE },
    areaServed: "BR",
    url: `${BASE}/produtos/${product.slug}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
