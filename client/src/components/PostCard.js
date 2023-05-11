import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import * as yup from "yup"



function PostCard({userId}) {
    const [bigCard, setBigCard] = useState({})
    const [user, setUser] = useState({})

    console.log(bigCard);
    let {id} = useParams()
    const {title, image, category, description} = bigCard
    const {username} = user

    console.log(user.id);
    const navigate = useNavigate()
    
    console.log(userId);
    useEffect(() => {
        console.log(id)
        fetch(`/posts/${id}`)
        .then((resp) => resp.json())
        .then((data) => setBigCard(data))
    }, [id])

    useEffect(() => {
        console.log(id)
        fetch(`/posts/${id}/user`)
        .then((resp) => resp.json())
        .then((data) => setUser(data))
    }, [id])

    
    
      
    const addFriend = (friendId) => {
        console.log("addFriend called")
        fetch("/friendships", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                friend_id: friendId,
                user_id: userId
            }),
        }).then((res) => {
            if(res.ok) {
            res.json().then(post => {
                console.log(post);
                navigate(`/`)
            })
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
                <button onClick={()=> addFriend(user.id)} >Add to friends</button>
            </div>
            <div className="single-card-footer">
                <span className="single-text-price">Price: </span>
                <span>Category: {category}</span>
            </div>
        </div>  
    )
}

export default PostCard;