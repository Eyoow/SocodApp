import axios from "axios";
var instance = axios.create({});

export default {
  // Gets all messages where user is either sender or recipient
  getMessages: (id) => {
    return instance.get(`/api/messages/${id}`);
  },
  // gets all trips
  getTrips: () =>{
    return instance.get("/api/trips/");
  },
  //finds user by name
  findUserByName: (user_name) => {
    return instance.get(`/api/user_name/${user_name}`);
  },
  //loads user profile
  getProfile:(id) => {
    return instance.get(`/api/user/${id}`);
  },
  // 'Sends' a message 
  sendMessage: (message) =>{
    return instance.post("/api/messages", message);
  },
  // saves or updates trip
  saveTrip: (trip) =>{
    return instance.post("/api/trips", trip);
  },
  //saves user, either creating or updating if already exists
  saveUser: (user) => {
    return instance.post("/api/user", user);
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