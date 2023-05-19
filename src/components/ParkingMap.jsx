import React from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function ParkingMap() {
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      style={{ height: 600 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
}

export default ParkingMap;
