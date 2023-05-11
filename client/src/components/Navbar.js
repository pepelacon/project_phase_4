import { Link, useParams, useNavigate } from "react-router-dom"
import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import small from '../images/small.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber } from '@mui/material/colors';


// import { Link } from '@mui/material/Link';

import { useAuth0 } from '@auth0/auth0-react'
import Login from './Login';
import LogOut from './LogOut';


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

const NavBar = () => {

    const { user, isAuthenticated, isLoading } = useAuth0();
    // let {id} = useParams()
   

    // const navigate = useNavigate()
    
    // useEffect(() => {
    //     console.log(id)
    //     fetch(`http://localhost:3001/items/${id}`)
    //     .then((resp) => resp.json())
    //     .then((data) => setBigCard(data))
    // }, [id])

    if (isAuthenticated) {
    return (
        <div id='nav-bar'>

            <ThemeProvider theme={theme}>
                <Stack direction="row" spacing={2}>
                    <Link to={"/user/friends"}>
                        <Button classname='nav-buttons' color="secondary" size='large'>Following</Button>
                    </Link>
                    <Button classname='nav-buttons' color="secondary" size='large'>Search</Button>
                    <Link to={"/"}>
                        <Button classname='nav-buttons' color="secondary" size='large'>For you</Button>
                    </Link>
                    
                    <img id="small-logo" src={small}/>
                    <Link to={"/posts/new"}>
                        <Button classname='nav-buttons' color="secondary" size='large'>New Post</Button>
                    </Link>
                    
                    <Link to={"/profile"}>
                        <Button classname='nav-buttons' color="secondary" size='large'>Profile</Button>
                    </Link>
                    <LogOut />

                </Stack>
            </ThemeProvider>
        </div>
    )
} else if (!isAuthenticated) {
    return (
        <div id='nav-bar'>

            <ThemeProvider theme={theme}>
                <Stack direction="row" spacing={2}>
                    <Button color="secondary" size='large'>Search</Button>
                    <img id="small-logo" src={small}/>
                    <Login />
                </Stack>
            </ThemeProvider>
        </div>
    )
}

}

export default NavBar;
