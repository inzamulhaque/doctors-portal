import React from 'react';
import { useQuery } from 'react-query';
import DoctorRow from './DoctorRow';

const ManageDoctor = () => {
    const { data: doctor, isLoading, refetch } = useQuery("doctors", () => fetch(`/doctor`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
    }).then(res => res.json()));

    if (isLoading) {
        return "Loading...";
    }

    return (
        <>
            <h2 className="text-2xl">Manage Doctors: {doctor?.length}</h2>

            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Specialty</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        doctor?.map((doctor, index) => <DoctorRow key={doctor._id} doctor={doctor} index={index} refetch={refetch} />)
                    }
                </tbody>
            </table>
        </>
    );
};

export default ManageDoctor;