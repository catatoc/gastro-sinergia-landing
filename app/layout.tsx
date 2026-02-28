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
  title: "Gastro Sinergia — Centro de Estudios Gastronómicos",
  description:
    "Formación integral con experiencia real y competencias que transforman tu futuro en la gastronomía. Caracas, Venezuela.",
  openGraph: {
    title: "Gastro Sinergia — Centro de Estudios Gastronómicos",
    description:
      "Formación integral con experiencia real y competencias que transforman tu futuro en la gastronomía.",
    type: "website",
    locale: "es_VE",
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
