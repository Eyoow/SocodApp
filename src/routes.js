import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Callback from './Callback';
import Jumbotron from "./components/jumbo";
import Auth from './components/auth';
import Menu from './components/menu';
import Register from "./components/register";
import FindTrips from "./components/findTrips";
import UserProfile from "./components/userProfile";
import Messages from "./components/messages";
import history from './history';
import MapContainer from "./components/mapContainer";
import API from './utils/API';

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
        <Route exact path="/signup" render={(props) => {
              handleAuthentication(props);
              return (
                <div className="container">
                  <Jumbotron {...props} auth={auth} />
                  <div className="navbar">
                    <Menu {...props} auth={auth} buttons={[{label:"Sign Up!", onclick:()=>history.replace("signup")}]} />
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
                <Messages {...props} auth={auth} />
              )
          }} />
        <Route exact path="/findTrips" render={(props) => {
          handleAuthentication(props);
          return <FindTrips {...props} auth={auth}/>} 
        }/>
         <Route exact path="/profile" render={(props) => {
          handleAuthentication(props);
          // API.getProfile({id:auth.user_id}).then(user =>{
          return <UserProfile {...props} auth={auth} />} 
        }/>
        <Route exact path ="/map" render={(props) =>{
          handleAuthentication(props);
          
          return <MapContainer {...props} API_KEY = {App.API_KEY} auth={auth}/>
          }
        } />
      </div>
    </Router>
  );
}