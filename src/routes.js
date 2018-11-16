import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Callback from './Callback';
import Auth from './components/auth';
import Menu from './components/menu';
import Register from "./components/register";
import FindTrips from "./components/findTrips";
import Messages from "./components/messages";
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  auth.getProfile();
  return (
    <Router history={history} component={App}>
      <div>
        <Route exact path="/" render={(props) => <App {...props} auth={auth} />} />
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} auth={auth}/>}
        }/>
        <Route exact path="/register" render={(props) => {
              handleAuthentication(props);
              return (
                <div className="container">
                  <div className="navbar">
                    <Menu {...props} auth={auth} buttons={[{label:"Register", onclick:()=>history.replace("register")},{label:"Register", onclick:()=>history.replace("register")}]} />
                  </div>
                  <div className="content">
                    <Register {...props} auth={auth}/>
                  </div>
                </div>
              )
            } 
          
          }/>
          <Route exact path="/messages" render ={(props)=>{
            handleAuthentication(props);
              return (
                <Messages {...props} />
              )
          }} />
        {/* <Route exact path="/trips" render={(props) => {
          handleAuthentication(props);
          return <Trips {...props} auth={auth}/>} }/> */}
      </div>
    </Router>
  );
}