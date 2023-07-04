import * as React from 'react';
import Constants from 'expo-constants';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const locations = require('./locations.json');
//const locations = { "1": { lat: 39.837917118760664, lng: -101.47794131398716 } };

const CENTER_UNITED_STATES = {
  lat: 39.837917118760664,
  lng: -101.47794131398716,
};

const USE_LEGACY = Constants.expoConfig.extra.useLegacy;

function MyMapComponent() {
  const mapDiv = React.useRef(null);
  const map = React.useRef(null);

  // Once the div is ready, initialize the map
  React.useEffect(() => {
    if (mapDiv.current) {
      map.current = new google.maps.Map(mapDiv.current, {
        mapId: 'DEMO_MAP_ID',
        center: CENTER_UNITED_STATES,
        zoom: 5,
      });

      const actualMarkers = [];

      for (const [key, marker] of Object.entries(locations)) {
        let actualMarker;
        if (USE_LEGACY) {
          actualMarker = new google.maps.Marker({
            position: {
              lat: marker.lat,
              lng: marker.lng,
            },
          });
        } else {
          actualMarker = new google.maps.marker.AdvancedMarkerElement({
            position: {
              lat: marker.lat,
              lng: marker.lng,
            },
            map: map.current,
          });
        }
        actualMarkers.push(actualMarker);
      }

      new MarkerClusterer({
        map: map.current,
        markers: actualMarkers,
      });
    }
  }, [mapDiv]);

  return (
    <div ref={mapDiv} style={{ width: "100%", height: "100%" }} />
  );
}

export default function App() {
  const renderLoading = (status) => {
    if (status == Status.LOADING) {
      return <h3>Loading...</h3>;
    }
    return null;
  };

  return (
    <Wrapper
      //apiKey={Constants.expoConfig.extra.apiKey}
      render={renderLoading}
      libraries={["marker"]}
    >
      <MyMapComponent />
    </Wrapper>
  );
}
