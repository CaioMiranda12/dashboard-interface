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
        const now = new Date();

        const defaultStart = new Date(now.getFullYear(), now.getMonth(), 1); // primeiro dia do mês
        const defaultEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59); // último dia do mês

        const start = filters?.startDate ? new Date(filters.startDate) : defaultStart;
        const end = filters?.endDate ? new Date(filters.endDate) : defaultEnd;


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
    if (!filters?.startDate || !filters?.endDate) {
      setFilteredExpenses([]);
      return;
    }

    const start = new Date(filters.startDate)
    const end = new Date(filters.endDate)
    end.setHours(23, 59, 59, 999);



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