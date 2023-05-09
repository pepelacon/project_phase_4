import SearchBar from "./SearchBar";
// import Basket from "./Basket"
// import './NavBar.css'
import {Link} from "react-router-dom"
// import SignUp from './SignUp';
// import SignOut from './SignOut';
// import { CiShoppingCart } from "react-icons/ci"
// import { useAuth0 } from "@auth0/auth0-react"
// import logo from "./logo.png"


function NavBar({ setSearch, basketItem }) {
// const {user, isAuthenticated} = useAuth0()

// const quantity = basketItem.reduce((acc, cur) => {return acc + cur.count}, 0)

    return(
        <div className="nav-bar">
            <div className="item logo">
                <img className="logo" src="sdf" alt="Buy Sell"/>
            </div>
            <div className="item search">
                <SearchBar setSearch={setSearch} />
            </div>
            <div className="item sign">
                
                <Link to = {"/form"}> 
                    <button>Add Product</button>
                    
                </Link>

            </div>
        </div>
    )


}

export default NavBar;
