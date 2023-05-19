import React from 'react';
import mapboxgl from 'mapbox-gl';
import ParkingMap from './components/ParkingMap';
import './App.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iZXJ0bmdvIiwiYSI6ImNsaHV3cjNnZDAzaDAzbGxpdzFnN2NxYzEifQ.ABlMviWnDpB-D4BJ96JXGA';
function App() {
  return (
    <>
      <h1>Map here</h1>
      <ParkingMap />
    </>
  );
}

export default App;
