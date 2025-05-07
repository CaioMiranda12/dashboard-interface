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
import { api } from "@/services/api"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

import * as yup from "yup"

interface transactionData {
  title: string;
  description: string;
  amount: number;
  categoryId: number;
  type: string;
  date?: string;
}

interface Category {
  name: string;
  id: number;
}

export function TransactionDialog() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    async function getCategories() {
      try {
        const res = await api.get('/category');
        setCategories(res.data);
      } catch (error) {
        console.error("Erro ao buscar categorias", error);
      }
    }

    getCategories()
  }, [])

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
      type: 'income',
      date: new Date().toISOString().split('T')[0],
    }
  })

  const onSubmit = async (data: transactionData) => {

    try {
      const { status } = await api.post('/transactions', {
        title: data.title,
        description: data.description,
        amount: data.amount,
        categoryId: data.categoryId,
        type: data.type,
        date: data.date
      },
        {
          validateStatus: () => true
        })

      if (status === 201 || status === 200) {
        toast.success('Transação criada com sucesso')
      }

      else if (status === 409) {
        toast.error('Já existe uma transação com esse nome.')
      }
      else {
        throw new Error();
      }
    } catch (error) {
      toast.error('Falha no sistema! Tente novamente')
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="text-sm text-[#04141C] font-semibold p-2 rounded-lg bg-emerald-400 cursor-pointer hover:bg-emerald-600 transition-all duration-300">
        Nova transação
      </DialogTrigger>
      <DialogContent className="bg-[#001E2B] text-white">
        <DialogHeader>
          <DialogTitle className="text-gray-200 text-2xl flex flex-col gap-2">
            Nova transação
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-base">
            Crie uma nova transação para seu controle financeiro
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
              Cadastrar
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}