import React , {Component} from 'react';
import WeatherList from './WeatherList';
import Icon from './Icon';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTemperatureArrowDown, faTemperatureArrowUp} from '@fortawesome/free-solid-svg-icons';

class WeekContainer extends Component {  
  render () {   
    const dailyData = this.props.daily.list.filter (reading => {
      return reading.dt_txt.includes("18:00:00")
    });

  return (
    <section className='daily-section'>
      <div className='container'>
        <h2 className='daily-title'> 5 DAY FORECAST</h2>
        <div className='card-holder'>
          {dailyData.map ((day, index) => (
            <div className='card'  key={`${day.dt}_${index}`}>
              <ul className='card-list'>
                  <li className='card-item name' key={day.name}>
                    {new Date ((day.dt*1000)).toLocaleString("en-Us", {weekday: 'long'})}
                  </li>
                  <li className='card-item'>
                    <Icon icon = {day.weather[0].icon}/>
                  </li>
                  <li className='card-item' key={day.maxtemp}>
                    <FontAwesomeIcon className='tepm-icon' icon={faTemperatureArrowDown} />                    
                    <WeatherList suffix='°C' value = {day.main.temp_min}/>
                  </li>
                  <li className='card-item' key={day.mintemp}>
                    <FontAwesomeIcon className='tepm-icon' icon={faTemperatureArrowUp} />
                    <WeatherList suffix='°C' value = {day.main.temp_max}/>
                  </li>
              </ul>
              {index !== dailyData.length - 1 && <span className='bottom-line'></span>}
             
            </div>  
          ))}
          </div>
        </div>    
    </section>      
  );
  }
}

export default WeekContainer;