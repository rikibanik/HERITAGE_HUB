import React from 'react'
import Author from './features/components/Author'
import AuthorLogin from './features/components/AuthorLogin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Author />} />
        <Route path="/login" element={<AuthorLogin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
