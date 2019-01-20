import React from "react";
import Map from "../map";
import GoogleApiComponent from "../../utils/GoogleApiComponent.js";

class mapContainer extends React.Component {
    constructor(props){
      super(props);
    }

    render() {
     
      return (
        <Map google={this.props.google} {...this.props} />
      )
    }
}

export default GoogleApiComponent({
    apiKey: `${process.env.REACT_APP_API_KEY||process.env.API_KEY}`
})(mapContainer)