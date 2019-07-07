import React from "react";
import Message from "../message";
import "./received.css";

const Received = props => {
   
        return(
        <div id="received">
        
        {props.messages.map((message,index) => {
          
            return(
                <Message message={message} key={index} collapse={false} />
            );
        })}   
        
        <hr/>
        </div>
        );
        
    
    
};

export default Received;