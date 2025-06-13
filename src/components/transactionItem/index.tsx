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
import { DeleteTransactionButton } from "../deleteTransactionButton";
import { TransactionEditDialog } from "../transactionEditDialog";
import { useCategory } from "@/hooks/CategoryContext";


interface TransactionItemProps extends Transaction { }

export function TransactionItem({ id, title, date, Category, amount, description, type }: TransactionItemProps) {

  const { categories } = useCategory();

  const updatedCategory = categories.find(cat => cat.id === Category.id) || Category;

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
              type === 'expense' && (
                <strong className="text-red-400 font-bold">{convertCurrency(amount * (-1))}</strong>
              )
            }
            {
              type === 'income' && (
                <strong className="text-green-400 font-bold">{convertCurrency(amount)}</strong>
              )
            }
            <span
              style={{
                color: updatedCategory.color,
                borderColor: updatedCategory.color
              }}
              className="border rounded-[2px] p-1 uppercase text-xs">{updatedCategory.name}</span>
          </div>

        </div>
      </DialogTrigger>
      <DialogContent className="bg-dark-ofc text-white">
        <DialogHeader>
          <DialogTitle className="text-gray-200 flex flex-col gap-2">
            <span className="text-sm text-gray-400">#{id.toString().padStart(4, '0')} - {updatedCategory.name}</span>
            {title}
            {
              type === 'expense' && (
                <strong className="text-red-400 font-bold text-base">{convertCurrency(amount * (-1))}</strong>
              )
            }
            {
              type === 'income' && (
                <strong className="text-green-400 font-bold text-base">{convertCurrency(amount)}</strong>
              )
            }
            <span className="text-sm text-gray-400">{convertDate(date)}</span>
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-base">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3">

          <TransactionEditDialog transaction={{ id, title, amount, Category, date, description, type }} />
          <DeleteTransactionButton transactionId={id} />

        </div>
      </DialogContent>
    </Dialog>

  )
}