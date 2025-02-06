import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FcGoogle, FcTreeStructure } from 'react-icons/fc';

const Register = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_HOST}/user/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(registerForm),
            });
            const data = await response.json();
            if (!response.ok) {
                if (data.errors) {
                    toast.error('User with this email already exists!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                }
                throw new Error("Registration failed!");
            }
            // console.log('ResponseRegister:', data);
            navigate('/')

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
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
                <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-xl shadow-lg">
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900">Welcome To Heritage Hub</h1>
                        <p className="text-gray-600">Create a new account</p>
                    </div>

                    <div className="space-y-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex gap-2">
                                <div>
                                    <label
                                        htmlFor="firstname"
                                        className="block text-sm font-medium text-gray-700">First Name
                                        <span className='text-red-600'> *</span>
                                    </label>
                                    <input
                                        value={registerForm.name.firstname}
                                        onChange={handlechange} type="firstname"
                                        id="firstname"
                                        name="firstname"
                                        minLength={3}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required />
                                </div>
                                <div>
                                    <label
                                        htmlFor="lastname"
                                        className="block text-sm font-medium text-gray-700">Last Name
                                        <span className='text-red-600'> *</span>
                                    </label>
                                    <input
                                        value={registerForm.name.lastname}
                                        onChange={handlechange} type="lastname"
                                        id="lastname"
                                        name="lastname"
                                        minLength={3}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700">Email
                                    <span className='text-red-600'> *</span>
                                </label>
                                <input
                                    value={registerForm.email}
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
                                <input
                                    value={registerForm.password}
                                    onChange={handlechange}
                                    type="password"
                                    id="password"
                                    name="password"
                                    minLength={5}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        ame="remember"
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                    <label
                                        htmlFor="remember"
                                        className="ml-2 text-sm text-gray-700">Remember me</label>
                                </div>
                            </div>

                            <button type="submit" disabled={loading} className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex justify-center items-center">
                                {loading ?
                                    <>
                                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"
                                            ></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"
                                            ></path>
                                        </svg>
                                        Creating account...
                                    </> :
                                    "Register"
                                }

                            </button>
                        </form>
                    </div>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?
                        <Link to='/login'>
                            <button className="ml-1 font-medium text-blue-600 hover:text-blue-800">Log in</button>
                        </Link>
                    </p>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    <button className="flex items-center justify-center w-full max-w-sm py-2 text-lg font-medium text-gray-700 bg-white border border-gray-300 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition rounded-full">
                        <FcGoogle className="text-2xl mr-3" />
                        Sign in with Google
                    </button>
                </div>
            </div>
        </>
    )

}

export default Register
