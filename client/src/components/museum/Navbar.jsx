import React from 'react'

const Navbar = () => {
    return (
        <nav id="Navbar" className="fixed w-full bg-neutral-900 text-white z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <h1 className="text-xl font-bold">Sarnath Museum</h1>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a href="#Hero" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                            <a href="#About" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">About</a>
                            <a href="#Collections" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Collections</a>
                            <a href="#VisitingInfo" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Visit</a>
                            <a href="#BookingForm" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Book Tickets</a>
                            <a href="#Gallery" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Gallery</a>
                            <a href="#Contact" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                        </div>
                    </div>
                    <div className="md:hidden">
                        <button id="mobile-menu-button" className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-neutral-700 focus:outline-none">
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path className="block" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div id="mobile-menu" className="hidden md:hidden bg-neutral-900">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a href="#Hero" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                    <a href="#About" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">About</a>
                    <a href="#Collections" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Collections</a>
                    <a href="#VisitingInfo" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Visit</a>
                    <a href="#BookingForm" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Book Tickets</a>
                    <a href="#Gallery" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Gallery</a>
                    <a href="#Contact" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
