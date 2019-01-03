import React, {Component} from "react";
import Message from "../message";
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
                if (message.recipient._id == id)
                {
                    received.push(message);
                }
                else{
                    sent.push(message);
                }
            });
        
        }
        );
        console.log(received);
        console.log(sent);
        this.setState({id:id,received:received,sent:sent, time:Date.now()});
    }

    getMessages(){
        let received = [];
        let sent =[];
        API.getMessages(this.state.id).then(results => {
            console.log(results);
            results.data.forEach(message =>{
                console.log(message);
                if (message.recipient._id == this.state.id)
                {
                    received.push(message);
                }
                else{
                    sent.push(message);
                }
            });
            
        }
        );
        console.log(received);
        console.log(sent);
        this.setState({received:received,sent:sent});
    }
    
    
    render(){
        console.log(this.state);
        return(
        <div>
        <div id="inbox">
        <button onClick={()=>this.getMessages()}> Get Messages </button>
            <span>Inbox</span>
            
            {this.state.received.map((message, index) => <Message message={message} key={index} />)}
        </div>
        <div id="outbox">
            <span>Outbox</span>
            {/* <Sent {...this.props} messages={this.state.sent} /> */}
            {this.state.sent.map((message, index) =>{
                return(
                    <Message message={message} key={index} />
                )
            })}
        </div>
        </div>
        );
    }
};

export default Messages;