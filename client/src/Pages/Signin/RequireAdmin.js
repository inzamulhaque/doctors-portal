import React from 'react';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';

const RequireAdmin = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);
    let location = useLocation();

    if (loading || adminLoading) {
        return "loading...";
    }

    if (!user || !admin) {
        localStorage.removeItem("accessToken");
        signOut(auth);
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAdmin;