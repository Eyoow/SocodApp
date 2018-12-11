import React from "react";
import Form from "../form";
import API from "../../utils/API";
import fields from "./fields.js";
import "./registrationForm.css";


const RegistrationForm = props =>{
    function handlesubmit(event){
        event.preventDefault();
        let user = {};
        let form = document.forms["register"];
        let length = form.length;
        for(let i= 0; i<length; i++){
           user[form[i].name]= form[i].value;
        }
        user.id = localStorage.getItem("profile");
        API.saveUser(user);
    }
    return(
        <Form name="register" id="register" action="api/user" method="post" onSubmit={handlesubmit} buttonLabel="submit" fields={fields} />
    );
};

export default RegistrationForm;