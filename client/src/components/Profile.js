import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import YourContainer from './YourContainer';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Link } from "react-router-dom"
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
    third: {
        main: '#757269',
    },
  },
});

const ProFile = ({setUserId, userId, favorite, setAllPosts, allPosts, addToFavorite}) => {

    const { user, isAuthenticated, isLoading } = useAuth0();
    const [yourPosts, setYourPosts] = useState([{}])
    const [state, setState] = useState(true)

    const [alignment, setAlignment] = useState('your posts');

    const handleList = (event, newAlignment) => {
        setAlignment(newAlignment);
        setState(!state)
    };

    const deleteYourPost = (post) => {
        setYourPosts(yourPosts.filter(p => p.id !== post.id))
        setAllPosts(allPosts.filter(p => p.id !== post.id))
    }

    
    useEffect(() => {
        if (userId) {
          fetch(`/users/${userId}/posts`)
            .then(response => response.json())
            .then(data => {
              setYourPosts(data);
            })
            .catch(error => console.error(error));
        }
      }, [userId]);

    useEffect(() => {
        async function createUser() {
          try {
            console.log(user)
            const response = await fetch('/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: user.name,
                email: user.email
              })
            });
      
            const data = await response.json();
            setUserId(data.id);
            console.log(data.id);
          } catch (error) {
            console.error(error);
          }
        }
        if (user && !userId) {
            createUser();
        }
      }, [user, userId]);
   
    if (isLoading) {
        return <div id='loading-screen'>Loading...</div>;
      }
    
   
    const postsToShow = state ? yourPosts : favorite
    
    return (
        <div id='profile-page'>       
            <p>Welcome, {user.name}</p>
            {/* <p>Your user_id is: {userId}</p> */}
            <ThemeProvider theme={theme}>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleList}
                aria-label="Large"
            >
                <ToggleButton id='toggler' value="your posts" color='third' >Your Posts</ToggleButton>
                <Link to="/profile/new">
                    <ToggleButton id='toggler' value="favorite" color='third' >New Post</ToggleButton>
                </Link>
                <Link to="/profile/likes">
                    <ToggleButton id='toggler' value="favorite" color='third' >Likes</ToggleButton>
                </Link>
                <Link to="/profile/friends">
                    <ToggleButton id='toggler' value="friends" color='third' >Friends</ToggleButton>
                </Link>
                <Link to="/profile/settings">
                    <ToggleButton id='toggler' value="favorite" color='third' >Edit Profile</ToggleButton>
                </Link>
            </ToggleButtonGroup>                
            <YourContainer postsToShow={postsToShow} state={state} deleteYourPost={deleteYourPost} addToFavorite={addToFavorite}/>
            </ThemeProvider>
        </div>
    )

}

export default ProFile