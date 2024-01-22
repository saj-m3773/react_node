import React, {useContext,useEffect} from 'react';

import Comment from '../Comment/Comment'
import './Content.css'
import {HomeContext} from "../../../Context/contect";
import { useParams } from "react-router-dom";

const Content = ({date}) => {
    const {getSingleComment,LoadView} = useContext(HomeContext)
    const {id} = useParams()
    useEffect(() => {
        getSingleComment(id)
        LoadView(id)
    }, [])
    return (
        <div className="content-detail">
            <div className="detail-image">
                <img src={date.url} alt=""/>
            </div>
            <div className="detail-title">
                <h1 className='title mt-5'>{date.title}</h1>
            </div>
            <div className="detail-description">
                <p className='description mt-5'>{date.desc}</p>
            </div>
            <div className="author">
                <div className="box p-5 mt-6">
                    <article className="media is-align-items-center is-flex">
                        <div className="title is-size-6">نویسنده :</div>

                        <div className="media-content pr-3">
                            <div className="content">
                                <p>{date?.user?.name}</p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>

            <div className="comment">
                <Comment/>
            </div>
        </div>
    );

}

export default Content;