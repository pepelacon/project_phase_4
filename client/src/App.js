import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Route, Routes } from 'react-router-dom'
import Explore from './components/Explore'
import PostForm from './components/PostForm'
import './App.css';
import PostCard from './components/PostCard';
import UserProfile from './components/UserProfile';
import Following from './components/Following';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Settings from './components/Settings';
import ListOfFriends from './components/ListOfFriends';
import Likes from './components/Likes';
import EditPost from './components/EditPost';
import './index.css';
import { useAuth0 } from '@auth0/auth0-react'
import PostCardFromFriendsList from './components/PostCardFromFriendsList';

function App() {
    const [allPosts, setAllPosts] = useState([{}])
    const [userId, setUserId] = useState(null);
    const [toggle, setToggle] = useState(false)
    const [favorite, setFavorite] = useState([])
    const [allFriends, setAllFriends] = useState([])

    const { user, isAuthenticated, isLoading } = useAuth0()

    
    const fetchData = async () => {
        const data = await axios.get("/posts")
        setAllPosts(data.data);
    };
    
    console.log(allFriends);
    const fetchFriends = async () => {
        const response1 = await fetch(`/users/${userId}/friends`);
        const data1 = await response1.json();
        setAllFriends(data1);
      };

    useEffect(()=>{
        fetchData();
        fetchFriends()
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
                    <Route path='/profile/new' element={<PostForm userId={userId} setToggle={setToggle} toggle={toggle} allFriends={allFriends}/>}/>
                    <Route path='/posts/:id' element={<PostCard userId={userId} setToggle={setToggle} toggle={toggle}/>} user={user}/>
                    <Route path='/posts/:id/edit' element={<EditPost setToggle={setToggle} toggle={toggle}/>}/>
                    <Route path='/posts/friends/:id' element={<PostCardFromFriendsList userId={userId} allFriends={allFriends}/>}/>
                    <Route path="/profile/following" element={<Following userId={userId}/>}/>
                    <Route path="/profile/friends" element={<ListOfFriends userId={userId}/>} user={user}/>
                    <Route path="/profile" element={<UserProfile setUserId={setUserId} userId={userId} favorite={favorite} setAllPosts={setAllPosts} allPosts={allPosts} addToFavorite={addToFavorite} allFriends={allFriends}/>} user={user}/>
                    <Route path="/profile/settings" element={<Settings userId={userId} allFriends={allFriends}/>} />
                    
                    <Route path="/profile/favorite" element={<Likes setUserId={setUserId} userId={userId} favorite={favorite} setAllPosts={setAllPosts} allPosts={allPosts} addToFavorite={addToFavorite} allFriends={allFriends}/>} user={user}/>
                </Routes>
            <Footer />
        </main>
    );
}

export default App;