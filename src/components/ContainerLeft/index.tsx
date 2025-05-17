'use client'

import { Search } from "lucide-react";
import { InputDate } from "../InputDate";
import { Label } from "../label";
import { SummaryContainer } from "../SummaryContainer";
import { useState } from "react";
import { ExpensesContainer } from "../ExpensesContainer";



export function ContainerLeft() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filters, setFilters] = useState<{ startDate: string, endDate: string } | null>(null);

  const handleSearch = () => {
    if (startDate && endDate) {
      const start = startDate.toISOString().split("T")[0];
      const end = endDate.toISOString().split("T")[0];
      setFilters({ startDate: start, endDate: end })
    }
  }

  return (
    <div className="col-span-2 p-2">
      <div className="flex flex-col md:flex-row md:justify-between">
        <Label title="Saldo" description="Receitas e despesas no período" />

        <div className="flex gap-4">
          <div className="flex gap-4">
            <InputDate name="Início" selectedDate={startDate} onDateChange={setStartDate} />
            <InputDate name="Fim" selectedDate={endDate} onDateChange={setEndDate} />
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

      <ExpensesContainer />

    </div>
  )
}