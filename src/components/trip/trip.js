import React from "react";
import "./trip.css";

const Trip = props =>{

    return(
        <div className="tripDiv">
            <div className="start-date">{props.start}</div>
            <div className="end-date">{props.end}</div>
            <div className="driver">{props.driver}</div>
            <div className="stops">
            <ul>
                {props.stops.map(stop => {
                    return(
                        <li>{stop}</li>
                    );
                })}
            </ul>
            </div>
        </div>
    )
};

export default Trip;