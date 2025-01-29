import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Link as ElementLink } from 'react-scroll'
import ProfileDropdown from './ProfileDropdown'
import Sidebar from './sidebar/Sidebar'
import { SidebarData } from './sidebar/SidebarData'

const Header = () => {

    const [resData, setResData] = useState(null)
    // console.log(resData)
    const getData = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_HOST}/user/data`,
                {
                    method: "GET",
                    credentials: 'include',
                }
            )
            if (!res.ok) {
                throw new Error('user not logged in!')
            }
            const data = await res.json()
            setResData(data)
            // setProfile({ ...profile, name: { ...profile.name, firstname: data.name.firstname, lastname: data.name.lastname } })
            // console.log(data)
        } catch (error) {
            console.error(error);
        }

    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <header id="header" className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-16">

                    {/* <!-- Mobile Navigation Menu --> */}
                    <div className="md:hidden">
                        <Sidebar />
                    </div>

                    <div className="flex-shrink-0 flex items-center flex-col">
                        <h1 className="text-2xl font-bold text-indigo-600">HeritageHub</h1>
                    </div>

                    {/* <!-- Desktop Navigation --> */}
                    <nav className="hidden md:flex space-x-8">
                        {SidebarData.map((items, index) => {
                            return (<ElementLink key={index} to={items.to} smooth={true} duration={500} className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer">{items.title}</ElementLink>)

                        })}
                    </nav>

                    {/* <!-- Right Side Icons --> */}
                    <div className="flex items-center space-x-4">
                        {resData && resData.email ?

                            <ProfileDropdown resData={resData} /> :

                            <div className='flex gap-4'>
                                <Link to='/register'>
                                    <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                        Register
                                    </button>
                                </Link>
                                <Link to='/login'>
                                    <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                        Login
                                    </button>
                                </Link>
                            </div>
                        }

                    </div>
                </div>


            </div>
        </header>

    )
}

export default Header
