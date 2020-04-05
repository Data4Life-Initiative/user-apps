import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { OpenMenu } from '../../components/IconControls';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMain, setActivePage } from '../menu/menuSlice';

import { selectAccountDetails } from './accountSlice';

const borderRadius = 18;
const width = '80%';
const lineHeight = 2.2;

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
  label: {
    marginTop: 15,
    color: 'rgb(200,200,200)',
    fontFamily: ['Arial'],
    fontSize: 14,
  },
  input: {
    borderRadius,
    backgroundColor: 'rgb(241,241,241)',
    fontFamily: ['Arial'],
    fontSize: 16,
    pointerEvents: 'none',
    width,
    lineHeight,
    textAlign: 'center',
  },
  history: {
    width,
    borderRadius,
    marginTop: 10,
    fontFamily: ['Arial'],
    fontSize: 14,
    lineHeight,
    borderColor: 'grey',
  },
  risk: {
    fontSize: 14,
    lineHeight,
    width,
    marginTop: 20,
    fontFamily: ['Arial'],
    borderRadius: 18,
    backgroundColor: 'rgb(92,200,77)',
  },
  healthy: {
    backgroundColor: 'rgba(92,200,77, 0.5)',
  },
});

const Label = ({ label }) => {
  const classes = useStyle();
  return <Typography className={classes.label}>{label}</Typography>;
};

const Account = () => {
  const dispatch = useDispatch();
  const classes = useStyle();
  const { mobile, age } = useSelector(selectAccountDetails);
  return (
    <Container className={classes.container}>
      <OpenMenu action={() => dispatch(toggleMain())} />
      <Container className={classes.content}>
        <Typography className={classes.heading}>ACCOUNT DETAILS</Typography>
        <Label label="YOUR MOBILE NUMBER" />
        <Button
          readOnly
          className={classes.input}
          style={{ textDecoration: 'underline' }}
        >
          {mobile}
        </Button>
        <Label label="YOUR AGE" />
        <Button className={classes.input}>{age}</Button>
        <Label label="YOUR HEALTH STATUS" />
        <Button className={[classes.input, classes.healthy].join(' ')}>
          Healthy
        </Button>
        <Label label="YOUR LOCATION DATA" />
        <Button className={classes.input}>Enabled</Button>
        <Button variant="outlined" className={classes.history}>
          Historic Locations
        </Button>
        <Button
          variant="contained"
          className={classes.risk}
          onClick={() => dispatch(setActivePage('risk'))}
        >
          Evaluate your risk score
        </Button>
      </Container>
    </Container>
  );
};

export default Account;
