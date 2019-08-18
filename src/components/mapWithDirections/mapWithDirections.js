/* global google */
import React,{Component} from "react";
import "./mapWithDirections.css";
import MapControl from "../mapControl";
import API from "../../utils/API.js";
const {
  GoogleMap,
  DirectionsRenderer,
  withGoogleMap
} = require("react-google-maps");

const google = window.google;

class MapWithDirections extends Component{

    constructor(props)
    {
      super(props);
      this.googleMapURL = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCXyQHcYT8jw81fSfOmn5cjTAWUPfEM0wQ&v=3.exp&libraries=geometry,drawing,places`;
      this.loadingElement = `<div style={{ height: "100%" }} />`;
      this.containerElement= `<div style={{ height: "400px" }} />`;
      this.mapElement = `<div style={{ height: "100%" }} />`;
    }

    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route({
        origin: new google.maps.LatLng(41.8507300, -87.6512600),
        destination: new google.maps.LatLng(41.8525800, -87.6514100),
        travelMode: google.maps.TravelMode.DRIVING
        }).then((result, status) => {
        
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
          } 
          else {
          console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  
  
  render(){
    return(
      <div id="mapContainer">
      <GoogleMap defaultZoom={7} defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)} >
      </GoogleMap>
      <DirectionsRenderer directions={this.props.directions} /> 
      <MapControl props={this.state} />
     
      </div>
    );
  }
}

export default withGoogleMap(MapWithDirections);