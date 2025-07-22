import React from 'react'

const reviewsData = [
    {
        "heading": "Amit Sharma",
        "paragraph": "The Taj Mahal heritage walk was an unforgettable experience. Our guide was knowledgeable, and the history came alive!",
        "travelled": {
            "icon": "fa-landmark",
            "place": "Heritage Walk",
            "timing": "3 days ago",
        }
    },
    {
        "heading": "Priya Verma",
        "paragraph": "Exploring the Indian Museum was a deep dive into history. So many fascinating artifacts and well-preserved exhibits!",
        "travelled": {
            "icon": "fa-calendar-alt",
            "place": "Museum Tour",
            "timing": "1 week ago",
        }
    },
    {
        "heading": "Rahul Nair",
        "paragraph": "The Rajasthan Desert Safari was an adventure of a lifetime. The camel ride and starry night were just magical!",
        "travelled": {
            "icon": "fa-mountain",
            "place": "Desert Safari",
            "timing": "2 weeks ago",
        }
    },
]

const Reviews = () => {
    return (
        <section id="reviews" className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-white">Traveler Testimonials</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">Hear from adventurers who explored India's wonders</p>
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
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">4.5</span>
                        <span className="text-gray-600 dark:text-gray-300">(1,185 reviews)</span>
                    </div>
                    <div className="flex space-x-4">
                        <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                            <i className="fas fa-check-circle mr-2"></i>
                            Verified Travelers
                        </span>
                        <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                            <i className="fas fa-map-marker-alt mr-2"></i>
                            Authentic Experiences
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviewsData.map((data, index) => (
                        <div key={index} className="bg-white dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition duration-300">
                            <div className="flex items-center mb-4">
                                <img src="https://avatar.iran.liara.run/public" alt="Reviewer" className="w-12 h-12 rounded-full" />
                                <div className="ml-4">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">{data.heading}</h4>
                                    <div className="text-yellow-400 flex">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star-half-alt"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4 dark:text-gray-300">{data.paragraph}</p>
                            <div className="text-sm text-gray-500">
                                <span className="mr-4 dark:text-gray-300"><i className={`fas ${data.travelled.icon} mr-1`}></i>{data.travelled.place}</span>
                                <span className='dark:text-gray-300'><i className="fas dark:text-gray-300 fa-calendar-alt mr-1"></i>{data.travelled.timing}</span>
                            </div>
                        </div>
                    ))}

                </div>

                <div className="text-center mt-12">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg transition duration-300 inline-flex items-center">
                        <i className="fas fa-pencil-alt mr-2"></i>
                        Share Your Experience
                    </button>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-8 mt-16">
                    <div className="text-center">
                        <i className="fas fa-shield-alt text-3xl text-gray-400 mb-2"></i>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Authentic Reviews</p>
                    </div>
                    <div className="text-center">
                        <i className="fas fa-headset text-3xl text-gray-400 mb-2"></i>
                        <p className="text-sm text-gray-600 dark:text-gray-300">24/7 Support</p>
                    </div>
                    <div className="text-center">
                        <i className="fas fa-map-marked-alt text-3xl text-gray-400 mb-2"></i>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Expert Guides</p>
                    </div>
                    <div className="text-center">
                        <i className="fas fa-umbrella-beach text-3xl text-gray-400 mb-2"></i>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Unforgettable Journeys</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Reviews