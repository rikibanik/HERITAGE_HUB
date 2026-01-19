import { useRef } from 'react'
import Search from './Search'

const defaultMuseums = [
    { _id: '1', name: 'Museum' },
    { _id: '2', name: 'Victoria Memorial' },
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
            <section className="relative pt-32 pb-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="text-center">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 animate-fade-in drop-shadow-lg">
                            Book Your Next <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">Adventure</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow">
                            Discover and book tickets for the most exciting heritage sites and museums
                        </p>

                        {/* Search Box */}
                        <div className="max-w-2xl mx-auto rounded-2xl shadow-2xl mb-12 transform hover:scale-105 transition-transform duration-300">
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

                {/* Wave divider */}
                <div className="absolute bottom-0 left-0 w-full">
                    <svg className="w-full h-20 text-gray-50 dark:text-gray-900" preserveAspectRatio="none" viewBox="0 0 1440 120">
                        <path fill="currentColor" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,112C960,117,1056,107,1152,101.3C1248,96,1344,96,1392,96L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
                    </svg>
                </div>
            </section>
        </>
    )
}

export default Events
