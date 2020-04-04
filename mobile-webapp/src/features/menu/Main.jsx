import React from 'react';
import { Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CloseMenu } from '../../components/IconControls';
import { useDispatch } from 'react-redux';
import { toggleMain, setActivePage } from './menuSlice';

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

const Entry = ({ page }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => dispatch(setActivePage(page))}
      className={classes.entry}
    >
      {page}
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
        {['home', 'account', 'notifications', 'data preferences', 'about'].map(
          (e) => (
            <Entry key={e} page={e} />
          )
        )}
      </Container>
    </Container>
  );
};

export default MainMenu;
