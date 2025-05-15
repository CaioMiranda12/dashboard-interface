'use client'

import { InfoContainer } from "../InfoContainer";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { BsArrowDownRightCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Summary } from "@/types/summary";
import { api } from "@/services/api";
import { useTransaction } from "@/hooks/TransactionContext";

export function SummaryContainer() {
  const { transactions } = useTransaction();

  const [summary, setSummary] = useState<Summary>({
    balance: 0,
    income: 0,
    expense: 0
  });

  useEffect(() => {
    async function getSummary() {
      const { data } = await api.get('/summary');
      setSummary(data);
    }

    getSummary();
  }, [transactions])

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <InfoContainer icon={RiMoneyDollarCircleLine} name="Saldo" value={summary.balance} color="#016BF8" />
      <InfoContainer icon={BsArrowUpRightCircle} name="Receitas" value={summary.income} color="#00ED64" />
      <InfoContainer icon={BsArrowDownRightCircle} name="Gastos" value={summary.expense} color="#DB3030" />
    </div>
  )
}