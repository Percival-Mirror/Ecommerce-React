import React from 'react'
import ReactDOM from 'react-dom/client'
import { MainApp } from './components/MainApp'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { AuthProvider } from './context/AuthProvider'
import { RegisterPage } from './pages/RegisterPage'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <Routes>
          <Route path="*" element={<MainApp></MainApp>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        </Routes>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>,
)
