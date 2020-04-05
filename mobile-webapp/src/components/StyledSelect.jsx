import { withStyles } from '@material-ui/core/styles';
import { Select } from '@material-ui/core';

export default withStyles({
  root: {
    borderRadius: 24,
    position: 'relative',
    backgroundColor: 'rgb(255,255,255)',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '12px 4px 12px 12px',
    // Use the system font instead of the default Roboto font.
    fontFamily: 'Arial',
    '&:focus': {
      borderRadius: 24,      
      backgroundColor: 'rgb(242,242,242)',
      // borderColor: '#80bdff',
      //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    }
  },
  select: {
    '&:focus': {
      backgroundColor: 'rgb(255,255,255) !important',
    }
  },
})(Select);
