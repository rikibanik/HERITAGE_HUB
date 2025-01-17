import React, { useState } from 'react'
import { useContext } from 'react'
import { ContextData } from './context/context'
const Register = ({ status, setStatus, form, setForm }) => {
    const { loginData, setLoginData } = useContext(ContextData)
    const [registerForm, setRegisterForm] = useState(
        {
            name: { firstname: "", lastname: "" },
            email: "",
            password: "",
        }
    )
    const handlechange = (event) => {
        setRegisterForm({
            ...registerForm,
            name: {
                ...registerForm.name,
                [event.target.name]: event.target.value,
            },
            [event.target.name]: event.target.value,
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/user/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerForm),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            setLoginData(data)
            // localStorage.setItem("token", data.result.token)
            console.log('Response:', data);
            window.location.href = "http://localhost:5173/data"

        } catch (error) {
            console.error('Error:', error);
        }
    }
    // console.log(form)
    return (

        <div id="AuthContainer" className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">Welcome To Heritage Hub</h1>
                    <p className="text-gray-600">Create a new account</p>
                </div>

                <div className="space-y-4">
                    {/* <button className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                </button> */}
                    {/* <div className="flex items-center">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="px-4 text-sm text-gray-500">or</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div> */}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
                            <input value={registerForm.name.firstname} onChange={handlechange} type="firstname" id="firstname" name="firstname" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input value={registerForm.name.lastname} onChange={handlechange} type="lastname" id="lastname" name="lastname" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input value={registerForm.email} onChange={handlechange} type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input value={registerForm.password} onChange={handlechange} type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input type="checkbox" id="remember" name="remember" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">Remember me</label>
                            </div>
                            {/* <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Forgot password?</a> */}
                        </div>

                        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Register
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?
                    <button onClick={() => setStatus("Log in")} className="ml-1 font-medium text-blue-600 hover:text-blue-800">Log in</button>
                </p>
            </div>
        </div>
    )
}

export default Register
