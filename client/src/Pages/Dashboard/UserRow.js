import React from 'react';
import { toast } from 'react-toastify';

const UserRow = ({ user, index, refetch }) => {
    const { email, role } = user || {};

    const makeAdmin = () => {
        fetch(`/user/admin/${email}`, {
            method: "PUT",
            headers: {
                "authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error("Failed To Make An Admin");
                }
                return res.json();
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success("successfully make a admin");
                }
            });
    }

    return (
        <>
            <tr>
                <th>{index + 1}</th>
                <td>{email}</td>
                <td>
                    {role !== "admin" ? <button onClick={makeAdmin} className="btn btn-xs btn-primary">Make Admin</button> : <button className="btn btn-xs">Admin</button>}
                </td>
                <td>
                    <button className="btn btn-xs">Remove User</button>
                </td>
            </tr>
        </>
    );
};

export default UserRow;