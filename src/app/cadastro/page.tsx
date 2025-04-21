

export default function Cadastro() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <h1>Faça seu cadastro</h1>

        <div>
          <label>Nome</label>
          <input type="text" placeholder="Digite seu nome..." />
        </div>

        <div>
          <label>E-mail</label>
          <input type="text" placeholder="Digite seu nome..." />
        </div>

        <div>
          <label>Senha</label>
          <input type="text" placeholder="Digite sua senha..." />
        </div>

        <div>
          <label>Confirmar senha senha</label>
          <input type="text" placeholder="Confirme sua senha..." />
        </div>
      </div>
    </div>
  )
}