import React from 'react';
import mapboxgl from 'mapbox-gl';
import ParkingMap from './components/ParkingMap';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
function App() {
  return (
    <ParkingMap />
  );
}

export default App;
