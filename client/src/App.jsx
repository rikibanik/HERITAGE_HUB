import { useState } from 'react'
import './App.css'
import User from './components/User'
import { BrowserRouter, Routes, Router, Route } from 'react-router-dom'
import Data from './components/Data'
import { ContextData } from './components/context/context'

function App() {
  const [loginData, setLoginData] = useState(null)

  return (
    <>
      <ContextData.Provider value={{ loginData, setLoginData }}>
        <BrowserRouter>
          <Routes>
            <Route path='/data' element={<Data />}></Route>
            <Route path='/' element={<User />}></Route>
            {/* <Data/>
            <User/> */}
          </Routes>
        </BrowserRouter>
      </ContextData.Provider>
    </>
  )
}

export default App
