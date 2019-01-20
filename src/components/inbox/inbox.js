import React from "react";
import Message from "../message";
import "./inbox.css";

const Inbox = props =>{
   console.log(props.messages.slice());
    return(
    <div>
   {props.messages.map(message => <Message message={message} />)}
   </div>
 ) 
};

export default Inbox;