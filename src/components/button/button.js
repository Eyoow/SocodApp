import React from "react";
import "./button.css";

const Button = props => {
    return(
        <button className="btn" onClick={()=>props.onclick()}>{props.label}</button>
    )
};

export default Button;