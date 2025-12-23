import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AuthService.login(email, password);
            // Wait a bit for local storage to update? No, promise resolves after setItem.
            navigate('/dashboard');
        } catch (error) {
            toast.error('Login failed! Check credentials.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="card w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-primary mb-6">Welcome Back</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="text-right">
                        <Link to="/forgot-password" class="text-xs text-primary hover:underline">Forgot Password?</Link>
                    </div>

                    <button type="submit" className="btn-primary w-full py-3">
                        Sign In
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account? <Link to="/register" className="text-primary font-semibold hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
