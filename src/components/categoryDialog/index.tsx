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
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

import * as yup from "yup"

interface categoryData {
  name: string;
}

export function CategoryDialog() {
  const schema = yup.object({
    name: yup.string().required('O nome é obrigatório'),
  }).required()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data: categoryData) => {

    try {
      const { status } = await api.post('/category', {
        name: data.name,
      },
        {
          validateStatus: () => true
        })

      if (status === 201 || status === 200) {
        toast.success('Categoria criada com sucesso')
      }

      else if (status === 409) {
        toast.error('Já existe uma categoria com esse nome.')
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
        Nova categoria
      </DialogTrigger>
      <DialogContent className="bg-[#001E2B] text-white">
        <DialogHeader>
          <DialogTitle className="text-gray-200 text-2xl flex flex-col gap-2">
            Nova categoria
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-base">
            Crie uma nova categoria para suas transações
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