import React from "react";
import Message from "../message";
import "./inbox.css";

const Inbox = props =>{
    console.log(Object.keys(props.messages));
    
return(
    
   props.messages.map((message,index) => <Message subject = {message.subject} from={message.sender} to={message.recipient} body = {message.body} key={index} />)
 ) 
};

export default Inbox;