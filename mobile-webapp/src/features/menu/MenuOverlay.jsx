import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { OpenMenu } from '../../components/IconControls';
import RiskSelect from './RiskSelect';
import Main from './Main';
import Account from './Account';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowMenu, toggleMain, selectActivePage } from './menuSlice';

const useStyle = makeStyles({
  container: {
    height: '100vh',
    backgroundColor: 'rgb(242,242,242)',
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
  // notifications: ,
  // 'data preferences': ,
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
      <Container className={classes.container}>{menus[activePage]}</Container>
    );
};

export default MenuOverlay;
