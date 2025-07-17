import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { login as loginService } from '../services/user-service'
import { UserForFrontend } from '../types/user'

/**
 * This context is used to manage the authentication state of the user.
 */

interface AuthContextType {
  user: UserForFrontend | undefined
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * This hook is used to get the authentication state of the user.
 * It throws an error if the user is not authenticated.
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  if (!context.loading && !context.user) {
    throw new Error('User is not authenticated')
  }
  
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

/**
 * This provider is used to provide the authentication state to the app.
 * It checks for an existing session on mount and stores the user in local storage.
 * It also provides the login and logout functions.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserForFrontend | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const user = await loginService(username, password)
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(undefined)
    localStorage.removeItem('user')
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 