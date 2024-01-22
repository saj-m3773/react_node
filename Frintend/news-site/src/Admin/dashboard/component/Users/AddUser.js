import React, {useContext, useState} from 'react';
import Dashboard from "../../Dashboard";
import * as Yup from "yup"
import {useFormik} from "formik";
import {AuthContext} from "../../../Context/context";


const formSchema=Yup.object({
     name:Yup.string().min(3,"کم تر از سه حرف مجاز نیست")
     .max(15,'تعداد بیش از حد مجاز(15 عدد حداکثر)').required("نام کاربری الزامی است"),
    email:Yup.string().email("ایمیل معتبر وارد کنید").required("ایمیل الزامی است"),
    password:Yup.string().min(5,"کم تر از 5 حرف مجاز نیست")
        .max(20,'تعداد بیش از حد مجاز(20 عدد حداکثر)').required('پسورد را وارد کنید'),
    confPassword:Yup.string().min(5,"کم تر از 5 حرف مجاز نیست")
        .max(20,'تعداد بیش از حد مجاز(20 عدد حداکثر)').required('تکرار پسورد را وارد کنید'),
    isAdmin:Yup.string().required("وضعیت خود را مشخص کنید")
})

const AddUser = () => {

    const {registers}=useContext(AuthContext)



    const formik=useFormik({
        initialValues:{
            name:"",
            email:'',
            password:'',
            confPassword:'',
            isAdmin:'',


        },
        onSubmit:(values)=>{

           registers(values)

        },
        validationSchema:formSchema
    })
    return (
        <Dashboard>
              <form onSubmit={formik.handleSubmit}>
                  <div className="field">
                      <label  className="label">نام و نام خانوادگی</label>
                      <div className="control">
                          <input type="text" className="input" placeholder="نام و فامیل"
                          value={formik.values.name} onChange={formik.handleChange("name")}
                          onBlur={formik.handleBlur("name")}/>
                          <p className="help has-text-danger">
                              {formik.touched.name && formik.errors.name}
                          </p>
                      </div>
                  </div>
                  <div className="field">
                      <label  className="label">ایمیل</label>
                      <div className="control">
                          <input type="text" className="input" placeholder="nameEmail"
                                 value={formik.values.email} onChange={formik.handleChange("email")}
                                 onBlur={formik.handleBlur("email")}/>/>
                          <p className="help has-text-danger">
                              {formik.touched.email && formik.errors.email}
                          </p>
                      </div>
                  </div>

                  <div className="field">
                      <label  className="label">پسورد </label>
                      <div className="control">
                          <input type="text" className="input" placeholder="123456*0"
                                 value={formik.values.password} onChange={formik.handleChange("password")}
                                 onBlur={formik.handleBlur("password")}/>
                          <p className="help has-text-danger">
                              {formik.touched.password && formik.errors.password}
                          </p>
                      </div>
                  </div>
                  <div className="field">
                      <label  className="label">تکرار پسورد </label>
                      <div className="control">
                          <input type="text" className="input" placeholder="123456*  "
                                 value={formik.values.confPassword} onChange={formik.handleChange("confPassword")}
                                 onBlur={formik.handleBlur("confPassword")}/>
                          <p className="help has-text-danger">
                              {formik.touched.confPassword && formik.errors.confPassword}
                          </p>
                      </div>
                  </div>
                  <div className="field">
                      <label  className="label">ادمین </label>
                      <div className="control">
                         <div className="select is-fullwidth">
                             <select
                                 value={formik.values.isAdmin} onChange={formik.handleChange("isAdmin")}
                                 onBlur={formik.handleBlur("isAdmin")}>
                                 <p className="help has-text-danger">
                                     {formik.touched.isAdmin && formik.errors.isAdmin}
                                 </p>
                                 <option>انتخاب کنید</option>
                                 <option value="0">نویسنده</option>
                                 <option value="1">مدیر</option>
                             </select>
                         </div>
                      </div>
                  </div>
                  <div className="field">
                      <div className="control">
                          <button type="submit" className="button is-success px-6">ایجاد کاربر</button>
                      </div>
                  </div>
              </form>
        </Dashboard>
    );
};

export default AddUser;