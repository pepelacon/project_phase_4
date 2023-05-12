import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Divider from '@mui/material/Divider';
import { useAuth0 } from '@auth0/auth0-react'

const Explore = ({allPosts}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //       try {      
  //         const userResponse = await fetch(`/posts/${postId}/user`);
  //         const userData = await userResponse.json();
  //         setUser(userData);
  //         console.log(userData.id);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     } 
  //     fetchData();
  //   }, [postId, toggle])

    return (
        <div id='following-photos'>
            <p id='following-photos-title'>
                <Divider />
                E X P L O R E
                <Divider />
                </p>
            <Box sx={{ overflowY: 'scroll' }}>
            <ImageList variant="masonry" cols={3} gap={8}>
                {allPosts.map((post) => (
                <ImageListItem key={post.image}>
                    <img
                    src={`${post.image}?w=248&fit=crop&auto=format`}
                    srcSet={`${post.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={post.title}
                    loading="lazy"
                    />
                    <ImageListItemBar id='following-photos-desc' position="below" title={post.user_id} />
                </ImageListItem>
                ))}
            </ImageList>
            </Box>
        </div>
    )
}

export default Explore;