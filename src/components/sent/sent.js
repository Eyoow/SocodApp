import React from "react";
import Message from "../message";
import "./sent.css";

const Sent = props => {
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

export default Sent;