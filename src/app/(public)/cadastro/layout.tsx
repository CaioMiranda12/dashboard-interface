import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: 'Cadastro | FinDash',
  description: 'Página de cadastro do FinDash',
};

export default function CadastroLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ToastContainer theme="colored" pauseOnHover={false} autoClose={1000} />
      {children}
    </>
  )
}