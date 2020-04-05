import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { OpenMenu } from '../../components/IconControls';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMain, setActivePage } from '../menu/menuSlice';

import {
  selectNewNotifactions,
  updateNotifiactionStatus,
} from '../../app/notificationsSlice';

const useStyle = makeStyles({
  container: {
    padding: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    fontFamily: ['Arial'],
    fontSize: 30,
  },
  risk: {
    fontSize: 14,
    marginTop: 5,
    fontFamily: ['Arial'],
    borderRadius: 18,
    backgroundColor: 'rgb(92,200,77)',
  },
});

const Action = ({ actionCode }) => {
  const dispatch = useDispatch();
  const classes = useStyle();
  return (
    <Button
      variant="contained"
      className={classes.risk}
      onClick={() => dispatch(setActivePage('risk'))}
    >
      Evaluate your risk score
    </Button>
  );
};

const Notifications = () => {
  const dispatch = useDispatch();
  const classes = useStyle();
  const newNotifications = useSelector(selectNewNotifactions);
  return (
    <Container className={classes.container}>
      <OpenMenu action={() => dispatch(toggleMain())} />
      <Container className={classes.content}>
        <Typography className={classes.heading}>NOTIFICATIONS</Typography>
        {newNotifications.map((note) => (
          <Container key={note.id}>
            <Typography>{note.msg}</Typography>
            <Action actionCode={note.actionCode} />
          </Container>
        ))}
      </Container>
    </Container>
  );
};

export default Notifications;
