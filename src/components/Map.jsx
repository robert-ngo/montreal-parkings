import React from 'react';
import { Map as Mapbox } from 'react-map-gl';

function Map() {
  return (
    <Mapbox
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

export default Map;
