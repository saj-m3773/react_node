import React, {useContext} from "react";
import "./auth.css";
import {useFormik} from "formik"
import * as Yup from 'yup'
import {AuthContext} from "../Context/context";
//baray mdereyat form


const formSchema=Yup.object({
    email:Yup.string().required("ایمیل شما اجباری است"), //string bashad and elzami
    password:Yup.string().required("پسورد شما الزلمی است")
})


const Login = () => {

    const {login,error}=useContext(AuthContext)
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            login(values);
        },
        validationSchema:formSchema
    })


    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="background-overlay"></div>
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4">
                            <form className="box" onSubmit={formik.handleSubmit}>
                                <h1 className="title has-tex-centered mb-5">
                                    ورود به پنل مدیریت
                                </h1>
                                <h1 className="has-text-centered has-text-danger py-3">{error}</h1>
                                <div className="field">
                                    <label className="label">ایمیل</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            id="email"
                                            className="input"
                                            placeholder="مثال * Example@gmail.com"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <p className="help has-text-danger">
                                            {formik.touched.email && formik.errors.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">پسوورد</label>
                                    <div className="control">
                                        <input
                                            type="password"
                                            className="input"
                                            id="password"
                                            placeholder="رمز عبور"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <p className="help has-text-danger">
                                            {formik.touched.password && formik.errors.password}
                                        </p>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button
                                        type="submit"
                                        className="button is-success is-fullwidth"
                                    >
                                        ورود
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
