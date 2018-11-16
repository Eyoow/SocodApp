import React from "react";
import Message from "../message";
import "./received.css";

const Received = props => {
    return(
        props.messages.map((message,index) =>
            {
                return ( 
                   <Message {...message} key={index} collapse={true} />
                )
            }    
        )
    );
};

export default Received;