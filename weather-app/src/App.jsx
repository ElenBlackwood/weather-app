import './style/main.scss';
import React, { useState } from 'react';
import axios from 'axios';
import WeekContainer from './components/WeekContainer';
import WeatherList from './components/WeatherList';
import Icon from './components/Icon';
import Header from './components/Header';
import Geo from './components/Geo';


function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');  
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=4029def04949287888e01704a84225f2`;
  
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
      })      
    }   
    }
  return (
  <section className={(typeof data.cod != "undefined") ? ((data.list[0].weather[0].description === 'light rain' && 'rain') ? 'app warm' : 
  (data.list[0].weather[0].description === 'clear sky' ) ? 'app clear' : 
  'app') : 'app'}>
    <Header />
    <div className='search-holder'>
      <input className='search'
        value={location} 
        onChange={event => setLocation(event.target.value)}
        onKeyDown={searchLocation}
        placeholder="Enter Location..."
        type="text" />
    </div>
    {( !!data.cod) ? (
    <div className='container'>    
      <div className='top'>
        <div className='temp'>
            <div className='flex-box'>
              <div className='text-holder'>
              <h1 className='app-title'>{data.city.name}, {data.city.country}</h1>
              <h2 ><WeatherList suffix='°C' value = {data.list[0].main.temp}/></h2>
              </div>
              <Icon icon={data.list[0].weather[0].icon}/>
            </div>
          </div>
          <div className='description'>
            <span>{data.list[0].weather[0].description}</span>
        </div>
      </div>           
      <div className='bottom'>
        <div className='wrapper'>
          <WeatherList suffix='°C' value = {data.list[0].main.feels_like}/>
          <p>Feels Like</p>
        </div>
        <span className='line'></span>
        <div className='wrapper'>
          <WeatherList percent='%' value = {data.list[0].main.humidity}/>
          <p>Humidity</p>
        </div>
        <span className='line'></span>
        <div className='wrapper'>
          <WeatherList speed='km/h' value = {data.list[0].wind.speed}/>
          <p>Wind Speed</p>
        </div>
      </div>
      <WeekContainer daily={data}/>  
    </div>  
  ) : (<Geo/>)}   
</section> 
  );
}

export default App;
