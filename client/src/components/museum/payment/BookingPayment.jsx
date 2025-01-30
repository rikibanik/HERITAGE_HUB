import React from 'react';
import axios from 'axios';

const PaymentButton = ({ bookingInfo, calculatePrice }) => {

    // button type will be "Buy now" if price is 0, else "Pay now" if price > 0
    const { venueId, slotId } = bookingInfo;
    const { indianAdult, indianChild, foreignAdult, foreignChild } = bookingInfo.tickets;

    const handlePayment = async () => {
        console.log("error cases for slot selection and no. of visitors is to be handeled! for now, fill values correctly!")
        try {
            // Create order via backend


            const obj = {
                venueId: venueId,
                slotId: slotId,
                tickets: {
                    indianAdult: indianAdult,
                    indianChild: indianChild,
                    foreignAdult: foreignAdult,
                    foreignChild: foreignChild,
                }
            }
            const response = await fetch(`${import.meta.env.VITE_HOST}/order/booknow`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });

            const { id: order_id, amount, currency } = response.data;

            // Set up RazorPay options
            const options = {
                key: "rzp_test_xdT4LMeIrYecka", // Replace with your RazorPay Key ID
                amount: amount,
                currency: currency,
                name: "HERITAGE HUB",
                description: "Test Transaction",
                order_id: order_id,
                handler: (response) => {
                    alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                },
                prefill: {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Payment initiation failed:', error);
        }
    };

    return (
        <>
            {calculatePrice() === 0 ? <div
                // onClick={handlePayment}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
                Buy now
            </div> : <div
                // onClick={handlePayment}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
                Pay now
            </div>}
        </>
    );
};

export default PaymentButton;