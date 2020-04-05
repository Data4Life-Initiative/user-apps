import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MapContainer from './features/heatmap/MapContainer';
import MenuOverlay from './features/menu/MenuOverlay';

// < DEMO
import { useDispatch } from 'react-redux';
import { addNotification } from './app/notificationsSlice';
import { useEffect } from 'react';
// />

const containerStyle = {
  maxWidth: '100%',
  padding: 0,
};

const useStyles = makeStyles({
  app: {
    ...containerStyle,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  mapContainer: {
    ...containerStyle,
    flexGrow: 1,
  },
  bar: {
    position: 'absolute',
    padding: 0,
  },
});

function App() {
  const classes = useStyles();

  // < DEMO SCRIPT
  const dispatch = useDispatch();
  const note1 = { id: 1, msg: 'HALLO', actionCode: 1 };
  const delay1 = 2;

  useEffect(() => {
    setTimeout(() => dispatch(addNotification(note1)), delay1 * 1000);
  }, []);
  // />

  return (
    <Container className={classes.app}>
      <Container className={classes.mapContainer}>
        <MapContainer />
      </Container>
      <Container className={classes.bar}>
        <MenuOverlay />
      </Container>
    </Container>
  );
}

export default App;
