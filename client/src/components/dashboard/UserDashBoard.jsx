import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import MyProfile from './MyProfile'
import MyTickets from './MyTickets'
import PurchaseHistory from './PurchaseHistory'

const UserDashBoard = () => {
  const [activeComponent, setActiveComponent] = useState('profile'); // Default to 'MyProfile'

  return (
    <section id="user-dashboard" className="py-16 bg-gray-100 h-[100vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-64 bg-gray-800 p-6">
              <div className="flex items-center justify-center md:justify-start mb-8">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-600">
                  <img src="https://avatar.iran.liara.run/public" alt="User Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="ml-4 text-white w-1/2">
                  <h3 className="font-bold">aquaguardians</h3>
                  <p className="text-gray-400 text-sm break-words">aquaguardians@gmail.com</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button onClick={() => setActiveComponent('profile')} className={`flex items-center text-white ${activeComponent === 'profile' && "bg-gray-700"} hover:bg-gray-700 px-4 py-2 rounded-lg gap-2`}>
                  <i className="fas fa-user text-xl w-6 flex justify-center items-center"></i>
                  <span>My Profile</span>
                </button>
                <button onClick={() => setActiveComponent('tickets')} className={`flex items-center text-white ${activeComponent === 'tickets' && "bg-gray-600"} hover:bg-gray-600 px-4 py-2 rounded-lg gap-2`}>
                  <i className="fas fa-ticket-alt w-6 flex justify-center items-center"></i>
                  <span>My Tickets</span>
                </button>
                <button onClick={() => setActiveComponent('history')} className={`flex items-center text-gray-300 ${activeComponent === 'history' && "bg-gray-600"} hover:bg-gray-600 px-4 py-2 rounded-lg transition duration-300 gap-2`}>
                  <i className="fas fa-history w-6 flex justify-center items-center"></i>
                  <span>Purchase History</span>
                </button>
                <RouterLink to="/" className="flex items-center text-gray-300 hover:bg-gray-600 px-4 py-2 rounded-lg transition duration-300 gap-2">
                  <i className="fas fa-home w-6 flex justify-center items-center"></i>
                  <span>Back To Home</span>
                </RouterLink>
              </nav>
            </div>
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
    </section>
  )
}

export default UserDashBoard
