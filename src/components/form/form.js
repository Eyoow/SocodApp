import React,{Component} from "react";
import Input from "../input";
import Button from "../button";
import "./form.css";

class Form extends Component{

    constructor(props){
        super(props);
    }
    
    render(){
       
    return (
        <form name={this.props.name} id={this.props.id} action={this.props.action} onSubmit={this.props.onSubmit} method={this.props.method}>
            {
                this.props.fields.map((field,index) =>{
                    return (
                        <Input key={index} {...field}/>
                    );
                })
            }
            <Input type="submit" />
        </form>
    );
        }
};

export default Form;