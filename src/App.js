import React, { Component } from 'react';
import Menu from "./components/menu";
import './App.css';

class App extends Component {
  constructor(props) 
  {
    super(props);
  }
  
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
				<Menu auth={this.props.auth}  goTo={this.goTo} buttons={[{label:"Register",onclick:()=>this.goTo("register")}]} />
      );
    }
}

export default App;
