import React, {useContext, useEffect} from 'react';
import Dashboard from "../../Dashboard";
import {Link} from "react-router-dom";
import {AuthContext} from "../../../Context/context";

const ViewUsers = () => {
    const {user, getAllUser, deleteUser} = useContext(AuthContext)

    useEffect(() => {
        getAllUser()
    }, [])
    return (
        <Dashboard>
            <div className="is-flex is-justify-content-end">
                <Link to="/add-users" className="button px-6 is-success mb-6">
                    افزودن خبر
                </Link>
            </div>
            <table className="table is-fullwidth">
                <thead className='is-fullwidth'>
                <tr>
                    <th>نام</th>
                    <th>ایمیل</th>
                    <th>ادمین</th>
                    <th>ویرایش</th>
                    <th>حذف</th>

                </tr>

                </thead>


                <tbody>
                {user?.map((user, index) => {
                    return (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? "مدیر" : "نویسنده"}</td>
                            <td>
                                <Link state={user} className="button is-info" to={`/edit-users/${user.id}`}>
                                    ویرایش
                                </Link>
                            </td>
                            <td>
                                {
                                    user.isAdmin ?(
                                        <button className="button is-danger" disabled>قابل حذف نیست</button>
                                    ):(
                                        <button className="button is-danger" onClick={()=>deleteUser(user.id)}>حذف</button>
                                    )
                                }

                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            {/*{showModal ? (*/}
            {/*    <div className="modal-overlay">*/}
            {/*        <div className="modal-news has-text-centered">*/}
            {/*            <h1 className="has-text-centered">آیا از حذف این خبر مطمئنید؟</h1>*/}
            {/*            <button className="button is-danger ml-3" onClick={() => deleteNews(id)}>*/}
            {/*                <span onClick={() => setShowModal(false)}>بله مطمئنم</span>*/}
            {/*            </button>*/}
            {/*            <button className="button is-success" onClick={() => setShowModal()}>خیر</button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*) : (*/}
            {/*    ""*/}
            {/*)}*/}

        </Dashboard>
    );
};

export default ViewUsers;