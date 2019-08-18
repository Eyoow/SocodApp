import axios from "axios";

var instance = axios.create({});
var apiURL = process.env.API_URL || "http://localhost:3001";


export default {
  // Gets all messages where user is either sender or recipient
  getMessages: (id) => {
    return instance.get(`${apiURL}/api/messages/${id}`);
  },
  // gets all trips
  getTrips: () =>{
    return instance.get(`${apiURL}/api/trips/`);
  },
  //finds user by name
  findUserByName: (user_name) => {
    return instance.get(`${apiURL}/api/user_name/${user_name}`);
  },
  //loads user profile
  getProfile:(id) => {
    
    return instance.get(`${apiURL}/api/user/${id}`);
  },
  // 'Sends' a message 
  sendMessage: (message) =>{
    return instance.post(`${apiURL}/api/messages`, message);
  },
  updateMessage: (message) =>{
    return instance.post(`${apiURL}/api/messages`, message);
  },
  // saves or updates trip
  saveTrip: (trip) =>{
    console.log(trip);
    return instance.post(`${apiURL}/api/trips`, trip);
  },
  //saves user, either creating or updating if already exists
  saveUser: (user, header) => {
    user.id = localStorage.getItem("profile");
    console.log(user,header);
    return instance.post(`${apiURL}/api/user`, user /*, {headers:{header}}*/);
  },
   // Deletes the message based on message id, not the user id
   deleteMessage: (id) => {
    return instance.delete(`/api/messages/${id}`);
  },
  // Deletes trip based on trip id, not user id
  deleteTrip: (id) => {
    return instance.delete(`/api/trips/${id}`);
  },
  deleteUser: (id) => {
    return instance.delete(`/api/user/${id}`);
  }
 
};