import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectHeatmapData, addData } from './heatmapSlice';

import * as R from 'rambda';

import { GoogleMap, useLoadScript, HeatmapLayer } from '@react-google-maps/api';

const libraries = ['places', 'visualization'];

const MapComponent = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: window.ENV.GOOGLE_API_KEY,
    libraries,
  });
  const data = useSelector(selectHeatmapData);
  const dispatch = useDispatch();
  const renderMap = () => {
    const { google } = window;
    return (
      <GoogleMap
        id="example-map"
        zoom={12}
        center={{
          lat: 59.329444,
          lng: 18.068611,
        }}
        mapContainerStyle={{
          height: '100%',
          width: '100%',
        }}
        options={{
          mapTypeControl: false,
          zoomControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
        onClick={(e) =>
          dispatch(addData({ lat: e.latLng.lat(), lng: e.latLng.lng() }))
        }
      >
        <HeatmapLayer
          data={R.map((p) => new google.maps.LatLng(p.lat, p.lng), data)}
        />
        {props.children}
      </GoogleMap>
    );
  };
  if (loadError) console.error(loadError);
  return isLoaded ? renderMap() : <h1>Loading...</h1>;
};

export default MapComponent;
