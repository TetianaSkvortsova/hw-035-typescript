import { Navigate, Outlet } from 'react-router';

const PrivateRoute = () => {
    const currentToken = localStorage.getItem('token');
    if (currentToken) {
        return <Outlet />;
    } else {
        return <Navigate to="/" replace />;
    }
};

export default PrivateRoute;