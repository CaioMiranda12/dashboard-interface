'use client'

import { Search } from "lucide-react";
import { InputDate } from "../InputDate";
import { Label } from "../label";
import { SummaryContainer } from "../SummaryContainer";
import { useState } from "react";
import { FinanceEvolution } from "../FinanceEvolution";
import { toast } from "react-toastify";



export function ContainerLeft() {


  const now = new Date();
  const defaultStartDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const defaultEndDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  const [startDate, setStartDate] = useState<Date | null>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date | null>(defaultEndDate);
  const [filters, setFilters] = useState<{ startDate: string, endDate: string } | null>({
    startDate: defaultStartDate.toISOString().split('T')[0],
    endDate: defaultEndDate.toISOString().split('T')[0]
  });

  const handleSearch = () => {
    if (startDate && endDate) {
      if (startDate <= endDate) {
        const start = startDate.toISOString().split("T")[0];
        const end = endDate.toISOString().split("T")[0];
        setFilters({ startDate: start, endDate: end })
        toast.success('Relatório gerado com base nas datas selecionadas')
      } else {
        toast.error('Data de inicio maior que a data de fim!')
      }
    }
  }

  return (
    <div className="p-2 col-span-3 md:col-span-2">
      <div className="flex flex-col md:flex-row md:justify-between">
        <Label title="Saldo" description="Receitas e despesas no período" />

        <div className="flex gap-4">
          <div className="flex gap-4">
            <InputDate name="Início" selectedDate={startDate} onDateChange={setStartDate} defaultDate={defaultStartDate} />
            <InputDate name="Fim" selectedDate={endDate} onDateChange={setEndDate} defaultDate={defaultEndDate} />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="bg-green-400 hover:bg-green-500 cursor-pointer w-[30px] h-[30px] p-1.5 flex justify-center items-center rounded-sm"
            >
              <Search />
            </button>
          </div>
        </div>
      </div>

      <SummaryContainer filters={filters} />

      <FinanceEvolution />

    </div>
  )
}