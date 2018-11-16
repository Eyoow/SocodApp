import React from "react";
import Sent from "../sent";
import Received from "../received";
import API from "../../utils/API";

const Messages = props => {
    API.getMessages(props.user._id).then(results => {
            let received = [];
            let sent = [];
            results.map(message =>{
                if (message.recipient === props.user._id)
                {
                    received.push(message);
                }
                else{
                    sent.push(message);
                }
            });
        
        
        return(
            <div>
            <div id="inbox">
                <span>Inbox</span>
                <Received {...props} messages={received} />
            </div>
            <div id="outbox">
                <span>Outbox</span>
                <Sent {...props} messages={sent} />
            </div>
            </div>
        );
    }
    );
   
};

export default Messages;