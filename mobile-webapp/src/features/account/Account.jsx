import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green, blue } from '@material-ui/core/colors';
import { Container, Typography, Button, FormControlLabel, Switch, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { OpenMenu } from '../../components/IconControls';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMain, setActivePage } from '../menu/menuSlice';

import { selectAccountDetails } from './accountSlice';

const borderRadius = 18;
const width = '80%';
const lineHeight = 2.2;

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const BlueCheckbox = withStyles({
  root: {
    color: blue[400],
    '&$checked': {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);


const useStyle = makeStyles({
  container: {
    padding: 0,
  },
  healthyContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
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
    // backgroundColor: 'rgb(92,200,77)',
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
  const [state, setState] = React.useState({
    isHealthy: true,
    hasImmunity: false
  });  

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

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
        <Container className={classes.healthyContainer}>
          <FormControlLabel
            control={<GreenCheckbox checked={state.isHealthy} onChange={handleChange} name="isHealthy" />}
            label="Healthy"
          />        
          <FormControlLabel
            control={<BlueCheckbox checked={state.hasImmunity} onChange={handleChange} name="hasImmunity" />}
            label="Has Immunity"          
          />
        </Container>
        <Label label="YOUR LOCATION DATA" />
        <FormControlLabel
            control={<Checkbox checked={state.isLocationEnabled} onChange={handleChange} name="isLocationEnabled" />}
            label="Enabled"          
          />
        <Button variant="outlined" className={classes.history}>
          Historic Locations
        </Button>
        <Button
          variant="contained"
          color="primary"
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
