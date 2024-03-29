import React from 'react';
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    TelegramShareButton,
    TelegramIcon,
} from 'react-share'
import {useParams} from "react-router-dom";
import newsCard from '../../../../assets/images/news_card.jpg'
import './Sidleft.css'




const SideLeft = () => {
    const {id} = useParams()
    const shareUrl = `http://www.localhost:3000/detail/${id}`;

    return (
        <div className="side-left">
            <div className='social-media has-background-white p-5'>
                <h1 className="is-size-6 has-text-weight-bold mb-4">
                    اشنراک گذاری
                </h1>
                <FacebookShareButton url={shareUrl}>
                    <FacebookIcon round={true} size={40}/>
                </FacebookShareButton>
                <TelegramShareButton url={shareUrl}>
                    <TelegramIcon round={true} size={40}/>
                </TelegramShareButton>
                <TwitterShareButton url={shareUrl}>
                    <TwitterIcon round={true} size={40}/>
                </TwitterShareButton>
            </div>
            <div className="detail-ads has-text-centered mt-5">
                <img src={newsCard} width="250" alt="" />
            </div>
            
        </div>
    );
};

export default SideLeft;