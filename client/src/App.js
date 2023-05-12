import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Route, Routes } from 'react-router-dom'
import Explore from './components/Explore'
import PostForm from './components/PostForm'
import './App.css';
import PostCard from './components/PostCard';
import ProFile from './components/ProFile';
import Following from './components/Following';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Settings from './components/Settings';
import ListOfFriends from './components/ListOfFriends';
import Likes from './components/Likes';
import EditPost from './components/EditPost';
import './index.css';

function App() {
    const [allPosts, setAllPosts] = useState([{}])
    const [userId, setUserId] = useState(null);
    const [toggle, setToggle] = useState(false)
    const [favorite, setFavorite] = useState([])

    console.log(favorite);
    const fetchData = async () => {
        const data = await axios.get("/posts")
        setAllPosts(data.data);
    };

    useEffect(()=>{
        fetchData();
    },[toggle]);
       
    const addToFavorite= (item) => {
        const selected = favorite.find((el) => el.id === item.id)
        if (selected) { 
            const updatedFavorites = favorite.filter((favItem) => favItem.id !== item.id);
            setFavorite(updatedFavorites);
        } else {
          const add = [...favorite, item]
          setFavorite(add);
        }
      }
      
    return (
        <main className= 'app'>
            <Navbar />
                <Routes>
                    <Route path='/' element={<Explore allPosts={allPosts} addToFavorite={addToFavorite} favorite={favorite}/>}/>
                    <Route path='/profile/new' element={<PostForm userId={userId} setToggle={setToggle} toggle={toggle}/>}/>
                    <Route path='/posts/:id' element={<PostCard userId={userId}/>}/>
                    <Route path='/posts/:id/edit' element={<EditPost setToggle={setToggle} toggle={toggle}/>}/>
                    <Route path="/profile/following" element={<Following userId={userId}/>}/>
                    <Route path="/profile/friends" element={<ListOfFriends />} />
                    <Route path="/profile" element={<ProFile setUserId={setUserId} userId={userId} favorite={favorite} setAllPosts={setAllPosts} allPosts={allPosts} addToFavorite={addToFavorite}/>} />
                    <Route path="/profile/settings" element={<Settings />} />
                    <Route path="/profile/likes" element={<Likes />} />
                </Routes>
            <Footer />
        </main>
    );
}

export default App;