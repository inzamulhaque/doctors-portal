import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import DeleteConfirmModal from './DeleteConfirmModal';
import DoctorRow from './DoctorRow';

const ManageDoctor = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);
    const { data: doctor, isLoading, refetch } = useQuery("doctors", () => fetch(`/doctor`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
    }).then(res => res.json()));

    if (isLoading) {
        return "Loading...";
    }

    const handleDelete = email => {
        fetch(`/doctor/${email}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    toast.success(`${email} deleted`);
                    refetch();
                }
            });
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
                        doctor?.map((doctor, index) => <DoctorRow key={doctor._id} doctor={doctor} index={index} setDeletingDoctor={setDeletingDoctor} />)
                    }
                </tbody>
            </table>

            {deletingDoctor && <DeleteConfirmModal deletingDoctor={deletingDoctor} handleDelete={handleDelete} />}
        </>
    );
};

export default ManageDoctor;