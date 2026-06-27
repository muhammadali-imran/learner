// src/hooks/useFileUpload.js
import { useState, useCallback } from 'react'
import api from '../api/axios'

/**
 * const { upload, progress, loading, error, reset } = useFileUpload()
 * await upload(file, '/submissions/', { assignment_id: 1 })
 */
export function useFileUpload() {
  const [progress, setProgress] = useState(0)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)

  const reset = useCallback(() => {
    setProgress(0)
    setLoading(false)
    setError(null)
  }, [])

  const upload = useCallback(async (file, url, extraFields = {}) => {
    if (!file) return null

    setLoading(true)
    setError(null)
    setProgress(0)

    const formData = new FormData()
    formData.append('file', file)
    Object.entries(extraFields).forEach(([k, v]) => formData.append(k, v))

    try {
      const res = await api.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (evt) => {
          if (evt.total) {
            setProgress(Math.round((evt.loaded / evt.total) * 100))
          }
        },
      })
      setProgress(100)
      return res.data
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || 'Upload failed'
      setError(msg)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { upload, progress, loading, error, reset }
}
