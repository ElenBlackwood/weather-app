import React, {Component} from "react";

class WeatherList extends Component {
    render() {
        return (
            <span className='weather'>{Math.round(this.props.value)} {this.props.suffix} {this.props.percent} {this.props.speed} {this.props.pressure}</span>
        )
    }    
}

export default WeatherList;