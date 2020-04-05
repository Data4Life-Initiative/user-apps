import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CloseMenu } from '../../components/IconControls';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMain, setActivePage } from '../menu/menuSlice';

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

const RiskScore = () => {
  const dispatch = useDispatch();
  const classes = useStyle();
  return (
    <Container className={classes.container}>
      <CloseMenu action={() => dispatch(setActivePage('account'))} />
      <Container className={classes.content}>
        <Typography className={classes.heading}>RISK SCORE: 99</Typography>
        <p>We recommend to stop programming</p>
        <h1>im•me•di•ate•ly</h1>
      </Container>
    </Container>
  );
};

export default RiskScore;
