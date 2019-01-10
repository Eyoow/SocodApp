import React from "react";
import "./message.css";

const Message = props =>{
    return(
        <div className= "message-container" key={props.message._id}>
            <div className = "message-header">
                <ul>
                    <li>
                        From: {props.message.sender}
                    </li>
                    <li>
                        To: {props.message.recipient}
                    </li>
                    <li>
                        Subject: {props.message.subject}
                    </li>
                </ul>
            </div>
            <div className = "message-body">
                { props.message.body}            
            </div>
        </div> 
    )
};

export default Message;