import Link from "next/link";
import { BsGraphUp } from "react-icons/bs";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 h-[75vh]">
      <BsGraphUp color="#67d18f " size={90} />
      <h1 className="text-green-300 font-bold text-4xl">{"<FinDash$/>"}</h1>
      <p className="text-gray-200 text-lg">Seja bem-vindo(a) ao FinDash!</p>

      <nav className="flex flex-col gap-8 items-center w-full mt-8">
        <Link
          href={'/login'}
          className="bg-green-300 w-9/12 h-12 text-[#04141C] text-xl font-bold flex justify-center items-center hover:bg-green-400"
        >
          Fazer login
        </Link>

        <Link
          href={'/cadastro'}
          className="bg-green-300 w-9/12 h-12 text-[#04141C] text-xl font-bold flex justify-center items-center hover:bg-green-400"
        >
          Criar conta
        </Link>
      </nav>
    </div>
  );
}
