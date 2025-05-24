'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { GrTransaction } from "react-icons/gr";
import { ContainerRight } from "../ContainerRight";

export function Submenu() {

  return (
    <div className="w-full flex justify-end px-4 my-3 md:hidden">
      <Dialog>
        <DialogTrigger className="flex gap-2">
          <GrTransaction size={20} color="#5ee9b5" />
          <span className="text-emerald-300 font-semibold">Ver transações</span>
        </DialogTrigger>
        <DialogContent className="p-0">

          <DialogTitle className="hidden">Are you absolutely sure?</DialogTitle>
          <ContainerRight isDialog />

        </DialogContent>
      </Dialog>
    </div>
  )
}