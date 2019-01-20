import React from "react";
import Message from "../message";
import "./sent.css";

const Sent = props => {
   console.log(props);
    return(
        
        props.messages.map(message => <Message message={message} {...this.props} collapse={false} />)
        );
};

export default Sent;