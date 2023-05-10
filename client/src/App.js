import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Route, Routes } from 'react-router-dom'
import PostContainer from './components/PostContainer'
import PostForm from './components/PostForm'
import './App.css';
import PostCard from './components/PostCard';
import ProFile from './components/ProFile';
import Following from './components/Following';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchPage from './components/SearchPage';
import Settings from './components/Settings';
import './index.css';

function App() {
    const [allPosts, setAllPosts] = useState([{}])
    const [userId, setUserId] = useState(null);
    const [toggle, setToggle] = useState(false)

   
    const fetchData = async () => {
        const data = await axios.get("http://127.0.0.1:5555/posts")
        // console.log("DATA: ", data);
        setAllPosts(data.data);
    };

    useEffect(()=>{
        fetchData();
    },[toggle]);
            
    
    return (
        <main className= 'app'>
            <Navbar />
                <Routes>
                    <Route path='/' element={<PostContainer allPosts={allPosts}/>}/>
                    <Route path='/posts/new' element={<PostForm userId={userId} setToggle={setToggle} toggle={toggle}/>}/>
                    <Route path='/posts/:id' element={<PostCard />}/>
                    <Route path="/users/:id/friends" element={<Following />} />
                    <Route path="/profile" element={<ProFile setUserId={setUserId} userId={userId} />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
           
            <Footer />
        </main>
    );
}

export default App;