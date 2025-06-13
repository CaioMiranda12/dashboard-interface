import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@/app/globals.css'
import { Header } from "@/components/header";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "@/hooks/UserContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { TransactionProvider } from "@/hooks/TransactionContext";
import { CategoryProvider } from "@/hooks/CategoryContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinDash",
  description: "Seu dashboard financeiro mais fácil e prático!",
};

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <TransactionProvider>
        <CategoryProvider>
          <ProtectedRoute>
            <Header />
            <ToastContainer theme="colored" pauseOnHover={false} autoClose={1000} />
            {children}
          </ProtectedRoute>
        </CategoryProvider>
      </TransactionProvider>
    </UserProvider>
  );
}
