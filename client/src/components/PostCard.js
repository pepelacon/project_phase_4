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
          
            <Button id='single-card-button' size="medium" onClick={handleAddFriend}>Add friend</Button>

            <Button id='single-card-heart' size="medium" color='third'>
                <FavoriteBorderIcon />
            </Button>
            <Button id='single-card-heart' size="medium" color='third'>
                <FavoriteIcon />
            </Button>
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

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";




// function PostCard({ userId, num }) {
//     const [bigCard, setBigCard] = useState({});
//     const [user, setUser] = useState({});
//     const [isFriend, setIsFriend] = useState(false);
//     const [toggle, setToggle] = useState(false);
//     const [friendship, setFriendship] = useState(null);
//     const navigate = useNavigate();

//     const { id: postId } = useParams();
//     const { title, image, category, description } = bigCard;
//     const { username, id } = user;
//     console.log(username, id);
//     // get info about CARD and FRIENDS
//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const postResponse = await fetch(`/posts/${postId}`);
//             const postData = await postResponse.json();
//             setBigCard(postData);
      
//             const userResponse = await fetch(`/posts/${postId}/user`);
//             const userData = await userResponse.json();
//             setUser(userData);
           
//             const friendshipResponse = await fetch(`/users/${userId}/${userData.id}`);
//             const friendshipData = await friendshipResponse.json();
      
//             if (friendshipData.friendshipExists) {
//               setFriendship(friendshipData.friendship);
//               setIsFriend(true);
//             } else {
//               setFriendship(null);
//               setIsFriend(false);
//             }
//           } catch (error) {
//             console.error(error);
//           }
//         };
      
//         fetchData();
//       }, [postId, toggle]);

      

//     console.log(
//       friendship,
//       `Post ID:  ${postId}`,
//       `Account logged IN: ${userId}`,
//       `Author of post ID: ${id}`
//     );

//     const handleAddFriend = () => {
//       if ( friendship === null ) {
//         fetch(`/friendships/${userId}`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             friend_id: id,
//             user_id: userId,
//           }),
//         })
//           .then((res) => res.json())
//           .then((newFriendship) => {
//             setFriendship(newFriendship);
//             setIsFriend(true);
//           });
//       } else {
//         fetch(`/friendships/${friendship.id}`, {
//           method: "DELETE",
//         }).then((res) => {
//           if (res.ok) {
//             setFriendship(null);
//             setIsFriend(false);
//           }
//         });
//       }
//     };
     
      
        
//     return(
//         <div className="single-card" >
//             <div >
//                 <img className="single-card-img" src={image} alt={title} onClick={() => navigate('/')}/>
//             </div>
//             <div className="single-card-info">
//                 <div className='single-title'>
//                     <h3 className="single-text-title">{title} </h3>
//                 </div>
//                 <div className='ingle-text-body'>
//                     <p>{description}</p>
//                 </div>
//                 <div className='ingle-text-body'>
//                     <p>Author Name: {username}</p>
//                     <p>Author ID: {id}</p>

//                 </div>

                
//                 {userId !== id && (
//                   <button onClick={handleAddFriend}>
//                     {isFriend ? "Remove friend" : "Add friend"}
//                   </button>
//                 )}
                
//             </div>
//             <div className="single-card-footer">
//                 <span className="single-text-price">Price: </span>
//                 <span>Category: {category}</span>
//             </div>
//         </div>  
//     )
// }

// export default PostCard;