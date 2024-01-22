import React, {useContext, useState} from 'react';
import "./sidbar.css"
import logo from "../../../../assets/images/logo.png"
import {Link} from "react-router-dom";
import {AuthContext} from "../../../Context/context";

const Sidbar = () => {

    const [showNews, setShowNews] = useState(false)
    const [showCategory, setShowCategory] = useState(false)
    const [showVideo, setShowVideo] = useState(false)
    const [showUsers, setShowUsers] = useState(false)
    const {logout} = useContext(AuthContext)
    return (
        <div className="sidebar">
            <div className="logo mb-5 has-text-centered">
                <img src={logo} alt=""/>
            </div>
            <ul>
                <li><Link to="/admin/dashboard"><span>داشبورد</span></Link></li>
                <li><span onClick={() => {
                    setShowNews(!showNews)
                }}>اخبار</span>
                    {
                        showNews && (
                            <ul>
                                <li><Link to="/admin/add-news">افزودن خبر</Link></li>
                                <li><Link to="/admin/view-news">مشاهده خبر</Link></li>
                            </ul>
                        )}
                </li>
                <li><span onClick={() => {
                    setShowCategory(!showCategory)
                }}>دسته بندی</span>
                    {
                        showCategory && (
                            <ul>
                                <li><Link to="/admin/add-category">افزودن دسته بندی</Link></li>
                                <li><Link to="/admin/view-category">مشاهده دسته بندی</Link></li>
                            </ul>
                        )}
                </li>
                <li><span onClick={() => {
                    setShowVideo(!showVideo)
                }}>ویدیو </span>
                    {
                        showVideo && (
                            <ul>
                                <li><Link to="/admin/add-video">افزودن ویدیو </Link></li>
                                <li><Link to="/admin/view-video">مشاهده ویدیو</Link></li>
                            </ul>
                        )}
                </li>
                <li>
        <span onClick={() => setShowUsers(!showUsers)}>
            کاربران
          </span>

                    {showUsers && (
                        <ul>
                            <li>
                                <Link to="/admin/add-users">افزودن کاربر</Link>
                            </li>
                            <li>
                                <Link to="/admin/view-users">نمایش کاربران</Link>
                            </li>
                        </ul>
                    )}
                </li>
                <li>
                    <Link to="/admin/comment"><span>نظرات</span></Link>
                </li>
                <li><span onClick={logout}>خروج</span></li>

            </ul>
        </div>
    );
};

export default Sidbar;