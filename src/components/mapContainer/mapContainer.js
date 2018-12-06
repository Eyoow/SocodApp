import React from "react";
import Map from "../map";
import GoogleApiComponent from "../../utils/GoogleApiComponent.js";

class mapContainer extends React.Component {
    
    render() {
     
      return (
        <div>
          <Map google={this.props.google} />
        </div>
      )
    }
}

export default GoogleApiComponent({
    apiKey: `${process.env.REACT_APP_API_KEY}`
})(mapContainer)