'use client'
import { useUser } from "@/hooks/UserContext";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Link from "next/link";
import { useRouter } from "next/navigation";

interface editData {
  name?: string;
  email?: string;
  password?: string;
}


export default function User() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState();
  const { userData, updateUser } = useUser();

  useEffect(() => {
    if (userData) {
      reset({
        name: userData?.name || '',
        email: userData?.email || '',
      });
    }
  }, [])

  const schema = yup.object({
    name: yup.string().optional(),
    email: yup.string().email('Digite um e-mail válido').optional(),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').optional(),
  }).required()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
    }
  })



  const onSubmit = async (data: editData) => {
    try {
      const { status } = await api.patch('/users', {
        name: data.name,
        email: data.email,
        password: data.password,
      },
        {
          validateStatus: () => true
        })

      if (status === 201 || status === 200) {
        updateUser(data)
        toast.success('Usuário atualizado com sucesso')

        setTimeout(() => {
          router.push('/')
        }, 1000)
      }

      else if (status === 409) {
        toast.error('Esse e-mail já está sendo utilizado')
      }
      else {
        throw new Error();
      }
    } catch (error) {
      toast.error('Falha no sistema! Tente novamente')
    }
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto px-2 md:px-0 mt-4">
      <h1 className="text-white text-3xl">Editar perfil</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4">
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

        <button
          type="submit"
          className="bg-emerald-400 w-full h-12 rounded-lg mt-7 cursor-pointer font-semibold hover:bg-emerald-600 transition-all duration-300 sm:h-16 sm:text-xl"
        >
          Atualizar conta
        </button>
      </form>
    </div>
  );
}