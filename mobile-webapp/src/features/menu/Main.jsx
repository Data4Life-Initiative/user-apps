import React from 'react';
import { Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CloseMenu } from '../../components/IconControls';
import { useDispatch } from 'react-redux';
import { toggleMain, setActivePage } from './menuSlice';
import { logout } from './loginSlice';
import { Autocomplete } from '@react-google-maps/api';

const useStyle = makeStyles({
  container: {
    padding: 0,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    backgroundColor: 'rgb(255, 255, 255, 0.8)',
    borderRadius: 8,
    width: 375,
    marginLeft: 16
  },
  entry: {
    fontFamily: 'Arial',
    fontSize: 30,
    padding: 0,
    paddingBottom: 10,
  },
});

const Entry = ({ title, action }) => {
  const classes = useStyle();
  return (
    <Button onClick={action} className={classes.entry}>
      {title}
    </Button>
  );
};

const MainMenu = () => {
  const dispatch = useDispatch();
  const classes = useStyle();
  return (
    <Container className={classes.container}>
      <CloseMenu action={() => dispatch(toggleMain())} />
      <Container className={classes.list}>
        {['home', 'account', 'notifications', 'data preferences'].map((e) => (
          <Entry key={e} title={e} action={() => dispatch(setActivePage(e))} />
        ))}
        <Entry key="logout" title="logout" action={() => dispatch(logout())} />
      </Container>
    </Container>
  );
};

export default MainMenu;
