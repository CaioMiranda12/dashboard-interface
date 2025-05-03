import { Transaction } from "@/types/transaction";
import { convertCurrency } from "@/utils/convertCurrency";
import { convertDate } from "@/utils/convertDate";

interface TransactionItemProps extends Transaction { }

export function TransactionItem({ id, title, date, category, amount }: TransactionItemProps) {

  return (
    <div className="flex justify-between">

      <div className="flex gap-3">
        <div className="flex flex-start">
          <span className="text-gray-400 font-semibold">#{id.toString().padStart(4, '0')}</span>
        </div>

        <div className="flex flex-col justify-between">
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

        <span className="border border-green-400 rounded-[2px] p-1 text-green-400 uppercase text-xs">{category}</span>
      </div>

    </div>
  )
}