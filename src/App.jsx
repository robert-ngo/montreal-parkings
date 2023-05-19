import React from 'react';
import mapboxgl from 'mapbox-gl';
import ParkingMap from './components/ParkingMap';

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iZXJ0bmdvIiwiYSI6ImNsaHV3cjNnZDAzaDAzbGxpdzFnN2NxYzEifQ.ABlMviWnDpB-D4BJ96JXGA';
function App() {
  return (
    <ParkingMap />
  );
}

export default App;
