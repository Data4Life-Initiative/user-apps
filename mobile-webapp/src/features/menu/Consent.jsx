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
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  iframe: {
    width: '100%',
    height: '100%',
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
      <OpenMenu action={() => dispatch(toggleMain())} />
      <iframe
        src="http://data4life.igrant.io/"
        className={classes.iframe}
      ></iframe>
    </Container>
  );
};

export default Consent;
