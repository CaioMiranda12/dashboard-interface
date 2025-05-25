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
import { api } from "@/services/api";
import { DialogDescription } from "@radix-ui/react-dialog";
import { EditCategoryDialog } from "../editCategoryDialog";

interface Category {
  name: string;
  id: number;
  color: string;
}

export function CategoryListDialog() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    async function getCategories() {
      try {
        const res = await api.get('/category');
        setCategories(res.data);
      } catch (error) {
        console.error("Erro ao buscar categorias", error);
      }
    }

    getCategories()

    console.log(categories)
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <SlSettings size={20} color="#fff" />
      </DialogTrigger>
      <DialogContent className="bg-[#001E2B] text-white">
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