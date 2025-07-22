
import { useState } from "react"
import Modal from "./Modal"
import { BiLogOut } from "react-icons/bi"

export default function PopUp({ type }) {
    // type could be "prfDrpDwnLgt" or "MyPrfLgt"
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)

    const handleLogout = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_HOST}/user/logout`,
                {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )
            if (!res.ok) {
                throw new Error('Logout failed!')
            }
            localStorage.removeItem('token');
            window.location.href = '/';

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <main className="App">

            {type === "MyPrfLgt" ?
                <button onClick={() => setOpen(true)} className="flex-1 min-w-fit max-w-[5vw] bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition duration-300">
                    Logout
                </button> :
                <button onClick={() => setOpen(true)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-start" >Log out
                </button>
            }


            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="text-center w-56">
                    <BiLogOut size={56} className="mx-auto text-red-500" />
                    <div className="mx-auto my-4 w-48">
                        <h3 className="text-lg font-black text-gray-800">Confirm Logout</h3>
                        <p className="text-sm text-gray-500">
                            Are you sure you want to Logout?
                        </p>
                    </div>
                    <div className="flex gap-4">
                        {loading ?
                            <>
                                <div className="flex w-full items-center justify-center bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition duration-300">
                                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"
                                        ></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"
                                        ></path>
                                    </svg>
                                    Signing Out...
                                </div>
                            </>
                            :
                            <>
                                <button onClick={handleLogout} className="flex-1 bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition duration-300">
                                    Logout
                                </button>
                                <button
                                    className="flex-1 bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition duration-300"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </button>
                            </>
                        }
                    </div>
                </div>
            </Modal>
        </main>
    )
}