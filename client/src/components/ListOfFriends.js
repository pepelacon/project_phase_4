import FriendCard from "./FriendCard"
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber } from '@mui/material/colors';
import { Link, useNavigate } from "react-router-dom"
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ListOfFriends({userId}){
    
    const [state, setState] = useState(true)
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [alignment, setAlignment] = useState('your posts');
    const [allFriends, setAllFriends] = useState([])
    const [allPosts, setAllPosts] = useState([])
    const [toggle, setToggle] = useState(false)

    const handleList = (event, newAlignment) => {
        setAlignment(newAlignment);
        setState(!state)
    };
    const navigate = useNavigate()
    const redirect = (id) => {
        navigate(`/posts/friends/${id}`)
    }

    const fetchFriends = async () => {
        const response1 = await fetch(`/users/${userId}/friends`);
        const data1 = await response1.json();
        setAllFriends(data1);
      };

    const fetchPosts = async () => {
        const response2 = await fetch(`/user/${userId}/friends/posts`);
        const data2 = await response2.json();
        setAllPosts(data2);
    }

    const fetchData = async (friend_id) => {
        try {
          const friendshipResponse = await fetch(`/users/${userId}/${friend_id}`);
          const friendshipData = await friendshipResponse.json();
      
          await fetch(`/friendships/${friendshipData.friendship.id}`, {
            method: "DELETE",
          });
      
          const postsResponse = await fetch(`/friend/${friend_id}/posts`);
          const data = await postsResponse.json();
          console.log(data);
          const updated = allPosts.filter((post) => {
            return !data.some((d) => JSON.stringify(d) === JSON.stringify(post));
          });
          setAllPosts(updated);
        } catch (error) {
          console.error(error);
        }
      };
      
    useEffect(() => {
        fetchFriends();
        fetchPosts()
        fetchData()
    }, [toggle]);



    const unFollow = (friend_id) => {
        const noFriend = allFriends.filter(friend => friend.id !== friend_id);
        setAllFriends(noFriend);
        fetchData(friend_id)
    }

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
        <div id='friend-card'>
            {allFriends.map((friend) => (
                <div key={friend.id}>
                <Card id='legit-friend-card' sx={{ maxWidth: 275 }}>
                <CardContent>
                    <Typography id="friend-name" gutterBottom>
                    {friend.username}
                    </Typography>
                    <Typography id="friend-email" variant="h5" component="div">
                    {friend.email}
                    </Typography>
                    <CardActions>
                        <Button id='unfollow-button' size="small" onClick={() => unFollow(friend.id)}>Unfollow</Button>
                    </CardActions>  
                </CardContent>
                </Card>
                </div>
            ))}
        </div>
        </ThemeProvider>
        </div>
     )   
}

export default ListOfFriends;
  {/* <div>
            {allFriends.map((friend) => (
                <div key={friend.id}>
                    <p>Name: {friend.username}</p>
                    <p>email: {friend.email}</p>
                    <button onClick={() => unFollow(friend.id)}>Unfollow</button>
                </div>
            ))}
        </div> */}