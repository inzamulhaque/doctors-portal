import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe("pk_test_51L1YpwLDkCD99dblFrndM9wpup8UeSI1g1nJMmBtWq6O38MCnMZuBg9Snym4GNdWbXsplUPsWik20UcqoERxI82u00Bxwahea7");

const Payment = () => {
    const { id } = useParams();
    const { data: appointment, isLoading } = useQuery(["booking", id], () => fetch(`/booking/${id}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return "Loading...";
    }

    return (
        <>
            <div className="card w-50 max-w-md bg-base-100 shadow-xl my-12">
                <div className="card-body">
                    <p className="text-success font-bold">Hello, {appointment?.patientName}</p>
                    <h2 className="card-title">Please Pay for {appointment?.treatment}</h2>
                    <p>Your Appointment: <span className='text-orange-700'>{appointment?.date}</span> at {appointment?.slot}</p>
                    <p>Please pay: ${appointment?.price}</p>
                </div>
            </div>
            <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm appointment={appointment} />
                    </Elements>
                </div>
            </div>
        </>
    );
};

export default Payment;