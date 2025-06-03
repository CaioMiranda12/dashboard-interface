import { TransactionList } from "../transactionList";

export function ContainerRight({ isDialog = false }: { isDialog?: boolean }) {
  return (
    <div className={isDialog
      ? 'bg-dark-ofc p-4 min-h-[85vh] h-full overflow-y-auto'
      : 'bg-dark-ofc p-4 min-h-[85vh] h-full hidden md:block md:col-span-1'}>
      <h1 className="text-white text-xl font-bold">Transações</h1>
      <p className="text-gray-300">Receitas e Gastos no período</p>

      <div className="mt-3">
        <TransactionList />
      </div>
    </div>
  )
}
