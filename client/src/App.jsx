import './App.css'
import Home from './components/home/Home'
import UserDashBoard from './components/dashboard/UserDashBoard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/RegLog/Login'
import MuseumPage from './components/museum/MuseumPage'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ContextComponent, ContextUserInfo } from './components/context/context'
import Default from './components/RegLog/register/Default'
import React, { useState } from 'react'

function App() {
  const [component, setComponent] = useState("Register");
  const [userInfo, setUserInfo] = useState(
    {
      name: { firstname: "", lastname: "" },
      email: "",
      password: "",
      confirmPassword: "",
      // otp: "",
      otpStatus: false,
    }
  )
  return (
    <>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <ContextUserInfo.Provider value={{ userInfo, setUserInfo }}>
            <ContextComponent.Provider value={{ component, setComponent }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<UserDashBoard />} />

                <Route path="/login" element={<Login />} />
                <Route path='/register' element={<Default />} />


                <Route path="/museum" element={<MuseumPage />} />
              </Routes>
            </ContextComponent.Provider>
          </ContextUserInfo.Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
