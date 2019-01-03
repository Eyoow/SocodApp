import React from "react";
import "./trip.css";

const Trip = props =>{
    return(
        <div className="tripDiv">
            <div className="start-date">{props.trip.start}</div>
            <div className="end-date">{props.trip.end}</div>
            <div className="driver">{props.trip.driver.user_name}</div>
            <div className="riders"><ul>{props.trip.riders.map((rider,index) => <li key={index}>{rider.user_name}</li>)}</ul></div>
            <div className="stops">
            <ul>
                {props.trip.stops.map((stop,index) => {
                    return(
                        <li key={index}>{stop}</li>
                    );
                })}
            </ul>
            </div>
        </div>
    )
};

export default Trip;