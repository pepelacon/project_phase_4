import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

const ProFile = () => {

    const { user, isAuthenticated, isLoading } = useAuth0();
    
    useEffect(() => {
        if (user) {
            fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.name,
                email: user.email
            })
        });
            
        }
    }, [user])


    return (
        <>
        </>
    )

}

export default ProFile