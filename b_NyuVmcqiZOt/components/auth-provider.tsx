"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  phone: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, phone: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("powerfit_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem("powerfit_users") || "[]")
    const foundUser = users.find(
      (u: { email: string; password: string }) => u.email === email && u.password === password
    )
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("powerfit_user", JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  }

  const signup = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem("powerfit_users") || "[]")
    const existingUser = users.find((u: { email: string }) => u.email === email)
    
    if (existingUser) {
      return false
    }

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
      password,
    }

    users.push(newUser)
    localStorage.setItem("powerfit_users", JSON.stringify(users))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("powerfit_user")
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
