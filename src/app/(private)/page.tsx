import { InputDate } from "@/components/InputDate";
import { Search } from "lucide-react";
import { FaSearch } from "react-icons/fa";


export default function Home() {

  return (
    <div className="w-full max-w-screen-xl mx-auto px-2 flex flex-col md:flex-row md:justify-between">
      <div className="mb-5">
        <h1 className="text-white text-xl font-bold">Saldo</h1>
        <p className="text-gray-300">Receitas e despesas no periodo</p>
      </div>

      <div className="flex items-end gap-4">
        <InputDate name="Inicio" />
        <InputDate name="Fim" />

        <button
          className="bg-green-400 hover:bg-green-500 cursor-pointer w-[30px] h-[30px] p-1.5 flex justify-center items-center rounded-sm"
        >
          <Search />
        </button>
      </div>



    </div>
  )
}