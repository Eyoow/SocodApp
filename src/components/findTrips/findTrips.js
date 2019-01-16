import React, {Component} from "react";
import Form from "../form";
import fields from "./fields";
import Trip from "../trip";
import API from "../../utils/API";
import getDistance from "../../utils/getDistance";
// import filterTrips from "./filterTrips.js";
import "./findTrips.css";
import Axios from "axios";

class FindTrips extends Component{
    
    constructor(props) {
        super(props);
        this.props.auth.getProfile();
        this.state = {
            tripData: [],
            start:[],
            end:[]
        }
        this.getTrips = this.getTrips.bind(this);
    }

   getTrips(event) {
        event.preventDefault();
        let rider = {};
        rider.id = localStorage.getItem("profile");
        let form = document.forms["tripFinder"];
        let len = form.length;

        for (let i=0; i<len; i++)
        {
            rider[form[i].name]= form[i].value;
        }
        console.log(rider);
        API.getTrips(rider).then(trips =>{
            let results = trips.data;
            console.log(results);
           
            this.setState({tripData:results})
                        // if(trips.data.length > 0)
            // {
            //     return <Trips {...this.props} trips={trips.data} />
            // }
            // else{
            //     return <p>No Trips Found</p>;
            // }
         
        });
        Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${rider.start_address}&key=${process.env.REACT_APP_API_KEY}`)
        .then(query => {
            console.log(query);
            this.setState({start: query.data.results[0].geometry.location})});
        Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${rider.end_address}&key=${process.env.REACT_APP_API_KEY}`)
        .then(query => {
            console.log(query);
            this.setState({end: query.data.results[0].geometry.location})});
            
    }

    render(){
    
    return(
        <div>
        <Form {...this.props} name = "tripFinder" fields = {fields} buttonLabel="Find Trips" onSubmit={this.getTrips} />
        
        {this.state.tripData.map((trip, index)=>{
            return(
                <Trip trip={trip} key={index} {...this.props} />
            );
        })}
        
        </div>
    );
    }
};

export default FindTrips;