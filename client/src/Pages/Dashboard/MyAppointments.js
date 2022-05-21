import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useNavigate, Link } from "react-router-dom";
import { signOut } from 'firebase/auth';

const MyAppointments = () => {
    const [user, loading, error] = useAuthState(auth);
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetch(`/booking?patient=${user?.email}`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        localStorage.removeItem("accessToken");
                        signOut(auth);
                        navigate("/signin");
                    }
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                    setAppointments(data);
                });
        }
    }, [user]);


    return (
        <>
            <h2>My Appointments: {appointments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Treatment</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.map((appointment, index) => <tr key={appointment._id}>
                                <th>{index + 1}</th>
                                <td>{appointment.patientName}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.slot}</td>
                                <td>{appointment.treatment}</td>
                                <td>
                                    {(appointment.price && !appointment.paid) && <Link to={`/dashboard/payment/${appointment._id}`}>
                                        <button className="btn btn-xs btn-primary">Pay Now</button>
                                    </Link>}
                                    {(appointment.price && appointment.paid) &&
                                        <div>
                                            <button className="btn btn-xs btn-success">Paid</button>
                                            <p>Transaction id: <span className='text-success'>{appointment.transactionId}</span></p>
                                        </div>}
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MyAppointments;