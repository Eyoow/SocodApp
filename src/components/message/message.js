import React,{Component} from "react";
import "./message.css";

class Message extends Component{
    constructor(props)
    {
        super(props);
        console.log(props.message);
        this.state = {message:props.message};
    }

    componentDidMount(){
        console.log(this.props);
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({message:nextProps.message});
    }

    render(){
        return(
        <div className= "message-container" key={this.props.key}>
            <div className = "message-header">
                <ul>
                    <li>
                        From: {this.state.message.sender}
                    </li>
                    <li>
                        To: {this.state.message.recipient}
                    </li>
                    <li>
                        Subject: {this.state.message.subject}
                    </li>
                </ul>
            </div>
            <div className = "message-body">
                { !this.props.collapse?(
                    this.state.message.body
                    ):(
                        <div></div>
                    )
                }
            </div>
        </div> 
        )
    }
};

export default Message;