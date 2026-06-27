// src/contexts/AuthProvider.jsx
import { useState, useEffect, useCallback, useRef } from 'react'
import AuthContext from './AuthContext'

const USE_MOCK = !import.meta.env.VITE_API_URL

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(() => !!localStorage.getItem('access_token'))
  const authRef = useRef(null)

  // Lazy initialisation – only once
  useEffect(() => {
    const initAuth = async () => {
      let api
      if (USE_MOCK) {
        const mockModule = await import('../mock/auth')
        api = {
          login: mockModule.mockLogin,
          register: mockModule.mockRegister,
          getMe: mockModule.mockGetMe,
        }
      } else {
        const axiosModule = await import('../api/axios')
        const axios = axiosModule.default
        api = {
          login: async (email, password) => {
            const { data } = await axios.post('/auth/login/', { email, password })
            return data
          },
          register: async (payload) => {
            const { data } = await axios.post('/auth/register/', payload)
            return data
          },
          getMe: async () => {
            const { data } = await axios.get('/auth/me/')
            return data
          },
        }
      }
      authRef.current = api

      // If token exists, fetch user
      const token = localStorage.getItem('access_token')
      if (token) {
        try {
          const userData = await api.getMe()
          setUser(userData)
        } catch {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          if (USE_MOCK) localStorage.removeItem('mock_user_id')
        }
      }
      setLoading(false)
    }
    initAuth()
  }, [])

  const login = useCallback(async (email, password) => {
    const data = await authRef.current.login(email, password)
    localStorage.setItem('access_token', data.access)
    localStorage.setItem('refresh_token', data.refresh)
    if (USE_MOCK) localStorage.setItem('mock_user_id', data.user.id)
    setUser(data.user)
    return data.user
  }, [])

  const register = useCallback(async (payload) => {
    const data = await authRef.current.register(payload)
    localStorage.setItem('access_token', data.access)
    localStorage.setItem('refresh_token', data.refresh)
    if (USE_MOCK) localStorage.setItem('mock_user_id', data.user.id)
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    if (USE_MOCK) localStorage.removeItem('mock_user_id')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}