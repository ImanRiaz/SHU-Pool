import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        role: 'passenger', // helper logic
        vehicleNumber: '',
        vehicleModel: '',
        seatsAvailable: 4
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                roles: [formData.role],
                ...(formData.role === 'driver' && {
                    vehicleNumber: formData.vehicleNumber,
                    vehicleModel: formData.vehicleModel,
                    seatsAvailable: parseInt(formData.seatsAvailable)
                })
            };

            await AuthService.register(payload);
            toast.success('Registration successful! Please login.');
            navigate('/login');
        } catch (error) {
            toast.error('Registration failed. Email might be taken.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] py-10">
            <div className="card w-full max-w-lg">
                <h2 className="text-3xl font-bold text-center text-primary mb-6">Create Account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input name="fullName" type="text" className="input-field" onChange={handleChange} required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input name="email" type="email" className="input-field" onChange={handleChange} required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input name="password" type="password" className="input-field" onChange={handleChange} required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">I am a...</label>
                        <select name="role" className="input-field" onChange={handleChange} value={formData.role}>
                            <option value="passenger">Passenger</option>
                            <option value="driver">Driver (Car Owner)</option>
                        </select>
                    </div>

                    {formData.role === 'driver' && (
                        <div className="my-4 p-4 bg-blue-50 rounded-lg space-y-3 border border-blue-100">
                            <h4 className="font-semibold text-blue-800">Vehicle Details</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <input name="vehicleModel" placeholder="Car Model (e.g. Honda City)" className="input-field" onChange={handleChange} required />
                                <input name="vehicleNumber" placeholder="Plate Number" className="input-field" onChange={handleChange} required />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Total Seats</label>
                                <input name="seatsAvailable" type="number" min="1" max="8" className="input-field" value={formData.seatsAvailable} onChange={handleChange} required />
                            </div>
                        </div>
                    )}

                    <button type="submit" className="btn-primary w-full py-3 mt-4">
                        Register
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
