import React from 'react';
import { toast } from 'react-toastify';

const DoctorRow = ({ doctor, index, refetch }) => {
    const { name, speciality, img, email } = doctor || {};

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
            <tr>
                <td>{index + 1}</td>
                <td>
                    <div className="avatar">
                        <div className="w-8 rounded">
                            <img src={img} alt={name || "Avatar"} />
                        </div>
                    </div>
                </td>
                <td>{name}</td>
                <td>{speciality}</td>
                <td>
                    <button onClick={() => handleDelete(email)} className="btn btn-xs btn-error">Delete</button>
                </td>
            </tr>
        </>
    );
};

export default DoctorRow;