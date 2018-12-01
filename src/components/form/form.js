import React from "react";
import Input from "../input";
import Button from "../button";
import "./form.css";

const Form = props => {
    return (
        <form id={props.id} action={props.action} method={props.method}>
            {
                props.fields.map((field,index) =>{
                    return (
                        <Input name={field.name} key={index} isRequired={field.required} type={field.type} placeholder={field.placeholder} value={field.value} label={field.label} />
                    );
                })
            }
            <Button onclick={props.onclick} label={props.buttonLabel} />
        </form>
    );
};

export default Form;