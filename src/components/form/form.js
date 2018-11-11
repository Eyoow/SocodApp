import React from "react";
import Input from "../input";
import Button from "../button";
import "./form.css";

const Form = props => {
    return (
        <form id={props.id} action={props.action} method={props.method}>
            {
                props.fields.map(field =>{
                    return (
                        <Input name={field.name} isRequired={field.required} type={field.type} placeholder={field.placeholder} />
                    );
                })
            }
            <Button onclick={props.onclick} label={props.method} />
        </form>
    );
};

export default Form;