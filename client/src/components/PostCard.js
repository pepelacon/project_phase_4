import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import * as yup from "yup"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
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


function PostCard({userId, setToggle, toggle}) {
    // const [bigCard, setBigCard] = useState({})
    // const [user, setUser] = useState({})
    // const [friends, setFriends] = useState([])
    // const [toggle, setToggle] = useState(false)

    const [bigCard, setBigCard] = useState({});
    const [user, setUser] = useState({});
    const [isFriend, setIsFriend] = useState(false);
    
    const [friendship, setFriendship] = useState(null);
    const [isLike, setIsLike] = useState(false)
    const [likes, setLikes]  = useState([]);

    let { id: postId } = useParams()
    const {title, image, category, description} = bigCard
    
    const { username, id } = user;
    const navigate = useNavigate()
    
 // get info about CARD and FRIENDS
 useEffect(() => {
  const fetchData = async () => {
    try {
      const postResponse = await fetch(`/posts/${postId}`);
      const postData = await postResponse.json();
      setBigCard(postData);

      const userResponse = await fetch(`/posts/${postId}/user`);
      const userData = await userResponse.json();
      setUser(userData);
     
      const friendshipResponse = await fetch(`/users/${userId}/${userData.id}`);
      const friendshipData = await friendshipResponse.json();

      if (friendshipData.friendshipExists) {
        setFriendship(friendshipData.friendship);
        setIsFriend(true);
      } else {
        setFriendship(null);
        setIsFriend(false);
      }

      const likesResponse = await fetch(`/post/${postId}/likes`);
      const likesData = await likesResponse.json();
      setLikes(likesData)

      const likesCheckResponse = await fetch(`/post/${userId}/${postId}`);
      const likesCheckData = await likesCheckResponse.text();
      setIsLike(Boolean(likesCheckData))
      console.log(likesCheckData);
      

    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, [postId, toggle]);


const handleAddFriend = () => {
  if ( friendship === null ) {
    fetch(`/friendships/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        friend_id: id,
        user_id: userId,
      }),
    })
      .then((res) => res.json())
      .then((newFriendship) => {
        setFriendship(newFriendship);
        setIsFriend(true);
      });
  } else {
    fetch(`/friendships/${friendship.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setFriendship(null);
        setIsFriend(false);
        setToggle(!toggle)
      }
    });
  }
};

console.log(isLike);

const handleLikes = () => {
    if (!isLike) {
      fetch(`/post/likes/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: postId,
          user_id: userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLikes((prev) => [...prev, data]);
          setIsLike(true);
        });
    } else {
      const likeId = likes.find((like) => like.user_id === userId)?.id;
      fetch(`/post/${userId}/likes/${postId}`, {
        method: "DELETE",
      })
        .then((res) => res.text())
        .then((data) => {
          setIsLike(false);
          setLikes((prev) => prev.filter((like) => like.id !== likeId));
        });
    }
    // setToggle(!toggle);
  };

        
    let singleCard = (
      <div id='single-card-screen'>

      <ThemeProvider theme={theme}>

      <Card id='single-card' sx={{ maxWidth: 500 }}>
      <CardMedia
        id="single-card-img"
        component="img"
        height='auto'
        image={image}
        alt={title}
        onClick={() => navigate('/')}
        />
        <CardContent>
          <Typography id="single-text-title" gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography id="single-text-body" gutterBottom variant="h5" component="div">
            "{description}"
          </Typography>
          <Divider />
          <Typography id="single-text-extras" gutterBottom variant="h5" component="div">
            Posted By: {username}
          </Typography>
          <Typography id="single-text-extras" gutterBottom variant="h5" component="div">
            Category: {category}
          </Typography>
          {userId !== id && (
            <Button id='single-card-button' size="medium" onClick={handleAddFriend}>{isFriend ? "Remove friend" : "Add friend"}</Button>  
            )}
            <Button id='single-card-heart' size="medium" color='third' onClick={handleLikes}>
                
                {!isLike? <FavoriteBorderIcon /> : <FavoriteIcon />}
            </Button>
            <Typography id="single-text-extras" gutterBottom variant="h5" component="div">
            <h3>likes:   { likes.length }</h3>
          </Typography>
            
        </CardContent>
      </Card>
      </ThemeProvider>
      </div>
    )
    return (
      <div id='single-card-screen' >
      <div id='single-card-box'>
          <Box >
              {singleCard}
          </Box>
      </div>
      </div>
  )
}

export default PostCard;


