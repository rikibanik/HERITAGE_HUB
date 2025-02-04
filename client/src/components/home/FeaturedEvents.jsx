import React from 'react'

const FeaturedEvents = () => {
  return (
    <section id="featured-events" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Events</h2>
          <p className="text-lg text-gray-600">Discover the hottest upcoming events</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 bg-gray-300"></div>
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                HOT
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <i className="fas fa-calendar-alt text-indigo-600 mr-2"></i>
                <span className="text-gray-600">25 Dec 2024</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">New Year Music Festival</h3>
              <div className="flex items-center mb-4">
                <i className="fas fa-map-marker-alt text-indigo-600 mr-2"></i>
                <span className="text-gray-600">Central Park, New York</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-indigo-600">$99</span>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-300">
                  Book Now
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 bg-gray-300"></div>
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                NEW
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <i className="fas fa-calendar-alt text-indigo-600 mr-2"></i>
                <span className="text-gray-600">15 Jan 2024</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tech Conference 2024</h3>
              <div className="flex items-center mb-4">
                <i className="fas fa-map-marker-alt text-indigo-600 mr-2"></i>
                <span className="text-gray-600">Convention Center, LA</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-indigo-600">$149</span>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-300">
                  Book Now
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 bg-gray-300"></div>
              <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                TRENDING
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <i className="fas fa-calendar-alt text-indigo-600 mr-2"></i>
                <span className="text-gray-600">30 Jan 2024</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Food & Wine Festival</h3>
              <div className="flex items-center mb-4">
                <i className="fas fa-map-marker-alt text-indigo-600 mr-2"></i>
                <span className="text-gray-600">Waterfront, San Francisco</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-indigo-600">$79</span>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-300">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-600 hover:text-white px-8 py-3 rounded-lg transition duration-300 inline-flex items-center">
            View All Events
            <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedEvents
