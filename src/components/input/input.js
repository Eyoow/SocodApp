import React from "react";
import "./input.css";

const Input = props => {
    return(
        <div className="inputGroup">
        <label htmlFor={props.name}>{props.label}</label>
        {/*if input is required, adds required keyword to jsx*/
            (props.isRequired?(
                <input name={props.name} required type={props.type} value={props.value} placeholder={props.placeholder} /> 
            ):
            ( 
                <input name={props.name} type={props.type} placeholder={props.placeholder} value={props.value}/> 
            ))
        }

        
        </div>
    );
};

export default Input;