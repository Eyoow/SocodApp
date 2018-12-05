import React from "react";
import Form from "../form";
//import fields from "./fields.js";
import "./userProfile.css";

const UserProfile = props =>{
    const fields = [
        {type:"text", isRequired:false, name:"name", placeholder:props.user.name, label:"Name"},
        {type:"text", isRequired:false, name:"user_name", placeholder:props.user.user_name, label:"Username"},
        {type:"text", isRequired:false, name:"street_address", placeholder:props.user.street_address, label:"Address"},
        {type:"number", isRequired:false, name:"zipcode", placeholder:props.user.zipcode,label:"Zipcode"},
        {type:"date", isRequired:false, name:"birthdate", placeholder:props.user.birthdate, label:"DOB"},
        {type:"radio", isRequired:false, name:"male", value:"true", label:"M"},
        {type:"radio", isRequired:false, name:"female", value:"true",label:"F"},
        // {type:"password", isRequired:true, name:"password", placeholder:"muhamadisthebest", label:"Password:"},
        {type: "email", isRequired:false, name:"email", placeholder:props.user.email,label:"Email"},
        // {type:"url", isRequired:true, name:"picture", placeholder:"http://mypic.com",label:"Picture:"},
        {type:"checkbox", isRequired:false, name:"isrider",value:"true",label:"Rider"},
        {type:"checkbox", isRequired:false, name:"isdriver",value:"true",label:"Driver"}
        
        ];

    return(
        
        <Form id="update" action="api/user" method="post" buttonLabel="submit" fields={fields} />

    );
}

export default UserProfile;