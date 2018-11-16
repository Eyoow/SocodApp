import React from "react";
import Trip from "../trip";
// import filterTrips from "./filterTrips.js";
import "./findTrips.css";

const FindTrips = props => {
    return(
        props.trips.map(trip=>{
            return <Trip {...trip} />;
            }
        )
    );

};

export default FindTrips;