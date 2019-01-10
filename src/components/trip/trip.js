import React from "react";
import "./trip.css";

const Trip = props =>{
    return(
        <div className="tripDiv">
            <div className="start-date">{props.trip.start}</div>
            <div className="end-date">{props.trip.end}</div>
            <div className="driver"><a href={`./user/${props.trip.driver.user_name}`}>{props.trip.driver.user_name}</a></div>
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