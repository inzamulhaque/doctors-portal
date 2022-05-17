import React from 'react';
import { useQuery } from 'react-query';
import UserRow from "./UserRow";

const Users = () => {
    const { data: users, refetch } = useQuery("users", () => fetch("/user", {
        method: "GET",
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    return (
        <>
            <h2 className="text-2xl">All Users: {users?.length}</h2>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Email</th>
                        <th>Make Admin</th>
                        <th>Remove User</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user, index) => <UserRow key={user._id} user={user} index={index} refetch={refetch} />)
                    }
                </tbody>
            </table>
        </>
    );
};

export default Users;