import React from "react";
import Button from "../button";
import "./menu.css";

const Menu = props => {
    console.log(props.history);
    return(
        
           
                props.auth.isAuthenticated()?(
                    <div id = "menu" >
                    <Button label = "Log out" onclick={() => props.auth.logout()} />
                    <Button label ="Home" onclick={() => props.history.replace("/")} />
                    <Button label ="Sign Up" onclick={() =>props.history.replace("/signup")} />
                    <Button label = "Profile" onclick={() => props.history.replace("/profile")} />
                    <Button label ="Find Trips" onclick ={() => props.history.replace("/findTrips")} />
                    <Button label ="Plan Trip" onclick={() => props.history.replace("/map")} />
                    </div>
              
                ):
                (
                    <div id="menu">
                    <Button label = "Log in" onclick={props.auth.login} />
                    </div>
                )
           
           
              
                
              
    );
};

export default Menu;