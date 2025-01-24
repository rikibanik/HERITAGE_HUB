import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify';


const Register = () => {
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
                throw new Error('Registration failed!');
            }
            const data = await response.json();
            // console.log('ResponseRegister:', data);
            if (data.result.error) {
                toast.error('User already exists!', {
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
                return;
            }
            window.location.href = "/"

        } catch (error) {
            console.error(error);
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
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900">Welcome To Heritage Hub</h1>
                        <p className="text-gray-600">Create a new account</p>
                    </div>

                    <div className="space-y-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
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

                            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Register
                            </button>
                        </form>
                    </div>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?
                        <Link to='/login'>
                            <button className="ml-1 font-medium text-blue-600 hover:text-blue-800">Log in</button>
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )

}

export default Register
