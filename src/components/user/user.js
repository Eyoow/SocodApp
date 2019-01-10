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
            <div>{this.state.user.name}</div>
        )
    }
}

export default User;