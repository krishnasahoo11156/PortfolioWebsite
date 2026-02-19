import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Krishna | Full Stack Developer",
  description:
    "Portfolio of Krishna — a full-stack software engineer building scalable web applications with React, Next.js, Node.js, and modern technologies.",
  keywords: [
    "Krishna",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Portfolio",
    "Web Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Krishna" }],
  openGraph: {
    title: "Krishna | Developer Portfolio",
    description:
      "Explore projects, skills, and achievements. A cinematic, AI-powered developer portfolio.",
    images: ["/assets/og-image.png"],
    url: "https://krishna.dev",
    type: "website",
    siteName: "Krishna's Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishna | Full Stack Developer",
    description:
      "Explore projects, skills, and achievements. A cinematic developer portfolio.",
    images: ["/assets/og-image.png"],
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
