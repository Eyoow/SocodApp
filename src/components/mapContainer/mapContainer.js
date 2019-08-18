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
    apiKey: "AIzaSyCXyQHcYT8jw81fSfOmn5cjTAWUPfEM0wQ"
})(mapContainer)