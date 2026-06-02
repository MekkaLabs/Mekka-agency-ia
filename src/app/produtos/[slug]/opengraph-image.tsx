import { ImageResponse } from "next/og";
import { getProduct, products } from "@/lib/products";

export const alt = "Mekka Labs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  const name = product?.name ?? "Mekka Labs";
  const tagline = product?.tagline ?? "IA aplicada à operação de empresas reais";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#08080a",
          backgroundImage:
            "radial-gradient(900px 600px at 80% -10%, rgba(139,92,246,0.35), transparent), radial-gradient(700px 500px at 0% 110%, rgba(34,211,238,0.18), transparent)",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #8b5cf6, #22d3ee)",
              color: "#08080a",
              fontSize: "30px",
              fontWeight: 800,
            }}
          >
            M
          </div>
          <div style={{ display: "flex", fontSize: "30px", fontWeight: 700, color: "#fafafa" }}>
            Mekka Labs
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              fontWeight: 600,
              color: "#a78bfa",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            {name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "20px",
              fontSize: "60px",
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              maxWidth: "1000px",
            }}
          >
            {tagline}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
