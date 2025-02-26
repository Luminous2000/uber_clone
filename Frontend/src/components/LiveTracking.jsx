import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useSearchParams } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "100%",
};
const center = {
  lat: +5.3,
  lng: -5.3,
};

const LiveTracking = () => {
  const [currentPosition, setcurrentPosition] = useState(center);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setcurrentPosition({ lat: latitude, lng: longitude });
    });

    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setcurrentPosition({ lat: latitude, lng: longitude });
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setcurrentPosition({
          lat: latitude,
          lng: longitude,
        });
      });
    };

    updatePosition();

    const interval = setInterval(updatePosition, 5 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={17}
      >
        <Marker position={currentPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveTracking;
