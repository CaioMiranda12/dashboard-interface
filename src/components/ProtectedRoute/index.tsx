'use client'

import { useUser } from "@/hooks/UserContext"
import { isTokenValid } from "@/utils/isTokenValid";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react"


export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { userData, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!userData?.token || !isTokenValid(userData.token)) {
        router.replace(`/login`)
      }
    }
  }, [userData, loading, pathname, router])

  if (loading) {
    return (
      <div>
        <p className="text-white">Carregando...</p>
      </div>
    )
  }

  return (
    <>
      {children}
    </>
  )
}