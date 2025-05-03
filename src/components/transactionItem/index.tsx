import { convertCurrency } from "@/utils/convertCurrency";

interface TransactionItemProps {
  id: number;
  category: string;
  name: string;
  date: string;
  price: number;
}

export function TransactionItem({ id, name, date, category, price }: TransactionItemProps) {



  return (
    <div className="flex justify-between">

      <div className="flex gap-3">
        <div className="flex flex-start">
          <span className="text-gray-400 font-semibold">#{id.toString().padStart(4, '0')}</span>
        </div>

        <div className="flex flex-col justify-between">
          <strong className="text-gray-300 font-medium">{name}</strong>
          <span className="text-gray-400">{date}</span>
        </div>
      </div>

      <div className="flex flex-col items-end">
        {
          price < 0 ? (
            <strong className="text-red-400 font-bold">{convertCurrency(price)}</strong>
          ) : (
            <strong className="text-green-400 font-bold">{convertCurrency(price)}</strong>
          )
        }

        <span className="border border-green-400 rounded-[2px] p-1 text-green-400 uppercase text-xs">{category}</span>
      </div>

    </div>
  )
}