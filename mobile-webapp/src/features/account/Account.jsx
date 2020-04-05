import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green, blue } from '@material-ui/core/colors';
import { Container, Typography, Button, FormControl, FormControlLabel, MenuItem, InputBase, Select, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CloseMenu } from '../../components/IconControls';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMain, setActivePage } from '../menu/menuSlice';
import StyledSelect from '../../components/StyledSelect' 
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

const useStyle = makeStyles({
  container: {
    padding: 0,
  },
  dropdowninput: {
    '&:focus': {
      backgroundColor: 'rgb(255,255,255)',
    }
  },
  dropdownselect: {
    width: width,
  },
  formControl: {
    flexGrow: 1,
    alignItems: 'center'
  },   
  healthyContainer: {
    padding: 0,
    paddingTop: 12,
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
  header: {
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
  },
  heading: {
    padding: 8,
    textAlign: 'center',
    flex: 1,
    fontFamily: ['Arial'],
    fontSize: 30,
  },
  label: {
    marginTop: 15,
    color: 'rgb(150,150,150)',
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
    hasImmunity: false,
    healthStatus: 'healthy'
  });  

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleSelectChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <Container className={classes.container}>
      <Container className={classes.header}>
        <CloseMenu action={() => dispatch(setActivePage('home'))} />
        <Typography className={classes.heading}>ACCOUNT DETAILS</Typography>
      </Container>
      <Container className={classes.content}>        
        <QRCode 
          size={100}
          className={classes.qrcode} value={mobile || ''} 
        />          
        <Label label="YOUR MOBILE NUMBER" />
        <Button
          readOnly
          className={classes.input}
        >
          {mobile || ''}
        </Button>
        <Label label="YOUR AGE" />
        <Button className={classes.input}>{age || ''}</Button>
        <Label label="YOUR HEALTH STATUS" />
        <Container className={classes.healthyContainer}>
          <FormControl className={classes.formControl}>
            <StyledSelect
            labelId="health-status-select-label"
            id="health-status-select"
            name="healthStatus"
            value={state.healthStatus}
            onChange={handleSelectChange}
            className={classes.dropdownselect}
            input={<InputBase/>}
            >
              <MenuItem value="healthy">Healthy</MenuItem>
              <MenuItem value="not_infected">Not Infected</MenuItem>
              <MenuItem value="immunized">Immunized</MenuItem>
              <MenuItem value="infected_with_symptom">Infected With Symptoms</MenuItem>
              <MenuItem value="infected_without_symptom">Infected Without Symptoms</MenuItem>
            </StyledSelect>
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
