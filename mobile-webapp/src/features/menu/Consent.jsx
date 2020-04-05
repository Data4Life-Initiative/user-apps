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
  content: {
    display: 'flex',
    flexGrow: 1,
    padding: 0,
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
      <Container className={classes.content}>
        <iframe
          src="http://data4life.igrant.io/"
          className={classes.iframe}
        ></iframe>
      </Container>
    </Container>
  );
};

export default Consent;
