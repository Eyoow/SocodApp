import React, {Component} from "react";
import Message from "../message";
import "./received.css";

class Received extends Component {
    constructor(props){
        super(props)
        this.state = {
            messages:props.messages
        }
    }

    
    componentWillReceiveProps(nextProps)
    {
        console.log(nextProps);
        this.setState({messages:nextProps.messages});
    }
    render(){
        console.log(this.state.messages);
        return(
        <div id="received">
        
        {this.state.messages.map((message,index) => {
            console.log(message,index);
            return(
                <Message message={message} key={index} collapse={false} />
            );
        })}   
        
        <hr/>
        </div>
        );
        
    
    }
};

export default Received;