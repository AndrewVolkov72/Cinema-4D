import React from "react";
import Header from "./Components/Header";
import SliderHeader from "./Components/SliderHeader";
import { Routes, Route} from 'react-router-dom'
import Post from "./Components/Pages/Post";
import Home from "./Components/Pages/Home";
import Footer from "./Components/Footer";
import Top250 from "./Components/Pages/Top250";
import About from './Components/Pages/About'
import List from "./Components/Pages/List";
import Search from "./Components/Pages/Search";
import Favourites from "./Components/Pages/Favourites";

function App() {
  return (
    <>
        <Header/>
        <SliderHeader/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='top250/:id' element={<Top250/>}/>
            <Route path='about' element={<About/>}/>
            <Route path='favourites/:id' element={<Favourites/>}/>
            <Route path='search/:keyword/:id' element={<Search/>}/>
            <Route path='list/:id' element={<List/>}/>
            <Route path='post/:id' element={<Post/>}/>
            <Route path='*' element={<Home/>}/>
        </Routes>
        <Footer/>
    </>
  );
}

export default App;
