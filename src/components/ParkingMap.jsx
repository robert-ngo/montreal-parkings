import React from 'react';
import { useQuery } from 'react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

import 'mapbox-gl/dist/mapbox-gl.css';

import Map from './Map';

const URL = 'http://localhost:3000/stationnements';

function ParkingMap() {
  const {
    isLoading, error, data,
  } = useQuery(['stationnements'], () => axios.get(URL).then((res) => res.data));

  if (isLoading) return 'Loading...';

  if (error) return `An error has occured: ${error.message}`;

  console.log(data);

  return (
    <Map />
  );
}

export default ParkingMap;
