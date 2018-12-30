import React from "react";
import Form from "../form";
import fields from "./fields";
import Trips from "../trips";
import API from "../../utils/API";
// import filterTrips from "./filterTrips.js";
import "./findTrips.css";

const FindTrips = props => {
    return(
        
        <Form {...props} fields = {fields} buttonLabel="Find Trips" onclick={()=>API.getTrips().then(trips =>{
            return <Trips {...props} trips={trips} />
        })} />      
    );

};

export default FindTrips;