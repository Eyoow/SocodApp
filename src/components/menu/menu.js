import React from "react";
import Button from "./button";
import "./menu.css";

const Menu = props => {
    return(
        <div id = "menu" >
           {
           /* <Button label= "Register" onclick={()=>props.goTo("register")} />
           <Button label="Log In" onclick={()=>props.goTo("login")} /> */
               props.buttons.map((button) => {
                    return (
                        <Button label={button.label} onclick={button.onclick} />
                    );
                })
           }
        </div>
    );
};

export default Menu;