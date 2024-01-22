import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "../Admin/auth/Login";
import Main from "../Admin/dashboard/component/Main/Main";
import AddNews from "../Admin/dashboard/component/News/AddNews";
import ViewNews from "../Admin/dashboard/component/News/ViewNews";
import Edit from "../Admin/dashboard/component/News/Edit";
import ViewCategory from "../Admin/dashboard/component/category/ViewCategory";
import AddCategory from "../Admin/dashboard/component/category/AddCategory";
import EditCategory from "../Admin/dashboard/component/category/EditCategory";
import ViewVideo from "../Admin/dashboard/component/video/ViewVideo";
import AddVideo from "../Admin/dashboard/component/video/AddVideo";
import ViewUsers from "../Admin/dashboard/component/Users/ViewUsers";
import AddUser from "../Admin/dashboard/component/Users/AddUser";
import EditUser from "../Admin/dashboard/component/Users/EditUser";
import ProfileUpdate from "../Admin/dashboard/component/Users/ProfileUpdate/ProfileUpdate";
import ViewComment from "../Admin/dashboard/component/comment/ViewComment";



const Admin = () => {
    return (
        <Routes>


                        {/*farzandi ka mijaem az Dashboard bebinim*/}
                        <Route path="/dashboard" element={<Main/>}/>
                        <Route path="/add-news" element={<AddNews/>}/>
                        <Route path="/view-news" element={<ViewNews/>}/>
                        <Route path="/edit-news/:id" element={<Edit/>}/>
                        <Route path="/view-category" element={<ViewCategory/>}/>
                        <Route path="/add-category" element={<AddCategory/>}/>
                        <Route path="/update-category/:id" element={<EditCategory/>}/>
                        <Route path="/view-video" element={<ViewVideo/>}/>
                        <Route path="/add-video" element={<AddVideo/>}/>
                        <Route path="/view-users" element={<ViewUsers/>}/>
                        <Route path="/add-users" element={<AddUser/>}/>
                        <Route path="/edit-users/:id" element={<EditUser/>}/>
                        <Route path="/update-profile/:id" element={<ProfileUpdate/>}/>
                        <Route path="/comment" element={<ViewComment/>}/>



        </Routes>
    );
};

export default Admin;