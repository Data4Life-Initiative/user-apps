import React, { useState, Fragment } from 'react';
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
  text: {
    fontFamily: 'Arial',
    fontSize: 30,
  },
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
        onChange={(e) => setMobile(e.target.value)}
      />
      <Button className={classes.text} onClick={() => dispatch(login(mobile))}>
        Login
      </Button>
    </Fragment>
  );

  const renderConfirm = () => (
    <Fragment>
      <TextField
        className={classes.text}
        required
        label="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <Button
        className={classes.text}
        onClick={() => dispatch(confirm(mobile, otp))}
      >
        Confirm
      </Button>
      <Button className={classes.text} onClick={() => dispatch(logout())}>
        Cancel
      </Button>
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

  return <Container className={classes.container}>{content}</Container>;
};

export default Login;
