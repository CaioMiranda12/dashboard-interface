import { Transaction } from "@/types/transaction";
import { ExpenseChart } from "../ExpenseChart";
import { Label } from "../label";

interface ExpensesContainerProps {
  expenses: Transaction[];
}

export function ExpensesContainer({ expenses }: ExpensesContainerProps) {


  const expensesByCategory = expenses.reduce<Record<string, { total: number; color: string }>>((acc, expense) => {
    const categoryName = expense.Category.name;
    const categoryColor = expense.Category.color;

    if (!acc[categoryName]) {
      acc[categoryName] = { total: 0, color: categoryColor };
    }

    acc[categoryName].total += expense.amount;

    return acc;
  }, {});



  return (
    <div className="py-4">
      <Label title="Gastos" description="Despesas por categoria no período" />

      <div>
        <ExpenseChart expensesByCategory={expensesByCategory} />
      </div>
    </div>
  )
}