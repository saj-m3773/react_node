import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../PublicDisplay/Pages/Home";
import About from "../PublicDisplay/Pages/About";
import Contact from "../PublicDisplay/Pages/Contact";
import Detail from "../PublicDisplay/Pages/Detail";

const PublicDisplay = () => {
    return (
        <Routes>
            <Route path='' element={<Home/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/contact' element={<Contact/>}></Route>
            <Route path='/detail/:id' element={<Detail/>}></Route>
        </Routes>
    );
};

export default PublicDisplay;