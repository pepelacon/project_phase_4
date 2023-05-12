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

function PostCard({userId}) {
    const [bigCard, setBigCard] = useState({})
    const [user, setUser] = useState({})
    const [friends, setFriends] = useState([])
    const [toggle, setToggle] = useState(false)

    let {id} = useParams()
    const {title, image, category, description} = bigCard
    const {username} = user
    const navigate = useNavigate()
    
// get info abt CARD
    useEffect(() => {
        console.log(id);
        fetch(`/posts/${id}`)
        .then((resp) => resp.json())
        .then((data) => setBigCard(data))
    }, [id])


// get info abt AUTHOR of post
    useEffect(() => {
        fetch(`/posts/${id}/user`)
        .then((resp) => resp.json())
        .then((data) => setUser(data))
    }, [id])



//set friends list
useEffect(() => {
    console.log(userId);
    fetch(`/users/${userId}/friends`)
      .then((resp) => resp.json())
      .then((data) => handleFriendsData(data))
  }, [toggle]);

  function handleFriendsData(data) {
    setFriends(data);
    const existingFriend = data.some((friend) => parseInt(userId) === friend.friend_id);
    console.log(existingFriend);
}
      
      
      
      console.log(friends, `Post ID:  ${id}`, `Account logged IN: ${userId}`, `Author of post ID: ${user.id}`);
    


      const handleAddFriend = () => {
        console.log("addFriend called")
        fetch(`/friendships/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            friend_id: user.id,
            user_id: userId
          }),
        }).then((res) => {
          if(res.ok) {
            res.json().then(post => {
              console.log(post);
            //   setFriends([...friends, user]);
              setToggle(!toggle);
            })
          }
        })
      }
    
      const handleRemoveFriend = () => {
        console.log("removeFriend called")
        fetch(`/friendships`, {
          method: "DELETE"
        }).then((res) => {
          if(res.ok) {
            setFriends(friends.filter((friend) => friend.fiend_id !== parseInt(userId)));
            console.log(typeof userId)
            setToggle(!toggle);
          }
        })
      }
        
    let singleCard = (
      <div id='single-card-screen'>
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
          
            <Button id='single-card-button' size="medium" onClick={handleAddFriend}>Add friend</Button>
          
        </CardContent>
      </Card>
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