import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link, useNavigate } from "react-router-dom"
import Divider from '@mui/material/Divider';

const Following = ({userId}) => {

    const navigate = useNavigate()
    const redirect = (id) => {
        navigate(`/posts/friends/${id}`)
    }

    const [allFriends, setAllFriends] = useState([])
    const [allPosts, setAllPosts] = useState([])
    const [toggle, setToggle] = useState(false)
    

    console.log(allPosts);
    // * get all Friends List
    const fetchFriends = async () => {
        const response1 = await fetch(`/users/${userId}/friends`);
        const data1 = await response1.json();
        setAllFriends(data1);
      };

    // * get all Posts List
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

    let postList = allPosts.map((item) => (
        <ImageListItem key={item.id}>
            <img
                src={`${item.image}?w=248&fit=crop&auto=format`}
                srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                onClick={ () => {redirect(item.id) }}      
            />
            <ImageListItemBar id='following-photos-desc' position="below" title={item.title} />
        </ImageListItem>
        ))

    return (
        <div id='following-photos'>
            <p id='following-photos-title'>
                <Divider />
                F O L L O W I N G
                <Divider />
            </p>
            <Box sx={{overflowY: 'scroll' }}>
            <ImageList variant="masonry" cols={5} gap={8}>
                {postList}
            </ImageList>
            </Box>
        </div>
    );
  };
  
  export default Following;