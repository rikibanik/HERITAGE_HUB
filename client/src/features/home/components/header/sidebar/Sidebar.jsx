import React, { useRef, useState, useEffect } from "react";

// ICONS
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { SidebarData } from "./SidebarData";

import { Link } from 'react-scroll'

export default function Sidebar() {

    const [sidebar, setSidebar] = useState(false);
    const dropdownRef = useRef(null)
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setSidebar(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <IconContext.Provider value={{ size: 20 }}>
            <FaIcons.FaBars
                size={22}
                className="text-gray-900 dark:text-gray-100 cursor-pointer hover:scale-110 transition-transform"
                onClick={showSidebar}
            />

            {sidebar && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-40 lg:hidden"
                    onClick={() => setSidebar(false)}
                />
            )}

            <nav
                ref={dropdownRef}
                className={`fixed top-0 left-0 h-screen w-64 transform transition-transform duration-300 z-50 bg-white dark:bg-gray-900 shadow-2xl ${sidebar ? "translate-x-0" : "-translate-x-full"}`}
            >
                <ul className="flex flex-col h-full py-6 space-y-2">
                    <li className="flex items-center justify-between px-6">
                        <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">HeritageHub</h3>
                        <AiIcons.AiOutlineClose
                            className="cursor-pointer text-gray-700 dark:text-gray-300 hover:scale-110 transition-transform"
                            size={20}
                            onClick={showSidebar}
                        />
                    </li>

                    {SidebarData.map((item, index) => (
                        <li key={index} className="px-2">
                            <Link
                                to={item.to}
                                smooth={true}
                                duration={500}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                                onClick={() => setSidebar(false)}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span className="text-base font-medium">{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </IconContext.Provider>
    );
}
