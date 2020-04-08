import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CloseMenu } from '../../components/IconControls';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMain, setActivePage } from '../menu/menuSlice';

import { selectLoginState } from './loginSlice';

const useStyle = makeStyles({
  container: {
    padding: 0,
    height: window.innerHeight,
    width: window.innerWidth,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  iframe: {
    flex: 1,
    width: '100%',
    padding: 0,
    borderStyle: 'none',
  },
});

const Consent = () => {
  const dispatch = useDispatch();
  const classes = useStyle();
  const { access_token } = useSelector(selectLoginState);
  return (
    <Container className={classes.container}>
      <CloseMenu action={() => dispatch(setActivePage('home'))} />
      <iframe
        src="https://data4life.igrant.io/"
        className={classes.iframe}
      ></iframe>
    </Container>
  );
};

export default Consent;
