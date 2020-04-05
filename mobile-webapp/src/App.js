import React from 'react';
import { Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MapContainer from './features/heatmap/MapContainer';
import MenuOverlay from './features/menu/MenuOverlay';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';

// < DEMO
import { useDispatch, useSelector } from 'react-redux';
import {
  addNotification,
  selectNewNotifactions,
} from './app/notificationsSlice';
import { selectLoginState } from './features/menu/loginSlice';
import { useEffect } from 'react';
import { setActivePage } from './features/menu/menuSlice';
// />

const containerStyle = {
  maxWidth: '100%',
  padding: 0,
};

const useStyles = makeStyles({
  app: {
    ...containerStyle,
    height: '100%',
    width: '100%',    
    display: 'flex',
    flexDirection: 'row',
  },
  mapContainer: {
    ...containerStyle,
    flexGrow: 1,
  },
  bar: {
    position: 'absolute',
    padding: 0,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    height: 100,
  },
  alert: {
    width: '20%',
  },
  alertIcon: {
    color: 'red',
    fontSize: 72,
  },
  notificationIcon: {
    color: 'grey',
    fontSize: 72,
  },
});

function App() {
  const classes = useStyles();

  // < DEMO SCRIPT
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(selectLoginState);

  useEffect(() => {
    const note1 = {
      id: 1,
      msg:
        'We have detected a new hotspot at a location you have been to recently. We recommend you perform a risk assessment clicking the button below: ',
      actionCode: 1,
    };
    const delayAfterLogin = 40;

    if (loggedIn) {
      setTimeout(
        () => dispatch(addNotification(note1)),
        delayAfterLogin * 1000
      );
    }
  }, [dispatch, loggedIn]);

  const newNotifications = useSelector(selectNewNotifactions);
  const iconStyle =
    Object.keys(newNotifications).length > 0
      ? classes.alertIcon
      : classes.notificationIcon;
  // />

  return (
    <Container className={classes.app}>
      <Container className={classes.mapContainer}>
        <MapContainer />
      </Container>
      <Container className={classes.footer}>
        <Button className={classes.alert}>
          <NotificationImportantIcon
            className={iconStyle}
            onClick={() => dispatch(setActivePage('notifications'))}
          />
        </Button>
      </Container>
      <Container className={classes.bar}>
        <MenuOverlay />
      </Container>
    </Container>
  );
}

export default App;
