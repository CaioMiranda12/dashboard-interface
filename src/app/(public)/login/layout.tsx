import { UserProvider } from "@/hooks/UserContext";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: 'Login | FinDash',
  description: 'Página de login do FinDash',
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <UserProvider>
        <ToastContainer theme="colored" pauseOnHover={false} autoClose={1000} />
        {children}
      </UserProvider>
    </>
  )
}