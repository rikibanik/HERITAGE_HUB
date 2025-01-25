import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const navigate = useNavigate();

    const loadOptions = (inputValue) => {
        return fetch(
            `${import.meta.env.VITE_HOST}/venue/get-entries?name=${inputValue}`,
        )
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.map((museum) => {
                        return {
                            label: (
                                <div className="flex items-center">
                                    <img
                                        src={museum.imglink}
                                        alt={museum.name}
                                        className="w-8 h-8 rounded-full mr-2"
                                    />
                                    <div className="flex flex-col items-start text-start">
                                        <div className="font-bold">{museum.name}</div>
                                        <div className="text-sm text-gray-500">{museum.location.address}</div>
                                    </div>
                                </div>
                            ),
                            details: museum,
                        };
                    }),
                };
            });
    };

    const handleOnChange = async (searchData) => {
        if (searchData && searchData.details) {
            const { _id, name } = searchData.details; // Extracting id and name
            // Navigate to the target page with query parameters
            navigate(`/museum?name=${encodeURIComponent(name)}&id=${encodeURIComponent(_id)}`);
        }
    };

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={300}
            value={""}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
};

export default Search;
