import { useState, useEffect } from 'react';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import { toast } from 'react-toastify';

const Profile = () => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const res = await UserService.getProfile();
            setUser(res.data);
            setFormData(res.data);
        } catch (e) {
            console.error("Failed to load profile", e);
            toast.error("Could not load profile data.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await UserService.updateProfile(formData);
            toast.success("Profile Updated Successfully!");
            setIsEditing(false);
            loadProfile();

            // Sync local storage for consistency
            const currentUser = AuthService.getCurrentUser();
            if (currentUser) {
                currentUser.fullName = formData.fullName;
                localStorage.setItem("user", JSON.stringify(currentUser));
            }
        } catch (e) {
            toast.error("Failed to update profile.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    const isDriver = user.roles && user.roles.some(r => r.name === 'ROLE_DRIVER' || r === 'ROLE_DRIVER');

    return (
        <div className="min-h-screen bg-gray-50/50 -mx-4 sm:-mx-8 lg:-mx-12 -mt-8 pb-12">

            {/* 1. Decorative Cover Background */}
            <div className="h-64 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"></div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </div>

            {/* 2. Main Container with Negative Margin to pull content up */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-24">

                {/* Profile Header Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-6">

                        {/* Avatar Wrapper */}
                        <div className="relative -mt-16 md:-mt-20 flex-shrink-0 mx-auto md:mx-0">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white bg-gray-100 shadow-2xl overflow-hidden flex items-center justify-center relative z-20">
                                {user.profilePicUrl ? (
                                    <img src={user.profilePicUrl} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-4xl md:text-5xl font-bold text-gray-300">
                                        {user.fullName?.[0]?.toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="absolute bottom-1 right-1 md:bottom-2 md:right-2 bg-indigo-600 text-white p-2.5 rounded-full shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-200 z-30"
                                title="Edit Profile"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        </div>

                        {/* User Info - Flows naturally next to avatar */}
                        <div className="flex-1 text-center md:text-left w-full md:w-auto mt-2 md:mt-0 md:mb-2">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
                                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{user.fullName}</h1>
                                {isDriver && (
                                    <span className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-full font-bold border border-indigo-100 uppercase tracking-wide">
                                        Active Driver
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-500 font-medium">{user.email}</p>
                        </div>

                        {/* Right Stats (Desktop) */}
                        <div className="hidden md:flex items-center gap-6 mb-2">
                            <div className="text-center px-4 py-2 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Rating</p>
                                <div className="flex items-center justify-center gap-1.5 text-lg font-bold text-gray-900">
                                    <span className="text-yellow-400">★</span>
                                    {user.averageRating ? user.averageRating.toFixed(1) : 'New'}
                                </div>
                            </div>
                            <div className="text-center px-4 py-2 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Status</p>
                                <p className={`text-lg font-bold ${user.verified ? 'text-green-600' : 'text-gray-400'}`}>
                                    {user.verified ? 'Verified' : 'Unverified'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Stats Cards (Mobile) & Additional Info */}
                    <div className="space-y-6">
                        {/* Mobile Stats (Visible only on mobile) */}
                        <div className="grid grid-cols-2 gap-4 md:hidden">
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
                                <p className="text-xs text-gray-400 font-bold uppercase">Rating</p>
                                <p className="text-lg font-bold text-gray-800 mt-1 flex items-center justify-center gap-1">
                                    <span className="text-yellow-400">★</span> {user.averageRating ? user.averageRating.toFixed(1) : 'New'}
                                </p>
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
                                <p className="text-xs text-gray-400 font-bold uppercase">Verified</p>
                                <p className={`text-lg font-bold mt-1 ${user.verified ? 'text-green-600' : 'text-gray-400'}`}>
                                    {user.verified ? 'Yes' : 'No'}
                                </p>
                            </div>
                        </div>

                        {/* About Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                About Me
                            </h3>
                            {isEditing ? (
                                <textarea
                                    name="bio"
                                    value={formData.bio || ''}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none text-sm"
                                    rows="4"
                                    placeholder="Tell others about yourself..."
                                />
                            ) : (
                                <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                                    {user.bio || "No bio added yet. Tell people about yourself!"}
                                </p>
                            )}
                        </div>

                        {/* Driver Card */}
                        {isDriver && (
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7.25h10.29l1.04 3.01H5.81l1.04-3.01zM17 14H7v-2h10v2z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-white/90 mb-4 relative z-10 flex items-center gap-2">
                                    <span>Vehicle Details</span>
                                </h3>
                                <div className="space-y-3 relative z-10">
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">Vehicle Model</p>
                                        {isEditing ? (
                                            <input name="vehicleModel" value={formData.vehicleModel || ''} onChange={handleChange} className="w-full mt-1 bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 outline-none text-sm" placeholder="e.g. Honda Civic" />
                                        ) : (
                                            <p className="font-medium text-lg">{user.vehicleModel || 'Not specified'}</p>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">License Plate</p>
                                        {isEditing ? (
                                            <input name="vehicleNumber" value={formData.vehicleNumber || ''} onChange={handleChange} className="w-full mt-1 bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 outline-none text-sm" placeholder="ABC-123" />
                                        ) : (
                                            <p className="font-mono text-indigo-300">{user.vehicleNumber || 'Not set'}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Main Editing / Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-xl text-gray-900">Personal Information</h3>
                                {isEditing && <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg animate-pulse">EDITING MODE</span>}
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Full Name</label>
                                        {isEditing ? (
                                            <input
                                                name="fullName"
                                                value={formData.fullName || ''}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                                            />
                                        ) : (
                                            <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 font-medium">
                                                {user.fullName}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                                        {isEditing ? (
                                            <input
                                                name="phone"
                                                value={formData.phone || ''}
                                                onChange={handleChange}
                                                placeholder="+92 300 1234567"
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                                            />
                                        ) : (
                                            <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 font-medium flex items-center gap-2">
                                                <span className="opacity-50">📱</span> {user.phone || 'Not provided'}
                                            </div>
                                        )}
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Email Address</label>
                                        <div className="px-4 py-3 bg-gray-100 rounded-xl border border-gray-200 text-gray-500 font-medium flex items-center gap-2 cursor-not-allowed">
                                            <span className="opacity-50">✉️</span> {user.email}
                                            <span className="ml-auto text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-500">Read-only</span>
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-sm font-semibold text-gray-700">Profile Picture URL</label>
                                            <input
                                                name="profilePicUrl"
                                                value={formData.profilePicUrl || ''}
                                                onChange={handleChange}
                                                placeholder="https://..."
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-mono text-sm"
                                            />
                                            <p className="text-xs text-gray-400">Paste a direct link to a hosted image.</p>
                                        </div>
                                    )}
                                </div>

                                {isEditing && (
                                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                                        <button
                                            type="button"
                                            onClick={() => { setIsEditing(false); setFormData(user); }}
                                            className="px-6 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-2.5 rounded-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:scale-105"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
