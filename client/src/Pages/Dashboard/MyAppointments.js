import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const MyAppointments = () => {
    const [user, loading, error] = useAuthState(auth);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (user) {
            fetch(`/booking?patient=${user?.email}`)
                .then(res => res.json())
                .then(data => setAppointments(data));
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
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MyAppointments;