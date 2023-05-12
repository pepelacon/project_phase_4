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
        main: '#32312c',
    },
  },
});

export default function YourContainer({ postsToShow, state, deleteYourPost, addToFavorite }) {

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

    const delteFromFavorite = (i) => {
        console.log("check");
        addToFavorite(i)
    }

   
        let postList = postsToShow.map((item) => (
            <ThemeProvider theme={theme}>
            <Card id='individual-card' sx={{ maxWidth: 300 }}>
            <CardMedia
                component="img"
                alt="<3"
                height="250"
                image={item.image}
            />
            <CardContent>
                <Typography id='card-details' gutterBottom variant="h5" component="div">
                {item.title}
                </Typography>
                <Typography id='card-details-little' variant="body2">
                {item.description}
                </Typography>  
            </CardContent>
            <CardActions>
                {state ?
                    <>  
                        <Link to={`/posts/${item.id}/edit`}>
                            <Button id='card-button-edit' color='third' size="small">Edit</Button>
                        </Link>
                        <Button id='card-button-delete' color='third' size="small" onClick={() => handleDelete(item)}>Delete</Button>
                    </>
                    : 
                        <Button color='third' size="small" onClick={() => delteFromFavorite(item)}>Delete</Button>
                }
            </CardActions>
            </Card>
            </ThemeProvider>
        ))

    return (
        <div id='all-posts'>
            <Box sx={{overflowY: 'scroll' }}>
            <ImageList variant="masonry" cols={5} gap={12}>
                {postList}
            </ImageList>
            </Box>
        </div>
    )
}