import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import PostContainer from './PostContainer';

const ProFile = ({setUserId, userId}) => {

    const { user, isAuthenticated, isLoading } = useAuth0();
    const [yourPosts, setYourPosts] = useState([{}])

    // const [userId, setUserId] = useState(null);
    
    useEffect(() => {
        if (userId) {
          fetch(`/users/${userId}/posts`)
            .then(response => response.json())
            .then(data => {
              setYourPosts(data);
            })
            .catch(error => console.error(error));
        }
      }, [userId]);

    console.log(yourPosts);

    useEffect(() => {
        async function createUser() {
          try {
            const response = await fetch('/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: user.name,
                email: user.email
              })
            });
      
            const data = await response.json();
            setUserId(data.id);
            console.log(data.id);
          } catch (error) {
            console.error(error);
          }
        }
      
        
        if (user && !userId) {
            createUser();
        }
      }, [user, userId]);
   
    if (isLoading) {
        return <div>Loading...</div>;
      }
    
    return (
        <>
            <div>
                <p>Welcome, {user.name}</p>
                <p>Your user_id is: {userId}</p>
                <PostContainer allPosts={yourPosts}/>
            </div>
        </>
    )

}

export default ProFile