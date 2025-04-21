import { Label } from "@/components/label"


export default function Cadastro() {
  return (
    <div>
      <h1 className="text-green-300 font-bold text-xl text-center mt-8 mb-5">{"<FinDash$/>"}</h1>

      <div className="w-10/12 sm:max-w-screen-lg mx-auto">
        <h1 className="text-white text-3xl mb-4 sm:text-4xl">Criar conta</h1>

        <div className="flex flex-col gap-4">
          <Label name="Nome" />
          <Label name="E-mail" />
          <Label name="Senha" />
          <Label name="Confirmar senha" />
        </div>

        <button
          className="bg-emerald-400 w-full h-12 rounded-lg mt-7 cursor-pointer font-semibold hover:bg-emerald-500 transition-all duration-300 sm:h-16 sm:text-xl"
        >Criar conta</button>
      </div>
    </div>
  )
}