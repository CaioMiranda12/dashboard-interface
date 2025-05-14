import { Search } from "lucide-react";
import { InputDate } from "../InputDate";
import { InfoContainer } from "../InfoContainer";
import { Label } from "../label";

import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { BsArrowDownRightCircle } from "react-icons/bs";

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

      <div className="grid grid-cols-3 gap-4 mt-4">
        <InfoContainer icon={RiMoneyDollarCircleLine} name="Saldo" value={0} color="#016BF8" />
        <InfoContainer icon={BsArrowUpRightCircle} name="Receitas" value={23.90} color="#00ED64" />
        <InfoContainer icon={BsArrowDownRightCircle} name="Gastos" value={0} color="#DB3030" />
      </div>

    </div>
  )
}