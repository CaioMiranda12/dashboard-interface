import { ReactNode } from "react";

export const metadata = {
  title: 'Cadastro | FinDash',
  description: 'Página de cadastro do FinDash',
};

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}