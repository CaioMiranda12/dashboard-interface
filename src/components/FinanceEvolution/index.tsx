'use client'

import { Search } from "lucide-react";
import { Label } from "../label";
import InputMask from '@mona-health/react-input-mask';
import { ChangeEvent, useState } from "react";
import { api } from "@/services/api";
import { FinanceChart } from "../FinanceChart";
import { Summary } from "@/types/summary";

export function FinanceEvolution() {
  const [year, setYear] = useState<string>(new Date().getFullYear().toLocaleString())
  const [financeEvolutionData, setFinanceEvolutionData] = useState<
    { month: string; income: number; expense: number; balance: number }[]
  >([]);

  async function handleSearch() {
    if (year.length === 4) {

      try {
        const { data } = await api.get('/summary/year', {
          params: {
            year: year
          }
        })

        const formattedData = Object.entries(data).map(([month, values]) => ({
          month,
          income: values.income,
          expense: values.expense,
          balance: values.balance

        }));

        setFinanceEvolutionData(formattedData);

      } catch (error) {
        console.log('Falha ao carregar transaçoes anuais')
        return;
      }



    } else {
      console.log('Invalido')
      return;
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

      <div className="mt-4 flex flex-col gap-4">
        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-8" style={{ backgroundColor: '#00ED64' }}></div>
            <label className="text-white">Receita</label>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-3 w-8" style={{ backgroundColor: '#DB3030' }}></div>
            <label className="text-white">Despesa</label>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-3 w-8" style={{ backgroundColor: '#016BF8' }}></div>
            <label className="text-white">Saldo</label>
          </div>
        </div>

        <FinanceChart financeEvolutionData={financeEvolutionData} />
      </div>
    </div>
  )
}