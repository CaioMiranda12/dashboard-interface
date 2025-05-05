import { Transaction } from "@/types/transaction";
import { convertCurrency } from "@/utils/convertCurrency";
import { convertDate } from "@/utils/convertDate";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../button";


interface TransactionItemProps extends Transaction { }

export function TransactionItem({ id, title, date, Category, amount, description }: TransactionItemProps) {

  return (


    <Dialog>
      <DialogTrigger>
        <div className="flex justify-between p-2 hover:border cursor-pointer">

          <div className="flex gap-3">
            <div className="flex flex-start">
              <span className="text-gray-400 font-semibold">#{id.toString().padStart(4, '0')}</span>
            </div>

            <div className="flex flex-col justify-between items-start">
              <strong className="text-gray-300 font-medium">{title}</strong>
              <span className="text-gray-400">{convertDate(date)}</span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            {
              amount < 0 ? (
                <strong className="text-red-400 font-bold">{convertCurrency(amount)}</strong>
              ) : (
                <strong className="text-green-400 font-bold">{convertCurrency(amount)}</strong>
              )
            }
            <span className="border border-green-400 rounded-[2px] p-1 text-green-400 uppercase text-xs">{Category.name}</span>
          </div>

        </div>
      </DialogTrigger>
      <DialogContent className="bg-[#001E2B] text-white">
        <DialogHeader>
          <DialogTitle className="text-gray-200 flex flex-col gap-2">
            <span className="text-sm text-gray-400">#{id.toString().padStart(4, '0')} - {Category.name}</span>
            {title}
            <span className="text-sm text-gray-400">{convertDate(date)}</span>
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-base">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3">
          <button className="text-sm text-[#04141C] font-semibold px-4 py-2 rounded-lg bg-emerald-400 cursor-pointer hover:bg-emerald-600 transition-all duration-300">
            Editar
          </button>
          <button className="text-sm text-[#04141C] font-semibold px-4 py-2 rounded-lg bg-red-400 cursor-pointer hover:opacity-80 transition-all duration-300">
            Deletar
          </button>
        </div>
      </DialogContent>
    </Dialog>

  )
}