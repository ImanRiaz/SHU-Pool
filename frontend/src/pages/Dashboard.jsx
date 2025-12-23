import AuthService from '../services/auth.service';
import RideService from '../services/ride.service';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

const Dashboard = () => {
    const user = AuthService.getCurrentUser();
    const [bookings, setBookings] = useState([]);
    const [myOfferedRides, setMyOfferedRides] = useState([]); // We need an endpoint for this ideally, or filter open rides

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const resBookings = await RideService.getMyBookings();
            setBookings(resBookings.data);
            // NOTE: Ideally detailed backend endpoint for "my offered rides"
            // For MVP Phase 2, we might just search, or we add an endpoint. 
            // Let's assume we add an endpoint or reuse search? 
            // Actually, let's just stick to bookings for passenger first, adding Driver view next step.
        } catch (e) {
            console.error(e);
        }
    };

    const handleCancelBooking = async (id) => {
        if (!window.confirm("Cancel this booking?")) return;
        try {
            await RideService.cancelBooking(id);
            toast.success("Booking Cancelled");
            loadData();
        } catch (e) { toast.error("Failed to cancel"); }
    };

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-8 text-white shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Hello, {user.fullName}! 👋</h1>
                <p className="opacity-90">Ready for your next journey?</p>

                <div className="mt-6 flex gap-4">
                    <Link to="/find-ride" className="px-6 py-2 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition">
                        Find a Ride
                    </Link>
                    {user.roles.includes('ROLE_DRIVER') && (
                        <Link to="/offer-ride" className="px-6 py-2 bg-indigo-800 text-white border border-indigo-400 rounded-lg font-semibold hover:bg-indigo-700 transition">
                            Offer a Ride
                        </Link>
                    )}
                </div>
            </div>

            {/* Stats / Active Bookings */}
            <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800">My Bookings</h2>
                {bookings.length === 0 ? (
                    <div className="card text-center py-10">
                        <div className="text-4xl mb-3">🎫</div>
                        <p className="text-gray-500">You haven't booked any rides yet.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {bookings.map(booking => (
                            <div key={booking.id} className="card relative overflow-hidden">
                                <div className="absolute top-0 right-0 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-bl-lg">
                                    CONFIRMED
                                </div>
                                <h4 className="font-bold text-lg mb-2">{booking.ride?.origin} ➔ {booking.ride?.destination}</h4>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p>📅 {new Date(booking.ride?.departureTime).toLocaleDateString()}</p>
                                    <p>⏰ {new Date(booking.ride?.departureTime).toLocaleTimeString()}</p>
                                    <p>👤 Driver: {booking.ride?.driver?.fullName}</p>
                                    <p>💺 Seats: {booking.seatsBooked}</p>
                                </div>
                                {booking.status !== 'CANCELLED' && (
                                    <button onClick={() => handleCancelBooking(booking.id)} className="mt-3 w-full py-1 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50">
                                        Cancel Booking
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Driver Section (If Driver) */}
            {user.roles.includes('ROLE_DRIVER') && (
                <div className="pt-8 border-t">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">My Offered Rides</h2>
                    <p className="text-gray-500 italic">To view your offered rides, please use the "Find Ride" search for now. (Feature coming in next update)</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
