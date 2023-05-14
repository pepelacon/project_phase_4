import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Divider from '@mui/material/Divider';
import { useAuth0 } from '@auth0/auth0-react'
import { Link, useParams, useNavigate } from "react-router-dom"

const Explore = ({allPosts}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  const navigate = useNavigate()
  const redirect = (id) => {
    navigate(`/posts/${id}`)
  }
    return (
        <div id='following-photos'>
            <p id='following-photos-title'>
                <Divider />
                E X P L O R E
                <Divider />
                </p>
            <Box sx={{ overflowY: 'scroll' }}>
            <ImageList variant="masonry" cols={6} gap={8}>
                {allPosts.map((post) => (
                <ImageListItem key={post.image}>
                    <img
                    src={`${post.image}?w=248&fit=crop&auto=format`}
                    srcSet={`${post.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={post.title}
                    loading="lazy"
                    onClick={ () => {redirect(post.id) }}
                    />
                    <ImageListItemBar id='following-photos-desc' position="below" title={post.title} />
                </ImageListItem>
                ))}
            </ImageList>
            </Box>
        </div>
    )
}

export default Explore;