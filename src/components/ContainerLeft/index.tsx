import { Search } from "lucide-react";
import { InputDate } from "../InputDate";
import { Label } from "../label";
import { SummaryContainer } from "../SummaryContainer";



export function ContainerLeft() {
  return (
    <div className="col-span-2 p-2">
      <div className="flex flex-col md:flex-row md:justify-between">
        <Label title="Saldo" description="Receitas e despesas no período" />

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

      <SummaryContainer />

    </div>
  )
}