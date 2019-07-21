import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Callback from './Callback';
import Auth from './components/auth';
//import Team from "./components/team";
import Register from "./components/register";
import FindTrips from "./components/findTrips";
import User from "./components/user";
import UserProfile from "./components/userProfile";
import Mailbox from "./components/mailbox";
import history from './history';
//import MapWithDirections from "./components/mapWithDirections";
import MapContainer from "./components/mapContainer";
//import API from './utils/API';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  
  return (
    <Router history={history} component={App}>
      <div>
       
        <Route path="/" render={(props) => <App {...props} auth={auth} />} />
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} auth={auth}/>}
        }/>
        <Route exact path="/signup" render={(props) => {
              handleAuthentication(props);
              return (
                
                  <div className="content">
                    <Register {...props} auth={auth}/>
                  </div>
               
              )
            } 
          
          }/>
          <Route exact path="/messages" render ={(props)=>{
            handleAuthentication(props);
            
              return (
                <div id="messagePage">
                <Mailbox {...props} auth={auth} />
                </div>
              )
          }} />
           {/* <Route exact path="/team" render ={(props)=>{
            handleAuthentication(props);
            
              return (
                <div id="teamPage">
                <Team {...props} auth={auth} />
                </div>
              )
          }} /> */}
        <Route exact path="/findTrips" render={(props) => {
          handleAuthentication(props);
          return <FindTrips {...props} auth={auth}/>} 
        }/>
         <Route exact path="/profile" render={(props) => {
          handleAuthentication(props);
          return <UserProfile {...props} auth={auth}  />
          }
         
        }/>
        <Route path="/user/:name" render={(props) => {
          handleAuthentication(props);
          return <User {...props} auth={auth}  />
          }
         
        }/>
        <Route exact path ="/map" render={(props) =>{
          handleAuthentication(props);
          //return <MapWithDirections {...props} API_KEY = {App.API_KEY} auth={auth}/>
          return <MapContainer {...props} auth={auth}/>
          }
        } />
      </div>
    </Router>
  );
}