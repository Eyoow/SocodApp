import React from "react";
import "./button.css";

const Button = props => {
    return(
        <button class="btn" onClick={()=>props.onclick}>{props.label}</button>
    )
};

export default Button;