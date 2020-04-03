import React, {Component} from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';

import { apiKey } from './secret'

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={13}
        style={mapStyles}
        initialCenter={{
         lat: 59.329444,
         lng: 18.068611
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey
})(MapContainer);
