import React, {Component} from "react";
import Sent from "../sent";
import Received from "../received";
import API from "../../utils/API";

class Messages extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            received:[],
            sent:[],
            id:"",
            time:Date.now()
        }
    }

    componentDidMount(){
        this.props.auth.getProfile();
        let id = localStorage.getItem("profile");
        let received = [];
        let sent = [];
        API.getMessages(id).then(results => {
            console.log(results);
            results.data.forEach(message =>{
                if (message.recipient === id)
                {
                    received.push(message);
                }
                else{
                    sent.push(message);
                }
            });
        
        }
        );
        this.setState({id:id,received:received,sent:sent, time:Date.now()});
    }

    getMessages(){
        let received = [];
        let sent =[];
        API.getMessages(this.state.id).then(results => {
            console.log(results);
            results.data.forEach(message =>{
                if (message.recipient === this.state.id)
                {
                    received.push(message);
                }
                else{
                    sent.push(message);
                }
            });
            
        }
        );
        this.setState({received:received,sent:sent});
    }
    
    
    render(){
        return(
        <div>
        <div id="inbox">
            <span>Inbox</span>
            <Received {...this.props} messages={this.state.received} />
        </div>
        <div id="outbox">
            <span>Outbox</span>
            <Sent {...this.props} messages={this.state.sent} />
        </div>
        </div>
        );
    }
};

export default Messages;