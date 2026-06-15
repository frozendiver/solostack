import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const TITLE = "SoloStack — Skip the hype. Build your AI stack.";
const DESC =
  "A curated directory of practical AI tools — organized by real workflows that help solo builders ship faster, not just experiment more.";

export const metadata: Metadata = {
  metadataBase: new URL("https://solostack.co"),
  title: TITLE,
  description: DESC,
  openGraph: {
    type: "website",
    siteName: "SoloStack",
    title: TITLE,
    description: DESC,
    url: "https://solostack.co",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
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
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
