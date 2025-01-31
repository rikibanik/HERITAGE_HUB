import React, { useContext, useState, useEffect } from 'react';
import { ContextMuseum } from '../context/context';
import PaymentButton from './payment/BookingPayment';

const Booking = () => {
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

    // this useEffect is for handleDateChange() because upon page reload, no change in date input is observed which doesn't set available slots for that date even if it's available
    useEffect(() => {
        handleDateChange();
    }, [])


    const handleSlotChange = (e) => {
        const selectedSlotId = e.target.value;
        setSelectedSlot(selectedSlotId);
    };

    const handleVisitorCountChange = (e) => {
        const { name, value } = e.target;
        setVisitorCounts({
            ...visitorCounts,
            [name]: value
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



    const getButtonText = () => {
        const price = calculatePrice();
        if (price > 0) {
            return 'Pay Now';
        }
        return 'Book Now';
    };

    // this bookingInfo is being sent to the bookingPayment page
    const bookingInfo = {
        venueId: MuseumData.venue._id,
        slotId: selectedSlot,
        tickets: {
            indianAdult: Number(visitorCounts.indianAdults),
            indianChild: Number(visitorCounts.indianChildren),
            foreignAdult: Number(visitorCounts.foreignAdults),
            foreignChild: Number(visitorCounts.foreignChildren),
        }
    }

    const handleBooking = (e) => {
        e.preventDefault();
        console.log("error cases for slot selection and no. of visitors is to be handeled! for now, fill values correctly!", bookingInfo)
    }

    return (
        <section id="BookingForm" className="py-20 bg-neutral-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 ">
                    <h2 className="text-3xl font-bold text-white mb-4">Book Your Visit</h2>
                    <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
                </div>

                <form  id="visitorForm" className="bg-white rounded-lg shadow-xl p-8">
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
                                // value={selectedSlot}
                                onChange={handleSlotChange}
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                            >
                                {availableSlots.length > 0 ? (
                                    <>
                                        <option value="select">--Select a Slot--</option>
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
                    <div className="mt-8">
                        <button
                            // onClick={handleBooking}
                            type="submit"
                            className='w-full'

                        >
                            <PaymentButton bookingInfo={bookingInfo} calculatePrice={calculatePrice} />
                        </button>

                    </div>
                </form>
            </div >
        </section >
    );
};

export default Booking;
