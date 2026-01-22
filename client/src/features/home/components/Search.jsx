import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { useGetMuseumEntriesQuery } from "../homeApi";

const Search = forwardRef((props, ref) => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchContainerRef = useRef(null);
    const inputRef = useRef(null);

    // Expose methods to parent component via ref
    useImperativeHandle(ref, () => ({
        setMuseumQuery: (museumName) => {
            setInputValue(museumName);
            setDebouncedValue(museumName);
            setShowSuggestions(true);
            inputRef.current?.focus();
        }
    }));

    // Monitor theme changes
    useEffect(() => {
        const observer = new MutationObserver(() => {
            // Theme observer for Tailwind dark mode
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue]);

    const { data: museums, isLoading } = useGetMuseumEntriesQuery(debouncedValue, {
        skip: !debouncedValue,
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOnChange = (searchData) => {
        if (searchData && searchData._id) {
            const { _id } = searchData;
            navigate(`/museum/${encodeURIComponent(_id)}`);
            setInputValue("");
            setShowSuggestions(false);
        }
    };



    return (
        <>
        <div className="relative w-full" ref={searchContainerRef}>
            <div className="relative flex items-center">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <FaSearch className="text-gray-500 dark:text-gray-300" />
                </span>
                <input
                    ref={inputRef}
                    placeholder="Search for city"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    className="w-full py-3 pl-12 pr-10 rounded-2xl shadow-lg focus:outline-none focus:ring-2 transition-colors duration-200 cursor-text bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500/50 dark:focus:ring-indigo-600/50 placeholder-gray-400 dark:placeholder-gray-500"
                />
                {isLoading && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <FaSpinner className="animate-spin text-gray-500 dark:text-gray-300" />
                    </span>
                )}
            </div>

            {showSuggestions && inputValue.length > 0 && (
                <ul className="absolute z-10 w-full mt-2 overflow-y-auto rounded-lg shadow-xl max-h-48 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-white dark:bg-gray-800">
                    {museums && !isLoading && (
                        museums.length > 0 ? (
                            museums.map((museum) => (
                                <li
                                    key={museum._id}
                                    onClick={() => handleOnChange(museum)}
                                    className="cursor-pointer p-3 transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <div className="flex items-center">
                                        <img
                                            src={museum.imgLink}
                                            alt={museum.name}
                                            className="w-8 h-8 rounded-full mr-3"
                                        />
                                        <div className="flex flex-col items-start text-start">
                                            <div className="font-bold text-gray-900 dark:text-gray-100">{museum.name}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {museum.location.address}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-3 text-gray-500 dark:text-gray-400">No results found.</li>
                        )
                    )}
                </ul>
            )}

           
        </div>
        </>
    );
});

Search.displayName = 'Search';
export default Search;