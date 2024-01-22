import React, {useContext, useEffect} from "react";
import sendNews from "../../../../assets/images/sendnews.jpg";

import {Link, NavLink, useLocation} from "react-router-dom";
import "./whatsnews.css"
import {HomeContext} from "../../../Context/contect";
import Loaders from "../../Loading/Loaders";
import moment from "jalali-moment";
const WhatsNews = () => {

    const {category, loadingCatPost, CatPost,catPost} = useContext(HomeContext)
    const cat=useLocation().search
    useEffect(()=>{
        catPost()
    },[cat])

    return (
        <div id="whats-news" className="py-5">
            <div className="container">
                <div className="columns is-flex-widescreen is-block-tablet">
                    <div className="column is-flex is-one-quarter-widescreen is-justify-content-center">
                        <img src={sendNews} className="sendnews" alt=""/>
                    </div>
                    <div className="column is-three-quarters-widescreen is-justify-content-center">
                        <div className="whats-news has-background-white p-5">
                            <div
                                className="whats-news-title is-flex is-justify-content-space-between is-align-items-center">
                                <div className="whats-news-nav">
                                    <ul className="is-flex">
                                        <li className="ml-5 has-text-weight-bold">
                                            <NavLink to="/">همه</NavLink>
                                        </li>
                                        {
                                            category && category.map((cat) => {
                                                return (
                                                    <li className="ml-5 has-text-weight-bold" key={cat.id}>
                                                        <NavLink to={`/?cat=${cat.id}`}>{cat.name}</NavLink>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>

                                <div className="whats-news-name">
                                    <h1 className="is-size-2 title">چه خبر</h1>
                                </div>
                            </div>
                            {loadingCatPost ? (
                                <div className="has-text-centered">
                                    <Loaders/>
                                </div>
                            ) : (
                                <div className="whats-news-post mt-6">
                                    {
                                        CatPost && CatPost?.map((post) => {
                                            return (
                                                <div className="whats-news-post-item" key={post.id}>
                                                    <div className="whats-news-post-item-img">
                                                        <Link to="/">
                                                            <img src={post.url} alt="" />
                                                        </Link>
                                                    </div>
                                                    <div className="whats-news-post-item-description">
                                                        <Link to="/">
                                                            <p>
                                                                {post.desc}
                                                            </p>
                                                        </Link>
                                                        <div className="whats-news-post-item-date">
                                                            <p>
                                                                {moment(post.createdAt).locale("fs").format("YYYY-MM-DD")}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                        )
                                        })
                                    }
                                </div>
                            )}


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatsNews;
