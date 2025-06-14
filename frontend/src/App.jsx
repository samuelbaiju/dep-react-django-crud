import React from 'react'
import { BrowserRouter ,Navigate, Router, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/login'
import Home from './pages/home'
import NotFound from './pages/notfound'
import Register from './pages/register'



function Logout() {
  localStorage.clear()
  return <Navigate to="/login" replace />
}

function RegisterAndLogin() {
  localStorage.clear()
  return <Register />
}


function App() {
  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterAndLogin />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
    
  )
}

export default App
