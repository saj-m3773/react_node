import React, {useContext, useEffect, useState} from 'react';
import Dashboard from "../../Dashboard";
import {Link} from "react-router-dom";
import './News.css'
import {AuthContext} from "../../../Context/context";

const ViewNews = () => {
    const {news,handelNews,deleteNews} = useContext(AuthContext)
    const [showModal,setShowModal]=useState(false)
    const [id,setId]=useState("")
    useEffect(()=>{
        handelNews()
    },[])


    const handelId=(id)=>{
        setId(id)
    }

    return (
        <Dashboard>
            <div className="is-flex is-justify-content-end">
                <Link to="/admin/add-news" className="button px-6 is-success mb-6">
                    افزودن خبر
                </Link>
            </div>
            <table className="table is-fullwidth">
                <thead className='is-fullwidth'>
                <tr>

                     <th>شماره</th>
                     <th>عنوان</th>
                     <th>متن</th>
                     <th>تصویر</th>
                     <th>نویسنده</th>
                     <th>ویرایش</th>
                     <th>حذف</th>

                </tr>

                </thead>


                <tbody>
                {
                    //?. --> agar item true or vgod dasht
                    news?. map((item, index) => {
                       return(
                           <tr key={item.id}>
                               <td>{index + 1}</td>
                               <td>{item.title}</td>
                               <td>{item.desc}</td>
                               <td>
                                   <img src={item.url} width="100"/>
                               </td>
                               <td>{item?.user?.name}</td>
                               <td></td>
                               <td>
                                   <Link state={item} to={`/edit-news/${item.id}`} className="button is-info">ویرایش</Link>
                               </td>
                               <td>
                                   <button  onClick={()=>setShowModal(true)} className="button is-danger">
                                       <span onClick={()=>handelId(item.id)}>حذف</span>
                                   </button>
                               </td>
                           </tr>
                       )
                    })
                }
                </tbody>
            </table>
            {showModal ? (
                <div className="modal-overlay">
                    <div className="modal-news has-text-centered">
                        <h1 className="has-text-centered">آیا از حذف این خبر مطمئنید؟</h1>
                        <button className="button is-danger ml-3" onClick={() => deleteNews(id)}>
                            <span onClick={()=> setShowModal(false)} >بله مطمئنم</span>
                        </button>
                        <button className="button is-success" onClick={()=> setShowModal()}>خیر</button>
                    </div>
                </div>
            ) : (
                ""
            )}
        </Dashboard>
    );
};

export default ViewNews;