import { useState, useEffect } from 'react';
import RideService from '../services/ride.service';
import RideMap from '../components/RideMap';
import { toast } from 'react-toastify';

const FindRide = () => {
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState({ origin: '', destination: '' });

    useEffect(() => {
        loadRides();
    }, []);

    const loadRides = async () => {
        try {
            const response = await RideService.getOpenRides();
            setRides(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await RideService.searchRides(search.origin, search.destination);
            setRides(response.data);
        } catch (error) {
            toast.error('Search failed');
        } finally {
            setLoading(false);
        }
    };

    const handleBook = async (rideId) => {
        if (!window.confirm("Confirm booking for this ride?")) return;
        try {
            await RideService.bookRide(rideId, 1); // Default 1 seat for now
            toast.success('Booking Confirmed!');
            loadRides(); // Refresh
        } catch (error) {
            toast.error(error.response?.data || 'Booking Failed');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Search Bar */}
            <div className="card">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                    <input
                        placeholder="From (Origin)"
                        className="input-field flex-grow"
                        value={search.origin}
                        onChange={(e) => setSearch({ ...search, origin: e.target.value })}
                    />
                    <input
                        placeholder="To (Destination)"
                        className="input-field flex-grow"
                        value={search.destination}
                        onChange={(e) => setSearch({ ...search, destination: e.target.value })}
                    />
                    <button type="submit" className="btn-primary md:w-32">Search</button>
                </form>
            </div>

            {/* Map View */}
            {rides.length > 0 && (
                <RideMap rides={rides} height="300px" />
            )}

            {/* Results */}
            <div>
                <h3 className="text-xl font-bold mb-4">Available Rides</h3>
                {loading ? (
                    <p>Loading rides...</p>
                ) : rides.length === 0 ? (
                    <p className="text-gray-500">No rides found.</p>
                ) : (
                    <div className="grid gap-4">
                        {rides.map(ride => (
                            <div key={ride.id} className="card hover:shadow-xl transition-shadow border-l-4 border-l-primary flex justify-between items-center">
                                <div>
                                    <div className="text-lg font-bold text-gray-800">
                                        {ride.origin} <span className="text-gray-400 mx-2">➔</span> {ride.destination}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">
                                        📅 {new Date(ride.departureTime).toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        Driver: {ride.driver?.fullName} • 💺 {ride.seatsAvailable} seats left
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-bold text-green-600">Rs. {ride.pricePerSeat}</div>
                                    <button
                                        onClick={() => handleBook(ride.id)}
                                        className="mt-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black text-sm"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindRide;
