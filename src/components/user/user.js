import React,{Component} from "react";
import API from "../../utils/API.js";
import "./user.css";

class User extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            user:{}
        }
    }


    handleSubmit(event){
        event.preventDefault();
        let message = {};
        message.sender = localStorage.getItem("profile");
        message.recipient = localStorage.getItem("recipient");
        let form = document.forms["message"];
        let length = form.length;
        for(let i= 0; i<length; i++){
            message[form[i].name]= form[i].value;
        }
        
         API.sendMessage(message)
        .then(result => {
            if(result.data.errors) alert(result.data.message);
            else alert("Message sent!");
            console.log(result);
        });
        
    }
    componentDidMount(){
        this.props.auth.getProfile();
        API.findUserByName(this.props.match.params.name)
        .then( result=> {
            console.log(result);
            localStorage.setItem("recipient", result.data._id);
            this.setState({user:result.data});
        })
        .catch(err => console.log(err))
    }

    render(){
        
        return(
        this.state.user ? (
        <div>
        <ul id="user">
            <li>Name: {this.state.user.name}</li>
            <li>Username: {this.state.user.user_name}</li>
            <li><img src = {this.state.user.image} alt={this.state.user.name} /></li>
            <form name = "message" id="message" action="api/messages" method="post" className = "sendMessage" onSubmit={this.handleSubmit} >
                <label htmlFor = "subject">Subject:</label>
                <input name = "subject" type="text" />
                <label htmlFor ="body">Message:</label>
                <textarea rows="10" name = "body" type="text" />
                <input type="submit" />
            </form>
        </ul>
        </div>
        ):
        (<div></div>)
        )
    }
}

export default User;