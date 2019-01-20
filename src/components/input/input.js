import React from "react";
import "./input.css";

const Input = props => {
    return(
        <div className="inputGroup">
        <label htmlFor={props.name}>{props.label}</label>
        {/*if input is required, adds required keyword to jsx*/
            (props.require ==="true"?(
                <input required {...props}/> 
            ):
            ( 
                <input {...props} /> 
            ))
        }

        
        </div>
    );
};

export default Input;