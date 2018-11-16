import React from "react";
import "./message.css";

const Message = props =>
{
    return(
       <div className= "message-container" >
            <div className = "message-header">
                <ul>
                    <li>
                        From: {props.sender}
                    </li>
                    <li>
                        To: {props.recipient}
                    </li>
                    <li>
                        Subject: {props.subject}
                    </li>
                </ul>
            </div>
            <div className = "message-body">
                { !props.collapse?(
                    props.body
                    ):(
                        <div></div>
                    )
                }
            </div>
        </div> 
    )
};

export default Message;