import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Link } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber } from '@mui/material/colors';

const Settings = () => {

    const [state, setState] = useState(true)
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [alignment, setAlignment] = useState('your posts');

    const handleList = (event, newAlignment) => {
        setAlignment(newAlignment);
        setState(!state)
    };

    const theme = createTheme({
        palette: {
          primary: {
              main: amber[50],
          },
          secondary: {
              main: '#5c6f59',
          },
          third: {
              main: '#757269',
          },
        },
      });

    return (
        <div id='profile-page'>       
            <p>Welcome, {user.name}</p>
            <ThemeProvider theme={theme}>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleList}
                aria-label="Large"
            >
                <Link to="/profile">
                    <ToggleButton id='toggler' value="your posts" color='third' >Your Posts</ToggleButton>
                </Link>
                <Link to="/profile/new">
                    <ToggleButton id='toggler' value="new post" color='third' >New Post</ToggleButton>
                </Link>
                <Link to="/profile/likes">
                    <ToggleButton id='toggler' value="favorite" color='third' >Likes</ToggleButton>
                </Link>
                <Link to="/profile/friends">
                    <ToggleButton id='toggler' value="friends" color='third' >Friends</ToggleButton>
                </Link>
                <Link to="/profile/settings">
                    <ToggleButton id='toggler' value="settings" color='third' >Edit Profile</ToggleButton>
                </Link>
            </ToggleButtonGroup>                
            </ThemeProvider>
            <h2>This is an edit profile page</h2>
        </div>
    )
}

export default Settings