import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';
import history from '../../history';

// ...
export default class Auth {
  // ...
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain||process.env.AUTH0_DOMAIN,
    clientID: AUTH_CONFIG.clientId||process.env.CLIENT_ID,
    redirectUri: `${document.location}callback`,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`||`https://${process.env.AUTH0_DOMAIN}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

 login() {
    this.auth0.authorize();
  }

  
  getProfile() {
     var accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      console.log('Access Token must exist to fetch profile');
    }

    else {
      this.auth0.client.userInfo(accessToken, function(err, profile) {
        if (profile) {
          localStorage.setItem('profile', `${profile.sub}`);
        }
      });

   
    }
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/');
      } else if (err) {
        history.replace('/');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the  route
    history.replace('/');
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the  route
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}