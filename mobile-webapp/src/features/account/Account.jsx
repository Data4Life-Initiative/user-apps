import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { OpenMenu } from '../../components/IconControls';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMain } from '../menu/menuSlice';

import { selectLocationHistory } from './accountSlice';

const useStyle = makeStyles({
  container: {
    padding: 0,
  },
});

const Account = () => {
  const dispatch = useDispatch();
  const classes = useStyle();
  const hist = useSelector(selectLocationHistory());
  console.log(hist);
  return (
    <Container className={classes.container}>
      <OpenMenu action={() => dispatch(toggleMain())} />
      <Typography>Account</Typography>
    </Container>
  );
};

export default Account;
