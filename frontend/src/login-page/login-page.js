import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '50%',
      minWidth: 300,
      padding: theme.spacing(2),
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
    },
    textField: {
      margin: theme.spacing(1),
      width: '100%',
    },
    button: {
      margin: theme.spacing(1),
    },
  }));

function LoginPage() {
    const navigate = useNavigate();
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
// Define the function to send the welcome email
const sendWelcomeEmail = (email, password) => {
    // Code to send the email goes here
    console.log(`Welcome email sent to ${email} with password ${password}`);
  }
  
  // Define the function to generate a random password
  const generatePassword = () => {
    // Code to generate the password goes here
    return Math.random().toString(36).slice(-8);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      localStorage.setItem('token', res.data.token);
      if (res.status === 200) {
        // send welcome email with generated password here
        sendWelcomeEmail(email, generatePassword());
        // show success message to the user
        alert('Login successful! Welcome to our website!');
        navigate('/dashboard');
      } else {
        console.log(res.data.message); // error message from server
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message); // error message from server
      } else if (err.request) {
        console.log("Request failed"); // no response received
      } else {
        console.log("Error", err.message); // other error
      }
    }
  };
  
  const handleButtonClick = () => {
    navigate('/SignupPage');
  };
      
  return (
    <>
    <div className={classes.root}>
          <form className={classes.form} onSubmit={handleSubmit}>
          <Typography variant="h5" component="h1">
            Sign In
          </Typography>
          <TextField
            type="email"
            label="Email"
            className={classes.textField}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            className={classes.textField}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Sign In
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleButtonClick}
          >
            Sign Up
          </Button>
        </form>
          </div> 
          </>
  );
}
export default LoginPage