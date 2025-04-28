'use client'

import { api } from "@/services/api";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";


interface userData {
  name: string;
  email: string;
  password: string;
}


export default function Cadastro() {
  const router = useRouter()

  const schema = yup.object({
    name: yup.string().required('O nome é obrigatório'),
    email: yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Digite uma senha'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'As senhas devem ser iguais').required('Confirme sua senha')
  }).required()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data: userData) => {
    try {
      const { status } = await api.post('/users', {
        name: data.name,
        email: data.email,
        password: data.password
      },
        {
          validateStatus: () => true
        })

      if (status === 201 || status === 200) {
        toast.success('Cadastro criado com sucesso')

        setTimeout(() => {
          router.push('/login')
        }, 1000)
      }

      else if (status === 409) {
        toast.error('E-mail já cadastrado! Faça login para continuar')
      }
      else {
        throw new Error();
      }
    } catch (error) {
      toast.error('Falha no sistema! Tente novamente')
    }
  }

  return (
    <div>
      <h1 className="text-green-300 font-bold text-xl text-center mt-8 mb-5">{"<FinDash$/>"}</h1>

      <div className="w-10/12 sm:max-w-screen-lg mx-auto border border-gray-300 px-4 py-8">
        <h1 className="text-white text-3xl mb-4 sm:text-4xl">Criar conta</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-white mb-2">Nome</label>
            <input
              className="border border-white h-10 rounded-lg text-white text-sm px-2 sm:h-14 sm:text-lg"
              type="text"
              {...register("name")}
            />
            <p className="text-red-400 font-semibold mt-3">{errors.name?.message}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-2">E-mail</label>
            <input
              className="border border-white h-10 rounded-lg text-white text-sm px-2 sm:h-14 sm:text-lg"
              type="text"
              {...register("email")}
            />
            <p className="text-red-400 font-semibold mt-3">{errors.email?.message}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-2">Senha</label>
            <input
              className="border border-white h-10 rounded-lg text-white text-sm px-2 sm:h-14 sm:text-lg"
              type="password"
              {...register("password")}
            />
            <p className="text-red-400 font-semibold mt-3">{errors.password?.message}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-2">Confirmar senha</label>
            <input
              className="border border-white h-10 rounded-lg text-white text-sm px-2 sm:h-14 sm:text-lg"
              type="password"
              {...register("confirmPassword")}
            />
            <p className="text-red-400 font-semibold mt-3">{errors.confirmPassword?.message}</p>
          </div>

          <button
            type="submit"
            className="bg-emerald-400 w-full h-12 rounded-lg mt-7 cursor-pointer font-semibold hover:bg-emerald-600 transition-all duration-300 sm:h-16 sm:text-xl"
          >
            Criar conta
          </button>
        </form>
        <p className="text-white font-semibold mt-6">
          Já possui conta? {' '}
          <Link
            href={'/login'}
            className="underline"
          >Clique aqui.</Link>
        </p>

      </div>
    </div>
  )
}