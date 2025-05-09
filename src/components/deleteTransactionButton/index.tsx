import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useTransaction } from "@/hooks/TransactionContext"
import { api } from "@/services/api"
import { toast } from "react-toastify"

export function DeleteTransactionButton({ transactionId }: { transactionId: number }) {

  const { removeTransaction } = useTransaction();

  async function handleDelete() {
    try {
      await api.delete(`/transactions/${transactionId}`);
      toast.success('Transação deletada com sucesso');

      await removeTransaction(transactionId)
    } catch (error) {
      toast.error('Erro ao deletar transação');
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-sm text-[#04141C] font-semibold px-4 py-2 rounded-lg bg-red-400 cursor-pointer hover:opacity-80 transition-all duration-300">Deletar</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza que deseja deletar essa transação?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente sua transação e removerá seus dados de nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Deletar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}