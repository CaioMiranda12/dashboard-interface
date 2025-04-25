'use client'

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
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState<UserData>({})

  const putUserData = async (userInfo: UserData) => {
    setUserData(userInfo)
    localStorage.setItem('findash:userData', JSON.stringify(userInfo));
  }

  useEffect(() => {
    const loadUserData = () => {
      const clientInfo = localStorage.getItem('findash:userData');

      if (clientInfo) {
        setUserData(JSON.parse(clientInfo))
      }
    }

    loadUserData()
  }, [])

  return (
    <UserContext.Provider value={{ userData, putUserData }}>
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