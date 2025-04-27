'use client'

import { isTokenValid } from "@/utils/isTokenValid";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface UserData {
  id?: string;
  name?: string;
  email?: string;
  token?: string;
}

interface UserContextType {
  userData: UserData,
  putUserData: (userInfo: UserData) => Promise<void>
  loading: boolean
  logoutUser: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState<UserData>({})
  const [loading, setLoading] = useState(true)

  const putUserData = async (userInfo: UserData) => {
    setUserData(userInfo)
    localStorage.setItem('findash:userData', JSON.stringify(userInfo));
  }

  const logoutUser = () => {
    setUserData({});
    localStorage.removeItem('findash:userData')
  }

  useEffect(() => {
    const loadUserData = () => {
      const clientInfo = localStorage.getItem('findash:userData');

      if (clientInfo) {
        const parsedUser: UserData = JSON.parse(clientInfo);

        if (parsedUser.token && isTokenValid(parsedUser.token)) {
          setUserData(parsedUser);
        } else {
          localStorage.removeItem('findash:userData')
        }
      }

      setLoading(false)
    }

    loadUserData()
  }, [])

  return (
    <UserContext.Provider value={{ userData, putUserData, loading, logoutUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context;
}