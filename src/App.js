import React, { Component } from 'react';
import Menu from "./components/menu";
import './App.css';

class App extends Component {
  constructor(props) 
  {
    super(props);
  }
  
    API_KEY =`${process.env.REACT_APP_API_KEY}`;

    goTo(route) {
      this.props.history.replace(`/${route}`)
    }
    login() {
      this.props.auth.login();
    }
  
    logout() {
      this.props.auth.logout();
    }
  
  
    render() {
     return(
				<Menu auth={this.props.auth}  API_KEY = {this.API_KEY} goTo={this.goTo} buttons={[{label:"Sign up!",onclick:()=>this.goTo("signup")}]} />
      );
    }
}

export default App;
