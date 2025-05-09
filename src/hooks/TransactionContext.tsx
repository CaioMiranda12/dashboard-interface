'use client'

import { api } from "@/services/api";
import { Transaction } from "@/types/transaction";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface TransactionContextType {
  transactions: Transaction[];
  getTransactions: () => Promise<void>;
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (transactionId: number) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined)

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const getTransactions = async () => {
    const { data } = await api.get('/transactions');
    setTransactions(data);
  }

  const addTransaction = (newTransaction: Transaction) => {
    setTransactions(allTransactions => [newTransaction, ...allTransactions]);
  };

  const removeTransaction = (transactionId: number) => {
    const filterTransactions = transactions.filter(transaction => transaction.id !== transactionId);

    setTransactions(filterTransactions);
  };

  useEffect(() => {
    getTransactions();
  }, [])

  return (
    <TransactionContext.Provider value={{ transactions, getTransactions, addTransaction, removeTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransaction = () => {
  const context = useContext(TransactionContext)

  if (!context) {
    throw new Error('useTransaction must be used within a TransactionProvider')
  }

  return context;
}