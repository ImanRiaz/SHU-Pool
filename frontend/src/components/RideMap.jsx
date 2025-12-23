import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon missing in Leaflet React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const RideMap = ({ rides, height = "400px" }) => {
    // Default center (can be adjusted or dynamic)
    const defaultCenter = [51.505, -0.09];

    return (
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <MapContainer center={defaultCenter} zoom={13} style={{ height: height, width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {rides && rides.map((ride, idx) => (
                    // Only show marker if ride has coordinates
                    (ride.startLat && ride.startLng) && (
                        <Marker key={idx} position={[ride.startLat, ride.startLng]}>
                            <Popup>
                                <b>{ride.origin}</b> to <b>{ride.destination}</b><br />
                                Price: Rs. {ride.pricePerSeat}
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>
        </div>
    );
};

export default RideMap;
