import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth);
    const [admin] = useAdmin(user);
    return (
        <>
            <div className="drawer drawer-mobile">
                <input id="dashborad-sidebar" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <h2 className="text-3xl font-bold text-blue-500">Dashboard</h2>
                    <Outlet />

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashborad-sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
                        <li><Link to="/dashboard">My Appointments</Link></li>
                        <li><Link to="/dashboard/review">My reviews</Link></li>
                        <li><Link to="/dashboard/history">My History</Link></li>
                        {admin && <>
                            <li><Link to="/dashboard/users">All Users</Link></li>
                            <li><Link to="/dashboard/addDoctor">Add A Doctor</Link></li>
                            <li><Link to="/dashboard/manageDoctor">Manage Doctors</Link></li>
                        </>}
                    </ul>

                </div>
            </div>
        </>
    );
};

export default Dashboard;