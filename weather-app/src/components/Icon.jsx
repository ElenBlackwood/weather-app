import React, {Component} from "react";

class Icon extends Component {

    render() {
        return (
            <div className="img-holder">
                    <img src={this.props.icon && "http://openweathermap.org/img/wn/" + this.props.icon + "@4x.png"} alt="" />
                </div>
        )
    }    
}

export default Icon;