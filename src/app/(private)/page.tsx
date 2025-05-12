import { InputDate } from "@/components/InputDate";
import { TransactionItem } from "@/components/transactionItem";
import { TransactionList } from "@/components/transactionList";
import { Search } from "lucide-react";
import { FaSearch } from "react-icons/fa";


export default function Home() {

  return (
    <div className="w-full max-w-screen-xl mx-auto px-2 md:px-0 grid grid-cols-3 gap-x-4 items-start">
      <div className="flex flex-col md:flex-row md:justify-between col-span-2 p-2">
        <div className="mb-5 lg:mb-0">
          <h1 className="text-white text-xl font-bold">Saldo</h1>
          <p className="text-gray-300">Receitas e despesas no periodo</p>
        </div>

        <div className="flex gap-4">

          <div className="flex gap-4">
            <InputDate name="Inicio" />
            <InputDate name="Fim" />
          </div>

          <div className="flex items-end">
            <button
              className="bg-green-400 hover:bg-green-500 cursor-pointer w-[30px] h-[30px] p-1.5 flex justify-center items-center rounded-sm"
            >
              <Search />
            </button>
          </div>
        </div>

      </div>

      <div className="col-span-1 bg-[#001E2B] p-4 min-h-[85vh]">
        <h1 className="text-white text-xl font-bold">Transações</h1>
        <p className="text-gray-300">Receitas e Gastos no período</p>

        <div className="mt-3">
          <TransactionList />
        </div>
      </div>

    </div>
  )
}