import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { BiLock } from 'react-icons/bi';
import { selectMuseumId } from '../museumSlice';
import { useSelector } from 'react-redux';
import { useGetMuseumQuery } from '../museumApi';

const LogoutBooking = ({ isOpen = true, onClose = () => { } }) => {
    const museumId = useSelector(selectMuseumId);
    const { data: museumData } = useGetMuseumQuery(museumId);


    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (evt) => {
            if (evt.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKeyDown);

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [isOpen, onClose]);

    if (!isOpen || typeof document === 'undefined') return null;

    return createPortal(
        <div
            className="fixed inset-x-0 bottom-0 top-16 z-[60] flex justify-center bg-black/50 px-4 py-6 overflow-y-auto"
            onClick={() => onClose()}
        >
            <div
                className="relative w-full max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-900 transition-all duration-300 max-h-[calc(100vh-5rem)]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={() => onClose()}
                    className="absolute top-3 right-3 z-10 p-2 rounded-md text-white/80 hover:text-white hover:bg-black/30"
                    aria-label="Close login popup"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>

                <img
                    src={`${museumData.venue.imgLink}`}
                    alt="Login to book"
                    className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-center items-center text-center px-8 py-12">
                    <BiLock className="mb-6 animate-bounce" size={64} color="#fff" />
                    <h2 className="text-4xl font-extrabold text-white mb-4 drop-shadow-xl tracking-wide">
                        Login To Book Your Visit
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded mb-8"></div>
                    <Link to="/login" onClick={() => onClose()}>
                        <button className="py-3 px-10 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-200">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default LogoutBooking;