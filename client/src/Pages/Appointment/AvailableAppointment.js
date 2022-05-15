import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query'
import { format } from 'date-fns';
import Service from './Service';
import BookModal from './BookModal';

const AvailableAppointment = ({ date }) => {
    // const [services, setServices] = useState([]);
    const [treatment, setTreatment] = useState(null);

    // useEffect(() => {
    //     fetch("/service")
    //         .then(res => res.json())
    //         .then(data => setServices(data));
    // }, [date]);

    // useEffect(() => {
    //     fetch(`/available?date=${format(date, 'PP')}`)
    //         .then(res => res.json())
    //         .then(data => setServices(data));
    // }, [date]);

    const { isLoading, error, data: services, refetch } = useQuery(['available', date], () =>
        fetch(`/available?date=${format(date, 'PP')}`).then(res =>
            res.json()
        )
    )

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h4 className="text-xl text-center text-secondary font-bold">Availble Appointment on {format(date, 'PP')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    services?.map(service => <Service key={service._id} service={service} setTreatment={setTreatment} />)
                }
            </div>

            {treatment && <BookModal date={date} treatment={treatment} setTreatment={setTreatment} refetch={refetch} />}
        </>
    );
};

export default AvailableAppointment;