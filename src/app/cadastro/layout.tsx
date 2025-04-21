import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";

export const metadata = {
  title: 'Cadastro | FinDash',
  description: 'Página de cadastro do FinDash',
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function CadastroLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}