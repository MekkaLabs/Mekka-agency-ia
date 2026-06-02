import { ImageResponse } from "next/og";

export const alt = "Mekka Labs — IA aplicada à operação de empresas reais";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
              fontSize: "68px",
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: "1000px",
            }}
          >
            Pare de perder cliente porque ninguém responde a tempo.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "28px",
              fontSize: "30px",
              color: "#a1a1aa",
              maxWidth: "900px",
            }}
          >
            Uma camada de IA que atende, qualifica e organiza a operação de
            escritórios B2B.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
