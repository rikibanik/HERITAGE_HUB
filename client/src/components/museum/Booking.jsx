import React, { useContext, useState, useEffect } from 'react';
import { ContextMuseum, ContextCheckLogin, ContextOrderId, ContextConfirmOrder } from '../context/context';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import SuccessBookingPopup from './SuccessBookingPopup';

const Booking = () => {
    const { orderId, setOrderId } = useContext(ContextOrderId);
    const { resData, setResData } = useContext(ContextCheckLogin);
    const { confirmOrder, setConfirmOrder } = useContext(ContextConfirmOrder);

    const { MuseumData } = useContext(ContextMuseum);
    // console.log(MuseumData)

    // availableSlots is the data received after selecting date
    const [availableSlots, setAvailableSlots] = useState([]);

    // selectedDate is responsibe to handle date selection
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

    // initial value is undefined
    const [selectedSlot, setSelectedSlot] = useState();

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


    const handleDateChange = (e) => {
        const date = e ? e.target.value : new Date().toISOString().split("T")[0];
        setSelectedDate(date);

        fetch(`${import.meta.env.VITE_HOST}/venue/slot/${MuseumData.venue._id}/${date}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setAvailableSlots(data.slots);
                // setSelectedSlot('select');
                setVisitorCounts({
                    indianAdults: 0,
                    indianChildren: 0,
                    foreignAdults: 0,
                    foreignChildren: 0
                });
            })
            .catch((error) => console.error('Error:', error));
    };

    // this useEffect is for handleDateChange() as there's no change in date input field upon page reload, which doesn't set available slots for that date even if it's available
    useEffect(() => {
        handleDateChange();
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, [])


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
        if (!selectedSlot) {
            alert("Please select a valid slot.");
            return;
        }

        if (calculatePrice() === 0) {
            alert("Please select at least one visitor.");
            return;
        }
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
            // console.log(obj)

            const response = await fetch(`${import.meta.env.VITE_HOST}/order/booknow`, {
                method: "POST",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // console.log(response)
            // return;
            // const { razorpay_order_id } = await response.json();

            const data = await response.json();
            const razorpay_order_id = data.razorpay_order_id;
            setOrderId(data._id);
            // console.log(data)


            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Load from env
                amount: calculatePrice() * 100, // Amount in smallest unit (paise)
                currency: 'INR',
                name: "HERITAGE HUB",
                description: "Test Transaction",
                order_id: razorpay_order_id,
                handler: async function (response) {
                    // Step 3: Verify payment on backend
                    const verifyRes = await fetch(`${import.meta.env.VITE_HOST}/order/verify-payment`, {
                        method: "POST",
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(response),
                    });

                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        toast.success('Payment Successful! Order Created!', {
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

                        setConfirmOrder(true);

                    } else {
                        toast.error('Payment Verification Failed!', {
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
                },
                prefill: {
                    name: `${resData.name.firstname} ${resData.name.lastname}`,
                    email: resData.email,
                    contact: "9999999999",
                },
                theme: { color: "#4F4AE5" },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Payment initiation failed:', error);
        }
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
            <section id="BookingForm" className="py-20 bg-neutral-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 ">
                        <h2 className="text-3xl font-bold text-white mb-4">Book Your Visit</h2>
                        <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
                    </div>
                    <form onSubmit={handlePayment} id="visitorForm" className="bg-white rounded-lg shadow-xl p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="visit-date" className="block text-neutral-700 font-medium mb-2">Visit Date</label>
                                <input
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    type="date"
                                    id="visit-date"
                                    name="visit-date"
                                    required
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Select Slot */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Select an Available Slot</h3>
                            <div>
                                <select
                                    value={selectedSlot}
                                    onChange={handleSlotChange}
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                                >
                                    {availableSlots.length > 0 ? (
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

                        {/* Visitor Count Inputs */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Number of Visitors</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="indian-adults" className="block text-neutral-700 mb-2">Indian Adults (₹{MuseumData.venue.fare.indianAdult})</label>
                                    <input
                                        type="number"
                                        id="indian-adults"
                                        name="indianAdults"
                                        min="0"
                                        value={visitorCounts.indianAdults}
                                        onChange={handleVisitorCountChange}
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="indian-children" className="block text-neutral-700 mb-2">Indian Children (₹{MuseumData.venue.fare.indianChild})</label>
                                    <input
                                        type="number"
                                        id="indian-children"
                                        name="indianChildren"
                                        min="0"
                                        value={visitorCounts.indianChildren}
                                        onChange={handleVisitorCountChange}
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="foreign-adults" className="block text-neutral-700 mb-2">Foreign Adults (₹{MuseumData.venue.fare.foreignAdult})</label>
                                    <input
                                        type="number"
                                        id="foreign-adults"
                                        name="foreignAdults"
                                        min="0"
                                        value={visitorCounts.foreignAdults}
                                        onChange={handleVisitorCountChange}
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="foreign-children" className="block text-neutral-700 mb-2">Foreign Children (₹{MuseumData.venue.fare.foreignChild})</label>
                                    <input
                                        type="number"
                                        id="foreign-children"
                                        name="foreignChildren"
                                        min="0"
                                        value={visitorCounts.foreignChildren}
                                        onChange={handleVisitorCountChange}
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Display Total Price */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Total Price: ₹{calculatePrice()}</h3>
                        </div>

                        {/* Booking Button */}
                        <button
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                        >
                            {calculatePrice() === 0 ? "Buy now" : "Pay now"}
                        </button>
                    </form>
                </div >
            </section >
            {confirmOrder && <SuccessBookingPopup selectedSlot={selectedSlot} availableSlots={availableSlots} />}

        </>
    );
};

export default Booking;
