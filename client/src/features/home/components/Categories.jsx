const Categories = () => {
    const categories = [
        {
            id: 1,
            name: 'Museums',
            icon: 'fa-archway',
            count: '100+ Events',
            bgColor: 'bg-indigo-50 dark:bg-indigo-900',
            hoverColor: 'hover:bg-indigo-100 dark:hover:bg-indigo-800',
            iconBg: 'bg-indigo-100 dark:bg-indigo-800',
            hoverIconBg: 'group-hover:bg-indigo-200 dark:group-hover:bg-indigo-700',
            iconColor: 'text-indigo-600 dark:text-indigo-300'
        },
        {
            id: 2,
            name: 'Monuments',
            icon: 'fa-monument',
            count: '50+ Events',
            bgColor: 'bg-purple-50 dark:bg-purple-900',
            hoverColor: 'hover:bg-purple-100 dark:hover:bg-purple-800',
            iconBg: 'bg-purple-100 dark:bg-purple-800',
            hoverIconBg: 'group-hover:bg-purple-200 dark:group-hover:bg-purple-700',
            iconColor: 'text-purple-600 dark:text-purple-300'
        },
        {
            id: 3,
            name: 'Urban Attractions',
            icon: 'fa-city',
            count: '100+ Events',
            bgColor: 'bg-green-50 dark:bg-green-900',
            hoverColor: 'hover:bg-green-100 dark:hover:bg-green-800',
            iconBg: 'bg-green-100 dark:bg-green-800',
            hoverIconBg: 'group-hover:bg-green-200 dark:group-hover:bg-green-700',
            iconColor: 'text-green-600 dark:text-green-300'
        }
    ];

    return (
        <section id="categories" className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-white">Browse by Category</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">Find adventures that match your interests</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {categories.map(category => (
                        <div key={category.id} className={`group ${category.bgColor} rounded-xl p-6 text-center ${category.hoverColor} transition-all duration-300 cursor-pointer relative`}>
                            <span className="absolute top-2 right-2 bg-transparent text-red-300 text-xs font-bold px-2 py-1 rounded">Coming Soon...</span>
                            <div className={`w-16 h-16 mx-auto ${category.iconBg} rounded-full flex items-center justify-center ${category.hoverIconBg} mb-4`}>
                                <i className={`fas ${category.icon} text-2xl ${category.iconColor}`}></i>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{category.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{category.count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Categories
