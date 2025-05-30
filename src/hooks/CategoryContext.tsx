'use client'

import { api } from "@/services/api";
import { createContext, ReactNode, useContext, useState } from "react"
import { toast } from "react-toastify";

interface Category {
  name: string;
  id: number;
  color: string;
}

interface CategoryContextType {
  categories: Category[],
  getCategories: () => Promise<void>
  updateCategory: (updatedCategory: Category) => void
  deleteCategory: (categoryId: Number) => void
}

const CategoryContext = createContext({} as CategoryContextType);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    try {
      const res = await api.get('/category');
      setCategories(res.data);
    } catch (error) {
      toast.error("Erro ao buscar categorias");
    }
  }

  const updateCategory = (updatedCategory: Category) => {
    setCategories((allCategories => (
      allCategories.map(cat => (
        cat.id === updatedCategory.id ? { ...cat, ...updatedCategory } : cat
      ))
    )))
  }

  const deleteCategory = (categoryId: Number) => {
    const filteredCategories = categories.filter(category => category.id !== categoryId);

    setCategories(filteredCategories);
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        getCategories,
        updateCategory,
        deleteCategory
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategory = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider')
  }

  return context;
}
