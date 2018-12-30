import React, {Component} from "react";
import Message from "../message";
import "./sent.css";

class Sent extends Component {
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
    return(
        
        this.state.messages.map((message,index) =>
            {
                return ( 
                   <Message {...message} {...this.props} key={index} collapse={false} />
                )
            }    
        )
        );
    }
};

export default Sent;