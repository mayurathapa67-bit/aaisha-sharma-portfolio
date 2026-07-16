import { ImageResponse } from "next/og";

export const alt = "Aaisha Sharma — Creative Writer & Blogger";
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
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #faf7f2 0%, #f3ece1 55%, #ffe9d6 100%)",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 34,
            letterSpacing: 8,
            color: "#6b6b6b",
            textTransform: "uppercase",
          }}
        >
          Creative Writer & Blogger
        </div>
        <div
          style={{
            fontSize: 110,
            fontWeight: 800,
            color: "#1a1a1a",
            marginTop: 12,
            lineHeight: 1,
          }}
        >
          Aaisha Sharma
        </div>
        <div
          style={{
            fontSize: 48,
            marginTop: 28,
            background: "linear-gradient(90deg,#ff6b6b,#ffd93d,#6bcb77)",
            backgroundClip: "text",
            color: "transparent",
            fontStyle: "italic",
          }}
        >
          Words That Breathe Life
        </div>
      </div>
    ),
    { ...size }
  );
}
