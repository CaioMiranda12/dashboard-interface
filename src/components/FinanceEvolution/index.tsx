'use client'

import { Search } from "lucide-react";
import { Label } from "../label";
import InputMask from '@mona-health/react-input-mask';
import { ChangeEvent, useState } from "react";

export function FinanceEvolution() {
  const [year, setYear] = useState<string>("2025")

  function handleSearch() {
    if (year.length === 4) {
      console.log(year)
    } else {
      console.log('Invalido')
    }
  }

  return (
    <div className="mt-4 p-4 bg-dark-ofc">
      <div className="flex justify-between">
        <Label title="Evolução Financeira" description="Saldo, Receitas e Gastos no ano" />

        <div>
          <label className="text-white text-sm">ano</label>

          <div className="flex items-center gap-2">
            <InputMask
              mask="9999"
              placeholder="aaaa"
              value={year}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setYear(e.target.value)}
              className="w-14 bg-black-ofc text-gray-200 p-2 rounded-sm"
            />


            <button
              onClick={handleSearch}
              className="bg-green-400 hover:bg-green-500 cursor-pointer w-[30px] h-[30px] p-1.5 flex justify-center items-center rounded-sm"
            >
              <Search />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}