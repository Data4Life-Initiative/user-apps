import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectHeatmapData,
  selectCenter,
  fetchHotspotData,
} from './heatmapSlice';
// import { selectLocationHistory } from '../account/accountSlice';
import { selectHome } from '../account/accountSlice';
import { selectLoginState } from '../menu/loginSlice';

import * as R from 'rambda';

import { GoogleMap, useLoadScript, HeatmapLayer } from '@react-google-maps/api';

// import { apiKey } from './privateApiKey';

const libraries = ['places', 'visualization'];

const MapComponent = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAK1IYua9oUx47u1mlHFWO_gTMisITDIFg',
    libraries,
  });
  const data = useSelector(selectHeatmapData);
  const home = useSelector(selectHome);
  const center = useSelector(selectCenter);

  const { access_token } = useSelector(selectLoginState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (access_token && dispatch) {
      dispatch(fetchHotspotData(access_token));
    }
  }, [dispatch, access_token]);

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
          zoomControlOptions: { position: 8 },          
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
