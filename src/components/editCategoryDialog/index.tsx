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

import { api } from "@/services/api"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { SlSettings } from "react-icons/sl";
import { FaTrash } from "react-icons/fa";



import * as yup from "yup"
import { CategoryListDialog } from "../categoryListDialog"
import { useCategory } from "@/hooks/CategoryContext"

interface categoryData {
  id: number;
  name: string;
  color: string;
}

export function EditCategoryDialog({ id, name, color }: categoryData) {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { updateCategory, deleteCategory } = useCategory();

  const schema = yup.object({
    name: yup.string().required('O nome é obrigatório'),
    color: yup.string()
      .required('A cor é obrigatória')
      .matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Use uma cor hexadecimal válida')
  }).required()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: name,
      color: color
    }
  })
  const onSubmit = async (categoryData: { name: string, color: string }) => {

    try {
      const { status, data } = await api.patch(`/category/${id}`, {
        name: categoryData.name,
        color: categoryData.color
      },
        {
          validateStatus: () => true
        })

      if (status === 201 || status === 200) {
        toast.success('Categoria atualizada com sucesso');
        reset();
        setIsOpen(false);
        updateCategory(data)
      }

      else if (status === 409) {
        toast.error('Já existe uma categoria com esse nome.');
      }
      else {
        throw new Error();
      }
    } catch (error) {
      toast.error('Falha no sistema! Tente novamente');
    }
  }

  async function handleDeleteCategory() {
    try {
      const { status } = await api.delete(`/category/${id}`, {
        validateStatus: () => true
      })

      if (status === 200) {
        deleteCategory(id)
        toast.success('Categoria deletada com sucesso')
      }

      else if (status === 400) {
        toast.error('Categoria em uso por transações.');
      }

      else {
        throw new Error();
      }
    } catch (error) {
      toast.error('Falha ao deletar categoria, tente novamente!')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center gap-2">

        <AlertDialog>
          <AlertDialogTrigger>
            <FaTrash size={20} color="#ff7979" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você realmente quer deletar essa categoria?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. Isso excluirá permanentemente sua categoria
                e removerá seus dados de nossos servidores.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteCategory}>Deletar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <DialogTrigger className="flex items-center gap-4">
          <SlSettings size={20} color="#fff" />
          <span className="text-base md:text-lg">{name}</span>
        </DialogTrigger>
      </div>
      <DialogContent className="bg-dark-ofc text-white">
        <DialogHeader>
          <DialogTitle className="text-gray-200 text-2xl flex flex-col gap-2">
            Editar categoria
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-base">
            Edite o nome ou a cor da sua categoria
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="text-sm">Nome</label>
            <input
              className="bg-black-ofc py-3 px-4"
              placeholder="Nome da categoria..."
              {...register('name')}

            />
            <p className="text-red-400 font-semibold mt-1">{errors.name?.message}</p>

          </div>

          <div className="flex flex-col">
            <label className="text-sm">Cor</label>
            <input
              type="color"
              className="bg-black-ofc py-3 px-4"
              {...register('color')}
            />
            <p className="text-red-400 font-semibold mt-1">{errors.color?.message}</p>

          </div>

          <div className="flex justify-between mt-4">
            <CategoryListDialog />

            <div className="flex gap-5">
              <DialogClose className="border border-primary-ofc px-4 py-2 text-primary-ofc font-semibold rounded-sm cursor-pointer hover:opacity-80 active:opacity-60">
                Cancelar
              </DialogClose>

              <button
                type="submit"
                className="border border-primary-ofc bg-primary-ofc px-4 py-2 text-dark-ofc font-semibold rounded-sm cursor-pointer hover:opacity-80 active:opacity-60">
                Confirmar
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}