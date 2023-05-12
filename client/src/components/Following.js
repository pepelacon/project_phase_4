import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Divider from '@mui/material/Divider';


const Following = () => {
    return (
        <div id='following-photos'>
            <p id='following-photos-title'>
                <Divider />
                F O L L O W I N G
                <Divider />
                </p>
            <Box sx={{ overflowY: 'scroll' }}>
            <ImageList variant="masonry" cols={3} gap={8}>
                {itemData.map((item) => (
                <ImageListItem key={item.img}>
                    <img
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                    />
                    <ImageListItemBar id='following-photos-desc' position="below" title={item.author} />
                </ImageListItem>
                ))}
            </ImageList>
            </Box>
        </div>
    )
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
    title: 'Bed',
    author: 'swabdesign',
  },
  {
    img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
    title: 'Books',
    author: 'Pavel Nekoranec',
  },
  {
    img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    title: 'Sink',
    author: 'Charles Deluvio',
  },
  {
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
    author: 'Christian Mackie',
  },
  {
    img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
    title: 'Blinds',
    author: 'Darren Richardson',
  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
    title: 'Chairs',
    author: 'Taylor Simpson',
  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
    title: 'Laptop',
    author: 'Ben Kolde',
  },
  {
    img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
    title: 'Doors',
    author: 'Philipp Berndt',
  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Coffee',
    author: 'Jen P.',
  },
  {
    img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
    title: 'Storage',
    author: 'Douglas Sheppard',
  },
  {
    img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
    title: 'Candle',
    author: 'Fi Bell',
  },
  {
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
    title: 'Coffee table',
    author: 'Hutomo Abrianto',
  },
];

export default Following

// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import IconButton from '@mui/material/IconButton';
// import ImageListItemBar from '@mui/material/ImageListItemBar';
// import { Link, useNavigate } from "react-router-dom"



// const Following = ({userId}) => {

//     const navigate = useNavigate()
//     const redirect = (id) => {
//         navigate(`/posts/friends/${id}`)
//     }


//     const [allFriends, setAllFriends] = useState([])
//     const [allPosts, setAllPosts] = useState([])
//     const [toggle, setToggle] = useState(false)
    

//     console.log(allPosts);
//     // * get all Friends List
//     const fetchFriends = async () => {
//         const response1 = await fetch(`/users/${userId}/friends`);
//         const data1 = await response1.json();
//         setAllFriends(data1);
//       };

//     // * get all Posts List
//     const fetchPosts = async () => {
//         const response2 = await fetch(`/user/${userId}/friends/posts`);
//         const data2 = await response2.json();
//         setAllPosts(data2);
//     }

//     const fetchData = async (friend_id) => {
//         try {
//           const friendshipResponse = await fetch(`/users/${userId}/${friend_id}`);
//           const friendshipData = await friendshipResponse.json();
      
//           await fetch(`/friendships/${friendshipData.friendship.id}`, {
//             method: "DELETE",
//           });
      
//           const postsResponse = await fetch(`/friend/${friend_id}/posts`);
//           const data = await postsResponse.json();
//           console.log(data);
//           const updated = allPosts.filter((post) => {
//             return !data.some((d) => JSON.stringify(d) === JSON.stringify(post));
//           });
//           setAllPosts(updated);
//         } catch (error) {
//           console.error(error);
//         }
//       };
      
//     useEffect(() => {
//         fetchFriends();
//         fetchPosts()
//         fetchData()
//     }, [toggle]);



//     const unFollow = (friend_id) => {
//         const noFriend = allFriends.filter(friend => friend.id !== friend_id);
//         setAllFriends(noFriend);
//         fetchData(friend_id)
//     }

//     let postList = allPosts.map((item) => (
//         <ImageListItem key={item.id}>
//                 <img
//                     src={`${item.image}?w=248&fit=crop&auto=format`}
//                     srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
//                     alt={item.title}
//                     loading="lazy"
//                     onClick={ () => {redirect(item.id) }}      
//                 />
//              <ImageListItemBar
//                     sx={{
//                         background:
//                         'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
//                         'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
//                     }}
//                     title={item.title}
//                     position="top"
//                     actionIcon={
//                         <IconButton
//                             sx={{ color: 'white' }}
//                             aria-label={`star ${item.title}`}
//                         >
//                         </IconButton>
//                     }
//                     actionPosition="left"
//                 />
//         </ImageListItem>
//         ))


//     console.log(allFriends);
//     console.log(allPosts);
//     return (
//       <div>
//         <div>
//             {allFriends.map((friend) => (
//                 <div key={friend.id}>
//                     <p>Name: {friend.username}</p>
//                     <p>email: {friend.email}</p>
//                     <button onClick={() => unFollow(friend.id)}>Unfollow</button>
//                 </div>
//             ))}
//         </div>
//         <div>
//                 <Box sx={{overflowY: 'scroll' }}>
//                 <ImageList variant="masonry" cols={5} gap={8}>
//                     {postList}
//                 </ImageList>
//                 </Box>
//         </div>
//       </div>
//     );
//   };
  
//   export default Following;