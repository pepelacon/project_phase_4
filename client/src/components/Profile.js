import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import YourContainer from './YourContainer';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

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
        return <div>Loading...</div>;
      }
    
   
    const postsToShow = state ? yourPosts : favorite
    
    return (
        <>
            <div>       
                <p>Welcome, {user.name}</p>
                <p>Your user_id is: {userId}</p>
                <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleList}
                        aria-label="Platform"
                    >
                    <ToggleButton value="your posts">your posts</ToggleButton>
                    <ToggleButton value="favorite">favorite</ToggleButton>
                    
                </ToggleButtonGroup>                
                <YourContainer postsToShow={postsToShow} state={state} deleteYourPost={deleteYourPost} addToFavorite={addToFavorite}/>
            </div>
        </>
    )

}

export default ProFile