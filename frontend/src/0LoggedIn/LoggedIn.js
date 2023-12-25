import { Button } from "@mui/material";
import TypingGame from "../game/typinggame2";
import { useState } from "react";

const HasLoggedIn = (props) => {
    const logout = () =>{
        props.handleLogout();
        localStorage.removeItem("token");
    }

    return(
        <div>
            <div style={{paddingLeft:"100px", paddingTop:"5px"}}>
                <Button variant="text" color="error" onClick={() => logout()}>Logout</Button>
            </div> 
        </div>
    );
}

export default HasLoggedIn;