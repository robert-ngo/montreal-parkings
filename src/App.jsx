import React from 'react';
import mapboxgl from 'mapbox-gl';
import ParkingMap from './components/ParkingMap';
import './index.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Stationnements gratuits et payants (déneigement)
      </h1>
      <ParkingMap />
    </>

  );
}

export default App;
