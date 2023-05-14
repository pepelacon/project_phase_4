import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";




function PostCardFromFriendsList({ userId }) {

    const [bigCard, setBigCard] = useState({});
    const [user, setUser] = useState({});
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();

    const { id: postId } = useParams();
    const { title, image, category, description } = bigCard;
    const { username, id } = user;
    console.log(username, id);

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
           
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, [postId, toggle]);

      
    return(
        <div className="single-card" >
            <div >
                <img className="single-card-img" src={image} alt={title} onClick={() => navigate('/profile/following')}/>
            </div>
            <div className="single-card-info">
                <div className='single-title'>
                    <h3 className="single-text-title">{title} </h3>
                </div>
                <div className='ingle-text-body'>
                    <p>{description}</p>
                </div>
                <div className='ingle-text-body'>
                    <p>Author Name: {username}</p>
                    <p>Author ID: {id}</p>

                </div>
                
            </div>
            <div className="single-card-footer">
                <span className="single-text-price">Price: </span>
                <span>Category: {category}</span>
            </div>
        </div>  
    )
}

export default PostCardFromFriendsList;