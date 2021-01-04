import { createMuiTheme } from '@material-ui/core';

const AppTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#004aac',
      contrastText: '#fff',
    },
    secondary: {
      main: 'rgba(0,0,0,0.87)',
    },
    info: {
      main: '#e3f2fd',
    },
  },
  typography: {
    h1: {
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
      '@media (min-width:600px)': {
        fontSize: '4rem',
      },
    },
  },
  overrides: {
    MuiButton: {
      outlinedSizeSmall: {
        border: 'none',
      },
    },
    MuiAccordionDetails: {
      root: {
        padding: 0,
      },
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
});

export default AppTheme;
