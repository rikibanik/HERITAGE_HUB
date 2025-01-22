import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'

const User = () => {
    const [status, setStatus] = useState("Register")
    return (
        <>
            {status === "Log in" ? <Login status={status} setStatus={setStatus} /> : <Register status={status} setStatus={setStatus} />}
        </>
    )
}

export default User
