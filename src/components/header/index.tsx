'use client'

import { FaCircleUser } from "react-icons/fa6";
import { Button } from "../button";
import { usePathname } from "next/navigation";
import { Logo } from "../logo";

export function Header() {
  const pathname = usePathname();

  if (pathname === '/cadastro' || pathname === '/login') return null;

  return (
    <header className="flex justify-between items-center h-20 px-2 xl:px-8 bg-[#04141C]">
      <Logo />

      <div className="flex xl:gap-16">
        <div className="flex gap-4 text-white">
          <Button>Nova transação</Button>
          <Button>Nova categoria</Button>
        </div>

        <div className="hidden sm:flex items-center xl:gap-3 text-white">
          <p>Caio César</p>
          <FaCircleUser color="#fff" size={25} />
        </div>
      </div>
    </header>
  )
}