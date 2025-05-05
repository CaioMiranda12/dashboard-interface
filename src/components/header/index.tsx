'use client'

import { FaCircleUser } from "react-icons/fa6";
import { Button } from "../button";
import { usePathname } from "next/navigation";
import { Logo } from "../logo";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CircleUserRound, LogOut, Trash2, UserPen } from "lucide-react";
import { useUser } from "@/hooks/UserContext";


export function Header() {
  const pathname = usePathname();
  const { logoutUser, userData } = useUser()

  if (pathname === '/cadastro' || pathname === '/login') return null;

  return (
    <header className="flex justify-between items-center h-20 px-2 xl:px-8 bg-[#04141C] max-w-screen-xl mx-auto">
      <Logo />

      <div className="flex xl:gap-16">
        <div className="flex gap-4 text-white ml-4">
          <Button>Nova transação</Button>
          <Button>Nova transação</Button>
        </div>

        <div className="flex items-center xl:gap-3 text-white">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex gap-3 ml-4">
                <p className="hidden sm:block">{userData.name}</p>
                <FaCircleUser color="#fff" size={25} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <CircleUserRound />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserPen />
                <span>Editar conta</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash2 />
                <span>Deletar conta</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logoutUser}>
                <LogOut />
                <span>Sair da conta</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}