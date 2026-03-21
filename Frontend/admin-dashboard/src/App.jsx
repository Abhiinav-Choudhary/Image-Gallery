import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Upload from "./pages/Upload"
import ProtectedRoute from './components/ProtectRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={ <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>} />
        <Route path="/upload" element={ <ProtectedRoute>
      <Upload />
    </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
