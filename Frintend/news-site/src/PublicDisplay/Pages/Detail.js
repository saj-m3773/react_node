import React from 'react';
import TopMenu from "../Components/Home/TopMenu/TopMenu";
import Navbar from "../Components/Home/Navbar/Navbar";
import Footer from "../Components/Home/Footer/Footer";
import Contact from "../Components/Detali/Content/Content";
import SideLeft from "../Components/Detali/SideLeft/Sideleft";
import {useLocation} from "react-router-dom";

const Detail = () => {
    const {state}=useLocation()
    return (
        <div>
            <TopMenu/>
            <Navbar/>
            <div className="detail-post mt-6">
                <div className="container">
                    <div className="columns">
                        <div className="column is-two-thirds">
                            <Contact  date={state}/>
                        </div>
                        <div className="column is-one-third">
                            <SideLeft />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            
        </div>
    );
};

export default Detail;