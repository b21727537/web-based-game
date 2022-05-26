//import { Button, Card } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({

    palette: {
        primary: {
            main: '#102542'
        },
        secondary: {
            main: '#EFEFEF'
        },
        danger: {
            backgroundColor: '#A70C00',
            color: '#ffff',
          },
        disabled: {
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
            color: 'rgba(0, 0, 0, 0.26)',
        }
    },
    typography: {
        fontFamily: "'stolzl', 'Poppins', sans-serif",
    },
    overrides:{
        MuiCssBaseline:{
            '@global': {
                backgroundColor: '#fafafa'
            }
        },
        MuiCard:{
            root: {
                padding: '16px'
            }
        },
        MuiCheckbox: {
            colorSecondary: {
              color: '#102542F',
              '&$checked': {
                color: '#102542',
              },
            },
        },
        MuiRadio: {
            colorSecondary: {
              color: '#102542F',
              '&$checked': {
                color: '#102542',
              },
            },
        }


    }
})
theme.overrides.MuiCssBaseline['@global'] = {
    body: {
        backgroundColor: theme.palette.secondary.main
    }
}

export default theme;