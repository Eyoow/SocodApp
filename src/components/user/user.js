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


    componentDidMount(){
        API.findUserByName(this.props.match.params.name)
        .then( result=> {
            console.log(result);
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
        </ul>
        </div>
        ):
        (<div></div>)
        )
    }
}

export default User;