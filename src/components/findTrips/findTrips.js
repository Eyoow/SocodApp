import React, {Component} from "react";
import Form from "../form";
import fields from "./fields";
import Trip from "../trip";
import Button from "../button";
import API from "../../utils/API";
import getDistance from "../../utils/getDistance";
import "./findTrips.css";
import Axios from "axios";

class FindTrips extends Component{
    
    constructor(props) {
        super(props);
        this.props.auth.getProfile();
        this.state = {
            tripData: [],
            start:[],
            end:[],
            rider:{}
        }
        this.getTrips = this.getTrips.bind(this);
    }

    joinTrip(trip,rider){
        trip.riders.push(rider);
        //need to prevent adding if no open seats
        //alert saying you joined
        console.log(rider);
        API.saveTrip(trip)
        .then(result => console.log(result));
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
        
                        // if(trips.data.length > 0)
            // {
            //     return <Trips {...this.props} trips={trips.data} />
            // }
            // else{
            //     return <p>No Trips Found</p>;
            // }
         
        
        Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${rider.start_address}&key=AIzaSyCXyQHcYT8jw81fSfOmn5cjTAWUPfEM0wQ`)
        .then(query1 => {
            rider.startLoc = query1.data.results[0].geometry.location;
            Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${rider.end_address}&key=AIzaSyCXyQHcYT8jw81fSfOmn5cjTAWUPfEM0wQ`)
            .then(query2 => {
            
            rider.endLoc = query2.data.results[0].geometry.location;
            API.getTrips().then(trips =>{
                let results = trips.data;
                console.log(results);
                results.forEach(trip =>
                    {
                        trip.stops.forEach( stop => 
                            {
                                console.log(stop);
                                
                                stop.startDistance = getDistance(stop.startLoc.lat, stop.startLoc.lng, rider.startLoc.lat, rider.startLoc.lng);
                                stop.endDistance = getDistance(stop.endLoc.lat, stop.endLoc.lng, rider.endLoc.lat, rider.endLoc.lng);
                            }    
                        
                        )
                    
                    })
                
                this.setState({tripData:results,rider:rider});
                });
            })
           });
        }
        
        filterTrips(trips,distance){
            return trips.filter(trip => trip.stops[0].startDistance <distance && trip.stops[trip.stops.length - 1].endDistance < distance && trip.max_riders - trip.riders.length > 0 )
        }
        

    render(){
    
    return(
        <div>
        <Form {...this.props} name = "tripFinder" fields = {fields} buttonLabel="Find Trips" onSubmit={this.getTrips} />
        <Button label="Filter Trips" onclick={() => this.setState({tripData:this.filterTrips(this.state.tripData,25)})} /> 
        {this.state.tripData.map((trip, index)=>{
            return(
                <Trip trip={trip} key={index} joinTrip={() => this.joinTrip(trip,this.state.rider.id)} {...this.props} />
            );
        })}
        
        </div>
    );
    }
};

export default FindTrips;