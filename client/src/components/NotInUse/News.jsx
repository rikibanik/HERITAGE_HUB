import React from 'react'

const News = () => {
  return (
    <section id="newsletter" className="py-16 bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative bg-white rounded-2xl p-8 md:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8">
            <div className="text-indigo-100 opacity-20 transform rotate-45">
              <i className="fas fa-ticket-alt text-9xl"></i>
            </div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Never Miss an Event</h2>
              <p className="text-lg text-gray-600 mb-6">Subscribe to our newsletter and get exclusive deals, early access to ticket sales, and updates about upcoming events in your area.</p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-check-circle text-green-500"></i>
                  <span className="text-gray-600">Exclusive Offers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-check-circle text-green-500"></i>
                  <span className="text-gray-600">Early Bird Access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-check-circle text-green-500"></i>
                  <span className="text-gray-600">Event Updates</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto">
              <form className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent">
                    <option value="">Select your interests</option>
                    <option value="music">Music Events</option>
                    <option value="sports">Sports Events</option>
                    <option value="theater">Theater Shows</option>
                    <option value="comedy">Comedy Shows</option>
                  </select>
                  <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
                    Subscribe Now
                  </button>
                </div>
              </form>
              <p className="text-sm text-gray-500 mt-4 text-center md:text-left">
                <i className="fas fa-shield-alt mr-2"></i>
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="text-4xl text-indigo-600">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Get Our Mobile App</h3>
                  <p className="text-gray-600">Book tickets on the go!</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-300">
                  <i className="fab fa-apple text-2xl"></i>
                  <span>App Store</span>
                </button>
                <button className="flex items-center space-x-2 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-300">
                  <i className="fab fa-google-play text-2xl"></i>
                  <span>Play Store</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default News
