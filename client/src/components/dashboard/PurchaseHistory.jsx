import React from 'react'

const PurchaseHistory = () => {
    return (
        <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold mb-6">My Upcoming Events/history</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg mb-1">Music Festival 2024</h3>
                                <p className="text-gray-600">VIP Access Pass</p>
                            </div>
                            <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Confirmed</span>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center">
                                <i className="fas fa-calendar-alt w-5"></i>
                                <span>25 Dec 2024, 7:00 PM</span>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-map-marker-alt w-5"></i>
                                <span>Central Park, New York</span>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-ticket-alt w-5"></i>
                                <span>Ticket #: 12345678</span>
                            </div>
                        </div>
                        <div className="mt-4 flex space-x-3">
                            <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
                                View Ticket
                            </button>
                            <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition duration-300">
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
                <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg mb-1">Tech Conference</h3>
                                <p className="text-gray-600">Regular Pass</p>
                            </div>
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">Pending</span>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center">
                                <i className="fas fa-calendar-alt w-5"></i>
                                <span>15 Jan 2024, 9:00 AM</span>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-map-marker-alt w-5"></i>
                                <span>Convention Center, LA</span>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-ticket-alt w-5"></i>
                                <span>Ticket #: 12345679</span>
                            </div>
                        </div>
                        <div className="mt-4 flex space-x-3">
                            <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
                                View Ticket
                            </button>
                            <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition duration-300">
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-indigo-50 rounded-xl p-6">
                    <h4 className="text-indigo-600 font-semibold mb-2">Total Tickets</h4>
                    <p className="text-3xl font-bold">12</p>
                </div>
                <div className="bg-green-50 rounded-xl p-6">
                    <h4 className="text-green-600 font-semibold mb-2">Upcoming Events</h4>
                    <p className="text-3xl font-bold">5</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-6">
                    <h4 className="text-purple-600 font-semibold mb-2">Reward Points</h4>
                    <p className="text-3xl font-bold">2,450</p>
                </div>
            </div>
        </div>
    )
}

export default PurchaseHistory
