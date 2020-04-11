import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green, blue } from '@material-ui/core/colors';
import { Container, Typography, Button, FormControl, FormControlLabel, MenuItem, InputBase, Select, Checkbox, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CloseMenu } from '../../components/IconControls';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMain, setActivePage } from '../menu/menuSlice';
import StyledSelect from '../../components/StyledSelect' 
import QRCode from 'qrcode.react';

import { selectAccountDetails, setHealthStatus, setIsLocationEnabled } from './accountSlice';
import { setRiskPadding } from '../riskscore/riskSlice';
import { setLocationSource } from '../historiclocation/historicLocationSlice';

const borderRadius = 18;
const width = '80%';
const lineHeight = 2.2;

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
  locationdataContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 6,
    justifyContent: 'center',
  }, 
  healthyContainer: {
    padding: 0,
    paddingTop: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
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
    marginLeft: -42,
    fontSize: 24,
  },
  label: {
    marginTop: 12,
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
  screening: {
    fontSize: 14,
    lineHeight,
    width,
    marginTop: 20,
    fontFamily: ['Arial'],
    borderRadius: 18,
    // backgroundColor: 'rgb(92,200,77)',
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
  const { mobile, age, infection_status, is_location_enabled } = useSelector(selectAccountDetails);
  const [state, setState] = React.useState({
    isHealthy: true,
    hasImmunity: false,
    locationSource: '',
  });  

  const handleLocationStatusChange = (event) => {
    dispatch(setIsLocationEnabled(event.target.checked));
  };

  const handleHealthStatusSelectChange = (event) => {
    if(event.target.value === 'start_screening') {
      dispatch(setActivePage('screening'));
    } else {
      dispatch(setHealthStatus(event.target.value));
    }    
  };

  const handleSelectChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
    dispatch(setLocationSource(event.target.value));
    dispatch(setActivePage('historicLocation'));
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
        <Label label="MOBILE NUMBER" />
        <Typography className={classes.input}>
          {mobile || ''}
        </Typography>
        <Label label="AGE" />
        <Typography className={classes.input}>
          {age || ''}
        </Typography>
        <Label label="WELLNESS STATUS" />
        <Container className={classes.healthyContainer}>
          <FormControl className={classes.formControl}>
            <StyledSelect
            displayEmpty
            labelId="health-status-select-label"
            id="health-status-select"
            name="healthStatus"
            value={infection_status}
            onChange={handleHealthStatusSelectChange}
            className={classes.dropdownselect}
            input={<InputBase/>}
            >
              <MenuItem disabled value="">
                <em>Select wellness status...</em>
              </MenuItem>
              <MenuItem value="start_screening">Start Wellness Screening...</MenuItem>
              <MenuItem value="healthy">Healthy</MenuItem>
              <MenuItem value="healthy_susceptible">Healthy, But Susceptible</MenuItem>
              <MenuItem value="not_infected">Not Infected</MenuItem>
              <MenuItem value="immunized">Immunized</MenuItem>
              <MenuItem value="infected_with_symptom">Infected With Symptoms</MenuItem>
              <MenuItem value="infected_without_symptom">Infected Without Symptoms</MenuItem>
            </StyledSelect>
          </FormControl>  
        </Container>
        <Container className={classes.locationdataContainer}>
          <Label label="LOCATION DATA" />
          <Switch color="primary" name="isLocationEnabled" checked={is_location_enabled} onChange={handleLocationStatusChange}/>
        </Container>
        <Label label="HISTORIC LOCATIONS" />
        <Container className={classes.healthyContainer}>
          <FormControl className={classes.formControl}>
            <StyledSelect
            displayEmpty
            labelId="location-source-select-label"
            id="location-source-select"
            name="locationSource"
            value={state.locationSource}
            onChange={handleSelectChange}
            className={classes.dropdownselect}
            input={<InputBase/>}
            >
              <MenuItem disabled value="">
                <em>Select location history from...</em>
              </MenuItem>
              <MenuItem value="Manual Entry">Manual Entry</MenuItem>
              <MenuItem value="Google Service">Google Service</MenuItem>
              <MenuItem value="Facebook Service">Facebook Service</MenuItem>
              <MenuItem value="Apple Service">Apple Service</MenuItem>              
            </StyledSelect>
          </FormControl>
        </Container>
        <Button
          variant="contained"
          color="primary"
          className={classes.risk}
          onClick={() => {dispatch(setRiskPadding(0));dispatch(setActivePage('risk'))}}
        >
          Evaluate your risk score
        </Button>
      </Container>
    </Container>
  );
};

export default Account;
