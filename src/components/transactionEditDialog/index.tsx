'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useCategory } from "@/hooks/CategoryContext"
import { useTransaction } from "@/hooks/TransactionContext"
import { api } from "@/services/api"
import { Transaction } from "@/types/transaction"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

import * as yup from "yup"

interface TransactionEditProps {
  transaction: Transaction;
}


export function TransactionEditDialog({ transaction }: TransactionEditProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { categories, getCategories } = useCategory();

  const { editTransaction } = useTransaction();

  useEffect(() => {
    if (!isOpen) return;

    getCategories()
  }, [isOpen])

  const schema = yup.object({
    title: yup.string().required('O nome é obrigatório'),
    description: yup.string().min(6, 'A descrição deve ter no mínimo 6 caracteres').required('Digite uma descrição'),
    amount: yup.number().transform((value, originalValue) => (
      String(originalValue).trim() === '' ? undefined : value
    )).positive('O valor deve ser maior que 0').required('Digite um valor'),
    categoryId: yup.number().min(1).required('Digite uma categoria'),
    type: yup.string().oneOf(['income', 'expense']).required('Escolha um tipo'),
    date: yup.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: transaction.title,
      description: transaction.description,
      amount: transaction.amount,
      categoryId: transaction.Category.id,
      type: transaction.type,
      date: transaction.date.split('T')[0],
    }
  })

  type FormData = yup.InferType<typeof schema>

  const onSubmit = async (data: FormData) => {

    try {
      const response = await api.patch(`/transactions/${transaction.id}`, {
        ...data
      },
        {
          validateStatus: () => true
        })

      if (response.status === 200) {
        editTransaction(response.data);
        toast.success('Transação atualizada com sucesso')
        setIsOpen(false)

      }
      else {
        toast.error('Erro ao atualizar transação')
      }
    } catch (error) {
      toast.error('Erro inesperado! Tente novamente')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="text-sm text-[#04141C] font-semibold p-2 rounded-lg bg-emerald-400 cursor-pointer hover:bg-emerald-600 transition-all duration-300">
        Editar
      </DialogTrigger>
      <DialogContent className="bg-[#001E2B] text-white">
        <DialogHeader>
          <DialogTitle className="text-gray-200 text-2xl flex flex-col gap-2">
            Editar transação
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-base">
            Atualize os dados da transação
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm mb-1">Nome</label>
            <input
              className="bg-black-ofc py-3 px-4"
              placeholder="Nome da transação..."
              {...register('title')}
            />
            <p className="text-red-400 font-semibold mt-1">{errors.title?.message}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Descrição</label>
            <input
              className="bg-black-ofc py-3 px-4"
              placeholder="Descrição da transação..."
              {...register('description')}
            />
            <p className="text-red-400 font-semibold mt-1">{errors.description?.message}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Categoria</label>
            <select
              {...register('categoryId')}
              className="bg-black-ofc py-3 px-4">
              {
                categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))
              }
            </select>
            <p className="text-red-400 font-semibold mt-1">{errors.categoryId?.message}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Valor</label>
            <input
              type="number"
              step='any'
              className="bg-black-ofc py-3 px-4"
              placeholder="Valor da transação..."
              {...register('amount')}
            />
            <p className="text-red-400 font-semibold mt-1">{errors.amount?.message}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Data</label>
            <input
              type="date"
              className="bg-black-ofc py-3 px-4"
              placeholder="Nome da transação..."
              {...register('date')}
            />
            <p className="text-red-400 font-semibold mt-1">{errors.date?.message}</p>
          </div>

          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="income"
                {...register('type')}
              />
              Receita
            </label>

            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="expense"
                {...register('type')}
              />
              Despesa
            </label>
          </div>


          <div className="flex justify-end gap-6 mt-4">
            <DialogClose className="border border-primary-ofc px-4 py-2 text-primary-ofc font-semibold rounded-sm cursor-pointer hover:opacity-80 active:opacity-60">
              Cancelar
            </DialogClose>

            <button
              type="submit"
              className="border border-primary-ofc bg-primary-ofc px-4 py-2 text-dark-ofc font-semibold rounded-sm cursor-pointer hover:opacity-80 active:opacity-60">
              Atualizar
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}