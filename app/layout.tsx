import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Corrected font variable names to match what typically works or is used
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Test de Orientación Vocacional IA | Resultados Oficiales",
  description: "Descubre tu carrera ideal y en qué universidad estudiar con nuestro test vocacional basado en neurociencia e IA. Resultados precisos en 10 minutos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
