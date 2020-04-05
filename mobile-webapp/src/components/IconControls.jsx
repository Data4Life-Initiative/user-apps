import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  icon: {
    fontSize: 54,
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
    <IconButton onClick={props.action}>
      <CloseIcon className={classes.icon} />
    </IconButton>
  );
};
