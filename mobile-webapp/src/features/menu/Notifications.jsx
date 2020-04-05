import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { OpenMenu } from '../../components/IconControls';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMain, setActivePage } from '../menu/menuSlice';

import { selectLoginState } from './loginSlice';

const useStyle = makeStyles({
  container: {
    padding: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    fontFamily: ['Arial'],
    fontSize: 30,
  },
});

const Notifications = () => {
  const dispatch = useDispatch();
  const classes = useStyle();
  const { access_token } = useSelector(selectLoginState);
  return (
    <Container className={classes.container}>
      <OpenMenu action={() => dispatch(toggleMain())} />
      <Container className={classes.content}>
        <Typography className={classes.heading}>NOTIFICATIONS</Typography>
      </Container>
    </Container>
  );
};

export default Notifications;
