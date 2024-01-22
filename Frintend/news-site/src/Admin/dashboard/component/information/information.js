import React, {useContext, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./information.css"
import profileImage from  '../../../../assets/logo192.png'
import {BsFillCapslockFill,BsFillPersonPlusFill,BsChatDots} from 'react-icons/bs'
import {AuthContext} from "../../../Context/context";
const Information = () => {
    const {userId,profile,profilePhoto, news,user,comments} = useContext(AuthContext)

        return (
            <div className="information">
                {/*ایتم های بالا*/}
                <div className="view-web is-flex is-align-items-center is-justify-content-space-between mb-5">
                    <div className="view-webpage">
                        <a href="/" className="button has-background-success has-text-white">مشاهده وب سایت</a>
                    </div>
                    <div className="view-profile">
                    <span>
                        <Link to={`/admin/update-profile/${userId}`}>
                            <img src={profilePhoto ?profilePhoto :profileImage} className="image profile-photo"/>
                        </Link>
                    </span>
                    </div>
                </div>
                <div className="info">
                    <div className="info-item">
                        <h4>خبرها</h4>
                        <span>{news.length}</span>
                        <span><BsFillCapslockFill/></span>
                    </div>
                    <div className="info-item">
                        <h4>کاربران</h4>
                        <span>{user.length}</span>
                        <span><BsFillPersonPlusFill/></span>
                    </div>
                    <div className="info-item">
                        <h4>نظرات</h4>
                        <span>{comments.length}</span>
                        <span><BsChatDots/></span>
                    </div>

                </div>
            </div>
        );
    }


export default Information;