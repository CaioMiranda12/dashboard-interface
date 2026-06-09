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
          className="bg-[#12142b] w-full rounded-sm text-white px-2"
        />

        <button
          className="bg-green-400 hover:bg-green-500 cursor-pointer w-[36px] h-[36px] p-1.5 flex justify-center items-center rounded-sm"
        >
          <Search />
        </button>
      </div>
      <div className="flex flex-col gap-4 mt-6 overflow-y-auto max-h-[600px] pr-1">
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-400 text-sm text-center mt-6">
            {searchTerm ? 'Nenhuma transação encontrada.' : 'Nenhuma transação no período.'}
          </p>
        ) : (
          filteredTransactions.map(transaction => (
            <TransactionItem key={transaction.id} {...transaction} />
          ))
        )}
      </div>
    </>
  )
}