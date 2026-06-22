import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from '@/types'

interface StoredAccount {
  id: string
  name: string
  email: string
  phone?: string
  password: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, phone: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
const USER_KEY = 'luxtime_user'
const ACCOUNTS_KEY = 'luxtime_accounts'

// NOTE: This is a local, frontend-only mock of authentication for demo purposes.
// Accounts and sessions are stored in localStorage — there is no real server,
// no password hashing, and no security guarantees. Replace with a real backend
// (e.g. an Express + JWT API) before using this in production.

function getAccounts(): StoredAccount[] {
  try {
    const stored = localStorage.getItem(ACCOUNTS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(USER_KEY)
    return stored ? JSON.parse(stored) : null
  })

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
    else localStorage.removeItem(USER_KEY)
  }, [user])

  const login = async (email: string, password: string) => {
    const accounts = getAccounts()
    const account = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase())
    if (!account || account.password !== password) {
      throw new Error('Invalid email or password')
    }
    setUser({ id: account.id, name: account.name, email: account.email, phone: account.phone })
  }

  const register = async (name: string, email: string, phone: string, password: string) => {
    const accounts = getAccounts()
    if (accounts.some((a) => a.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Email already registered')
    }
    const newAccount: StoredAccount = { id: crypto.randomUUID(), name, email, phone, password }
    saveAccounts([...accounts, newAccount])
    setUser({ id: newAccount.id, name, email, phone })
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
