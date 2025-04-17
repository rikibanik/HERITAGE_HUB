import React, { useState, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Search = () => {
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

    // Monitor theme changes
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    const loadOptions = (inputValue) => {
        return fetch(
            `${import.meta.env.VITE_HOST}/venue/get-entries?name=${inputValue}`
        )
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.map((museum) => ({
                        label: (
                            <div className="flex items-center">
                                <img
                                    src={museum.imgLink}
                                    alt={museum.name}
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                                <div className="flex flex-col items-start text-start">
                                    <div className="font-bold">{museum.name}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-300">
                                        {museum.location.address}
                                    </div>
                                </div>
                            </div>
                        ),
                        details: museum,
                    })),
                };
            });
    };

    const handleOnChange = async (searchData) => {
        if (searchData && searchData.details) {
            const { _id, name } = searchData.details;
            navigate(`/museum?name=${encodeURIComponent(name)}&id=${encodeURIComponent(_id)}`);
        }
    };

    // Styles object that updates based on isDark
    const customStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: '16px',
            backgroundColor: isDark ? '#111827' : '#f9fafb',
            color: isDark ? '#e5e7eb' : '#000',
            borderColor: isDark ? '#374151' : '#d1d5db',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
                borderColor: isDark ? '#818cf8' : '#4f46e5',
                cursor: 'text',
            },
        }),
        menuList: (provided) => ({
            ...provided,
            maxHeight: 190,
            backgroundColor: isDark ? '#1f2937' : '#fff',
            color: isDark ? '#e5e7eb' : '#000',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
                display: 'none',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
            backgroundColor: state.isFocused
                ? isDark
                    ? '#374151'
                    : '#f3f4f6'
                : 'transparent',
            color: isDark ? '#e5e7eb' : '#000',
        }),
    };

    return (
        <AsyncPaginate
            placeholder={
                <div className="flex items-center justify-center text-gray-500 dark:text-gray-300 my-2">
                    <FaSearch className="mr-2" />
                    Search for city
                </div>
            }
            debounceTimeout={300}
            value={""}
            onChange={handleOnChange}
            loadOptions={loadOptions}
            styles={customStyles}
        />
    );
};

export default Search;