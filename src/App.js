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
  
  
    render() {
         
      return(<Menu/>);
    }
}

export default App;
