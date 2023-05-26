import React, { useEffect, useState } from 'react';
import Map, {
  Marker, Popup,
} from 'react-map-gl';
import Pin from './Pin';
import AdministrationLimits from './AdministrationLimits';

import 'mapbox-gl/dist/mapbox-gl.css';

const BASE_ENDPOINT = 'https://montreal-parking.s3.ca-central-1.amazonaws.com';
const ENDPOINT_STATIONNEMENTS = `${BASE_ENDPOINT}/stationnements_h_2022_2023.json`;

const MAP_STYLE = 'mapbox://styles/mapbox/streets-v9';

function ParkingMap() {
  const [pins, setPins] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    fetch(ENDPOINT_STATIONNEMENTS)
      .then((resp) => resp.json())
      .then((raw) => {
        const markers = raw.features.map(({ properties }) => (
          <Marker
            key={properties.ID_STA}
            longitude={properties.Longitude}
            latitude={properties.Latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(properties);
            }}
          >
            <Pin />
          </Marker>
        ));
        setPins(markers);
      })
      .catch((error) => console.error('Error loading data', error));
  }, []);

  return (
    <Map
      initialViewState={{
        latitude: 45.542861,
        longitude: -73.631253,
        zoom: 10,
      }}
      mapStyle={MAP_STYLE}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      style={{ height: 600 }}
    >
      <AdministrationLimits />

      {pins}

      {popupInfo && (
        <Popup longitude={popupInfo.Longitude} latitude={popupInfo.Latitude} anchor="top" onClose={() => setPopupInfo(null)}>
          <h4><strong>{ popupInfo.EMPLACEMENT }</strong></h4>
          <div>{`Borough: ${popupInfo.BOROUGH}`}</div>
          <div>{`Type pay: ${popupInfo.TYPE_PAY === 0 ? 'Gratuit' : 'Payant'}`}</div>
          <div>{`Heures: ${popupInfo.HEURES}`}</div>
        </Popup>
      )}

    </Map>
  );
}

export default ParkingMap;
