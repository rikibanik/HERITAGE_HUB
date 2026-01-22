import React, { useState, useEffect, useContext } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Loading from "./Loading";
import PopUp from "../../logoutpopup/PopUp";
import { useGetUserQuery } from "../../auth/authApi";

const MyProfile = () => {
    const { data: resData, isLoading: loading, isSuccess } = useGetUserQuery();
    const [editField, setEditField] = useState(false);
    const [profile, setProfile] = useState({
        name: {
            firstname: null,
            lastname: null,
        },
    });

    const handleChange = (e, field) => {
        setProfile({ ...profile, name: { ...profile.name, [field]: e.target.value } });
    };


    useEffect(() => {
        if (resData && isSuccess) {
            setProfile({
                name: {
                    firstname: resData.name.firstname,
                    lastname: resData.name.lastname,
                },
            });
        }
    }, [resData, isSuccess]);

    const handleSave = () => {
        const fname = profile.name.firstname;
        const lname = profile.name.lastname;
        if (fname.length < 3 || lname.length < 3) {
            toast.error(`${fname.length < 3 ? "First Name" : "Last Name"} must be at least 3 characters long`);
            return;
        }
        if (fname === resData.name.firstname && lname === resData.name.lastname) {
        }
        setEditField(false)
        // toast.success('Data saved successfully!');
    }

    return (       
        <div className="flex-1 p-6 bg-white dark:bg-gray-900 transition duration-300 overflow-y-auto">
            {resData && resData.email ?
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl dark:shadow-2xl dark:shadow-black/50 overflow-hidden max-w-4xl">
                    {/* Header with gradient background */}
                    <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 dark:from-indigo-900 dark:via-indigo-800 dark:to-purple-900 px-8 py-6">
                        <div className="flex flex-col items-center gap-3">
                            <div className="relative">
                                <img 
                                    src='/avatar.svg' 
                                    alt="User Avatar" 
                                    className="w-20 h-20 rounded-full border-4 border-white dark:border-indigo-300 overflow-hidden bg-gray-600 dark:bg-gray-700 object-cover shadow-lg"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-white mb-1">{resData.name.firstname} {resData.name.lastname}</h3>
                                <p className="text-indigo-100 text-xs">{resData.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="px-8 py-6">
                        {/* User Details */}
                        <div className="mb-6">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <i className="fas fa-user-circle text-indigo-600 dark:text-indigo-400"></i>
                                Profile Information
                            </h4>
                            
                            {editField ? (
                                <div className="space-y-4">
                                    {/* First Name Field */}
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            <i className="fas fa-signature mr-2 text-indigo-600 dark:text-indigo-400"></i>
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            value={profile.name.firstname}
                                            onChange={(e) => handleChange(e, "firstname")}
                                            className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition duration-300 placeholder-gray-400"
                                            placeholder="Enter first name"
                                        />
                                    </div>

                                    {/* Last Name Field */}
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            <i className="fas fa-signature mr-2 text-indigo-600 dark:text-indigo-400"></i>
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            value={profile.name.lastname}
                                            onChange={(e) => handleChange(e, "lastname")}
                                            className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition duration-300 placeholder-gray-400"
                                            placeholder="Enter last name"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {/* Name Display */}
                                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-700/50">
                                        <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Full Name</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">{resData.name.firstname} {resData.name.lastname}</p>
                                    </div>

                                    {/* Email Display */}
                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-700 p-4 rounded-2xl border border-blue-200 dark:border-blue-700/50">
                                        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Email Address</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white break-all">{resData.email}</p>
                                    </div>

                                    {/* Phone Display */}
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-700 p-4 rounded-2xl border border-green-200 dark:border-green-700/50">
                                        <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">Phone Number</p>
                                        <p className="text-base font-bold text-gray-900 dark:text-white">0123456789</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Buttons Section */}
                        <div className="flex gap-3 flex-wrap justify-center pt-4 border-t border-gray-200 dark:border-gray-700">
                            {!editField ? (
                                <>
                                    <button 
                                        className="flex-1 min-w-fit px-6 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                                        onClick={() => setEditField(true)}
                                    >
                                        <i className="fas fa-edit"></i>
                                        Edit Profile
                                    </button>
                                    <div className="flex-1 min-w-fit">
                                        <PopUp type={"MyPrfLgt"} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <button 
                                        className="flex-1 min-w-fit px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                                        onClick={handleSave}
                                    >
                                        <i className="fas fa-save"></i>
                                        Save Changes
                                    </button>
                                    <button 
                                        onClick={() => setEditField(false)} 
                                        className="flex-1 min-w-fit px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold text-sm rounded-xl transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                                    >
                                        <i className="fas fa-times"></i>
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                : <Loading type="spinningBubbles" color="blue" />
            }
        </div>
    );
};

export default MyProfile;
