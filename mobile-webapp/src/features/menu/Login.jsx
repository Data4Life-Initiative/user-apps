import React, { useState, Fragment } from 'react';
import { Typography } from '@material-ui/core';
import {
  Container,
  CircularProgress,
  TextField,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, confirm, selectLoginState } from './loginSlice';

const useStyle = makeStyles({
  container: {
    padding: 0,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 150,
    width: 150,    
    marginTop: -100,
  },
  heading: {
    fontFamily: ['Arial'],
    fontSize: 22,
    fontWeight: 600,    
    marginBottom: 100
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'Arial',
    fontSize: 30,
    paddingBottom: 18,
    width: '40%'
  },
  otptext: {
    width: '40%',
    fontFamily: 'Arial',
    fontSize: 30,
    paddingBottom: 18,
  },
  button: {
    width: '40%',
    borderRadius: 18,
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 18,
  }  
});

const Login = () => {
  const dispatch = useDispatch();
  const classes = useStyle();
  const { awaitingOtp, working } = useSelector(selectLoginState);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const renderLogin = () => (
    <Fragment>
      <TextField
        className={classes.text}
        required
        label="Mobile"
        value={mobile}
        autoFocus
        onChange={(e) => setMobile(e.target.value)}
      />
      <Button variant="contained" color="primary" size="medium" className={classes.button} onClick={() => dispatch(login(mobile))}>
        Login
      </Button>
    </Fragment>
  );

  const renderConfirm = () => (
    <Fragment>
      <TextField
        className={classes.otptext}
        required
        label="OTP"
        value={otp}
        autoFocus
        onChange={(e) => setOtp(e.target.value)}
      />
      <Container className={classes.buttonContainer}>
        <Button
          variant="contained" color="primary" size="medium"
          className={classes.button}
          onClick={() => dispatch(confirm(mobile, otp))}
        >
          Confirm
        </Button>
        <Button 
          variant="contained" size="medium"
          className={classes.button} 
          onClick={() => dispatch(logout())}>
          Cancel
        </Button>
      </Container>
    </Fragment>
  );

  const spinner = () => (
    <Fragment>
      <CircularProgress />
    </Fragment>
  );

  const content = working
    ? spinner()
    : awaitingOtp
    ? renderConfirm()
    : renderLogin();

  return <Container className={classes.container}>
    <img className={classes.logo} src="./mainlogo.png"/>
    <Typography className={classes.heading}>Data4Life, Sweden</Typography>
    {content}
  </Container>;
};

export default Login;
