import React, {useContext, useEffect} from 'react';
import Dashboard from "../../Dashboard";
import {Link} from "react-router-dom";
import {AuthContext} from "../../../Context/context";

const ViewCategory = () => {
    const { getCategory, category,deleteCategory } = useContext(AuthContext);
    useEffect(() => {
        getCategory();
    }, []);
    return (
        <Dashboard>
            <div className="is-flex is-justify-content-end">
                <Link to="/add-category" className="button px-6 is-success mb-6">
                    افزودن دسته بندی
                </Link>
            </div>
            <table className="table is-fullwidth">
                <thead className='is-fullwidth'>
                <tr>

                    <th>شماره</th>
                    <th>نام</th>
                    <th>ویرایش</th>
                    <th>حذف</th>

                </tr>

                </thead>


                <tbody>
                {category && category.map((cat,index)=>{
                    return (
                        <tr key={cat.id}>
                            <td>{index+1}</td>
                            <td>{cat.name}</td>
                            <td>
                                <Link  state={cat} to={`/update-category/${cat.id}`} className="button is-info">ویرایش</Link>
                            </td>
                            <td>
                                <button className="button is-danger" onClick={()=>deleteCategory(cat.id)}>حذف</button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>


        </Dashboard>
    );
};

export default ViewCategory;