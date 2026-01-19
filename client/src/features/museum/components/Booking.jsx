import React, { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ContextConfirmOrder } from '../../../context/context';
import { toast } from 'react-toastify';
import SuccessBookingPopup from './SuccessBookingPopup';
import SuccessBookingSkeleton from './SuccessBookingShimmer';
import { useGetMuseumQuery, useLazyGetVenueSlotsQuery } from '../museumApi';
import { selectMuseumId } from '../museumSlice';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from '../../auth/authApi';

const Booking = ({ isOpen = true, onClose = () => { } }) => {
    const [orderDetails, setOrderDetails] = useState(null);

    const { data: resData } = useGetUserQuery();
    const { confirmOrder, setConfirmOrder } = useContext(ContextConfirmOrder);

    // this effect state is for handling effect just after payment
    const [effect, setEffect] = useState(false);

    // this loading state is to handle paying... loading effect
    const [loading, setLoading] = useState(false);

    // const { MuseumData } = useContext(ContextMuseum);
    const museumId = useSelector(selectMuseumId);
    const { data: MuseumData } = useGetMuseumQuery(museumId);
    // console.log(MuseumData)

    // availableSlots is the data received after selecting date
    const [availableSlots, setAvailableSlots] = useState([]);

    // selectedDate is responsibe to handle date selection
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

    const [selectedSlot, setSelectedSlot] = useState('');

    // visitorCounts is handeling the input value change of no. of visitors and also responsible for the price count
    const [visitorCounts, setVisitorCounts] = useState({
        indianAdults: 0,
        indianChildren: 0,
        foreignAdults: 0,
        foreignChildren: 0
    });

    const formatTime = (hour, minute) => {
        const amPm = hour < 12 ? 'AM' : 'PM';
        let hour12 = hour % 12;
        if (hour12 === 0) hour12 = 12;
        return `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${amPm}`;
    };

    const [
        triggerGetSlots,
        { data: slotsData, isSuccess: slotsSuccess, isLoading: slotsLoading }
    ] = useLazyGetVenueSlotsQuery();

    const handleDateChange = (e) => {
        const date = e ? e.target.value : new Date().toISOString().split("T")[0];
        setSelectedDate(date);
        const venueId = MuseumData?.venue?._id;
        if (!venueId) return;
        triggerGetSlots({ venueId, date });
    };

    useEffect(() => {
        if (slotsSuccess) {
            setAvailableSlots(slotsData.slots);
            setVisitorCounts({
                indianAdults: 0,
                indianChildren: 0,
                foreignAdults: 0,
                foreignChildren: 0
            });
        }
    }, [slotsSuccess, slotsData]);

    // Load Razorpay script once
    useEffect(() => {
        const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
        if (existing) return;
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    // Fetch slots for default date when museum data becomes available
    useEffect(() => {
        if (!MuseumData?.venue?._id) return;
        handleDateChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [MuseumData?.venue?._id]);

    // Modal UX: ESC close + body scroll lock
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


    const handleSlotChange = (e) => {
        const selectedSlotId = e.target.value;
        setSelectedSlot(selectedSlotId);
    };

    const handleVisitorCountChange = (e) => {
        const { name, value } = e.target;
        setVisitorCounts({
            ...visitorCounts,
            [name]: Number(value) || 0, // Ensures the value is an integer
        });
    };


    const calculatePrice = () => {
        if (!MuseumData?.venue?.fare) return 0;
        const { indianAdults, indianChildren, foreignAdults, foreignChildren } = visitorCounts;
        const adultPriceIndia = MuseumData.venue.fare.indianAdult;
        const childPriceIndia = MuseumData.venue.fare.indianChild;
        const adultPriceForeign = MuseumData.venue.fare.foreignAdult;
        const childPriceForeign = MuseumData.venue.fare.foreignChild;

        return (
            (indianAdults * adultPriceIndia) +
            (indianChildren * childPriceIndia) +
            (foreignAdults * adultPriceForeign) +
            (foreignChildren * childPriceForeign)
        );
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!MuseumData?.venue?._id) {
            toast.error('Venue details are still loading. Please wait.');
            return;
        }
        if (!selectedSlot) {
            alert("Please select a valid slot.");
            return;
        }

        if (calculatePrice() === 0) {
            alert("Please select at least one visitor.");
            return;
        }

        setLoading(true);
        try {
            const obj = {
                venueId: MuseumData.venue._id,
                slotId: selectedSlot,
                tickets: {
                    indianAdult: visitorCounts.indianAdults,
                    indianChild: visitorCounts.indianChildren,
                    foreignAdult: visitorCounts.foreignAdults,
                    foreignChild: visitorCounts.foreignChildren,
                },
            };

            const response = await fetch(`${import.meta.env.VITE_HOST}/order/booknow`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(obj),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const razorpay_order_id = data.razorpay_order_id;
            setLoading(false);

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: calculatePrice() * 100,
                currency: 'INR',
                name: "HERITAGE HUB",
                description: "Test Transaction",
                order_id: razorpay_order_id,
                handler: async function (response) {
                    setEffect(true)
                    const verifyRes = await fetch(`${import.meta.env.VITE_HOST}/order/verify-payment`, {
                        method: "POST",
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                        body: JSON.stringify(response),
                    });
                    const orderId = data._id;
                    console.log(orderId)
                    const verifyData = await verifyRes.json();
                    if (verifyData.success) {
                        setConfirmOrder(true);
                        const res = await fetch(`${import.meta.env.VITE_HOST}/order/order-details/${orderId}`, {
                            method: "POST",
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            },
                        });
                        if (!res.ok) {
                            throw new Error('order details could not be fetched');
                        }
                        const data = await res.json();
                        setOrderDetails(data);
                    } else {
                        toast.error('Payment Verification Failed!');
                    }
                    setEffect(false);
                },
                prefill: {
                    name: resData?.name ? `${resData.name.firstname} ${resData.name.lastname}` : '',
                    email: resData?.email || '',
                    contact: "9999999999",
                },
                theme: { color: "#4F4AE5" },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error('Payment initiation failed:', error);
            setEffect(false);
            setLoading(false);
        }
    };

    return (
        <>
            {isOpen && typeof document !== 'undefined' && createPortal(
                <div
                    className="fixed inset-x-0 bottom-0 top-16 z-[60] flex justify-center bg-black/50 px-4 py-6 overflow-y-auto"
                    onClick={() => onClose()}
                >
                    <div
                        className="relative w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden max-h-[calc(100vh-5rem)] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Book Your Visit</h2>
                            <button
                                type="button"
                                onClick={() => onClose()}
                                className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                aria-label="Close booking"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 scrollbar-hidden overflow-y-auto flex-1 min-h-0">
                            {!MuseumData?.venue ? (
                                <div className="text-center py-10 text-gray-700 dark:text-gray-300">
                                    Loading booking details...
                                </div>
                            ) : (
                                <form onSubmit={handlePayment} id="visitorForm" className="">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                                        <div className="md:col-span-1.5">
                                            <label htmlFor="visit-date" className="block text-neutral-700 font-medium mb-2 dark:text-gray-300">Visit Date</label>
                                            <input
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                type="date"
                                                id="visit-date"
                                                name="visit-date"
                                                required
                                                className="w-full px-4 py-2 border dark:bg-gray-900 dark:text-gray-300 placeholder:dark:text-gray-400 border-neutral-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                                            />
                                        </div>
                                        <div className="md:col-span-3">
                                            <label htmlFor="available-slot" className="block text-neutral-700 font-medium mb-2 dark:text-gray-300">
                                                Available Slot
                                            </label>
                                            <select
                                                id="available-slot"
                                                name="available-slot"
                                                value={selectedSlot}
                                                onChange={handleSlotChange}
                                                className="w-full px-4 py-2 border dark:bg-gray-900 dark:text-gray-300 border-neutral-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                                            >
                                                {slotsLoading ? (
                                                    <option value="">Loading slots...</option>
                                                ) : availableSlots.length > 0 ? (
                                                    <>
                                                        <option value="">--Select a Slot--</option>
                                                        {availableSlots.map((slot) => (
                                                            <option key={slot._id} value={slot._id}>
                                                                {`${formatTime(slot.slots.startTime.hour, slot.slots.startTime.minute)} - ${formatTime(slot.slots.endTime.hour, slot.slots.endTime.minute)} (Available Capacity: ${slot.maxCapacity - slot.currentBookings})`}
                                                            </option>
                                                        ))}
                                                    </>
                                                ) : (
                                                    <option value="">No slots available</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>


                                    <div className="mt-8">
                                        <h3 className="text-lg font-semibold text-neutral-900 mb-4 dark:text-white">Number of Visitors</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="indian-adults" className="block text-neutral-700 mb-2 dark:text-gray-300">Indian Adults (₹{MuseumData.venue.fare.indianAdult})</label>
                                                <input
                                                    type="number"
                                                    id="indian-adults"
                                                    name="indianAdults"
                                                    min="0"
                                                    value={visitorCounts.indianAdults}
                                                    onChange={handleVisitorCountChange}
                                                    className="w-full px-4 py-2 border dark:bg-gray-900 dark:text-gray-300 placeholder:dark:text-gray-400 border-neutral-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="indian-children" className="block text-neutral-700 mb-2 dark:text-gray-300">Indian Children (₹{MuseumData.venue.fare.indianChild})</label>
                                                <input
                                                    type="number"
                                                    id="indian-children"
                                                    name="indianChildren"
                                                    min="0"
                                                    value={visitorCounts.indianChildren}
                                                    onChange={handleVisitorCountChange}
                                                    className="w-full px-4 py-2 border dark:bg-gray-900 dark:text-gray-300 placeholder:dark:text-gray-400 border-neutral-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="foreign-adults" className="block text-neutral-700 mb-2 dark:text-gray-300">Foreign Adults (₹{MuseumData.venue.fare.foreignAdult})</label>
                                                <input
                                                    type="number"
                                                    id="foreign-adults"
                                                    name="foreignAdults"
                                                    min="0"
                                                    value={visitorCounts.foreignAdults}
                                                    onChange={handleVisitorCountChange}
                                                    className="w-full px-4 py-2 border dark:bg-gray-900 dark:text-gray-300 placeholder:dark:text-gray-400 border-neutral-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="foreign-children" className="block text-neutral-700 mb-2 dark:text-gray-300">Foreign Children (₹{MuseumData.venue.fare.foreignChild})</label>
                                                <input
                                                    type="number"
                                                    id="foreign-children"
                                                    name="foreignChildren"
                                                    min="0"
                                                    value={visitorCounts.foreignChildren}
                                                    onChange={handleVisitorCountChange}
                                                    className="w-full px-4 py-2 border dark:bg-gray-900 dark:text-gray-300 placeholder:dark:text-gray-400 border-neutral-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-lg font-semibold text-neutral-900 mb-4 dark:text-white">Total Price: ₹{calculatePrice()}</h3>
                                    </div>

                                    <button
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 flex justify-center items-center"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                </svg>
                                                Paying...
                                            </>
                                        ) : calculatePrice() === 0 ? "Buy now" : "Pay now"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {confirmOrder && orderDetails
                ? <SuccessBookingPopup orderDetails={orderDetails} selectedSlot={selectedSlot} availableSlots={availableSlots} />
                : effect && <SuccessBookingSkeleton />}

        </>
    );
};

export default Booking;
