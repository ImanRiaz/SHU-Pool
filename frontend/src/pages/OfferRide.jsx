import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RideService from '../services/ride.service';
import AuthService from '../services/auth.service';
import GeocodeService from '../services/geocode.service';
import { calculateDistance } from '../utils/distance';
import { toast } from 'react-toastify';

const OfferRide = () => {
    const user = AuthService.getCurrentUser();
    const navigate = useNavigate();

    // Access Control
    if (!user || !user.roles || !user.roles.includes('ROLE_DRIVER')) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="p-8 text-center bg-red-50 border border-red-200 rounded-lg text-red-600">
                    <h3 className="text-lg font-bold">Access Denied</h3>
                    <p>Only Drivers can offer rides.</p>
                </div>
            </div>
        );
    }

    const [formData, setFormData] = useState({
        origin: '',
        destination: '',
        departureTime: '',
        seatsOffered: 3,
        pricePerSeat: 0,
        startLat: 0,
        startLng: 0,
        endLat: 0,
        endLng: 0
    });

    const [fareDetails, setFareDetails] = useState({
        distance: 0,
        mileage: 15, // km/l
        fuelPrice: 300, // Rs/L
        totalFuelCost: 0,
        suggestedFare: 0
    });

    // Calculate Fare Logic
    const calculateFare = () => {
        if (formData.startLat && formData.endLat) {
            const dist = calculateDistance(formData.startLat, formData.startLng, formData.endLat, formData.endLng);
            const fuelNeeded = dist / fareDetails.mileage;
            const totalCost = fuelNeeded * fareDetails.fuelPrice;

            // Total people = Driver (1) + Seats Offered
            const totalPeople = 1 + parseInt(formData.seatsOffered || 3);
            const costPerPerson = totalCost / totalPeople;

            setFareDetails(prev => ({
                ...prev,
                distance: dist.toFixed(2),
                totalFuelCost: totalCost.toFixed(0),
                suggestedFare: Math.ceil(costPerPerson)
            }));

            // Auto-update the main form price
            setFormData(prev => ({ ...prev, pricePerSeat: Math.ceil(costPerPerson) }));
        }
    };

    // Effect: Recalculate when dependencies change
    useEffect(() => {
        calculateFare();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.startLat, formData.startLng, formData.endLat, formData.endLng, formData.seatsOffered, fareDetails.mileage, fareDetails.fuelPrice]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBlur = async (e) => {
        // Auto-geocode on blur
        const { name, value } = e.target;
        if (value && (name === 'origin' || name === 'destination')) {
            const location = await GeocodeService.searchAddress(value);
            if (location) {
                if (name === 'origin') {
                    setFormData(prev => ({ ...prev, startLat: location.lat, startLng: location.lon }));
                    toast.info(`Found Origin: ${location.display_name.substring(0, 30)}...`);
                } else {
                    setFormData(prev => ({ ...prev, endLat: location.lat, endLng: location.lon }));
                    toast.info(`Found Destination: ${location.display_name.substring(0, 30)}...`);
                }
            } else {
                toast.error(`Could not find location for ${name}`);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await RideService.offerRide(formData);
            toast.success('Ride Offered Successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error('Failed to offer ride. Try again.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-8">
            <div className="card shadow-xl p-6 bg-white rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-primary">Offer a Ride</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Locations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
                            <input
                                name="origin"
                                placeholder="e.g. Campus Gate 1"
                                className="input-field w-full p-2 border rounded"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                            <input
                                name="destination"
                                placeholder="e.g. City Center"
                                className="input-field w-full p-2 border rounded"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                        </div>
                    </div>

                    {/* Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
                        <input
                            name="departureTime"
                            type="datetime-local"
                            className="input-field w-full p-2 border rounded"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Smart Fare Calculation UI */}
                    <div className="bg-blue-50 p-4 rounded-lg space-y-3 border border-blue-200">
                        <h3 className="font-bold text-blue-800 flex items-center gap-2">
                            ⛽ Smart Fare Calculator
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase">Vehicle Mileage (km/l)</label>
                                <input
                                    type="number"
                                    className="input-field w-full p-1 border rounded text-sm"
                                    value={fareDetails.mileage}
                                    onChange={(e) => setFareDetails({ ...fareDetails, mileage: parseFloat(e.target.value) || 0 })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase">Fuel Price (Rs/L)</label>
                                <input
                                    type="number"
                                    className="input-field w-full p-1 border rounded text-sm"
                                    value={fareDetails.fuelPrice}
                                    onChange={(e) => setFareDetails({ ...fareDetails, fuelPrice: parseFloat(e.target.value) || 0 })}
                                />
                            </div>
                        </div>

                        {(fareDetails.distance > 0) && (
                            <div className="text-sm space-y-1 pt-2 border-t border-blue-200 text-blue-900">
                                <p>📏 Trip Distance: <b>{fareDetails.distance} km</b></p>
                                <p>💰 Total Fuel Cost: <b>Rs. {fareDetails.totalFuelCost}</b></p>
                                <p>👥 Splitting between <b>{parseInt(formData.seatsOffered || 3) + 1} people</b> (You + Passengers)</p>
                                <p className="text-lg font-bold text-right">Suggested Fare: Rs. {fareDetails.suggestedFare} / person</p>
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Seats Available</label>
                            <input
                                name="seatsOffered"
                                type="number"
                                min="1"
                                max="6"
                                className="input-field w-full p-2 border rounded"
                                value={formData.seatsOffered}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price per Seat (Rs)</label>
                            <input
                                name="pricePerSeat"
                                type="number"
                                min="0"
                                className="input-field w-full p-2 border rounded"
                                value={formData.pricePerSeat}
                                onChange={handleChange}
                            />
                            <p className="text-xs text-gray-500 mt-1">Auto-calculated based on fuel.</p>
                        </div>
                    </div>

                    <button type="submit" className="btn-primary w-full py-3 mt-4 bg-primary text-white rounded font-bold hover:opacity-90 transition">
                        Post Ride
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OfferRide;
