import React, { useState, useEffect } from 'react';
import axios from "axios"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PostContainer from './components/PostContainer'
import PostForm from './components/PostForm'
import './App.css';
import HomePage from './components/HomePage';
import ProFile from './components/ProFile';
import Following from './components/Following';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchPage from './components/SearchPage';
import Settings from './components/Settings';
import './index.css';




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
        <main classname= 'app'>
            <Navbar />
            <BrowserRouter>
                <Routes>
                <Route path='/' element={<PostContainer allPosts={allPosts}/>}/>
                <Route path='/posts/new' element={<PostForm />}/>
                <Route path="/following" element={<Following />} />
                <Route path="/profile" element={<ProFile />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/settings" element={<Settings />} />
                  
                </Routes>
            </BrowserRouter>
            <Footer />
        </main>
    );
}

export default App;