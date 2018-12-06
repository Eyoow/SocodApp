import React from "react";
import Form from "../form";
import fields from "./fields.js";
import "./registrationForm.css";


const RegistrationForm = props =>{
    return(
        <Form id="register" action="api/user" method="post" buttonLabel="submit" fields={fields} />
    );
};

export default RegistrationForm;