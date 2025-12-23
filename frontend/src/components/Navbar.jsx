import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const Navbar = () => {
    const user = AuthService.getCurrentUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
                        <span>🚗</span> SHU-Pool
                    </Link>

                    <div className="flex items-center space-x-4">
                        <Link to="/find-ride" className="hover:text-primary transition">Find Ride</Link>
                        {user.roles.includes('ROLE_DRIVER') && (
                            <Link to="/offer-ride" className="hover:text-primary transition">Offer Ride</Link>
                        )}
                        <Link to="/profile" className="hover:text-primary transition">Profile</Link>

                        <div className="border-l pl-4 ml-4 flex items-center gap-3">
                            <div className="text-sm text-right hidden md:block">
                                <div className="font-medium text-gray-900">{user.fullName}</div>
                                <div className="text-xs text-gray-500 uppercase">{user.roles[0]?.replace('ROLE_', '')}</div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="btn-primary py-1 px-4 text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
