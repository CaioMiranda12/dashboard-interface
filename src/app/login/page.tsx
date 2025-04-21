


export default function Login() {
  return (
    <div>
      <h1 className="text-green-300 font-bold text-xl text-center mt-8 mb-5">{"<FinDash$/>"}</h1>

      <div className="w-10/12 sm:max-w-screen-lg mx-auto border border-gray-300 px-4 py-8">
        <h1 className="text-white text-3xl mb-4 sm:text-4xl">Faça o seu login</h1>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-white mb-2">Nome</label>
            <input
              className="border border-white h-10 rounded-lg text-white text-sm px-2 sm:h-14 sm:text-lg"
              type="text" />
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-2">E-mail</label>
            <input
              className="border border-white h-10 rounded-lg text-white text-sm px-2 sm:h-14 sm:text-lg"
              type="text" />
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-2">Senha</label>
            <input
              className="border border-white h-10 rounded-lg text-white text-sm px-2 sm:h-14 sm:text-lg"
              type="password" />
          </div>

        </form>

        <button
          className="bg-emerald-400 w-full h-12 rounded-lg mt-7 cursor-pointer font-semibold hover:bg-emerald-600 transition-all duration-300 sm:h-16 sm:text-xl"
        >Entrar</button>
      </div>
    </div>
  )
}