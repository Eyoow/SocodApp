import React, {Component} from "react";
import Inbox from "../inbox";
import Sent from "../sent";
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
            let resultsArray = results.data.slice();
            console.log(resultsArray);
            resultsArray.map(message =>{
                if (message.recipient._id === id)
                {
                    received.push(message);
                }
                else{
                    sent.push(message);
                }
            });
        
        }
        );
       
        this.setState({id:id,received:received,sent:sent, time:Date.now()},console.log(this.state));
    }

    getMessages(){
        let received = [];
        let sent =[];
        API.getMessages(this.state.id).then(results => {
            let resultsArray = results.data.slice();
            resultsArray.map(message =>{
                
                if (message.recipient._id === this.state.id)
                {
                    received.push(message);
                }
                else{
                    sent.push(message);
                }
                
            });
          }
        ).catch(err => console.log(err));
        
        this.setState({received:received,sent:sent},console.log(this.state));
    }
    
    
    render(){
        
        return(
        <div>
        <div id="inbox">
        <button onClick={()=>this.getMessages()}> Get Messages </button>
            <span>Inbox</span>
           <Inbox {...this.props} messages={this.state.received} />
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