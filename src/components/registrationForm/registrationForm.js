import React from "react";
import Form from "../form";
import API from "../../utils/API";
import AWS from "../AWS";
import fields from "./fields.js";
import "./registrationForm.css";


const RegistrationForm = props =>{
    const header = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
    props.auth.getProfile();
    function handlesubmit(event){
        event.preventDefault();
        
        let user = {};
        let form = document.forms["register"];
        let length = form.length;
        for(let i= 0; i<length; i++){
            if(form[i].type === "checkbox")
            {
                if(form[i].checked === true)
                {
                    user[form[i].name]= form[i].value;
                }
            
            }
            else{
                user[form[i].name]= form[i].value;
            }
        }
        
        if (user.male)
        {
            user.gender = user.male;
        }
        else if(user.female)
        {
            user.gender = user.female;
        }
        API.saveUser(user,header)
        .then(result => {
            console.log(result);
        });
        
        
        
    }
    return(
       <div>
        <AWS />
        <Form name="register" id="register" action="api/user" method="post" onSubmit={handlesubmit} buttonLabel="submit" fields={fields} />
        </div>
    );
};

export default RegistrationForm;