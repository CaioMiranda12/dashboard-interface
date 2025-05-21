'use client'

import { api } from "@/services/api";
import { Transaction } from "@/types/transaction";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface TransactionContextType {
  transactions: Transaction[];
  getTransactions: () => Promise<void>;
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (transactionId: number) => void;
  editTransaction: (updatedTransaction: Transaction) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined)

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const getTransactions = async () => {
    const { data } = await api.get('/transactions');
    setTransactions(data);
  }

  const addTransaction = (newTransaction: Transaction) => {
    setTransactions(allTransactions => {
      const updatedTransactions = [newTransaction, ...allTransactions];

      return updatedTransactions.sort((firstTransaction, secondTransaction) => new Date(secondTransaction.date).getTime() - new Date(firstTransaction.date).getTime());
    });
  };

  const removeTransaction = (transactionId: number) => {
    const filterTransactions = transactions.filter(transaction => transaction.id !== transactionId);

    setTransactions(filterTransactions);
  };

  const editTransaction = (updatedTransaction: Transaction) => {
    setTransactions(allTransactions => {
      const updatedTransactions = allTransactions.map(transaction => transaction.id === updatedTransaction.id ? updatedTransaction : transaction);

      return updatedTransactions.sort((firstTransaction, secondTransaction) => new Date(secondTransaction.date).getTime() - new Date(firstTransaction.date).getTime());
    })
  }

  useEffect(() => {
    getTransactions();
  }, [])

  return (
    <TransactionContext.Provider value={{ transactions, getTransactions, addTransaction, removeTransaction, editTransaction }}>
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