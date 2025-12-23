import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '../services/auth.service';

const ProtectedRoute = () => {
    const user = AuthService.getCurrentUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
