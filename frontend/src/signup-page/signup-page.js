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
function SignupPage() {
    const navigate = useNavigate();
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', {name, email, password });
    
      if (response.status === 201) {
        alert('sign up successful! Welcome to dashboard!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error.response.data.message); // optional: log error message
    }
  };
  return (
    <>
<div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Typography variant="h5" component="h1">
          Sign Up
        </Typography>
        <TextField
          type="text"
          label="Name"
          className={classes.textField}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
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
          Sign Up
        </Button>
      </form>
      </div> 
      </>
  );
}

export default SignupPage;