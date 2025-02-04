import './App.css'
import Home from './components/Home'
import UserDashBoard from './components/dashboard/UserDashBoard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/RegLog/Login'
import MuseumPage from './components/museum/MuseumPage'
import Register from './components/RegLog/Register'
import SuccessBookingPopup from './components/museum/SuccessBookingPopup'
import { GoogleOAuthProvider } from '@react-oauth/google';
  
function App() {
  return (
    <>
      <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<UserDashBoard />} />
          
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
         
          <Route path="/museum" element={<MuseumPage />} />
        </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
