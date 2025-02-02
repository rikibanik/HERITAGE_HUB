import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { ContextConfirmOrder, ContextMuseum, ContextOrderId } from "../context/context";
import { useContext, useEffect } from "react";
import { useWindowSize } from "react-use";
import Confetti from 'react-confetti';

const SuccessBookingPopup = ({ availableSlots, selectedSlot }) => {

    const [orderDetails, setOrderDetails] = useState(null)
    const { MuseumData } = useContext(ContextMuseum);
    const { orderId } = useContext(ContextOrderId);
    const slotInfo = availableSlots.filter((slot) => slot._id === selectedSlot);
    const { confirmOrder, setConfirmOrder } = useContext(ContextConfirmOrder);
    const [isConfettiActive, setIsConfettiActive] = useState(false);


    const dataChecking = {
        orderDetails: orderDetails,
        MuseumData: MuseumData,
        slotInfo: slotInfo,
    }
    console.log(dataChecking)
    const getOrderDetails = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_HOST}/order/order-details/${orderId}`, {
                method: "POST",
                credentials: 'include',
            });
            if (!res.ok) {
                throw new Error('order details could not be fetched');
            }
            const data = await res.json();
            // console.log(data);
            setOrderDetails(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOrderDetails();
    }, [])

    // Trigger confetti effect when confirmOrder is true
    useEffect(() => {
        if (confirmOrder) {
            setIsConfettiActive(true);
            setTimeout(() => {
                setIsConfettiActive(false); // Stop the confetti after 3 seconds
            }, 3000); // 3 seconds
        }
    }, [confirmOrder]);

    // Prevent background scrolling when modal is open
    // useEffect(() => {
    //     if (confirmOrder) {
    //         document.body.classList.add("overflow-hidden");
    //     } else {
    //         document.body.classList.remove("overflow-hidden");
    //     }
    //     return () => document.body.classList.remove("overflow-hidden");
    // }, [confirmOrder]);

    const { width, height } = useWindowSize();

    return (
        <>
            <div
                onClick={() => setConfirmOrder(false)}
                className="fixed inset-0 flex justify-center items-center bg-black/20 transition-colors z-50"
            >
                {isConfettiActive &&
                    <Confetti
                        width={width}
                        height={height}
                    />}
                <div
                    onClick={(e) => e.stopPropagation()}
                    // scrollbar-hidden css style is written in app.css
                    className="bg-white rounded-xl shadow p-4 mx-2 mt-[8vh] max-h-[85vh] overflow-y-scroll scrollbar-hidden transition-all scale-100 opacity-100 relative"
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setConfirmOrder(false)}
                        className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
                    >
                        <MdCancel />
                    </button>

                    {/* Success Header */}
                    <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-8 h-8 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                ></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h2>

                        {/* Price Paid Section */}
                        <div className="flex items-center justify-center">
                            <span className="text-xl font-light text-gray-800 mr-2">Amount Paid:</span>
                            <span className="text-xl font-light text-green-600">₹{ }</span>
                        </div>
                    </div>

                    {/* Order, Visitor, and Visit Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Order Details */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="font-semibold">Order Number:</div>
                            <div>order_PqYTHImh1eH29y</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="font-semibold">Receipt ID:</div>
                            <div>AHAY214Z</div>
                        </div>

                        {/* Visitor Information */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Visitor Information</h3>
                            <p>Name: RIKI BANIK</p>
                            <p>Email: rikibanik784114@gmail.com</p>
                        </div>

                        {/* Visit Details */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Visit Details</h3>
                            <p>Date: February 2, 2025</p>
                            <p>Time: 12:00 PM - 2:00 PM</p>
                        </div>
                    </div>

                    {/* Venue Details */}
                    <div className="bg-gray-50 p-4 rounded-lg mt-4">
                        <h3 className="font-semibold mb-2">Venue Information</h3>
                        <p>Sarnath Museum</p>
                        <p>Near Sarnath Archaeological Site, Sarnath</p>
                        <p>Varanasi, Uttar Pradesh - 221007</p>
                        <p>Phone: +91 542 259 5095</p>
                        <p>Email: info@sarnathmuseum.com</p>
                    </div>

                    {/* Footer Note */}
                    <div className="mt-4 text-center text-sm text-gray-600">
                        <p>Looking forward to your visit!</p>
                    </div>
                </div>
            </div>

        </>
    );
};

export default SuccessBookingPopup;
