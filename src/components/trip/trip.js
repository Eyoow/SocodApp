import React from "react";
import Button from "../button";
import "./trip.css";

const Trip = props =>{
    console.log(props.trip);
    return(
        <div className="tripDiv">
            <div className="start-date">{props.trip.dates[0]}</div>
            <div className="end-date">{props.trip.dates[props.trip.dates.length -1]}</div>
            <div className = "start-location">{props.trip.start}</div>
            <div className = "end-location">{props.trip.end}</div>
            <div className="driver"><a href={`./user/${props.trip.driver.user_name}`}>{props.trip.driver.user_name}</a></div>
            <div className="riders"><ul>{props.trip.riders.map((rider,index) => {
            console.log(rider);
            return <li key={index}>{rider.user_name}</li>;
            })}</ul></div>
            <div className="open-seats">Open Seats: {props.trip.max_riders-props.trip.riders.length}</div>
            <Button label = "Join Trip" onclick={props.joinTrip} />
            <div className="stops">
            <ul>
                {/* {props.trip.stops.map((stop,index) => {
                    return(
                        <li classkey={index}>{stop}</li>
                    );
                })} */}
            </ul>
            </div>
        </div>
    )
};

export default Trip;