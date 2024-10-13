import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import moment from 'moment-timezone';

// Cities with their lat/lng and timezone
const cities = [
  { name: 'New York', lat: 40.7128, lng: -74.0060, timezone: 'America/New_York' },
  { name: 'London', lat: 51.5074, lng: -0.1278, timezone: 'Europe/London' },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, timezone: 'Asia/Tokyo' },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093, timezone: 'Australia/Sydney' },
  { name: 'Paris', lat: 48.8566, lng: 2.3522, timezone: 'Europe/Paris' }
];

// Custom icon for markers
const icon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const WorldClock = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleMarkerClick = (city) => {
    const localTime = moment.tz(city.timezone).format('HH:mm:ss');
    setSelectedCity({ ...city, localTime });
  };

  return (
    <div>
      <h1>Map-Based World Clock</h1>
      <MapContainer
        center={[20, 0]} // World center coordinates
        zoom={2}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {cities.map((city) => (
          <Marker
            key={city.name}
            position={[city.lat, city.lng]}
            icon={icon}
            eventHandlers={{
              click: () => handleMarkerClick(city),
            }}
          >
            <Popup>
              <div>
                <h3>{city.name}</h3>
                <p>
                  {selectedCity && selectedCity.name === city.name
                    ? `Local time: ${selectedCity.localTime}`
                    : 'Loading...'}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default WorldClock;
