const defaultDomain = "agenciamekka.com.br";

function normalizeUrl(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function getSiteConfig() {
  const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN?.trim() || defaultDomain;
  const websiteUrl = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL)
    || `https://${domain}`;
  const whatsappUrl = normalizeUrl(process.env.NEXT_PUBLIC_WHATSAPP_URL);
  const schedulingUrl = normalizeUrl(process.env.NEXT_PUBLIC_SCHEDULING_URL);
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || `contato@${domain}`;

  return {
    domain,
    websiteUrl,
    whatsappUrl,
    schedulingUrl,
    contactEmail,
  };
}
