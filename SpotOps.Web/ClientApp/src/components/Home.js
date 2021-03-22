import React, { Component } from 'react'
import Map from './map/Map'
import SpotList from './spots/SpotList';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Welcome to SpotOps</h1>
        <Map  isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />} 
        />
        <SpotList path="/spots" ></SpotList>
      </div>
    );
  }
}
