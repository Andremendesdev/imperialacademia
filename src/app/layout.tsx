import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Academia Imperial | Treinamento de Alto Nível",
  description:
    "Academia Imperial — estrutura de ponta, equipamentos top e acompanhamento profissional. Transforme seu corpo e supere seus limites.",
  keywords: ["academia", "musculação", "personal trainer", "fitness", "imperial"],
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${bebasNeue.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-dvh bg-[#000000] font-sans text-white">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
