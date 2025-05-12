'use client'

import { TransactionItem } from "../transactionItem";
import { useState } from "react";
import { useTransaction } from "@/hooks/TransactionContext";
import { Search } from "lucide-react";

export function TransactionList() {

  const [searchTerm, setSearchTerm] = useState('');
  const { transactions } = useTransaction();

  const filteredTransactions = transactions.filter(transaction => {
    const term = searchTerm.toLowerCase();

    return (
      transaction.title.toLowerCase().includes(term) ||
      transaction.description.toLowerCase().includes(term) ||
      transaction.Category?.name.toLowerCase().includes(term)
    )
  })


  return (
    <>
      <div className="flex gap-4 mt-3">
        <input
          type="text"
          placeholder="Procurar transação..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-[#04141C] w-full rounded-sm text-white px-2"
        />

        <button
          className="bg-green-400 hover:bg-green-500 cursor-pointer w-[36px] h-[36px] p-1.5 flex justify-center items-center rounded-sm"
        >
          <Search />
        </button>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        {
          filteredTransactions.map(transaction => (
            <TransactionItem key={transaction.id} id={transaction.id} title={transaction.title} amount={transaction.amount} Category={transaction.Category} date={transaction.date} description={transaction.description} type={transaction.type} />
          ))
        }
      </div>
    </>
  )
}