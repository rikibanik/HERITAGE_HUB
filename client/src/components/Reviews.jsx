import React from 'react'

const Reviews = () => {
    return (
        <section id="reviews" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
                    <p className="text-lg text-gray-600">Trusted by thousands of event-goers worldwide</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
                    <div className="flex items-center space-x-2">
                        <div className="text-yellow-400 flex">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">4.8</span>
                        <span className="text-gray-600">(2,345 reviews)</span>
                    </div>
                    <div className="flex space-x-4">
                        <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                            <i className="fas fa-check-circle mr-2"></i>
                            Verified Purchases
                        </span>
                        <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                            <i className="fas fa-shield-alt mr-2"></i>
                            Secure Booking
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition duration-300">
                        <div className="flex items-center mb-4">
                            <img src="https://avatar.iran.liara.run/public" alt="Reviewer" className="w-12 h-12 rounded-full" />
                            <div className="ml-4">
                                <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                                <div className="text-yellow-400 flex">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4">"Amazing experience! The booking process was seamless, and the customer service was exceptional. Will definitely use again!"</p>
                        <div className="text-sm text-gray-500">
                            <span className="mr-4"><i className="fas fa-ticket-alt mr-1"></i>Music Festival</span>
                            <span><i className="fas fa-calendar-alt mr-1"></i>2 days ago</span>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition duration-300">
                        <div className="flex items-center mb-4">
                            <img src="https://avatar.iran.liara.run/public" alt="Reviewer" className="w-12 h-12 rounded-full" />
                            <div className="ml-4">
                                <h4 className="font-semibold text-gray-900">Michael Brown</h4>
                                <div className="text-yellow-400 flex">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4">"Got my tickets instantly and the mobile app made it super easy to access them at the venue. Great service!"</p>
                        <div className="text-sm text-gray-500">
                            <span className="mr-4"><i className="fas fa-ticket-alt mr-1"></i>Sports Event</span>
                            <span><i className="fas fa-calendar-alt mr-1"></i>1 week ago</span>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition duration-300">
                        <div className="flex items-center mb-4">
                            <img src="https://avatar.iran.liara.run/public" alt="Reviewer" className="w-12 h-12 rounded-full" />
                            <div className="ml-4">
                                <h4 className="font-semibold text-gray-900">Emily Wilson</h4>
                                <div className="text-yellow-400 flex">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4">"The best ticket booking platform I've used. Love the seat selection feature and instant confirmation!"</p>
                        <div className="text-sm text-gray-500">
                            <span className="mr-4"><i className="fas fa-ticket-alt mr-1"></i>Theater Show</span>
                            <span><i className="fas fa-calendar-alt mr-1"></i>2 weeks ago</span>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg transition duration-300 inline-flex items-center">
                        <i className="fas fa-pencil-alt mr-2"></i>
                        Write a Review
                    </button>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-8 mt-16">
                    <div className="text-center">
                        <i className="fas fa-lock text-3xl text-gray-400 mb-2"></i>
                        <p className="text-sm text-gray-600">Secure Payment</p>
                    </div>
                    <div className="text-center">
                        <i className="fas fa-headset text-3xl text-gray-400 mb-2"></i>
                        <p className="text-sm text-gray-600">24/7 Support</p>
                    </div>
                    <div className="text-center">
                        <i className="fas fa-undo text-3xl text-gray-400 mb-2"></i>
                        <p className="text-sm text-gray-600">Easy Refunds</p>
                    </div>
                    <div className="text-center">
                        <i className="fas fa-shield-alt text-3xl text-gray-400 mb-2"></i>
                        <p className="text-sm text-gray-600">Verified Events</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Reviews
