import React from "react";
import Form from "../form";
//import fields from "./fields.js";
import "./userProfile.css";
import API from "../../utils/API";

const UserProfile = props =>{
    let user = API.getProfile({id:localStorage.getItem('profile')});
    const fields = [
        {type:"text", isRequired:false, name:"name", placeholder:user.name, label:"Name"},
        {type:"text", isRequired:false, name:"user_name", placeholder:user.user_name, label:"Username"},
        {type:"text", isRequired:false, name:"street_address", placeholder:user.street_address, label:"Address"},
        {type:"number", isRequired:false, name:"zipcode", placeholder:user.zipcode,label:"Zipcode"},
        {type:"date", isRequired:false, name:"birthdate", placeholder:user.birthdate, label:"DOB"},
        {type:"radio", isRequired:false, name:"male", value:"true", label:"M"},
        {type:"radio", isRequired:false, name:"female", value:"true",label:"F"},
        // {type:"password", isRequired:true, name:"password", placeholder:"muhamadisthebest", label:"Password:"},
        {type: "email", isRequired:false, name:"email", placeholder:user.email,label:"Email"},
        // {type:"url", isRequired:true, name:"picture", placeholder:"http://mypic.com",label:"Picture:"},
        {type:"checkbox", isRequired:false, name:"isrider",placeholder:user.isrider,value:"true",label:"Rider"},
        {type:"checkbox", isRequired:false, name:"isdriver",placeholder:user.isdriver,value:"true",label:"Driver"}
        
        ];

    return(
        
        <Form id="update" action="api/user" method="post" buttonLabel="submit" fields={fields} />

    );
}

export default UserProfile;