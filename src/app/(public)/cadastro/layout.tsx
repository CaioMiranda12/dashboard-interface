import { ReactNode } from "react";

export const metadata = {
  title: 'Cadastro | FinDash',
  description: 'Página de cadastro do FinDash',
};

export default function CadastroLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}