import React from "react";
import Form from "../form";
import fields from "./fields.js";
import "./registrationForm.css";
import API from "../../utils/API";

const RegistrationForm = props =>{
    return(
        <Form id="register" action="api/user" method="post" onclick={(event) => {event.preventDefault(); event.stopPropagation();
        API.saveUser(event.body);}} buttonLabel="submit" fields={fields} />
    );
};

export default RegistrationForm;