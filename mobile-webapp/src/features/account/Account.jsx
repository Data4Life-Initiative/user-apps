import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green, blue } from '@material-ui/core/colors';
import { Container, Typography, Button, FormControl, FormControlLabel, MenuItem, InputBase, Select, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { OpenMenu } from '../../components/IconControls';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMain, setActivePage } from '../menu/menuSlice';
import QRCode from 'qrcode.react';

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
  input: {
    borderRadius: 24,
    position: 'relative',
    backgroundColor: 'rgb(242,242,242)',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    // Use the system font instead of the default Roboto font.
    fontFamily: 'Arial',
    '&:focus': {
      borderRadius: 24,
      // borderColor: '#80bdff',
      //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  formControl: {
    flexGrow: 1,
    paddingRight: 20,
  },   
  healthyContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  qrcode: {
    paddingTop: 6,
    paddingBottom: 6,
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
        <QRCode className={classes.qrcode} value={mobile} />          
        <Label label="YOUR MOBILE NUMBER" />
        <Button
          readOnly
          className={classes.input}
        >
          {mobile}
        </Button>
        <Label label="YOUR AGE" />
        <Button className={classes.input}>{age}</Button>
        <Label label="YOUR HEALTH STATUS" />
        <Container className={classes.healthyContainer}>
          <FormControl className={classes.formControl}>
            <Select
            labelId="health-status-select-label"
            id="health-status-select"
            value="healthy"
            input={<InputBase className={classes.input} />}
            >
              <MenuItem value="healthy">Healthy</MenuItem>
              <MenuItem value="not_infected">Not Infected</MenuItem>
              <MenuItem value="immunized">Immunized</MenuItem>
              <MenuItem value="infected_with_symptom">Infected With Symptoms</MenuItem>
              <MenuItem value="infected_without_symptom">Infected Without Symptoms</MenuItem>
            </Select>
          </FormControl>  
        </Container>
        <Label label="YOUR LOCATION DATA" />
        <FormControlLabel
            control={<GreenCheckbox checked={state.isLocationEnabled} onChange={handleChange} name="isLocationEnabled" />}
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
