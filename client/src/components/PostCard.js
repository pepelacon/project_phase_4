import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import * as yup from "yup"



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
        
    return(
        <div className="single-card" >
            <div >
                <img className="single-card-img" src={image} alt={title} onClick={() => navigate('/')}/>
            </div>
            <div className="single-card-info">
                <div className='single-title'>
                    <h3 className="single-text-title">{title} </h3>
                </div>
                <div className='ingle-text-body'>
                    <p>{description}</p>
                </div>
                <div className='ingle-text-body'>
                    <p>Author: {username}</p>
                </div>
                
                    <button onClick={handleAddFriend}>Add friend</button>
                
            </div>
            <div className="single-card-footer">
                <span className="single-text-price">Price: </span>
                <span>Category: {category}</span>
            </div>
        </div>  
    )
}

export default PostCard;