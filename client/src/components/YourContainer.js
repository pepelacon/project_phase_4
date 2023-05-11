import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import { Link, useParams, useNavigate } from "react-router-dom"


export default function YourContainer({ postsToShow, state, deleteYourPost }) {

    const handleDelete = (post) => {
        fetch(`/posts/${post.id}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete post')
          }
          
          deleteYourPost(post)
        })
        .catch(error => console.error(error))
      }

    console.log(state);
        let postList = postsToShow.map((item) => (
            <Card sx={{ maxWidth: 300 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={item.image}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {item.description}
                </Typography>
                
            </CardContent>
            <CardActions>
                {state ?
                    <>  
                        <Link to={`/posts/${item.id}/edit`}>
                            <Button size="small">Edit</Button>
                        </Link>
                        <Button size="small" onClick={() => handleDelete(item)}>Delete</Button>
                    </>
                    : 
                        <Button size="small">Delete</Button>
                }
            </CardActions>
            </Card>
        ))

    return (

        <div id='all-posts'>
            <Box sx={{overflowY: 'scroll' }}>
            <ImageList variant="masonry" cols={5} gap={8}>
                {postList}
            </ImageList>
            </Box>
        </div>
    )
}