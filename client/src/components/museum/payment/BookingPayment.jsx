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

    const handlePayment = async (e) => {
        e.preventDefault();
    
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
            console.log(response)
            const { razorpay_order_id } = await response.json();
    
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
                        alert("Payment Successful! Order Created.");
                    } else {
                        alert("Payment Verification Failed.");
                    }
                },
                prefill: {
                    name: "RIKI BANIK",
                    email: "john.doe@example.com",
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
        <div
            onClick={handlePayment}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
        >
            {calculatePrice() === 0 ? "Buy now" : "Pay now"}
        </div>
    );
};

export default PaymentButton;
