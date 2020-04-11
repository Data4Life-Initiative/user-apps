import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles({
  icon: {
    fontSize: 42,
  },
});

export const OpenMenu = (props) => {
  const classes = useStyles();
  return (
    <IconButton size="small" onClick={props.action}>
      <MenuIcon className={classes.icon} />
    </IconButton>
  );
};

export const CloseMenu = (props) => {
  const classes = useStyles();
  return (
    <IconButton size="small" onClick={props.action}>
      <CloseIcon className={classes.icon} />
    </IconButton>
  );
};

export const BackMenu = (props) => {
  const classes = useStyles();
  return (
    <IconButton size="small" onClick={props.action}>
      <ArrowBackIosIcon className={classes.icon} />
    </IconButton>
  );
};

