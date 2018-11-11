import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Callback from './Callback';
import Auth from './components/auth';
import Register from "./components/register";
import Trips from "./components/trips";
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
          return <Register {...props} auth={auth}/>} }/>
        {/* <Route exact path="/trips" render={(props) => {
          handleAuthentication(props);
          return <Trips {...props} auth={auth}/>} }/> */}
      </div>
    </Router>
  );
}