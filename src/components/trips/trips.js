import React from "react";
import Trip from "../trip";
import "./Trips.css";

const Trips = props => {
    console.log(props.trips);
    return (
           
            props.trips.map((trip, index)=>{
            return(
                <Trip trip={trip} key={index} {...props} />
            );
            })
    
    )
};

export default Trips;