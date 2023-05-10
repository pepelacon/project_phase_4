import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'

const ProFile = () => {

    const { user, isAuthenticated, isLoading } = useAuth0();
    const [userId, setUserId] = useState(null);
    
    // useEffect(() => {
    //     if (user) {
    //         fetch('/users', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             username: user.name,
    //             email: user.email
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(data => { 
    //         setUserId(data.id)
    //         console.log(data.id);
    //     })
    //     .catch(error => console.error(error));    
    //     }
    // }, [user])
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
            </div>
        </>
    )

}

export default ProFile