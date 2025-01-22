import './App.css'
import Navbar from './components/Navbar'
import MyProfile from './components/dashboard/MyProfile'
import MyTickets from './components/dashboard/MyTickets'
import PurchaseHistory from './components/dashboard/PurchaseHistory'
import UserDashBoard from './components/dashboard/UserDashBoard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import User from './components/RegLog/User'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/dashboard" element={<UserDashBoard />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/tickets" element={<MyTickets />} />
          <Route path="/history" element={<PurchaseHistory />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
