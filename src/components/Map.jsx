import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Map as Mapbox } from 'react-map-gl';

function Map({ center: { latitude, longitude }, zoom, height }) {
  return (
    <Mapbox
      initialViewState={{
        longitude,
        latitude,
        zoom,
      }}
      style={{ height }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
}

export default Map;

Map.propTypes = {
  center: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  zoom: PropTypes.number,
  height: PropTypes.string,
};

Map.defaultProps = {
  center: {
    latitude: 45.501690,
    longitude: -73.567253,
  },
  zoom: 12,
  height: '800px',
};
