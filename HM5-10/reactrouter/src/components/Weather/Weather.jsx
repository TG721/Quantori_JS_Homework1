import React, { useEffect, useState } from 'react';
import SunnyWithCloud from './images/SunnyWithCloud.svg';
import './Weather.css';

  function Weather(props){
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const API_KEY = '6359e9dba2064bbeb8a213808230105';
    const LOCATION = props.location;

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${LOCATION}`);
          if (!response.ok) {
            throw new Error('Failed to fetch weather data');
          }
          const json = await response.json();
          setData(json);
        } catch (error) {
          setError(error.message);
          setData(null);
        }
      }
  
      fetchData();
    }, [API_KEY, LOCATION]);
  
    if (error) {
      return (
        <div className='weather'>
          <img src={SunnyWithCloud} alt="logo of weather" /> 
          <span className='bold'>Error: {error}</span>
        </div>
      );
    } 
    else if (!data) {
      return (
        <div className='weather'>
          <img src={SunnyWithCloud} alt="logo of weather" /> 
          <span className='bold'>Loading...</span>
        </div>
      );
    } 
      else {
        //accessing location and current data:
        const location = data.location;
        const current = data.current;
    
        return (
            <div className='weather'>
                <img src={SunnyWithCloud} alt="logo of weather" /> 
                <span className='temperature bold'>{current.temp_c + "°C"}</span> 
                <span className='city'>{location.name}</span>
            </div>
        )
    }
}

export default React.memo(Weather);