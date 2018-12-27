import React from "react";
import ReactDOM from "react-dom";
import Button from "../button";
import API from "../../utils/API.js";
// import MapControls from "../mapControls";
//import DirectionsPanel from "../directionsPanel";
import "./map.css"

// const Map = props =>{
//     document.createElement(`<script async defer src=https://maps.googleapis.com/maps/api/js?key=${props.API_KEY}&callback=${this.initMap()}></script>`);
//     function initMap() {
//         var directionsDisplay = new google.maps.DirectionsRenderer();
//         var directionsService = new google.maps.DirectionsService();
//         var map = new google.maps.Map(document.getElementById('map'), {
//             zoom: 7,
//             center: {lat: 41.85, lng: -87.65}
//         });
//         directionsDisplay.setMap(map);
//         directionsDisplay.setPanel(document.getElementById('right-panel'));
    
//         var control = document.getElementById('floating-panel');
//         control.style.display = 'block';
//         map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

//         var onChangeHandler = function() {
//             calculateAndDisplayRoute(directionsService, directionsDisplay);
//         };
//         document.getElementById('start').addEventListener('change', onChangeHandler);
//         document.getElementById('end').addEventListener('change', onChangeHandler);
//     }
//     function calculateAndDisplayRoute(directionsService, directionsDisplay) {
//         var start = document.getElementById('start').value;
//         var end = document.getElementById('end').value;
//         directionsService.route({
//           origin: start,
//           destination: end,
//           travelMode: 'DRIVING'
//         }, function(response, status) {
//           if (status === 'OK') {
//             directionsDisplay.setDirections(response);
//           } else {
//             window.alert('Directions request failed due to ' + status);
//           }
//         });
//       }
    
//     return(
//     <div className = "mapcontainer">
//     <div id="map" ></div>
//     <div id="floating-panel">
//       <strong>Start:</strong>
//       <select id="start">
//         <option value="chicago, il">Chicago</option>
//         <option value="st louis, mo">St Louis</option>
//         <option value="joplin, mo">Joplin, MO</option>
//         <option value="oklahoma city, ok">Oklahoma City</option>
//         <option value="amarillo, tx">Amarillo</option>
//         <option value="gallup, nm">Gallup, NM</option>
//         <option value="flagstaff, az">Flagstaff, AZ</option>
//         <option value="winona, az">Winona</option>
//         <option value="kingman, az">Kingman</option>
//         <option value="barstow, ca">Barstow</option>
//         <option value="san bernardino, ca">San Bernardino</option>
//         <option value="los angeles, ca">Los Angeles</option>
//       </select>
//       <br></br>
//       <strong>End:</strong>
//       <select id="end">
//         <option value="chicago, il">Chicago</option>
//         <option value="st louis, mo">St Louis</option>
//         <option value="joplin, mo">Joplin, MO</option>
//         <option value="oklahoma city, ok">Oklahoma City</option>
//         <option value="amarillo, tx">Amarillo</option>
//         <option value="gallup, nm">Gallup, NM</option>
//         <option value="flagstaff, az">Flagstaff, AZ</option>
//         <option value="winona, az">Winona</option>
//         <option value="kingman, az">Kingman</option>
//         <option value="barstow, ca">Barstow</option>
//         <option value="san bernardino, ca">San Bernardino</option>
//       </select>
//     </div>
//     <div id="right-panel"></div>
//     </div>
//     );
// }

// 
class Map extends React.Component {
    
  constructor(props)
  {
    super(props);
  }
  
 
    loadMap() {
      if (this.props && this.props.google) {
        // google is available
        const {google} = this.props;
        const maps = google.maps;
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.directionsService = new google.maps.DirectionsService();
        const mapRef = this.refs.map;
        const node = ReactDOM.findDOMNode(mapRef);
        
        let zoom = 14;
        let lat = 37.774929;
        let lng = -122.419416;
        const center = new maps.LatLng(lat, lng);
        const mapConfig = Object.assign({}, {
          center: center,
          zoom: zoom
        })
        this.map = new maps.Map(node, mapConfig);
        this.directionsDisplay.setMap(this.map);
        this.directionsDisplay.setPanel(document.getElementById('right-panel'));
            
        var control = document.getElementById('floating-panel');
        control.style.display = 'block';
        this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
      }
      // ...
    }
    calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var start = document.getElementById('start').value;
        var end = document.getElementById('end').value;
        directionsService.route({
          origin: start,
          destination: end,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            this.routeData = response;
            localStorage.setItem("route",JSON.stringify(response));
            console.log(response);
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
    }
    
    onChangeHandler(){
      this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
    }
      
    componentDidMount() {
        this.loadMap();
        this.props.auth.getProfile();
      }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
          this.loadMap();
        }
    }
    saveTrip = () =>{
      let trip = {};
      let route = JSON.parse(localStorage.getItem("route"));
      console.log(route);
      trip.dates = [];
      trip.dates[0] = document.getElementsByName("start-date");
      trip.dates[1] = document.getElementsByName("end-date");
      trip.stops = route.routes[0].legs;
      trip.driver = localStorage.getItem("profile");
      trip.maxRiders = document.getElementsByName("seats").selectedIndex+1;
      API.saveTrip(trip);
    }

    render() {
        return (
          <div id = "mapContainer">
          {/* <MapControls /> */}
          
          <div id="right-panel"></div>
          <div id="floating-panel">
          
          <label htmlFor="start">Start</label>
            <input id="start" type="text" ></input>
            <label htmlFor="end">Destination</label>
            <input id="end" type="text"></input>
            
            <label htmlFor="start-date">Leave</label>
            <input id="start-date" type="date"></input>
            <label htmlFor="end-date">Return</label>
            <input id="end-date" type="date"></input>
            <label htmlFor="seats">Available seats</label>
            <select name="seats">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <Button label="Get Route" onclick={() => this.onChangeHandler()} />
            <Button label="Save Trip" onclick={() => this.saveTrip(this.routeData)} />
            
          </div>
          <div ref='map' id="map">
          
            Loading map...
          </div>
          

          {/* <DirectionsPanel hidden={this.props.hidden}/> */}
          </div>
        
        )
      }
  }
  export default Map;