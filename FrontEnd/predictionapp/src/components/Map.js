// Map.js
import React, { useState, useEffect } from 'react'; 
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getDistance } from 'geolib';
import { useLocation } from 'react-router-dom';

import 'leaflet/dist/leaflet.css';


import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;



const portCoordinates = {
  'Adelaide': [-34.9285, 138.6007],
  'Albury': [-36.0737, 146.9135],
  'Alice Springs': [-23.6980, 133.8807],
  'Armidale': [-30.5013, 151.6658],
  'Ayers Rock': [-25.2406, 130.9889],
  'Ballina': [-28.8377, 153.5618],
  'Brisbane': [-27.4698, 153.0251],
  'Broome': [-17.9614, 122.2359],
  'Bundaberg': [-24.8662, 152.3489],
  'Cairns': [-16.9203, 145.7707],
  'Canberra': [-35.2809, 149.1300],
  'Coffs Harbour': [-30.2963, 153.1146],
  'Darwin': [-12.4634, 130.8456],
  'Dubbo': [-32.2569, 148.6010],
  'Emerald': [-23.5265, 148.1587],
  'Geraldton': [-28.7747, 114.6143],
  'Gladstone': [-23.8483, 151.2624],
  'Gold Coast': [-28.0167, 153.4000],
  'Hamilton Island': [-20.3484, 148.9563],
  'Hobart': [-42.8821, 147.3272],
  'Kalgoorlie': [-30.7489, 121.4656],
  'Karratha': [-20.7364, 116.8460],
  'Launceston': [-41.4299, 147.1574],
  'Mackay': [-21.1410, 149.1860],
  'Melbourne': [-37.8136, 144.9631],
  'Mildura': [-34.2082, 142.1245],
  'Moranbah': [-22.0016, 148.0463],
  'Mount Isa': [-20.7252, 139.4973],
  'Newcastle': [-32.9283, 151.7817],
  'Newman': [-23.3585, 119.7315],
  'Perth': [-31.9505, 115.8605],
  'Port Hedland': [-20.3104, 118.6060],
  'Port Lincoln': [-34.7263, 135.8668],
  'Port Macquarie': [-31.4308, 152.9089],
  'Proserpine': [-20.4014, 148.5800],
  'Rockhampton': [-23.3797, 150.5100],
  'Sunshine Coast': [-26.6500, 153.0667],
  'Sydney': [-33.8688, 151.2093],
  'Tamworth': [-31.0926, 150.9320],
  'Townsville': [-19.2589, 146.8169],
  'Wagga Wagga': [-35.1080, 147.3598]
};

function Map() {
  const location = useLocation();  // Get the location object that contains the state

  const { departing_port, arriving_port, month, year } = location.state || {};  // Destructure the state from location

  console.log(location);

  const [departingCoords, setDepartingCoords] = useState(null);
  const [arrivingCoords, setArrivingCoords] = useState(null);
  const [calculatedDistance, setCalculatedDistance] = useState(null);

  useEffect(() => {
    // Debugging: Check the location state
    console.log('Location State:', location.state);

    if (!departing_port || !arriving_port) {
      console.error('Invalid port data. Please ensure both departing and arriving ports are provided.');
      return;
    }

    const depCoords = portCoordinates[departing_port];
    const arrCoords = portCoordinates[arriving_port];

    // Debugging: Check if the coordinates exist in the map
    console.log('Departing Coordinates:', depCoords);
    console.log('Arriving Coordinates:', arrCoords);

    if (!depCoords || !arrCoords) {
      console.error('Invalid port coordinates. Please ensure the ports exist in the portCoordinates map.');
      return;
    }

    setDepartingCoords(depCoords);
    setArrivingCoords(arrCoords);

    // Calculate the distance using geolib
    const dist = getDistance(depCoords, arrCoords) / 1000; // Convert to km
    setCalculatedDistance(dist);
  }, [departing_port, arriving_port]);

  if (!departingCoords || !arrivingCoords) return <p>You can also check out the map locations</p>;

  return (
    <div>
      <MapContainer center={departingCoords} zoom={6} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={departingCoords}>
          <Popup>
            <b>Departing Port:</b> {departing_port}
          </Popup>
        </Marker>
        <Marker position={arrivingCoords}>
          <Popup>
            <b>Arriving Port:</b> {arriving_port}
          </Popup>
        </Marker>
        <Polyline positions={[departingCoords, arrivingCoords]} color="blue" />
      </MapContainer>

      {/* Distance display */}
      <div className="distance-info" style={{ marginTop: '20px' }}>
        <h4>Flight Information:</h4>
        <p><b>Month:</b> {month}</p>
        <p><b>Year:</b> {year}</p>
        <p><b>Distance:</b> {calculatedDistance ? `${calculatedDistance.toFixed(2)} km` : 'Calculating...'}</p>
      </div>
    </div>
  );
}

export default Map;
