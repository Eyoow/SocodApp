import React from "react";
import RegistrationForm from "../registrationForm";
import Menu from "../menu";
import "./register.css";

const Register = props => {
    return(
        <div className="container">
            <div className="navbar">
                <Menu buttons={[{label:"Register", onclick:props.goTo("register")},{label:"Login",onclick:""}]} />
            </div>
            <div className="content">
                <RegistrationForm submitRegistration={props.register} />
            </div>
        </div>
    );
};

export default Register;