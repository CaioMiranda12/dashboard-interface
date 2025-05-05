'use client'

import { api } from "@/services/api";
import { TransactionItem } from "../transactionItem";
import { useEffect, useState } from "react";
import { Transaction } from "@/types/transaction";

export function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get('/transactions')
      .then(res => setTransactions(res.data))
      .catch(err => console.error(err))
  }, [])

  console.log(transactions)


  return (
    <div className="flex flex-col gap-4">
      {
        transactions.map(transaction => (
          <TransactionItem key={transaction.id} id={2} title={transaction.title} amount={transaction.amount} Category={transaction.Category} date={transaction.date} description={transaction.description} />
        ))
      }
    </div>
  )
}