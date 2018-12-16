import React from "react";
import Input from "../input";
import Button from "../button";
import "./form.css";

const Form = props => {
    
    return (
        <form name={props.name} id={props.id} action={props.action} onSubmit={props.onSubmit} method={props.method}>
            {
                props.fields.map((field,index) =>{
                    return (
                        <Input name={field.name} key={index} isRequired={field.isRequired} type={field.type} placeholder={field.placeholder} value={field.value} label={field.label} />
                    );
                })
            }
            <Input type="submit" />
        </form>
    );
};

export default Form;