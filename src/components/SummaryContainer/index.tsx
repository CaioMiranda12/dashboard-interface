import { InfoContainer } from "../InfoContainer";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsArrowUpRightCircle, BsArrowDownRightCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Summary } from "@/types/summary";
import { api } from "@/services/api";
import { useTransaction } from "@/hooks/TransactionContext";
import { ExpensesContainer } from "../ExpensesContainer";
import { Transaction } from "@/types/transaction";

interface SummaryContainerProps {
  filters: { startDate: string, endDate: string } | null;
}

const getDateRange = (filters: { startDate: string, endDate: string } | null) => {
  const now = new Date();
  const start = filters?.startDate ? new Date(filters.startDate) : new Date(now.getFullYear(), now.getMonth(), 1);
  const end = filters?.endDate ? new Date(filters.endDate) : new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  return { start, end };
}

export function SummaryContainer({ filters }: SummaryContainerProps) {
  const { transactions } = useTransaction();
  const [summary, setSummary] = useState<Summary>({
    balance: 0,
    income: 0,
    expense: 0,
  });

  const [filteredExpenses, setFilteredExpenses] = useState<Transaction[]>([]);

  useEffect(() => {
    async function getSummary() {
      try {
        const { start, end } = getDateRange(filters);

        const { data } = await api.get('/summary', {
          params: {
            startDate: start.toISOString(),
            endDate: end.toISOString()
          }
        });
        setSummary(data);
      } catch (error) {
        console.error("Erro ao buscar o resumo:", error);
        setSummary({ balance: 0, income: 0, expense: 0 });
      }
    }

    getSummary();
  }, [transactions, filters]);

  useEffect(() => {
    const { start, end } = getDateRange(filters);

    const filtered = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date)
      return (
        transaction.type === 'expense' &&
        transactionDate >= start &&
        transactionDate <= end
      );
    })

    setFilteredExpenses(filtered);
  }, [transactions, filters]);

  return (
    <div className="mt-4">
      <div className="grid grid-cols-3 gap-4">
        <InfoContainer icon={RiMoneyDollarCircleLine} name="Saldo" value={summary.balance} color="#016BF8" />
        <InfoContainer icon={BsArrowUpRightCircle} name="Receitas" value={summary.income} color="#00ED64" />
        <InfoContainer icon={BsArrowDownRightCircle} name="Gastos" value={summary.expense * (-1)} color="#DB3030" />
      </div>

      <ExpensesContainer expenses={filteredExpenses} />
    </div>
  );
}