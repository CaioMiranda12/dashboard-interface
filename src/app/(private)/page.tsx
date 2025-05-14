import { ContainerLeft } from "@/components/ContainerLeft";
import { ContainerRight } from "@/components/ContainerRight";
import { InputDate } from "@/components/InputDate";
import { TransactionItem } from "@/components/transactionItem";
import { TransactionList } from "@/components/transactionList";
import { Search } from "lucide-react";
import { FaSearch } from "react-icons/fa";


export default function Home() {

  return (
    <div className="w-full max-w-screen-xl mx-auto px-2 md:px-0 grid grid-cols-3 gap-x-4 items-start">
      <ContainerLeft />

      <ContainerRight />
    </div>
  )
}