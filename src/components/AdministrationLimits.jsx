import React, { useEffect, useState } from 'react';
import {
  Source, Layer,
} from 'react-map-gl';

const BASE_ENDPOINT = 'https://montreal-parking.s3.ca-central-1.amazonaws.com';
const ENDPOINT_LIMADMIN = `${BASE_ENDPOINT}/limadmin.json`;

function AdministrationLimits() {
  const [neighbors, setNeighbors] = useState([]);

  useEffect(() => {
    fetch(ENDPOINT_LIMADMIN)
      .then((resp) => resp.json())
      .then((raw) => {
        setNeighbors(raw);
      });
  }, []);
  return (
    <Source type="geojson" data={neighbors}>
      <Layer
        type="fill"
        paint={{
          'fill-opacity': 0.5, 'fill-color': 'transparent',
        }}
      />
      <Layer
        type="line"
        paint={{
          'line-color': '#000', 'line-width': 1,
        }}
      />
    </Source>
  );
}

export default AdministrationLimits;
