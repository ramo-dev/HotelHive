import { useState, useEffect } from "react";

const useLocationInfo = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [locationData, setLocationData] = useState([]);
  const geoAPI = import.meta.env.VITE_IP_GEOLOCATION;

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.log("Error fetching IP address");
      }
    };

    fetchIpAddress();
  }, []);

  useEffect(() => {
    const fetchLocationInfo = async () => {
      try {
        const response = await fetch(
          `https://api.ipgeolocation.io/ipgeo?apiKey=${geoAPI}&ip=${ipAddress}`
        );
        const data = await response.json();
        setLocationData(data);
        console.log(data);
      } catch (error) {
        console.log("Error fetching location information");
      }
    };

    if (ipAddress) {
      fetchLocationInfo();
    }
  }, [ipAddress]);

  return { ipAddress, locationData };
};

export default useLocationInfo;
