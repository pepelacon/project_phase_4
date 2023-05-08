import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PostContainer from './components/PostContainer'
import './App.css';

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
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PostContainer allPosts={allPosts}/>}/>
            </Routes>  
        </BrowserRouter>
    );
}

export default App;