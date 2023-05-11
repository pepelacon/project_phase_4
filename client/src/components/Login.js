
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';


const Login = () => {
    
    const { loginWithRedirect } = useAuth0();

  
    return <Button color="secondary" size='large' onClick={() => loginWithRedirect()}>
            Login
         </Button>
 
};

export default Login;