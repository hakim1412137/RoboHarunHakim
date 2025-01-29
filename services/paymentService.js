// src/services/paymentService.js
const PAYMENT_URL = 'http://localhost:8080/api/payments'; // Adjust according to your setup

const paymentService = {
    initiatePayment: async (paymentData) => {
        const response = await fetch(`${PAYMENT_URL}/initiate-payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });
        return await response.json();
    },

    verifyPayment: async (verificationData) => {
        const response = await fetch(`${PAYMENT_URL}/verify-payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(verificationData),
        });
        return await response.json();
    },
};

export default paymentService;
