import React from 'react';

import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  InputBase,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import StyledSelect from '../../components/StyledSelect' 

const useStyles = makeStyles({
  formControl: {
    flexGrow: 1,
    paddingRight: 20,
  },
});

const RiskSelect = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    riskType: 'covid-19'
  });  
  const handleSelectChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  return (
    <FormControl className={classes.formControl}>
      <StyledSelect
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        name="riskType"
        onChange={handleSelectChange}
        value={state.riskType}
        input={<InputBase />}
      >
        <MenuItem value="covid-19">COVID-19 PANDEMIC</MenuItem>
        <MenuItem value="seasonal-flu">SEASONAL FLU</MenuItem>
      </StyledSelect>
    </FormControl>
  );
};

export default RiskSelect;
