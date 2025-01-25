import React from 'react'

const Booking = () => {
    const handleChange = ()=>{
        // console.log("changed");
    }
    return (
        <section id="BookingForm" className="py-20 bg-neutral-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate__animated animate__fadeIn">
                    <h2 className="text-3xl font-bold text-white mb-4">Book Your Visit</h2>
                    <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
                </div>

                <form id="visitorForm" className="bg-white rounded-lg shadow-xl p-8 animate__animated animate__fadeInUp">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-neutral-700 font-medium mb-2">Full Name</label>
                            <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent" />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-neutral-700 font-medium mb-2">Email Address</label>
                            <input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent" />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-neutral-700 font-medium mb-2">Phone Number</label>
                            <input type="tel" id="phone" name="phone" required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent" />
                        </div>

                        <div>
                            <label htmlFor="visit-date" className="block text-neutral-700 font-medium mb-2">Visit Date</label>
                            <input type="date" id="visit-date" name="visit-date" required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent" />
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Number of Visitors</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="indian-adults" className="block text-neutral-700 mb-2">Indian Adults (₹20)</label>
                                <input type="number" id="indian-adults" name="indian-adults" min="0" value={"0"} onChange={handleChange} className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent" />
                            </div>

                            <div>
                                <label htmlFor="indian-children" className="block text-neutral-700 mb-2">Indian Children (₹10)</label>
                                <input type="number" id="indian-children" name="indian-children" min="0" value={"0"} onChange={handleChange} className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent" />
                            </div>

                            <div>
                                <label htmlFor="foreign-adults" className="block text-neutral-700 mb-2">Foreign Adults (₹200)</label>
                                <input type="number" id="foreign-adults" name="foreign-adults" min="0" value={"0"} onChange={handleChange} className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent" />
                            </div>

                            <div>
                                <label htmlFor="foreign-children" className="block text-neutral-700 mb-2">Foreign Children (₹100)</label>
                                <input type="number" id="foreign-children" name="foreign-children" min="0" value={"0"} onChange={handleChange} className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                            Book Now
                        </button>
                    </div>
                </form>
            </div>

            <div id="confirmationModal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">Booking Confirmed!</h3>
                    <p className="text-neutral-600 mb-6">Thank you for booking your visit to Sarnath Museum. You will receive a confirmation email shortly.</p>
                    <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                        Close
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Booking
