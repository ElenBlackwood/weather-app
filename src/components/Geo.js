import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import WeatherList from "./WeatherList";
import Icon from './Icon';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTemperatureHigh , faWind, faDroplet, faSpinner} from '@fortawesome/free-solid-svg-icons';

function Geo () {
    const  [latitude, setLatitude] = useState(0);
    const  [longitude, setLongitude] = useState(0);
    const [weather, setWeather] = useState('');
    const [temp, setTemp] = useState();
    const [city, setCity] = useState ('');
    const [icon, setIcon] = useState (0);
    const [feels, Setfeels] = useState();;
    const [humidity, setHumidity] = useState();
    const [wind, setWind] =useState('')
    const [pressure, setPressure] = useState()

    const savePositionToState = (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude) 
    };    

    const fetchWeather = async () => {
        try {
            await window.navigator.geolocation.getCurrentPosition(savePositionToState);
            const res = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=4029def04949287888e01704a84225f2&units=metric`);
            setTemp(res.data.list[0].main.temp);
            setCity(res.data.city.name);
            setWeather(res.data.list[0].weather[0].main)
            console.log(res.data)
            setIcon(res.data.list[0].weather[0].icon)
            Setfeels(res.data.list[0].main.feels_like)
            setHumidity(res.data.list[0].main.humidity)
            setWind(res.data.list[0].wind.speed)
            setPressure(res.data.list[0].main.pressure)
        } catch (err) {
            console.error(err);
        };
    }
    useEffect(() => {
        fetchWeather()
    }, [longitude, latitude])

    return (
        <main className="main">
            <section >
            <div className="container">
                <div className="weather-card">
                    <div className="weather-holder">
                        <h2 className="weather-title">{city}</h2>
                        <WeatherList suffix='°C' value = {temp}/>
                        <div className="weather-wind">
                            <p>{weather}</p>
                        </div>
                    </div>  
                    <Icon icon={icon}/>          
                </div>                
            </div> 
            </section>
            <section>
                <div className="container">
                    <div className="block-holder">
                        <div className='block'>
                            <div className="text-holder">
                                <p><FontAwesomeIcon icon={faTemperatureHigh} />  Feels Like</p>
                            </div>
                            <WeatherList suffix='°C' value = {feels}/>                                                     
                        </div>
                        <div className='block'>
                            <div className="text-holder">
                                <p><FontAwesomeIcon icon={faDroplet} />  Humidity</p>
                            </div>
                            <WeatherList percent='%' value = {humidity}/>                                                      
                        </div>
                    </div>
                    <div className="block-holder">
                        <div className='block'>
                            <div className="text-holder">
                                    <p><FontAwesomeIcon icon={faWind} />  Wind Speed</p>
                            </div>
                            <WeatherList speed='km/h' value = {wind}/>                                                  
                        </div>
                        <div className='block'>
                            <div className="text-holder">
                                    <p><FontAwesomeIcon icon={faSpinner} /> Pressure</p>
                                </div>
                            <WeatherList pressure="hPa" value = {pressure}/>      
                        </div>
                    </div>            
                </div>            
            </section>
        </main>        
    );    
}

export default Geo;
