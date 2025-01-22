import React, { useState, useEffect } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';

const MyProfile = () => {
    const [resData, setResData] = useState(null)
    // console.log("MyProfile", resData)
    const getData = async () => {
        const data = await fetch('http://localhost:3000/user',
            {
                method: "GET",
                credentials: 'include',
            }
        )
        const res = await data.json()
        setResData(res)
        // console.log(res)

    }
    useEffect(() => {
        getData()
    }, [])

    const [profile, setProfile] = useState({
        name: `${resData ? resData.name.firstname : "doing"}`,
        email: "aquaguardians@example.com",
        phone: "123-456-7890",
        username: "aqua",
        address: "123 Main Street, City, Country",
        gender: "Male",
    });

    // resData && console.log("after sts", resData.email)
    const [editField, setEditField] = useState(false);

    const handleEdit = (field) => {
        setEditField(field);
    };

    const handleChange = (e, field) => {
        setProfile({ ...profile, [field]: e.target.value });
    };

    const handleSave = () => {
        setEditField(null);
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            {resData &&
                <div className="p-6 w-full  min-h-[507.2px] flex justify-center items-center">
                    <div className="border border-gray-200 shadow-lg transition duration-300 flex justify-center p-6 w-3/4 rounded-xl">
                        <div className="border-r w-3/5">
                            <h2 className="text-2xl font-bold mb-6">User Profile</h2>
                            <div className="flex flex-wrap items-start gap-8">
                                {/* Horizontally Aligned Fields */}
                                <div className="flex flex-col gap-4">
                                    {/* Name Field */}
                                    <div className="flex items-center gap-2">
                                        <label className="font-medium text-gray-700">Name:</label>
                                        {editField ? (
                                            <input
                                                type="text"
                                                value={profile.name}
                                                onChange={(e) => handleChange(e, "name")}
                                                className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        ) : (
                                            <span className="text-gray-800">{profile.name}</span>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div className="flex items-center gap-2">
                                        <label className="font-medium text-gray-700">Email:</label>
                                        {editField ? (
                                            <input
                                                type="email"
                                                value={resData.email}
                                                onChange={(e) => handleChange(e, "email")}
                                                className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        ) : (
                                            <span className="text-gray-800">{resData.email}</span>
                                        )}
                                    </div>

                                    {/* Phone Field */}
                                    <div className="flex items-center gap-2">
                                        <label className="font-medium text-gray-700">Phone:</label>
                                        {editField ? (
                                            <input
                                                type="tel"
                                                value={profile.phone}
                                                onChange={(e) => handleChange(e, "phone")}
                                                className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        ) : (
                                            <span className="text-gray-800">{profile.phone}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <label className="font-medium text-gray-700">Address:</label>
                                        {editField ? (
                                            <input
                                                value={profile.address}
                                                onChange={(e) => handleChange(e, "address")}
                                                className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        ) : (
                                            <span className="text-gray-800">{profile.address}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <label className="font-medium text-gray-700">Gender:</label>
                                        {editField ? (
                                            <select
                                                value={profile.gender}
                                                onChange={(e) => handleChange(e, "gender")}
                                                className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        ) : (
                                            <span className="text-gray-800">{profile.gender}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" flex flex-col items-center justify-center gap-2 mb-8 w-2/5">
                            <div className="w-16 h-16 rounded-full ml-3 border overflow-hidden bg-gray-600">
                                <img src="https://avatar.iran.liara.run/public" alt="User Avatar" className="w-full h-full object-cover" />
                            </div>
                            <div className="ml-4  text-black w-3/4 flex flex-col gap-7">
                                <h3 className="text-center">Username</h3>
                                <div className="flex justify-around">
                                    <button className="flex-1 max-w-[5vw] bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition duration-300" onClick={() => handleEdit(true)}>
                                        Edit
                                    </button>

                                    <button className="flex-1 max-w-[5vw] bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition duration-300" disabled={!editField} onClick={() => {
                                        handleEdit(false);
                                        toast.success('Search button working!', {
                                            position: "top-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: false,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "dark",
                                            transition: Bounce,
                                        });
                                    }
                                    }>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    );
};

export default MyProfile;
