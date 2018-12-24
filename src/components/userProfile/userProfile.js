import React, {Component} from "react";
import "./userProfile.css";
import API from "../../utils/API";

class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state = {user:{}};
        
    }
    
    
    componentDidMount(){
        this.props.auth.getProfile();
        let id = localStorage.getItem('profile');
        API.getProfile(id).then(user =>{ 
        console.log(user);
        this.setState({user: user.data});
        });
    }



   handleInputChange = event => {
    	const { name, value } = event.target;
    	this.setState({
      		[name]: value
    	});
  	};

    render(){
        
            return(
                <ul id="profile">
                    <li>Name: {this.state.user.name}</li>
                    <li>Username: {this.state.user.user_name}</li>
                </ul>
    );
   
    }
}

export default UserProfile;