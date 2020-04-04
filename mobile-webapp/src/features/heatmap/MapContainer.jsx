import React from 'react';
import { useSelector } from 'react-redux';
import { selectHeatmapData, selectCenter } from './heatmapSlice';
import { selectLocationHistory } from '../account/accountSlice';
import { selectHome } from '../account/accountSlice';

import * as R from 'rambda';

import { GoogleMap, useLoadScript, HeatmapLayer } from '@react-google-maps/api';

import { apiKey } from './privateApiKey';

const libraries = ['places', 'visualization'];

const MapComponent = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey, //'AIzaSyAK1IYua9oUx47u1mlHFWO_gTMisITDIFg',
    libraries,
  });
  // const data = useSelector(selectHeatmapData);
  const data = useSelector(selectLocationHistory());
  const home = useSelector(selectHome);
  const center = useSelector(selectCenter);
  const mapCenter = home ? home : center;
  const renderMap = () => {
    const { google } = window;
    return (
      <GoogleMap
        id="example-map"
        zoom={12}
        center={mapCenter}
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
        onClick={(e) => {
          // dispatch(addData({ lat: e.latLng.lat(), lng: e.latLng.lng() }))
        }}
      >
        <HeatmapLayer
          data={R.map((p) => new google.maps.LatLng(p.lat, p.lng), data)}
        />
        {props.children}
      </GoogleMap>
    );
  };
  if (loadError) {
    return <h1>{loadError.message}</h1>;
  }
  return isLoaded ? renderMap() : <h1>Loading...</h1>;
};

export default MapComponent;
