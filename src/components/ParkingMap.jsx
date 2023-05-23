import React, { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import Pin from './Pin';
import 'mapbox-gl/dist/mapbox-gl.css';

const ENDPOINT = 'https://montreal-parking.s3.ca-central-1.amazonaws.com/stationnements_h_2022_2023.geojson';

function ParkingMap() {
  const [pins, setPins] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    fetch(ENDPOINT)
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
        latitude: 45.509171,
        longitude: -73.553062,
        zoom: 12,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      style={{ height: 600 }}
    >
      {pins}

      {popupInfo && (
        <Popup longitude={popupInfo.Longitude} latitude={popupInfo.Latitude} anchor="top" onClose={() => setPopupInfo(null)}>
          <div>{ popupInfo.EMPLACEMENT }</div>
        </Popup>
      )}

    </Map>
  );
}

export default ParkingMap;
