import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'

const User = () => {
    const [status, setStatus] = useState("Register")
    const [form, setForm] = useState({
        login: { email: "", password: "" },
        register: { name: { firstname: "", lastname: "" }, email: "", password: "" }
    })
    return (
        <>
            {status === "Log in" ? <Login status={status} setStatus={setStatus} form={form} setForm={setForm} /> : <Register status={status} setStatus={setStatus} form={form} setForm={setForm} />}
        </>
    )
}

export default User
