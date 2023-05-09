import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PostContainer from './components/PostContainer'
import Profile from './components/Profile';
import Following from './components/Following';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchPage from './components/SearchPage';
import Settings from './components/Settings';
import './index.css';

function App() {
    const [allPosts, setAllPosts] = useState([{}])
   

    useEffect(()=>{
        fetchData();
    },[]);
            
    const fetchData = async () => {
        const response = await fetch("/posts");
        const data = await response.json();
        setAllPosts(data);
    };
      
    console.log(allPosts);

    return (
        <main classname= 'app'>
            <Navbar />
            <BrowserRouter>
                <Routes>
                <Route path='/' element={<PostContainer allPosts={allPosts}/>}/>
                <Route path="/following" element={<Following />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/settings" element={<Settings />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </main>
    );
}

export default App;