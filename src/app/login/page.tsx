'use client'

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "react-toastify";
import { api } from "@/services/api";
interface loginUserData {
  email: string;
  password: string;
}

export default function Login() {
  const schema = yup.object({
    email: yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Digite uma senha')
  }).required()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (userData: loginUserData) => {
    const { data } = await toast.promise(
      api.post('/auth', {
        email: userData.email,
        password: userData.password
      }),
      {
        pending: 'Verificando seus dados',
        success: 'Seja bem vindo(a)',
        error: 'Verifique seu e-mail e senha'
      }
    )
  }


  return (
    <div>
      <h1 className="text-green-300 font-bold text-xl text-center mt-8 mb-5">{"<FinDash$/>"}</h1>

      <div className="w-10/12 sm:max-w-screen-lg mx-auto border border-gray-300 px-4 py-8">
        <h1 className="text-white text-3xl mb-4 sm:text-4xl">Faça o seu login</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4">

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

          <button
            type="submit"
            className="bg-emerald-400 w-full h-12 rounded-lg mt-7 cursor-pointer font-semibold hover:bg-emerald-600 transition-all duration-300 sm:h-16 sm:text-xl"
          >Entrar</button>

        </form>


      </div>
    </div>
  )
}