import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';

const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;