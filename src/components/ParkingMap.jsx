import React, { useEffect, useState, useCallback } from 'react';
import Map, {
  Source, Layer, Marker, Popup,
} from 'react-map-gl';
import Pin from './Pin';
import 'mapbox-gl/dist/mapbox-gl.css';

const BASE_ENDPOINT = 'https://montreal-parking.s3.ca-central-1.amazonaws.com';
const ENDPOINT_STATIONNEMENTS = `${BASE_ENDPOINT}/stationnements_h_2022_2023.geojson`;
const ENDPOINT_LIMADMIN = `${BASE_ENDPOINT}/limadmin.geojson`;

function ParkingMap() {
  const [pins, setPins] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);

  const [neighbors, setNeighbors] = useState([]);
  const [hoverInfo, setHoverInfo] = useState(null);

  const onHover = useCallback((event) => {
    const {
      features,
      point: { x, y },
    } = event;

    const hoveredFeature = features && features[0];

    // prettier-ignore
    setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
  }, []);

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

    fetch(ENDPOINT_LIMADMIN)
      .then((resp) => resp.json())
      .then((raw) => {
        setNeighbors(raw);
      });
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
      interactiveLayerIds={['neighbors']}
      onMouseMove={onHover}
    >
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
      {hoverInfo && (
        <div className="toolTip">
          <div>{hoverInfo.properties.NOM}</div>
        </div>
      )}

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
