import React from 'react';

const DoctorRow = ({ doctor, index, setDeletingDoctor }) => {
    const { name, speciality, img } = doctor || {};

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
                    <label onClick={() => setDeletingDoctor(doctor)} htmlFor="delete-confirm-modal" className="btn btn-xs btn-error">Delete</label>
                </td>
            </tr>
        </>
    );
};

export default DoctorRow;