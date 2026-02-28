import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gastrosinergia.info"),
  title: "Gastro Sinergia — Centro de Estudios Gastronómicos",
  description:
    "Diseñamos experiencias que transforman. La cocina como medio para desarrollar criterio, confianza y cultura gastronómica. Caracas, Venezuela.",
  keywords: [
    "gastronomía",
    "cocina",
    "formación culinaria",
    "Caracas",
    "Venezuela",
    "estudios gastronómicos",
    "Gastro Sinergia",
    "experiencias gastronómicas",
    "cultura gastronómica",
  ],
  openGraph: {
    title: "Gastro Sinergia — Centro de Estudios Gastronómicos",
    description:
      "Diseñamos experiencias que transforman. La cocina como medio para desarrollar criterio, confianza y cultura gastronómica.",
    type: "website",
    locale: "es_VE",
    siteName: "Gastro Sinergia",
    url: "https://gastrosinergia.info",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gastro Sinergia — Centro de Estudios Gastronómicos",
    description:
      "Diseñamos experiencias que transforman. La cocina como medio para desarrollar criterio, confianza y cultura gastronómica. Caracas, Venezuela.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${plusJakarta.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
