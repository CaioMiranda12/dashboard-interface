'use client'

import { SlSettings } from "react-icons/sl";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { EditCategoryDialog } from "../editCategoryDialog";
import { useCategory } from "@/hooks/CategoryContext";

export function CategoryListDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { categories, getCategories } = useCategory();

  useEffect(() => {
    if (!isOpen) return;

    getCategories()
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <SlSettings size={20} color="#fff" />
      </DialogTrigger>
      <DialogContent className="bg-dark-ofc text-white">
        <DialogHeader>
          <DialogTitle className="text-gray-200 text-2xl flex flex-col gap-2">
            Minhas categorias
          </DialogTitle>

          <DialogDescription className="text-gray-300">
            Lista das suas categorias criadas
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {
            categories && categories.map(category => (
              <EditCategoryDialog key={category.id} name={category.name} color={category.color} id={category.id} />
            ))
          }
        </div>

      </DialogContent>
    </Dialog>
  )
}