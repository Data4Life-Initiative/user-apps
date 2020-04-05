import React, { useEffect } from 'react';
import { Container, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CloseMenu } from '../../components/IconControls';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMain, setActivePage } from '../menu/menuSlice';

import { selectRiskScore, fetchRiskScore } from './riskSlice';

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
  spinner: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const RiskScore = () => {
  const dispatch = useDispatch();
  const classes = useStyle();
  const risk = useSelector(selectRiskScore);

  useEffect(() => {
    dispatch(fetchRiskScore('--add access token here--'));
  }, [dispatch]);

  const { riskScore, working } = risk;
  return (
    <Container className={classes.container}>
      <CloseMenu action={() => dispatch(setActivePage('home'))} />
      {working ? (
        <Container className={classes.spinner}>
          <CircularProgress />
        </Container>
      ) : (
        <Container className={classes.content}>
          <Typography className={classes.heading}>
            RISK SCORE: {riskScore}
          </Typography>
        </Container>
      )}
    </Container>
  );
};

export default RiskScore;
