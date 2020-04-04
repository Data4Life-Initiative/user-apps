import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MapContainer from './features/heatmap/MapContainer';
import MenuOverlay from './features/menu/MenuOverlay';

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
  return (
    <Container className={classes.app}>
      <Container className={classes.mapContainer}>
        <MapContainer />
      </Container>
      {/* <Container className={classes.bar}>
        <MenuOverlay />
      </Container> */}
    </Container>
  );
}

export default App;
