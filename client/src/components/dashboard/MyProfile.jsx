import React, { useState, useEffect } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Loading from "./Loading";

const MyProfile = () => {
    const [resData, setResData] = useState(null)
    // console.log("MyProfile", resData)
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

    const getData = async () => {

        const res = await fetch('http://localhost:3000/user',
            {
                method: "GET",
                credentials: 'include',
            }
        )
        const data = await res.json()
        setResData(data)
        setProfile({ ...profile, name: { ...profile.name, firstname: data.name.firstname, lastname: data.name.lastname } })
        // console.log(data)
    }

    useEffect(() => {
        getData()
    }, [])

    const handleLogout = async () => {
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
    }

    const handleSave = () => {
        console.log(profile)
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
            // only then send a post request
        }
        setEditField(false)
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
    }

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
            < div className="w-full min-h-[507.2px] flex justify-center items-center">
                {resData && resData.email ?
                    <div className="border border-gray-200 shadow-lg transition duration-300 flex flex-col items-center justify-center p-6 w-2/5 min-w-[220px] rounded-xl">
                        {/* profile icon & username */}
                        <div className="flex flex-col items-center justify-center gap-2">
                            <img src="https://avatar.iran.liara.run/public" alt="User Avatar" className="w-16 h-16 rounded-full border overflow-hidden bg-gray-600 object-cover" />
                            <h3 className="text-center">username</h3>
                        </div>
                        {/* user details */}
                        <div className="my-6">
                            <div className="flex flex-wrap items-start gap-8">
                                {/* Horizontally Aligned Fields */}
                                <div className="flex flex-col gap-4">
                                    {/* Name Field */}
                                    {editField ? (
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-2">
                                                <label className="font-medium text-gray-700">First Name:</label>
                                                <input
                                                    type="text"
                                                    value={profile.name.firstname}
                                                    onChange={(e) => handleChange(e, "firstname")}
                                                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <label className="font-medium text-gray-700">Last Name:</label>
                                                <input
                                                    type="text"
                                                    value={profile.name.lastname}
                                                    onChange={(e) => handleChange(e, "lastname")}
                                                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                        {/* buttons */}
                        <div className="flex gap-6 flex-wrap justify-center items-center">
                            {!editField ?
                                <button className="flex-1 min-w-fit max-w-[5vw] bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition duration-300" onClick={() => setEditField(true)}>
                                    Edit
                                </button> :

                                <button className="flex-1 max-w-[5vw] bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition duration-300" onClick={handleSave}>
                                    Save
                                </button>
                            }
                            {
                                !editField ?
                                    <button onClick={handleLogout} className="flex-1 min-w-fit max-w-[5vw] bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition duration-300">
                                        Logout
                                    </button> :
                                    <button onClick={() => setEditField(false)} className="flex-1 max-w-[5vw] bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition duration-300">
                                        Cancel
                                    </button>
                            }
                        </div>
                    </div>
                    : <Loading type="spinningBubbles" color="blue" />}
            </div >
        </>

    );
};

export default MyProfile;
