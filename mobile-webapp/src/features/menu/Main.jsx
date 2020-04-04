import React from 'react';
import { Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CloseMenu } from '../../components/IconControls';
import { useDispatch } from 'react-redux';
import { toggleMain, setActivePage } from './menuSlice';
import { logout } from './loginSlice';

const useStyle = makeStyles({
  container: {
    padding: 0,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
        {['home', 'account'].map((e) => (
          <Entry key={e} title={e} action={() => dispatch(setActivePage(e))} />
        ))}
        {['notifications', 'data preferences'].map((e) => (
          <Entry key={e} title={e} action={() => {}} />
        ))}
        <Entry key="logout" title="logout" action={() => dispatch(logout())} />
      </Container>
    </Container>
  );
};

export default MainMenu;
