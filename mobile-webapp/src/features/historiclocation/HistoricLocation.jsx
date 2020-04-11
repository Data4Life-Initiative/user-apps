import React, { useRef, useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, MenuItem, FormControl, InputBase, Container, Typography, Button, List, ListItem, ListItemText, Checkbox, Radio } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMain, setActivePage } from '../menu/menuSlice';
import { IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { BackMenu, CloseMenu } from '../../components/IconControls';
import MapContainer from '../heatmap/MapContainer';
import StyledSelect from '../../components/StyledSelect' 
import { StandaloneSearchBox } from "@react-google-maps/api";
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import {
  Marker,
} from "@react-google-maps/api";

import { selectHistoricLocationDetails } from './historicLocationSlice';

const borderRadius = 18;
const fontSize = 22;
const width = '80%';
const lineHeight = 2.2;

const useStyle = makeStyles({
  container: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',    
    alignItems: 'center',
    height: window.innerHeight,
    width: window.innerWidth,
    backgroundColor: 'rgb(255, 255, 255)'
  },
  icon: {
    fontSize: 32
  },
  iconbutton: {
    color: 'royalblue',
    padding: 12,
    fontSize: fontSize
  },
  backbutton: {
    marginLeft: -12,
    marginTop: 1,
    fontSize: fontSize
  },
  cancelbutton: {
    fontSize: fontSize
  },
  locationlist: {
    overflow: 'auto',
    marginBottom: 12,
    width: '100%',
    flex: 1
  },
  listitem: {
    '&:not(:last-child)': {
      borderBottom: '1px solid #ccc'
    }    
  },  
  content: {
    flex: 1,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
  },
  pageheading: {
    padding: 12,
    textAlign: 'center',
    flex: 1,
    fontFamily: ['Arial'],    
    fontWeight: 600,
    color: 'grey',
    fontSize: fontSize,    
  },
  heading: {
    padding: 8,
    textAlign: 'center',
    flex: 1,
    fontFamily: ['Arial'],
    marginLeft: -42,
    fontSize: 24,
  },
  subheading: {
    padding: 8,
    textAlign: 'center',
    fontFamily: ['Arial'],
    fontWeight: 600,
    fontSize: 22,
  },
  subtitle: {
    paddingTop: 8,
    paddingLeft: 16,
    alignSelf: 'start',
    textAlign: 'center',
    fontFamily: ['Arial'],
    fontWeight: 600,
    fontSize: 20,
  },
  pagetext: {
    textAlign: 'left',
    fontFamily: ['Arial'],    
    fontSize: 12,
    color: '#888'
  },
  label: {
    alignSelf: 'start',
    paddingLeft: 50,
    paddingBottom: 4,    
    marginTop: 28,
    color: '#666',
    fontFamily: ['Arial'],
    fontSize: 20,
  },
  addButton: {
    fontSize: 14,
    lineHeight,
    width,
    marginBottom: 18,
    fontFamily: ['Arial'],
    borderRadius: 18,
    // backgroundColor: 'rgb(92,200,77)',
  },
  mapContainer: {
    padding: 0,
    paddingTop: 8,
    flex: 1,
  },
  dropdowninput: {
    '&:focus': {
      backgroundColor: 'rgb(255,255,255)',
    }
  },
  dropdownselect: {
    width: `275px`,
  },
  inputText: {
    width: `275px`,
  },
  formControl: {
    flexGrow: 1,
    alignItems: 'center'
  }, 
  locationTypeContainer: {
    padding: 0,
    paddingTop: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const Label = ({ label }) => {
  const classes = useStyle();
  return <Typography className={classes.label}>{label}</Typography>;
};

const HistoricLocation = () => {
  const dispatch = useDispatch();
  const classes = useStyle();
  const historicLocation = useSelector(selectHistoricLocationDetails);
  const [isGoBackEnabled, setGoBackEnabled] = useState(false);
  const [isAddVisitedPlace, setIsAddVisitedPlace] = useState(false);
  const [currentView, setCurrentView] = useState('locationList');
  const [selectedLocation, setSelectedLocation] = useState();  
  
  const selectLocation = (location) => {
    setSelectedLocation(location);
    setCurrentView('viewLocation');
  }

  const addLocation = (location) => {
    setSelectedLocation({
      startTime: (new Date()),
      duration: 0,
      locationType: '',
      lat: '',
      long: '',
    });
    setCurrentView('newLocation');
  }

  const handleLocationTypeSelectChange = (event) => {
    setSelectedLocation({...selectedLocation, ['locationType']: event.target.value});
  }

  const handleVisitTimeChange = (date) => {
    setSelectedLocation({...selectedLocation, ['startTime']: date});
  }

  const search = useRef(null);

  const setPlace = (place) => {
    console.log(place);
  }

  const generateLocationList = () => {    
    return historicLocation.locations.map((location, index) => {
      let date = new Date();
      date.setTime(location.startTime);
      let secondaryLocationText = moment(date).format('ddd DD-MM-YYYY, hh:mm A')
      return (
        <ListItem button className={classes.listitem} key={index} onClick={() => {selectLocation(location)}}>
            <ListItemText primary={location.locationType || 'Unknown'} secondary={secondaryLocationText} />
            <ArrowForwardIosIcon />
        </ListItem>     
      )
    });
  }  

  const { google } = window;

  return (
      currentView === 'locationList' && (
        <Container className={classes.container}>
          <Container className={classes.header}>
            <CloseMenu action={() => dispatch(setActivePage('account'))} />
            <Typography className={classes.heading}>{historicLocation.locationSource}</Typography>
          </Container>
          <Typography className={classes.subtitle}>Places you've visited</Typography>
          <Container className={classes.content}>
            <List className={classes.locationlist} dense={false}>
              { generateLocationList() }
            </List>            
          </Container>
          <Button
              variant="contained"
              color="primary"
              className={classes.addButton}
              onClick={() => {historicLocation.locationSource === 'Manual Entry' && addLocation()}}
          >            
            {historicLocation.locationSource === 'Manual Entry' ? 'ADD NEW ENTRY' : 'CONFIGURE ' + historicLocation.locationSource.toUpperCase()}
          </Button>
        </Container>        
      )
      ||
      currentView === 'newLocation' &&
      (
        <Container className={classes.container}>
          <Container className={classes.header}>
            <BackMenu action={() => setCurrentView('locationList')} />
            <Typography className={classes.heading}>Add Visited Place</Typography>
          </Container>
          <Container className={classes.content}>
              <Label label="LOCATION TYPE" />
              <Container className={classes.locationTypeContainer}>
                <FormControl className={classes.formControl}>
                  <StyledSelect
                  displayEmpty
                  labelId="health-status-select-label"
                  id="health-status-select"
                  name="healthStatus"
                  value={selectedLocation.locationType}
                  onChange={handleLocationTypeSelectChange}
                  className={classes.dropdownselect}
                  input={<InputBase/>}
                  >
                    <MenuItem disabled value="">
                      <em>Select location type...</em>
                    </MenuItem>
                    <MenuItem value="Home">Home</MenuItem>
                    <MenuItem value="Work">Work</MenuItem>
                    <MenuItem value="Groceries">Groceries</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </StyledSelect>
                </FormControl>  
              </Container>
              <Label label="LOCATION ADDRESS" />
              <StandaloneSearchBox
                className={classes.inputText}
                onLoad={(ref) => (search.current = ref)}
                onPlacesChanged={() => setPlace(search.current.getPlaces())}
              >
                <TextField 
                  placeholder="Type address"
                  style={{
                    width: `275px`,
                  }}
                />
              </StandaloneSearchBox>
              <Label label="DATE &amp; TIME OF VISIT" />
              <DateTimePicker
                clearIcon={null}
                className={classes.inputText}
                onChange={handleVisitTimeChange}
                value={selectedLocation.startTime}
              />
          </Container>
          <Button
              variant="contained"
              color="primary"
              className={classes.addButton}
              onClick={() => {setCurrentView('locationList')}}
          >            
            ADD VISIT
          </Button>          
        </Container>        
      )
      ||
      currentView === 'viewLocation' &&
      (
        <Container className={classes.container}>
          <Container className={classes.header}>
            <BackMenu action={() => setCurrentView('locationList')} />
            <Typography className={classes.heading}>Visited Place</Typography>
          </Container>
          <Container className={classes.content}>
            <Typography className={classes.subheading}>{selectedLocation.locationType}</Typography>
            <Typography className={classes.pagetext}>
              Arrived: {moment(selectedLocation.startTime).format('ddd DD-MM-YYYY, hh:mm A')}
            </Typography>
            <Typography className={classes.pagetext}>
              Stayed: {Math.floor(selectedLocation.duration / 60) + ' hour, ' + selectedLocation.duration % 60 + ' minutes' }
            </Typography>
            <Container className={classes.mapContainer}>
              <MapContainer 
                children={
                  <Marker
                    position={new google.maps.LatLng(selectedLocation.lat, selectedLocation.long)}
                  />
                }
              />
            </Container>            
          </Container>
        </Container>        
      )
  );
};

export default HistoricLocation;
