import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PostContainer from './components/PostContainer'
import HomePage from './components/HomePage';
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
        <div>
            <Navbar />
            <HomePage />
            <SearchPage />
            <Settings />
            <Footer />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<PostContainer allPosts={allPosts}/>}/>
                </Routes>  
            </BrowserRouter>
        </div>
    );
}

export default App;