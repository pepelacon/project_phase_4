// import SearchBar from "./SearchBar";
// // import Basket from "./Basket"
// // import './NavBar.css'
// import {Link} from "react-router-dom"
// // import SignUp from './SignUp';
// // import SignOut from './SignOut';
// // import { CiShoppingCart } from "react-icons/ci"
// // import { useAuth0 } from "@auth0/auth0-react"
// // import logo from "./logo.png"


// function NavBar({ setSearch, basketItem }) {
// // const {user, isAuthenticated} = useAuth0()

// // const quantity = basketItem.reduce((acc, cur) => {return acc + cur.count}, 0)

//     return(
//         <div className="nav-bar">
//             <div className="item logo">
//                 <img className="logo" src="sdf" alt="Buy Sell"/>
//             </div>
//             <div className="item search">
//                 <SearchBar setSearch={setSearch} />
//             </div>
//             <div className="item sign">
                
//                 <Link to = {"/form"}> 
//                     <button>Add Product</button>
                    
//                 </Link>

//             </div>
import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import small from '../images/small.png';
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
    },
  });

const NavBar = () => {
    return (
        <div id='nav-bar'>
            <ThemeProvider theme={theme}>
                <Stack direction="row" spacing={2}>
                    <Button color="secondary" size='large'>Following</Button>
                    <Button color="secondary" size='large'>Search</Button>
                    <Button color="secondary" size='large'>New Post</Button>
                    <img id="small-logo" src={small}/>
                    <Button color="secondary" size='large'>Settings</Button>
                    <Button color="secondary" size='large'>Profile</Button>
                    <Button color="secondary" size='large'>Logout</Button>
                </Stack>
            </ThemeProvider>
        </div>
    )


}

export default NavBar;
