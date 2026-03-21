import React , { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import api from "../api/axios"

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/images") // any protected route
        setIsAuth(true)
      } catch {
        setIsAuth(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) return <div>Loading...</div>

  return isAuth ? children : <Navigate to="/" />
}

export default ProtectedRoute
