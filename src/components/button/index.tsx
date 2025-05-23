import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function Button({ children }: { children: string }) {
  return (


    <Dialog>
      <DialogTrigger className="text-sm text-[#04141C] font-semibold p-2 rounded-lg bg-emerald-400 cursor-pointer hover:bg-emerald-600 transition-all duration-300">
        {children}
      </DialogTrigger>
      <DialogContent className="bg-[#001E2B] text-white">
        <DialogHeader>
          <DialogTitle className="text-gray-200 text-2xl flex flex-col gap-2">
            {children}
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-base">
            Crie uma nova transação para seu controle financeiro
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <div className="flex flex-col">
            <label className="text-sm">Categoria</label>
            <input
              className="bg-black-ofc py-3 px-4"
              placeholder="Selecione uma categoria..." />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}