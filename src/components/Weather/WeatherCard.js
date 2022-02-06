import React,  { useState }  from 'react';
import { useEffect } from 'react/cjs/react.development';

const WeatherCard = ({tempInfo}) => {
    const [weatherCurState, setWeatherCurState] = useState("")
    const {
        temp,
        humidity, 
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
    } = tempInfo;

    useEffect(() => {
        if(weathermood){
            switch (weathermood) {
                case "Clouds":
                    setWeatherCurState('wi-day-cloudy')
                    break;
                case "Haze":
                    setWeatherCurState('wi-fog')
                    break;
                case "Clear":
                    setWeatherCurState('wi-day-sunny')
                    break;
                case "Mist":
                    setWeatherCurState('wi-dust')
                    break;
            
                default:
                    setWeatherCurState('wi-day-sunny')
                    break;
            }
        }
    }, [weathermood])

    //converting the seconds into time 
    let sec = sunset;
    let date = new Date(sec * 1000);
    let timeStr = `${(date.getHours())%12}:${date.getMinutes()}`
  return (
      <>
        <article className="widget">
         <div className="weatherIcon">
             <i className={`wi ${weatherCurState}`}></i>
         </div>

         <div className="weatherInfo">
             <div className="temperature">
                 <span>{temp}&deg;</span>
             </div>

             <div className="description">
                 <div className="weatherCondition">{weathermood}</div>
                 <div className="place">{name}, {country}</div>
             </div>
         </div>

         <div className="date">{new Date().toLocaleString()}</div>

         {/* our four Column section*/}
         <div className="extra-temp">
             <div className="temp-info-minmax">
                 <div className="two-sided-section">
                     <p>
                         <i className={"wi wi-sunset"}></i>
                     </p>
                     <p className='extra-info-leftside'>
                        {timeStr} PM <br />
                        Sunset  
                     </p>
                 </div>
                 <div className="two-sided-section">
                     <p>
                         <i className={"wi wi-humidity"}></i>
                     </p>
                     <p className='extra-info-leftside'>
                        {humidity}% <br />
                        Humidity  
                     </p>
                 </div>
             </div>

             <div className="weather-extra-info">
             <div className="two-sided-section">
                     <p>
                         <i className={"wi wi-rain"}></i>
                     </p>
                     <p className='extra-info-leftside'>
                        {pressure} <br />
                        Pressure  
                     </p>
                 </div>
                 <div className="two-sided-section">
                     <p>
                         <i className={"wi wi-strong-wind"}></i>
                     </p>
                     <p className='extra-info-leftside'>
                        {speed} <br />
                        Speed  
                     </p>
                 </div>
             </div>
         </div>
     </article>
      
      </>
  )
};

export default WeatherCard;
