import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { OpenMenu } from '../../components/IconControls';
import { useDispatch } from 'react-redux';
import { toggleMain } from './menuSlice';

const useStyle = makeStyles({
  container: {
    padding: 0,
  },
});

const Account = () => {
  const dispatch = useDispatch();
  const classes = useStyle();
  return (
    <Container className={classes.container}>
      <OpenMenu action={() => dispatch(toggleMain())} />
      <Typography>Account</Typography>
    </Container>
  );
};

export default Account;
