import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import small from '../images/small.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber } from '@mui/material/colors';

const theme = createTheme({
    palette: {
      primary: {
        main: amber[50],
      },
      secondary: {
        main: '#5c6f59',
      },
    },
  });

const Navbar = () => {
    return (
        <div id='nav-bar'>
            <ThemeProvider theme={theme}>
                <Stack direction="row" spacing={2}>
                    <Button color="secondary" size='large'>Following</Button>
                    <Button color="secondary" size='large'>Search</Button>
                    <Button color="secondary" size='large'>New Post</Button>
                    <img id="small-logo" src={small}/>
                    <Button color="secondary" size='large'>Settings</Button>
                    <Button color="secondary" size='large'>Profile</Button>
                    <Button color="secondary" size='large'>Logout</Button>
                </Stack>
            </ThemeProvider>
        </div>
    )
}

export default Navbar