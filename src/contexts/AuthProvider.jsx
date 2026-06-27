import { useState, useEffect, useCallback } from 'react'
import api from '../api/axios'
import AuthContext from './AuthContext'

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // If no token, loading can be false immediately; otherwise true until /auth/me/ responds
  const [loading, setLoading] = useState(() => {
    return !!localStorage.getItem('access_token')
  })

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) return // loading is already false, no need to do anything

    // Token exists → fetch user profile
    api.get('/auth/me/')
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
      })
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login/', { email, password })
    localStorage.setItem('access_token', data.access)
    localStorage.setItem('refresh_token', data.refresh)
    setUser(data.user)
    return data.user
  }, [])

  const register = useCallback(async (payload) => {
    const { data } = await api.post('/auth/register/', payload)
    localStorage.setItem('access_token', data.access)
    localStorage.setItem('refresh_token', data.refresh)
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}