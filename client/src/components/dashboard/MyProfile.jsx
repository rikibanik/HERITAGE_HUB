import React, { useState, useEffect } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import PopUp from "../popup/PopUp";
import { useSelector } from "react-redux";

const MyProfile = () => {
    const { resData, loading, error } = useSelector((state) => state.getUserData);

    const [editField, setEditField] = useState(false);
    const [profile, setProfile] = useState({
        name: {
            firstname: "",
            lastname: "",
        },
    });

    const handleChange = (e, field) => {
        setProfile({ ...profile, name: { ...profile.name, [field]: e.target.value } });
    };

    useEffect(() => {
        if (resData && resData.email) {
            setProfile({
                ...profile,
                name: {
                    firstname: resData.name.firstname,
                    lastname: resData.name.lastname,
                },
            });
        }
    }, [resData]);

    const handleSave = () => {
        const fname = profile.name.firstname;
        const lname = profile.name.lastname;
        if (fname.length < 3 || lname.length < 3) {
            toast.error(`${fname.length < 3 ? "First Name" : "Last Name"} must be at least 3 characters long`, {
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
            return;
        }
        if (fname === resData.name.firstname && lname === resData.name.lastname) {
            // No need to send a post request if there are no changes
            setEditField(false);
            return;
        }
        // Here you would handle saving logic (sending the updated data to the backend)
        setEditField(false);
        toast.success('Data saved successfully!', {
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
            <div className="w-full min-h-[507.2px] flex justify-center items-center">
                <div className="border border-gray-200 shadow-lg transition duration-300 flex flex-col items-center justify-center p-6 w-2/5 min-w-[225px] rounded-xl">
                    {/* Profile icon & username */}
                    <div className="flex flex-col items-center justify-center gap-2">
                        <img
                            src="https://avatar.iran.liara.run/public"
                            alt="User Avatar"
                            className="w-16 h-16 rounded-full border overflow-hidden bg-gray-600 object-cover"
                        />
                        <h3 className="text-center">username</h3>
                    </div>
                    {/* User details */}
                    <div className="my-6">
                        <div className="flex flex-wrap items-start gap-8">
                            {/* Horizontally Aligned Fields */}
                            <div className="flex flex-col gap-4">
                                {/* Name Field */}
                                {editField ? (
                                    <div className="flex flex-col gap-4">
                                        <div className="block">
                                            <label className="font-medium text-gray-700 mr-2 text-wrap">First Name:</label>
                                            <input
                                                type="text"
                                                value={profile.name.firstname}
                                                onChange={(e) => handleChange(e, "firstname")}
                                                className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-20"
                                            />
                                        </div>
                                        <div className="block">
                                            <label className="font-medium text-gray-700 mr-2 text-wrap">Last Name:</label>
                                            <input
                                                type="text"
                                                value={profile.name.lastname}
                                                onChange={(e) => handleChange(e, "lastname")}
                                                className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-20"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <span className="text-gray-800">Name: {resData.name.firstname + " " + resData.name.lastname}</span>
                                )}

                                {/* Email Field */}
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-800">Email: {resData.email}</span>
                                </div>

                                {/* Phone Field */}
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-800">Phone: 0123456789</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex gap-6 flex-wrap justify-center items-center">
                        {!editField ? (
                            <button
                                className="flex-1 min-w-fit max-w-[5vw] bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition duration-300"
                                onClick={() => setEditField(true)}
                            >
                                Edit
                            </button>
                        ) : (
                            <button
                                className="flex-1 min-w-fit max-w-[5vw] bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition duration-300"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        )}
                        {!editField ? (
                            <PopUp type={"MyPrfLgt"} />
                        ) : (
                            <button
                                onClick={() => setEditField(false)}
                                className="flex-1 min-w-fit max-w-[5vw] bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition duration-300"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyProfile;
