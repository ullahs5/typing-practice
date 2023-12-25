import { Button } from "@mui/material";
import TypingGame from "../game/typinggame2";
import Login from "../auth/Login";
import Register from "../auth/Register";

const NotLoggedIn = (props) => {

    return(
        <div>
            <div>
                <Login setUsername={props.setUsername} handleLogin={props.handleLogin}></Login>
                <Register></Register>
            </div>
        </div>
    );
}

export default NotLoggedIn;