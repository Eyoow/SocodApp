import React, { Component } from 'react';
import Menu from "./components/menu";
import Jumbotron from "./components/jumbo";
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
      <div className="container">
      <Jumbotron {...this.props} auth={this.props.auth} />
      <div className="navbar">
        <Menu {...this.props} history={this.props.history} auth={this.props.auth} />
      </div>
</div>
      );
    }
}

export default App;
