import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Register = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    
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

    const HandleRegister = () => {
        async function getData() {
            try {
                const response = await fetch(`http://localhost:8080/api/auth/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user)
                });
    
                if (!response.ok) {
                    if (response.status === 403) { 
                        console.error("Username already exists.");
                        // Provide feedback to the user about the existing username
                        // You can display an error message or perform an action
                        return;
                    } else {
                        throw new Error(`Error: ${response.status}`);
                    }
                }
    
                const actualData = await response.json();
                console.log(actualData);
                handleClose(); // Close registration form or perform any other action
            } catch (error) {
                console.error("Error:", error.message);
                // Handle any other unexpected errors that might occur during the fetch
            }
        }
    
        getData();
    };
    

    return(
        <div>
            <div className="RegisterDialogue" style={{paddingLeft:"100px"}}>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Register
                </Button>
                <Dialog open={open} onClose={handleClose} PaperProps={{style:{display:"flex", justifyContent:"center", width:"300px"}}}>
                    <DialogTitle>Register</DialogTitle>
                    <DialogContent>
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
                        <Button onClick={HandleRegister}>Register</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default Register;