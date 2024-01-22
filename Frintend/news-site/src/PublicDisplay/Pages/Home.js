import React from 'react';
import TopMenu from "../Components/Home/TopMenu/TopMenu"
import Navbar from "../Components/Home/Navbar/Navbar";
import HomeWrapper from "../Components/Home/Home-wrapper/HomeWrapper";
import WhatNews from "../Components/Home/WhatsNews/WhatsNews";
import Popular from "../Components/Home/Popular/PopularNews";
import Footer from "../Components/Home/Footer/Footer";



const Home = () => {
    return (

            <div className="wrapper">
                <TopMenu />
                <Navbar />
                <HomeWrapper />
                <WhatNews />
                <Popular />
                <Footer />
            </div>

    );
};

export default Home;