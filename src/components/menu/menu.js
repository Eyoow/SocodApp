import React from "react";
import Button from "../button";
import "./menu.css";

const Menu = props => {
    return(
        <div id = "menu" >
           {
                props.auth.isAuthenticated()?(
                    <Button label = "Log out" onclick={props.auth.logout} />
                ):
                (
                    <Button label = "Log in" onclick={props.auth.login} />
                )
           }
           {
               props.buttons.map((button,index)=>{
                   return(
                       <Button {...button} key={index} />
                   );
               })
            }
           
        </div>
    );
};

export default Menu;