import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 85% 10%, rgba(255,106,61,0.28), transparent 45%), #0a0a0a",
          color: "#f5f5f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#9ca3af" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f5f5f5",
              fontSize: 22,
            }}
          >
            {profile.initials}
          </div>
          {profile.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
          <span>{profile.role}</span>
          <span style={{ color: "#ff6a3d" }}>& {profile.secondaryRole}</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#9ca3af" }}>Vue.js · Nuxt.js · React · Next.js · AI integration</div>
      </div>
    ),
    size
  );
}
