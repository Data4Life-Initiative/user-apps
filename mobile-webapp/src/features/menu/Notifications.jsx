import React from 'react';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from '@material-ui/core';
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
  cardContent: {
    padding: 5,
  },
  actions: {
    justifyContent: 'center',
    padding: 5,
  },
});

const Action = ({ note }) => {
  const dispatch = useDispatch();
  const classes = useStyle();
  return (
    <Card variant="outlined">
      <CardContent className={classes.cardContent}>
        <Typography>{note.msg}</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          variant="contained"
          className={classes.risk}
          onClick={() => dispatch(setActivePage('risk'))}
        >
          Evaluate your risk score
        </Button>
      </CardActions>
    </Card>
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
          <Action key={note.id} note={note} />
        ))}
      </Container>
    </Container>
  );
};

export default Notifications;
