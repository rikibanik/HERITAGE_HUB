import React, { useState, useEffect } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useLoginAuthorMutation } from '../authorApi';

const AuthorLogin = () => {
    const navigate = useNavigate()
    const [token, setToken] = useState("")
    const [LoginFrom, setLoginFrom] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false);
    // console.log(LoginFrom)
    const handlechange = (event) => {
        setLoginFrom({ ...LoginFrom, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        localStorage.setItem("token", token);
    }, [token])

    const [login] = useLoginAuthorMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(LoginFrom).unwrap().then((data) => {
            setToken(data.token);
            navigate('/');
        }).catch((error) => {
            toast.error(error.data?.message || error.data?.error || 'Error logging in');
        });
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            <div id="AuthContainer" className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900">Author Login</h1>
                    </div>

                    <div className="space-y-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700">Email
                                    <span className='text-red-600'> *</span>
                                </label>
                                <input
                                    value={LoginFrom.email}
                                    onChange={handlechange}
                                    type="email" id="email"
                                    name="email"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700">Password
                                    <span className='text-red-600'> *</span>
                                </label>
                                <div className="relative">
                                    <input
                                        value={LoginFrom.password}
                                        onChange={handlechange}
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        minLength={5}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-600 focus:outline-none"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        name="remember"
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                    <label
                                        htmlFor="remember" className="ml-2 text-sm text-gray-700">Remember me</label>
                                </div>
                                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Forgot password?</a>
                            </div>

                            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Log in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthorLogin
