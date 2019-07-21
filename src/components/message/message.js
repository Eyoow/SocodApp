import React from "react";
import "./message.css";

const Message = props =>{
    return(
        <div className= "message-container" key={props.message._id}>
            <div className = "message-header" onClick={props.showMessage}>
                <ul>
                    <li>
                        From: <a href={`./user/${props.message.sender._id}`}>{props.message.sender}</a>
                    </li>
                    <li>
                        To: {props.message.recipient}
                    </li>
                    <li>
                        Subject: {props.message.subject}
                    </li>
                </ul>
            </div>
TEST
            <div className = "message-body">
                { props.message.body}            
            </div>
        </div> 
    )
};

export default Message;