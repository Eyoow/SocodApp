import React from "react";
import Trip from "../trip";
import "./Trips.css";

const Trips = props => {
    return (
        
            props.trips.map((trip, index)=>{
            return(
                <Trip {...trip} key={index} {...props} />
            );
            })
    
    )
};

export default Trips;