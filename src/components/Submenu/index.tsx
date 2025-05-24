'use client'

import { GrTransaction } from "react-icons/gr";

export function Submenu() {

  function handleShowTransactions() {
    console.log('mostrar transaçoes')
  }

  return (
    <div className="w-full flex justify-end px-4 my-3 md:hidden">
      <button
        onClick={handleShowTransactions}
        className="flex gap-2">
        <GrTransaction size={20} color="#5ee9b5" />
        <span className="text-emerald-300 font-semibold">Ver transações</span>
      </button>
    </div>
  )
}