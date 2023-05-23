import React from 'react';
import mapboxgl from 'mapbox-gl';
import ParkingMap from './components/ParkingMap';
import './index.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
function App() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl lg:text-center py-24 sm:py-32">
        <h2 className="text-base font-semibold leading-7 text-indigo-600">Data par Données ouvertes de la Ville de Montréal</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          🚗 Stationnements gratuits et payants (déneigement) ❄️🚜
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Localisation des stationnements gratuits et payants disponibles durant les
          opérations de déneigement. Les données sont également visibles
          sur l&apos;application&nbsp;
          <a href="https://montreal.ca/sujets/deneigement-des-trottoirs-et-des-rues" target="_blank" rel="noreferrer">INFO-Neige MTL</a>
          .
        </p>
      </div>
      <ParkingMap />
    </div>

  );
}

export default App;
