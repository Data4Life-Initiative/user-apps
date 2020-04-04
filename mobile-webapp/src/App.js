import React, {useState} from 'react';
import {Container, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles'
import MapContainer from './features/heatmap/MapContainer';

const useStyles = makeStyles({
  app: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  mapContainer: {
    flexGrow: 1
  }
})

function App() {
  const classes = useStyles()
  return (
    <Container className={classes.app}>
        <Container>
          <Typography>Data4Life</Typography>
        </Container>
        <Container className={classes.mapContainer}>
          <MapContainer />
        </Container>
    </Container>
  );
}

export default App;
