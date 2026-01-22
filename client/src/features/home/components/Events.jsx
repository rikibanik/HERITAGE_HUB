import React, { useRef } from 'react'
import Search from './Search'

const defaultMuseums = [
    { _id: '1', name: 'Museum' },
    { _id: '2', name: 'Safari' },
    { _id: '3', name: 'Hall' }
];

const Events = () => {
    const searchRef = useRef(null);

    const handleMuseumClick = (museum) => {
        if (searchRef.current) {
            searchRef.current.setMuseumQuery(museum.name);
        }
    };

    return (
        <>

            <section className="relative pt-32 pb-24 bg-gradient-to-r from-indigo-600 to-purple-600 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 animate-fade-in">
                            Book Your Next <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">Adventure</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                            Discover and book tickets for the most exciting adventure
                        </p>

                        {/* <!-- Search Box --> */}
                        <div className="max-w-xl mx-auto rounded-xl shadow-xl mb-8">
                            <Search ref={searchRef} />
                        </div>

                        {/* Suggested Museums */}
                        <div className="mb-8 flex gap-3 flex-wrap justify-center">
                            {defaultMuseums.map((museum, idx) => (
                                <button
                                    key={museum._id}
                                    onClick={() => handleMuseumClick(museum)}
                                    className="px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-full text-sm font-semibold hover:bg-opacity-40 transition-all duration-300 transform hover:scale-110 hover:shadow-lg border border-white border-opacity-30 animate-fade-in"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    {museum.name}
                                </button>
                            ))}
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                            <div className="p-6 rounded-xl bg-white bg-opacity-15 backdrop-blur-md border border-white border-opacity-20 text-white hover:bg-opacity-25 transition-all duration-300 transform hover:scale-105">
                                <i className="fas fa-city text-4xl mb-3 text-yellow-300 block"></i>
                                <h3 className="text-3xl font-bold mb-2">25+</h3>
                                <p className="text-sm opacity-90">Cities</p>
                            </div>
                            <div className="p-6 rounded-xl bg-white bg-opacity-15 backdrop-blur-md border border-white border-opacity-20 text-white hover:bg-opacity-25 transition-all duration-300 transform hover:scale-105">
                                <i className="fas fa-map-marker-alt text-4xl mb-3 text-orange-300 block"></i>
                                <h3 className="text-3xl font-bold mb-2">100+</h3>
                                <p className="text-sm opacity-90">Locations</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Decorative Elements --> */}
                <div className="absolute bottom-0 left-0 w-full">
                    <svg className="w-full h-16 text-gray-50 dark:text-gray-900" preserveAspectRatio="none" viewBox="0 0 1440 48">
                        <path fill="currentColor" d="M0 48h1440V0C1440 0 1080 48 720 48C360 48 0 0 0 0v48z"></path>
                    </svg>
                </div>
            </section>
        </>
    )
}

export default Events
