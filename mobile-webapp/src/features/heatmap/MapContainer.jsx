import React from 'react'
import { apiKey } from './secret'
import {useSelector, useDispatch} from 'react-redux'
import {selectHeatmapData, addData} from './heatmapSlice'

import * as R from 'rambda'

import { GoogleMap, useLoadScript, HeatmapLayer } from '@react-google-maps/api'

const libraries = ['places','visualization']

// const gradient = [
//   'rgba(0, 255, 255, 0)',
//   'rgba(0, 255, 255, 1)',
//   'rgba(0, 191, 255, 1)',
//   'rgba(0, 127, 255, 1)',
//   'rgba(0, 63, 255, 1)',
//   'rgba(0, 0, 255, 1)',
//   'rgba(0, 0, 223, 1)',
//   'rgba(0, 0, 191, 1)',
//   'rgba(0, 0, 159, 1)',
//   'rgba(0, 0, 127, 1)',
//   'rgba(63, 0, 91, 1)',
//   'rgba(127, 0, 63, 1)',
//   'rgba(191, 0, 31, 1)',
//   'rgba(255, 0, 0, 1)'
// ];

const MapComponent = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:apiKey,
    libraries
  })
  const data = useSelector(selectHeatmapData)
  const dispatch = useDispatch()
  const renderMap = () => {
    const {google} = window
    return (
        <GoogleMap
          id='example-map'
          zoom={12}
          center={{
           lat: 59.329444,
           lng: 18.068611
          }}
          mapContainerStyle={{
            height: "400px",
            width: "800px"
          }}
          onClick={e => dispatch(addData({lat: e.latLng.lat(), lng: e.latLng.lng()}))}
        >
          <HeatmapLayer data={R.map(p => new google.maps.LatLng(p.lat, p.lng), data)} />
        </GoogleMap>
     )
        }
  return isLoaded ? renderMap() : <h1>Loading...</h1>
}

export default MapComponent
  