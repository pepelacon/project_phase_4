import React, { useState, useEffect } from 'react';
import axios from "axios"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PostContainer from './components/PostContainer'
import PostForm from './components/PostForm'
import './App.css';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchPage from './components/SearchPage';
import Settings from './components/Settings';
import './index.css';

import Profile from './components/ProFile';


function App() {
    const [allPosts, setAllPosts] = useState([{}])
   
    const fetchData = async () => {
        const data = await axios.get("http://127.0.0.1:5555/posts")
        // console.log("DATA: ", data);
        setAllPosts(data.data);
    };

    useEffect(()=>{
        fetchData();
    },[]);
            
    
    return (
        <div>
            <main>
                <Profile />
                <Navbar />
                <HomePage />
                <SearchPage />
                <Settings />
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<PostContainer allPosts={allPosts}/>}/>
                        <Route path='/posts/new' element={<PostForm />}/>
                    </Routes>    
                </BrowserRouter>
            </main>
                <Footer />
        </div>
    );
}

export default App;