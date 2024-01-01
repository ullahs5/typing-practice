import { Menu, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Login = (props) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const[error, setError] = useState(null);

    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const user = {username: username, password: password};


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const HandleLogin = () => {
        async function getData() {
            try {
                const response = await fetch(`http://localhost:8080/api/auth/authenticate`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user)
                });
    
                if (!response.ok) {
                    // Check for non-successful status codes
                    if (response.status === 403) {
                        // Handle account not found error
                        console.error("Account not found.");
                        // Perform any specific action, like showing an error message to the user
                        return;
                    } else {
                        // Handle other error statuses
                        throw new Error(`Error: ${response.status}`);
                    }
                }
    
                const actualData = await response.json();
                localStorage.setItem("token", actualData.token);
                localStorage.setItem("username", actualData.username);
                localStorage.setItem("userwpm", actualData.userwpm);
                localStorage.setItem("useraccuracy", actualData.useraccuracy);
                // console.log(actualData);
                props.handleLogin();
                props.setUsername(user.username);
            } catch (error) {
                console.error("Error:", error.message);
                // Handle any other unexpected errors that might occur during the fetch
            }
        }
    
        getData();
    };
    

    return(
        <div>
            <div className="LoginDialogue" style={{paddingLeft:"100px", paddingTop:"5px"}}>
                <Button variant="outlined" color="success" onClick={handleClickOpen}>
                Login
                </Button>
                <Dialog open={open} onClose={handleClose} PaperProps={{style:{display:"flex", justifyContent:"center", width:"300px"}}}>
                    <DialogTitle>Login</DialogTitle>
                    <DialogContent>
                    <a style={{display:"flex", color:"red", gap:"10px"}}>
                        No authorization; github deploys static websites.
                    </a>
                    <TextField style={{display:"flex"}}
                        autoFocus
                        id="name"
                        label="Username"
                        variant="standard"
                        value={username}
                        onChange={(e) => setUsername(e.target.value) }
                        
                    />
                    <TextField style={{display:"flex"}}
                        autoFocus
                        id="pass"
                        label="Password"
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={HandleLogin}>Login</Button>
                    </DialogActions>
                </Dialog>
                
            </div>

            
        </div>
    );
};

export default Login;