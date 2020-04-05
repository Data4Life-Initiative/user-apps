import React from 'react';

import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  InputBase,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  input: {
    borderRadius: 24,
    position: 'relative',
    backgroundColor: 'rgb(242,242,242)',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    // Use the system font instead of the default Roboto font.
    fontFamily: 'Arial',
    '&:focus': {
      borderRadius: 24,
      // borderColor: '#80bdff',
      //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  formControl: {
    flexGrow: 1,
    paddingRight: 20,
  },
});

const RiskSelect = () => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <Select
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={1}
        input={<InputBase className={classes.input} />}
      >
        <MenuItem value={2}>SEASONAL FLUE</MenuItem>
        <MenuItem value={1}>COVID-19 PANDEMIC</MenuItem>
        <MenuItem value={2}>SEASONAL VIRUS</MenuItem>
      </Select>
    </FormControl>
  );
};

export default RiskSelect;
