import React from "react";
import RegistrationForm from "../registrationForm";
import "./register.css";

const Register = props => {
    //const buttons = [{label:"Register", onclick:props.goTo("register")},{label:"Register", onclick:props.goTo("register")}]
    return(
        // <div className="container">
        //     <div className="navbar">
        //         {/* <Menu buttons={buttons} /> */}
        //     </div>
        //     <div className="content">
                <RegistrationForm {...props} />
         //   </div>
       // </div>
    );
};

export default Register;