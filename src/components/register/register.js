import React from "react";
import RegistrationForm from "../registrationForm";
import Menu from "../menu";
import "./register.css";

const Register = props => {
    //const buttons = [{label:"Register", onclick:props.goTo("register")},{label:"Register", onclick:props.goTo("register")}]
    return(
        <div className="container">
            <div className="navbar">
                {/* <Menu buttons={buttons} /> */}
            </div>
            <div className="content">
                <RegistrationForm submitRegistration={props.register} />
            </div>
        </div>
    );
};

export default Register;