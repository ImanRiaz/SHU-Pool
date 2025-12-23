import axios from 'axios';

// OpenStreetMap Nominatim API (Free, rate limited)
const GEOCODE_URL = "https://nominatim.openstreetmap.org/search";

const searchAddress = async (query) => {
    try {
        const response = await axios.get(GEOCODE_URL, {
            params: {
                q: query,
                format: 'json',
                limit: 1
            }
        });

        if (response.data && response.data.length > 0) {
            return {
                lat: parseFloat(response.data[0].lat),
                lon: parseFloat(response.data[0].lon),
                display_name: response.data[0].display_name
            };
        }
        return null;
    } catch (error) {
        console.error("Geocoding failed", error);
        return null;
    }
};

const GeocodeService = {
    searchAddress
};

export default GeocodeService;
