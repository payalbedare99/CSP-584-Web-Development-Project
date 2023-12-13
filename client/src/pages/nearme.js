import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { Button, Container } from "react-bootstrap";
import Marker from "../components/marker";
import Layout from "../components/layout";

const MapWindow = () => {
  const [map, setMap] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [finalZipCodes, setFinalZipCodes] = useState([]);
  // var finalZipCodes = [];

  const handleClick = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
    handleShowMap();
  };

  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 1));
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (map) {
      console.log("Map is ready:", map);
    }
  }, [map]);

  const defaultCenter = { lat: 41.881832, lng: -87.623177 };
  const defaultZoom = 10;

  const places = [
    { zipcode: "60130", lat: 41.86847, lng: -87.81878 },
    { zipcode: "60301", lat: 41.88864, lng: -87.79822 },
    { zipcode: "60302", lat: 41.89437, lng: -87.79011 },
    { zipcode: "60304", lat: 41.87247, lng: -87.78934 },
    { zipcode: "60305", lat: 41.89396, lng: -87.81977 },
    { zipcode: "60402", lat: 41.82867, lng: -87.78985 },
    { zipcode: "60456", lat: 41.73114, lng: -87.73128 },
    { zipcode: "60459", lat: 41.74541, lng: -87.77036 },
    { zipcode: "60534", lat: 41.81327, lng: -87.82113 },
    { zipcode: "60546", lat: 41.83696, lng: -87.8289 },

    { zipcode: "60601", lat: 41.8876, lng: -87.619 },
    { zipcode: "60602", lat: 41.8837, lng: -87.6325 },
    { zipcode: "60603", lat: 41.8801, lng: -87.6252 },
    { zipcode: "60604", lat: 41.8784, lng: -87.6331 },
    { zipcode: "60605", lat: 41.8654, lng: -87.6187 },
    { zipcode: "60606", lat: 41.8826, lng: -87.6374 },
    { zipcode: "60607", lat: 41.8744, lng: -87.6435 },
    { zipcode: "60608", lat: 41.8468, lng: -87.6709 },
    { zipcode: "60609", lat: 41.8129, lng: -87.6565 },
    { zipcode: "60610", lat: 41.9066, lng: -87.6313 },
    { zipcode: "60611", lat: 41.8938, lng: -87.6331 },
    { zipcode: "60612", lat: 41.8807, lng: -87.6874 },
    { zipcode: "60613", lat: 41.9541, lng: -87.6546 },
    { zipcode: "60614", lat: 41.9224, lng: -87.6489 },
    { zipcode: "60615", lat: 41.8017, lng: -87.5964 },
    { zipcode: "60616", lat: 41.8449, lng: -87.6326 },
    { zipcode: "60617", lat: 41.7224, lng: -87.5526 },
    { zipcode: "60618", lat: 41.9474, lng: -87.7037 },
    { zipcode: "60619", lat: 41.7434, lng: -87.6051 },
    { zipcode: "60620", lat: 41.7406, lng: -87.6555 },
    { zipcode: "60621", lat: 41.7769, lng: -87.6413 },
    { zipcode: "60622", lat: 41.9027, lng: -87.6838 },
    { zipcode: "60623", lat: 41.8494, lng: -87.7174 },
    { zipcode: "60624", lat: 41.8806, lng: -87.7237 },
    { zipcode: "60625", lat: 41.9742, lng: -87.692 },
    { zipcode: "60629", lat: 41.7758, lng: -87.7112 },
    { zipcode: "60632", lat: 41.8106, lng: -87.7234 },
    { zipcode: "60636", lat: 41.7755, lng: -87.6704 },
    { zipcode: "60637", lat: 41.7814, lng: -87.5967 },
    { zipcode: "60638", lat: 41.7424, lng: -87.7737 },
    { zipcode: "60639", lat: 41.9207, lng: -87.7568 },
    { zipcode: "60640", lat: 41.9728, lng: -87.6639 },
    { zipcode: "60641", lat: 41.9463, lng: -87.7463 },
    { zipcode: "60642", lat: 41.9025, lng: -87.6564 },
    { zipcode: "60644", lat: 41.8806, lng: -87.7564 },
    { zipcode: "60647", lat: 41.9215, lng: -87.701 },
    { zipcode: "60651", lat: 41.9023, lng: -87.7402 },
    { zipcode: "60652", lat: 41.7457, lng: -87.7115 },
    { zipcode: "60653", lat: 41.8193, lng: -87.6068 },
    { zipcode: "60654", lat: 41.8889, lng: -87.6359 },
    { zipcode: "60657", lat: 41.9401, lng: -87.653 },
    { zipcode: "60661", lat: 41.8832, lng: -87.6445 },
    { zipcode: "60804", lat: 41.7441, lng: -87.7835 },
    { zipcode: "60805", lat: 41.7222, lng: -87.7015 },
  ];

  useEffect(() => {
    const randomZipCodes = getRandomZipCodes(places);
    // finalZipCodes = [...randomZipCodes];
    setFinalZipCodes([...randomZipCodes]);
    // console.log('final: ', finalZipCodes);
  }, []);

  useEffect(() => {
    // This will log the updated state when finalZipCodes changes
    console.log("final: ", finalZipCodes);
  }, [finalZipCodes]);

  const handleShowMap = () => {
    setShowMap(true);
  };

  function gotLocation(position) {
    console.log("Latitude: ", position.coords.latitude);
    console.log("Longitude: ", position.coords.longitude);
    // getZipCode(position.coords.latitude, position.coords.longitude);
  }

  function failedToGet() {
    console.log("There was some issue.");
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomZipCodes(zipCodeArray) {
    const count = getRandomInt(10, 15);
    const shuffledArray = zipCodeArray.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, count);
  }

  return (
    <Layout>
      <div>
        <div className="mt-4" style={{ textAlign: "center" }}>
          <Button
            variant="dark"
            disabled={isLoading}
            onClick={!isLoading ? handleClick : null}
            style={{}}
          >
            {isLoading ? "Loading…" : "Click to get the repairmates near you"}
          </Button>
        </div>
        {showMap ? (
          <div style={{ height: "600px", width: "100%", marginTop: "20px" }}>
            {/* <h1>Hello {finalZipCodes.map((place) => place.lat)}</h1> */}
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyC-n_YHaxbxsghNiqSMKoLxMvdEDVpm6kg",
              }}
              defaultCenter={defaultCenter}
              defaultZoom={defaultZoom}
              onGoogleApiLoaded={({ map }) => setMap(map)}
            >
              {finalZipCodes.map((place) => (
                <Marker
                  key={place.zipcode}
                  lat={place.lat}
                  lng={place.lng}
                  text={place.zipcode}
                />
              ))}
            </GoogleMapReact>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: " 100px 0px" }}>
            <p className="text-secondary">Click to get the Providers</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MapWindow;
