import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import YourContainer from './YourContainer';
import { Link } from "react-router-dom"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
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
        main: '#3d503a',
      },
    },
  });

const ProFile = ({setUserId, userId, favorite, setAllPosts, allPosts, addToFavorite}) => {

    const { user, isAuthenticated, isLoading } = useAuth0();
    const [yourPosts, setYourPosts] = useState([{}])
    const [state, setState] = useState(true)


    const [alignment, setAlignment] = useState('your posts');

    const deleteYourPost = (post) => {
        setYourPosts(yourPosts.filter(p => p.id !== post.id))
        setAllPosts(allPosts.filter(p => p.id !== post.id))
    }

    const handleList = (event, newAlignment) => {
        setAlignment(newAlignment);
        setState(!state)
    };
    
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
            <ThemeProvider theme={theme}>
                <p>Welcome, {user.name}</p>
                {/* <p>Your user_id is: {userId}</p> */}
                <ToggleButtonGroup
                        color='secondary'
                        value={alignment}
                        exclusive
                        onChange={handleList}
                        // aria-label="Platform"
                        aria-label="Large sizes"
                    >
                    <ToggleButton id='toggler' value="your posts" color='third'>your posts</ToggleButton>
                    <ToggleButton id='toggler' value="favorite" color='third'>favorite</ToggleButton>
                    <Link to={"/profile/new"}>
                        <ToggleButton id='toggler' value="new post" color='third'>new post</ToggleButton>
                    </Link>
                    <ToggleButton id='toggler' value="friends" color='third'>friends</ToggleButton>
                    <ToggleButton id='toggler' value="settings" color='third'>settings</ToggleButton>
                </ToggleButtonGroup>                
                <YourContainer postsToShow={postsToShow} state={state} deleteYourPost={deleteYourPost} addToFavorite={addToFavorite}/>
            </ThemeProvider>     
            </div>
    )

}

export default ProFile