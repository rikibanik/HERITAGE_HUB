import './App.css'
import Home from './components/Home'
import UserDashBoard from './components/dashboard/UserDashBoard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/RegLog/Login'
import MuseumPage from './components/museum/MuseumPage'
import Register from './components/RegLog/Register'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<UserDashBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/museum" element={<MuseumPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
