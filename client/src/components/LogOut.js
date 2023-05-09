import { useAuth0 } from '@auth0/auth0-react'
import Button from '@mui/material/Button';


const LogOut = () => {
    const { logout, isAuthenticated } = useAuth0();
    return (
        <Button color="secondary" size='large' onClick={() => logout({ logoutParams: { returnTo: window.location.origin }})}>Logout</Button>

        // isAuthenticated && (
        //     <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin }})}>
        //         Sign Out
        //     </button>
        )
    
}

export default LogOut