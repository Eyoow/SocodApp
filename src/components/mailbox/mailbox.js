import React, {Component} from "react";
import API from "../../utils/API";
import "./mailbox.css";

class Mailbox extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:"",
            messages:[]
        }
    }

    componentDidMount(){
        this.props.auth.getProfile();
        let id = localStorage.getItem("profile");
        API.getMessages(id).then(results => {
            console.log(results);
            let messages = [];
            results.data.forEach(message =>
                messages.push(message));
            this.setState({messages:messages});
        }).catch(err=> console.log(err));
    }   

    render()
    {
        let messages = this.state.messages;
        
        return(
            
            
            messages.map(message => {
                
                return(
                    <div className= "message-container" key={message._id}>
                        
                        <div className = "message-header">
                        <ul>
                            <li>
                                From: {message.sender.name}
                            </li>
                            <li>
                                To: {message.recipient.name}
                            </li>
                            <li>
                                Subject: {message.subject}
                            </li>
                        </ul>
                        </div>
                
                        <div className = "message-body">
                            <p>{message.body}</p>            
                        </div>

                    </div> 
                );
            }
        ));
    }
};

export default Mailbox;
