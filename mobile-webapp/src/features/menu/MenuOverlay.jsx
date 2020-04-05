import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { OpenMenu } from '../../components/IconControls';
import RiskSelect from './RiskSelect';
import Main from './Main';
import Account from '../account/Account';
import RiskScore from '../riskscore/RiskScore';
import Login from './Login';
import Consent from './Consent';
import Notifications from './Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowMenu, toggleMain, selectActivePage } from './menuSlice';

const useStyle = makeStyles({
  container: {
    height: '100vh',
    backgroundColor: 'white',
    padding: 0,
  },
  menucontainer: {
    height: '100vh',
    padding: 0,
  },
  bar: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: 0,
  },
});

const menus = {
  main: <Main />,
  account: <Account />,
  risk: <RiskScore />,
  notifications: <Notifications />,
  'data preferences': <Consent />,
  login: <Login />,
};

const MenuOverlay = () => {
  const dispatch = useDispatch();
  const showMenu = useSelector(selectShowMenu);
  const activePage = useSelector(selectActivePage);
  const classes = useStyle();
  if (!showMenu)
    return (
      <Container className={classes.bar}>
        <OpenMenu action={() => dispatch(toggleMain())} />;
        <RiskSelect />
      </Container>
    );
  else
    return (
      <Container className={activePage === 'main' ? classes.menucontainer : classes.container}>{menus[activePage]}</Container>
    );
};

export default MenuOverlay;
