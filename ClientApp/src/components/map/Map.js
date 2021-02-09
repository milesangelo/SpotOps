import React from 'react'
import { compose, withProps } from "recompose"
import google, { LoadScript, withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import mapStyle from './MapStyles'

const options = {
  zoom: 8,
  center: { lat: 39.7392, lng: -104.9903 },
  clickableIcons: true,
  //styles: mapStyle
}

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {

  const [markers, setMarkers] = React.useState([]);

  return (
    <GoogleMap
      options={options}
      onClick={(e) => {
        console.log(e)
        setMarkers(current => [
          ...current, 
          {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            time: new Date()
          },
        ])
      }}
    >
      <div>
      {props.isMarkerShown && 
        
        markers.map(marker => {
          return(
          <Marker 
            key={marker.time.toISOString()} 
            position={{lat: marker.lat , lng: marker.lng }} 
            icon={{
              url: '/bmx.svg',
              scaledSize: new window.google.maps.Size(50, 50),
              
            }}
          />
          )
        })
      }
      </div>

    </GoogleMap>)
}
)
   
export default Map;
    
