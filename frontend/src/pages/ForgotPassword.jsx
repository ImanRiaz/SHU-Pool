import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Stub endpoint call
            await axios.post('/api/auth/forgot-password', { email });
            setSubmitted(true);
            toast.success('Reset link sent to your email!');
        } catch (error) {
            toast.error('Failed to process request.');
        }
    };

    if (submitted) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="card max-w-md text-center">
                    <h2 className="text-2xl font-bold text-green-600 mb-4">Check your Email</h2>
                    <p className="text-gray-600 mb-6">We have sent a password reset link to <b>{email}</b>.</p>
                    <Link to="/login" className="btn-primary">Back to Login</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="card w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-primary mb-2">Forgot Password?</h2>
                <p className="text-center text-gray-500 mb-6">Enter your email to reset your password.</p>

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

                    <button type="submit" className="btn-primary w-full py-3">
                        Send Reset Link
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    <Link to="/login" className="text-primary font-semibold hover:underline">Back to Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
