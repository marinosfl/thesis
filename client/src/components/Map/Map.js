import React, { useState, useEffect } from 'react';
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl';

import './Map.scss';

import pinImg from '../../assets/images/pin.svg';

const INITIAL_VIEWPORT = {
  latitude: 37.4343,
  longitude: 24.2332,
  zoom: 12
};

const Map = ({ latitude, longitude, handleClick }) => {
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [pin, setPin] = useState(null);

  useEffect(() => {
    getUserPosition();
  }, []);

  useEffect(() => {
    latitude && longitude && setPin({ latitude, longitude });
  }, [latitude, longitude]);

  const getUserPosition = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setViewport({ ...viewport, latitude, longitude });
      });
    }
  };

  return (
    <div className="map">
      <ReactMapGL
        style={{ margin: '0 auto' }}
        mapboxApiAccessToken="pk.eyJ1IjoibWFyaW5vcyIsImEiOiJjanVncXJmcngwNjdpNGRxbWFvenM3NG9uIn0.gtptB1exk301pMCgpMvzAQ"
        height="40rem"
        width="40rem"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={newViewport => setViewport(newViewport)}
        onClick={handleClick}
        {...viewport}
      >
        {/* Navigation Control */}
        <div className="navigationControl">
          <NavigationControl
            onViewportChange={newViewport => setViewport(newViewport)}
          />
        </div>
        {pin && (
          <Marker
            latitude={pin.latitude}
            longitude={pin.longitude}
            offsetLeft={-20}
            offsetTop={-40}
          >
            <img
              src={pinImg}
              alt="pin"
              style={{ height: '4rem', width: '4rem' }}
            />
          </Marker>
        )}
      </ReactMapGL>
    </div>
  );
};

export default Map;
