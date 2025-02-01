import React from 'react'
import { Link } from 'react-router-dom'

const LogoutBooking = () => {
    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-neutral-900 blur-md">
            <div className="text-center mb-16 ">
                <h2 className="text-3xl font-bold text-white mb-4">Book Your Visit</h2>
                <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
            </div>
            <div className='flex justify-center items-center'>
                <Link to='/login'>
                    <button className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Login
                    </button>
                </Link>
            </div>
        </div>

    )
}

export default LogoutBooking
