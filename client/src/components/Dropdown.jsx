import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ resData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown relative text-left" ref={dropdownRef}>
            <button
                type="button"
                onClick={toggleDropdown}
            >
                <img src="https://avatar.iran.liara.run/public" alt="User Avatar" className="rounded-full border bg-gray-600 object-cover w-10 h-10" />
            </button>
            {isOpen && (
                <div id="dropdownInformation" className=" z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute right-0 dark:divide-gray-600">
                    <div className="px-4 py-3 text-sm text-gray-900 break-words dark:text-white">
                        <div className="font-medium truncate">{resData.email}</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                        <li>
                            <Link to={'/dashboard'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                        </li>
                        <li>
                            <Link to={''} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Theme</Link>
                        </li>
                    </ul>
                    <div className="py-2">
                        <Link onClick={async () => {
                            const ask = confirm("Are you sure you want to logout?")
                            if (ask) {
                                await fetch('http://localhost:3000/user/logout',
                                    {
                                        method: "GET",
                                        credentials: 'include',
                                    }
                                )
                                window.location.href = '/'
                            }
                        }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log out</Link>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Dropdown;
