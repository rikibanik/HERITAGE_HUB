import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MyProfile from './components/MyProfile'
import MyTickets from './components/MyTickets'
import PurchaseHistory from './components/PurchaseHistory'
import Loading from './components/Loading'
import { useNavigate } from 'react-router-dom'
import { useGetUserQuery } from '../auth/authApi'

const DashNav = [
  {
    active: "profile",
    icon: "fas fa-user",
    name: "My Profile"
  },
  {
    active: "tickets",
    icon: "fas fa-ticket-alt",
    name: "My Tickets"
  },
  {
    active: "history",
    icon: "fas fa-history",
    name: "Purchase History"
  },
]

const UserDashBoard = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('profile');
  const { data: resData } = useGetUserQuery();

  return (
    <>
      {resData && resData.email ?
        <section id="user-dashboard" className="py-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl dark:shadow-2xl dark:shadow-black/50 overflow-hidden">
              <div className="flex flex-col md:flex-row h-full">
                {/* Sidebar */}
                <div className="w-full md:w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-8">
                  {/* User Info */}
                  <div className="flex items-center justify-center md:justify-start mb-10">
                    <div className="relative flex-shrink-0">
                      <img src='/avatar.svg' alt="User Avatar" className="object-cover w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-indigo-400 to-purple-600 border-4 border-indigo-500 shadow-lg" />
                    </div>
                    <div className="ml-4 text-white md:block hidden min-w-0">
                      <p className="font-bold text-lg truncate">{resData.name.firstname}</p>
                      <p className="text-gray-400 text-sm break-words line-clamp-2">{resData.email}</p>
                    </div>
                  </div>

                  {/* Navigation */}
                  <nav className="space-y-3 mb-8">
                    {DashNav.map((items, index) => {
                      return (
                        <button
                          key={index}
                          onClick={() => setActiveComponent(items.active)}
                          className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl transition duration-300 ease-out font-medium ${activeComponent === items.active
                            ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/50"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                            }`}
                        >
                          <i className={`${items.icon} w-5 text-center`}></i>
                          <span>{items.name}</span>
                          {activeComponent === items.active && <i className="fas fa-arrow-right ml-auto text-indigo-300"></i>}
                        </button>
                      )
                    })}
                  </nav>

                  {/* Back Button */}
                  <div className="border-t border-gray-700 pt-6">
                    <button
                      onClick={() => navigate(-1)}
                      className="w-full flex items-center gap-4 text-gray-300 hover:text-white px-5 py-3 rounded-xl transition duration-300 hover:bg-gray-700/50 font-medium"
                    >
                      <i className="fas fa-arrow-left w-5 text-center"></i>
                      <span>Back To Home</span>
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-y-auto">
                  {
                    (() => {
                      switch (activeComponent) {
                        case 'history':
                          return <PurchaseHistory />;
                        case 'profile':
                          return <MyProfile />;
                        case 'tickets':
                          return <MyTickets />;
                        default:
                          return <MyProfile />;
                      }
                    })()
                  }
                </div>
              </div>
            </div>
          </div>
        </section> :
        <div className='w-[100vw] h-[100vh] flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
          <Loading type="spinningBubbles" color="blue" />
        </div>
      }
    </>
  )
}

export default UserDashBoard
