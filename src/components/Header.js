import React, {Component} from "react";
import moment from "moment";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSun} from '@fortawesome/free-solid-svg-icons';


class Header extends Component {
    constructor(props) {super(props);
        this.state = {
         currentDate: new Date(),
         markedDate: moment(new Date()).format("YYYY-MM-DD")
        };
       }

    render () {
        const today = this.state.currentDate;
        const day = moment(today).format("dddd");
        const date = moment(today).format("MMMM D, YYYY");
        return(
            <header className="header">
                <div className="container">
                <div className="flex-container">
                <div>
                    <span className="logo-icon"><FontAwesomeIcon icon={faSun} /><a className="logo"> 1SKY.App</a></span>
                </div>
                <span className="date">{day}, {date}</span>
            </div>
            </div>
            </header>
            
        )
    }
}

export default Header;

