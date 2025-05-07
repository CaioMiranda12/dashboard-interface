'use client'

import { api } from "@/services/api";
import { TransactionItem } from "../transactionItem";
import { useEffect, useState } from "react";
import { Transaction } from "@/types/transaction";
import { useTransaction } from "@/hooks/TransactionContext";

export function TransactionList() {

  const { transactions } = useTransaction();

  return (
    <div className="flex flex-col gap-4">
      {
        transactions.map(transaction => (
          <TransactionItem key={transaction.id} id={transaction.id} title={transaction.title} amount={transaction.amount} Category={transaction.Category} date={transaction.date} description={transaction.description} type={transaction.type} />
        ))
      }
    </div>
  )
}