import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aaishasharma.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aaisha Sharma — Creative Writer & Blogger",
    template: "%s | Aaisha Sharma",
  },
  description:
    "Aaisha Sharma is a creative writer and blogger crafting fiction, poetry, travel writing and essays between Sydney and Bhaktapur, Nepal.",
  keywords: [
    "creative writer",
    "blogger",
    "fiction",
    "poetry",
    "travel writing",
    "Aaisha Sharma",
    "Sydney writer",
    "Nepal writer",
  ],
  authors: [{ name: "Aaisha Sharma" }],
  creator: "Aaisha Sharma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Aaisha Sharma",
    title: "Aaisha Sharma — Creative Writer & Blogger",
    description:
      "Words that breathe life. Fiction, poetry, travel writing and essays by Aaisha Sharma.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Aaisha Sharma — Creative Writer & Blogger",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaisha Sharma — Creative Writer & Blogger",
    description:
      "Words that breathe life. Fiction, poetry, travel writing and essays by Aaisha Sharma.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}
    >
      <body className="min-h-screen bg-cream text-ink antialiased">
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
