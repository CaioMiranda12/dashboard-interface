import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function CategoryDialog() {
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
        <div className="">
          <div className="flex flex-col">
            <label className="text-sm">Nome</label>
            <input
              className="bg-black-ofc py-3 px-4"
              placeholder="Nome da categoria..." />
          </div>

          <div className="flex justify-end gap-6 mt-4">
            <button className="border border-primary-ofc px-4 py-2 text-primary-ofc font-semibold rounded-sm cursor-pointer hover:opacity-80 active:opacity-60">
              Cancelar
            </button>

            <button className="border border-primary-ofc bg-primary-ofc px-4 py-2 text-dark-ofc font-semibold rounded-sm cursor-pointer hover:opacity-80 active:opacity-60">
              Cadastrar
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}