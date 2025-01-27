import './App.css'
import Home from './components/Home'
import UserDashBoard from './components/dashboard/UserDashBoard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/RegLog/Login'
import MuseumPage from './components/museum/MuseumPage'
import AuthorLogin from './components/author/AuthorLogin'
import Author from './components/author/Author'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<UserDashBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/museum" element={<MuseumPage />} />
          <Route path="/author" element={<Author />} />
          <Route path="/author/login" element={<AuthorLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
