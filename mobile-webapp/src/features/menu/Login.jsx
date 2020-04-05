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
import OtpInput from 'react-otp-input';

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
  otpheading: {
    padding: 8,
    textAlign: 'center',
    fontFamily: ['Arial'],
    fontSize: 16,
  },
  heading: {
    fontFamily: ['Arial'],
    fontSize: 22,
    fontWeight: 600,    
    marginBottom: 100
  },
  buttonContainer: {
    paddingTop: 18,
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
  const OTP_LENGTH = 6;
  const dispatch = useDispatch();
  const classes = useStyle();
  const { awaitingOtp, working } = useSelector(selectLoginState);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const handleOtpChange = otp => {
    setOtp(otp);
  };  
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
      <Button disabled={ mobile.trim().length === 0 } variant="contained" color="primary" size="medium" className={classes.button} onClick={() => dispatch(login(mobile))}>
        Login
      </Button>
    </Fragment>
  );

  const renderConfirm = () => (
    <Fragment>
        <Typography className={classes.otpheading}>OTP</Typography>
        <OtpInput        
          inputStyle={{
            width: '1.5rem',
            height: '1.5rem',
            margin: '0 0.25rem',
            fontSize: 16,
            borderRadius: 4,
            border: '1px solid rgba(0,0,0,0.3)',
          }}     
          focusStyle={{
            outline: 'none'
          }}
          value={otp}
          onChange={handleOtpChange}     
          shouldAutoFocus={true}          
          numInputs={OTP_LENGTH}
          separator={<span>-</span>}
        />      
      <Container className={classes.buttonContainer}>
        <Button
          disabled={ otp.length < OTP_LENGTH}
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
