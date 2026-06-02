import type { MetadataRoute } from "next";

const BASE = "https://agenciamekka.com.br";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/login", "/obrigado"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
