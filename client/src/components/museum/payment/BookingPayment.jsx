import React, { useEffect } from 'react';

const PaymentButton = ({ bookingInfo, calculatePrice }) => {
    const { venueId, slotId } = bookingInfo;
    const { indianAdult, indianChild, foreignAdult, foreignChild } = bookingInfo.tickets;

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handlePayment = async () => {
        console.log("Ensure slot and visitor selection are valid!");

        try {
            const obj = {
                venueId: venueId,
                slotId: slotId,
                tickets: { indianAdult, indianChild, foreignAdult, foreignChild }
            };

            const response = await fetch(`${import.meta.env.VITE_HOST}/order/booknow`, {
                method: "POST",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const { id: _id, amount, currency } = data;
            console.log("Razorpay Order Response:", data);


            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Load from env
                amount,
                currency: 'INR',
                name: "HERITAGE HUB",
                description: "Test Transaction",
                order_id,
                handler: (response) => {
                    alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                },
                prefill: {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    contact: "9999999999",
                },
                theme: { color: "#3399cc" },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Payment initiation failed:', error);
        }
    };

    return (
        <div
            onClick={handlePayment}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
        >
            {calculatePrice() === 0 ? "Buy now" : "Pay now"}
        </div>
    );
};

export default PaymentButton;
