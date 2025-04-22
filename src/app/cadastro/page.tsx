'use client'

import { api } from "@/services/api";
import { FormEvent, useState } from "react";

interface userData {
  name: string;
  email: string;
  password: string;
}

async function createUser(data: userData) {
  const response = await api.post('/users', {
    name: data.name,
    email: data.email,
    password: data.password
  })

  console.log(response)
}


export default function Cadastro() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const createdUser = await createUser({
      name: name,
      email: email,
      password: password
    })

    console.log(createdUser)
  }

  return (
    <div>
      <h1 className="text-green-300 font-bold text-xl text-center mt-8 mb-5">{"<FinDash$/>"}</h1>

      <div className="w-10/12 sm:max-w-screen-lg mx-auto border border-gray-300 px-4 py-8">
        <h1 className="text-white text-3xl mb-4 sm:text-4xl">Criar conta</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-white mb-2">Nome</label>
            <input
              className="border border-white h-10 rounded-lg text-white text-sm px-2 sm:h-14 sm:text-lg"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-2">E-mail</label>
            <input
              className="border border-white h-10 rounded-lg text-white text-sm px-2 sm:h-14 sm:text-lg"
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-2">Senha</label>
            <input
              className="border border-white h-10 rounded-lg text-white text-sm px-2 sm:h-14 sm:text-lg"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

          </div>

          <div className="flex flex-col">
            <label className="text-white mb-2">Confirmar senha</label>
            <input
              className="border border-white h-10 rounded-lg text-white text-sm px-2 sm:h-14 sm:text-lg"
              type="password" />
          </div>

          <button
            type="submit"
            className="bg-emerald-400 w-full h-12 rounded-lg mt-7 cursor-pointer font-semibold hover:bg-emerald-600 transition-all duration-300 sm:h-16 sm:text-xl"
          >
            Criar conta
          </button>

        </form>


      </div>
    </div>
  )
}