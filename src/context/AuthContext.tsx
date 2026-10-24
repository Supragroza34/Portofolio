import { createContext, useContext, useState, type ReactNode } from 'react'
import { getToken, login as apiLogin, setToken } from '../lib/api'

interface AuthContextValue {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => getToken())

  const login = async (username: string, password: string) => {
    const { token: newToken } = await apiLogin(username, password)
    setToken(newToken)
    setTokenState(newToken)
  }

  const logout = () => {
    setToken(null)
    setTokenState(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
