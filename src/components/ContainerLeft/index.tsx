'use client'

import { Search } from "lucide-react";
import { InputDate } from "../InputDate";
import { Label } from "../label";
import { SummaryContainer } from "../SummaryContainer";
import { useState } from "react";
import { FinanceEvolution } from "../FinanceEvolution";
import { toast } from "react-toastify";

const now = new Date();
const DEFAULT_START_DATE = new Date(now.getFullYear(), now.getMonth(), 1);
const DEFAULT_END_DATE = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

export function ContainerLeft() {
  const toDateString = (date: Date) => date.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState<Date | null>(DEFAULT_START_DATE);
  const [endDate, setEndDate] = useState<Date | null>(DEFAULT_END_DATE);
  const [filters, setFilters] = useState<{ startDate: string, endDate: string } | null>({
    startDate: toDateString(DEFAULT_START_DATE),
    endDate: toDateString(DEFAULT_END_DATE)
  });

  const handleSearch = () => {
    if (startDate && endDate) {
      if (startDate <= endDate) {
        setFilters({
          startDate: toDateString(startDate),
          endDate: toDateString(endDate)
        });
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
            <InputDate name="Início" selectedDate={startDate} onDateChange={setStartDate} defaultDate={DEFAULT_START_DATE} />
            <InputDate name="Fim" selectedDate={endDate} onDateChange={setEndDate} defaultDate={DEFAULT_END_DATE} />
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