import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Divider from '@mui/material/Divider';
import { useAuth0 } from '@auth0/auth0-react'
import { Link, useParams, useNavigate } from "react-router-dom"
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const Explore = ({allPosts, addToFavorite, favorite }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  const navigate = useNavigate()
  const redirect = (id) => {
    navigate(`/posts/${id}`)
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
         <ImageListItemBar
                sx={{
                    background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                }}
                title={item.title}
                position="top"
                actionIcon={
                    <IconButton
                        sx={{ color: 'white' }}
                        aria-label={`star ${item.title}`}
                        onClick={() => addToFavorite(item)}>
                        
                        {favorite.includes(item) ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>    
                }
                actionPosition="left"
            />
       
    </ImageListItem>
    ))
    
    return (
        <div id='following-photos'>
            <p id='following-photos-title'>
                <Divider />
                E X P L O R E
                <Divider />
                </p>
                <Box sx={{overflowY: 'scroll' }}>
                <ImageList variant="masonry" cols={5} gap={8}>
                    {postList}
                </ImageList>
                </Box>
        </div>
    )
}

export default Explore;

{/* <p id='following-photos-title'>
                <Divider />
                E X P L O R E
                <Divider />
                </p> */}