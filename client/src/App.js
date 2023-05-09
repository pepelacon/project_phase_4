import React, { useState, useEffect } from 'react';
import axios from "axios"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PostContainer from './components/PostContainer'
<<<<<<< HEAD
import PostForm from './components/PostForm'
// import HomePage from './components/HomePage';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import SearchPage from './components/SearchPage';
// import Settings from './components/Settings';
import './App.css';
=======
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchPage from './components/SearchPage';
import Settings from './components/Settings';
import './index.css';
>>>>>>> 957a7a43e505e480d35e6b43f4d122e7970e5fdb

import LogOut from './components/LogOut';
import LogIn from './components/Login';
import Profile from './components/ProFile';


function App() {
    const [allPosts, setAllPosts] = useState([{}])
   
    const fetchData = async () => {
        const data = await axios.get("http://127.0.0.1:5555/posts")
        console.log("DATA: ", data);
        setAllPosts(data.data);
    };

    useEffect(()=>{
        fetchData();
    },[]);
            
    
    return (
<<<<<<< HEAD
        <main>
            <h1>Auth0 Login</h1>
            <LogIn />
            <LogOut />
            <Profile />
=======
        <div>
            <Navbar />
            <HomePage />
            <SearchPage />
            <Settings />
>>>>>>> 957a7a43e505e480d35e6b43f4d122e7970e5fdb
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<PostContainer allPosts={allPosts}/>}/>
                    <Route path='/posts/new' element={<PostForm />}/>
                </Routes>    
            </BrowserRouter>
<<<<<<< HEAD
        </main>
=======
            <Footer />
        </div>
>>>>>>> 957a7a43e505e480d35e6b43f4d122e7970e5fdb
    );
}

export default App;