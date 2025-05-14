import { TransactionList } from "../transactionList";

export function ContainerRight() {
  return (
    <div className="col-span-1 bg-[#001E2B] p-4 min-h-[85vh]">
      <h1 className="text-white text-xl font-bold">Transações</h1>
      <p className="text-gray-300">Receitas e Gastos no período</p>

      <div className="mt-3">
        <TransactionList />
      </div>
    </div>
  )
}