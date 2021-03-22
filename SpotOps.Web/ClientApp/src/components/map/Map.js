import React, { useEffect, useState } from 'react'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import mapStyle from './MapStyles'
import spotService from '../spots/SpotService'

const options = {
  zoom: 12,
  //center: { lat: 39.7392, lng: -104.9903 },
  clickableIcons: true,
  styles: mapStyle
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

  const [center, setCenter] = useState()
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    console.log('Getting all the spots')
    getCurrentLocation()
    getSpotMarkers()
  }, [])


  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((pos) => {
        console.log('Setting Center: ', pos.coords.longitude);
        setCenter({
          lat : pos.coords.latitude,
          lng : pos.coords.longitude
        })
      })
    }
  }

  const getSpotMarkers = async() => {
    let spots = await spotService.getAll();

    console.log('Google Map: spots: ', spots)

    var i = 0.1;
    spots && spots.map(spot => {
      setMarkers(current => [
        ...current,
        {
          name: spot.name,
          lat: 39.7392 + i, 
          lng: -104.9903 + i,
          time: new Date()
        }
      ])
      i = i+0.1;
      console.log(i)
    })
  }

  return (
    <GoogleMap
      options={options}
      center={{ lat: ((center && center.lat) || 0), lng: ((center && center.lng) || 0) }}
    >
      <div>
      {props.isMarkerShown && 
        markers.map(marker => 
          <Marker 
            key={marker.time.toISOString()} 
            position={{lat: marker.lat , lng: marker.lng }} 
            icon={{
              url: '/bmx.svg',
              scaledSize: new window.google.maps.Size(50, 50),
              
            }}
          />
        )
      }
      </div>

    </GoogleMap>)
  }
)
   
export default Map;

// onClick={(e) => {
//   console.log(e)
//   setMarkers(current => [
//     ...current, 
//     {
//       lat: e.latLng.lat(),
//       lng: e.latLng.lng(),
//       time: new Date()
//     },
//   ])
// }}
