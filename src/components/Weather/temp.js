import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import "./style.css";

const Temp = () => {
 const [searchValue, setSearchValue] = useState("Khargone");
 const [tempInfo, setTempInfo] = useState({})

    const getWeathearInfo = async () => {
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=8bcb43392f077aec1d26e9c86be659b0
            `;

            let res = await fetch(url);
            let data = await res.json();

            const {temp,humidity,pressure} = data.main;
            const {main:weathermood} = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const {country, sunset} = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity, 
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            }

            setTempInfo(myNewWeatherInfo)

            console.log(data);
        } catch(error) {
             console.log(error);
        }
    }

    useEffect(() => {
        getWeathearInfo();
    }, []);
  return (
  <>
    <div className="wrap">
        <div className="search">
            <input 
                type="search"
                id="search" 
                placeholder='search...'
                autoFocus
                className='searchTerm'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <button 
                className="searchButton" 
                type='button'
                onClick={getWeathearInfo}
            >
                Search
            </button>
        </div>
    </div>   

      {/*our weather card  */}
      <WeatherCard tempInfo={tempInfo}/>
  </>
  )
};

export default Temp;
