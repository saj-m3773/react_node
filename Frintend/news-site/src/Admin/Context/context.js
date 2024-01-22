import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import jwt_decode from "jwt-decode"
import {baseUrl} from "../../utils/baseUrl"


export const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [user, setUsers] = useState([])
    const [userId, setUserId] = useState('')
    const [token, setToken] = useState('')
    const [expire, setExpire] = useState("")
    const [admin, setAdmin] = useState(null)
    const [news, setNews] = useState([])
    const [category, setCategory] = useState([])
    const [errorVideo, setErrorVideo] = useState('')
    const [videos, setVideos] = useState([])
    const [profilePhoto, setProfilePhoto] = useState("")
    const [profileName, setProfileName] = useState("")
    const [comments, setComments] = useState([])


    // const [singleN,setSingleN]=useState()
    const navigate = useNavigate()//baray tagir masir  hae mojtalef


    //ejad token barae front

    useEffect(() => {
        refreshToken()
        Profile()//جای اول بعد هر بار رف ریش شدن
    }, [])

    const refreshToken = async () => {
        try {
            const response = await axios.get(`${baseUrl}/token`);
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setUserId(decoded.userId);
            setAdmin(decoded.isAdmin);
            setExpire(decoded.exp);
        } catch (error) {
            console.log(error);
        }
    };

    //bdon niyaz ba refresh bad etmam tim token backend biyad token jadid basazad
    const axiosJWT = axios.create();//axios interceptors --barae token samt front

    axiosJWT.interceptors.request.use(
        async (config) => {
            const currentDate = new Date();
            if (expire * 1000 < currentDate.getTime()) {
                const response = await axios.get(`${baseUrl}/token`);
                config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                setToken(response.data.accessToken);
                const decoded = jwt_decode(response.data.accessToken);
                setName(decoded.name);
                setUserId(decoded.userId);
                setAdmin(decoded.isAdmin);
                setExpire(decoded.exp);
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );


    const login = async (input) => {
        try {
            const res = await axios.post(`${baseUrl}/users/login`, input)//arsal baray buck
            if (res.data.error) {
                setError(res.data.error)
            } else {
                navigate("/admin/dashboard")
                toast.success(res.data.msg, {
                    position: "bottom-center",
                    autoClose: 4000,
                    closeOnClick: true,
                    pauseOnHover: true
                })
                setName(res.data.name)
                setUserId(res.data.userId)
                setToken(res.data.accessToken)
                setAdmin(res.data.isAdmin)
            }
            Profile()//جای دوم بعد ورود اجرا بشه
        } catch (err) {

        }
    }
    const updateProfile = async(data)=> {
        try {
            const formData = new FormData();
            formData.append("name", data.name)
            formData.append("password", data.password)
            formData.append("confPassword", data.confPassword)
            formData.append("id", data.id)
            formData.append("file", data.file)
            const res = await axiosJWT.put(`${baseUrl}/users/profile/${data.id}`, formData, {
                headers:{
                    authorization: `Bearer ${token}`
                }
            })
            console.log(res);

        } catch (error) {
            console.log(error);
        }
    }
    const Profile = async () => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/users/profile`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            //فقط عکس رو میخوام
            setProfilePhoto(res.data.url);
            setProfileName(res.data.name)

        } catch (error) {
            console.log(error);
        }

    }


    const logout = async () => {
        try {
            const res = await axiosJWT.delete(`${baseUrl}/users/logout`, {
                headers: {
                    authorization: `Bearer ${token}`

                }
            })
            console.log(res.data)
            navigate('/admin')
            toast.success(res.data, {
                position: "bottom-center",
                autoClose: 4000,
                closeOnClick: true,
                pauseOnHover: true
            })

        } catch (err) {

        }

    }
    const registers = async (data) => {
        try {
            const res = await axiosJWT.post(`${baseUrl}/users/register`, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            toast.success(res.data.msg, {
                position: "bottom-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
            })
            console.log(res)
            navigate("/admin/view-users")

        } catch (error) {
            console.log(error);
        }

    }

    const getAllUser = async () => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }//adres hi ka token mekhad
            })
            setUsers(res.data)

        } catch (err) {

        }
    }
    const updateUser = async (data) => {
        try {
            const res = await axiosJWT.put(`${baseUrl}/users/${data.id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            navigate("/admin/view-users")
        } catch (err) {

        }
    }
    const deleteUser = async (id) => {
        try {
            const res = await axiosJWT.delete(`${baseUrl}/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            getAllUser()
        } catch (err) {

        }
    }
    const createNews = async (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("desc", data.desc)
        formData.append("catId", data.catId)
        formData.append("userId", userId)
        formData.append("file", data.file)
        console.log(data)
        try {
            const res = await axiosJWT.post(`${baseUrl}/api/news`, formData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            console.log(res)
            toast.success(res.data.msg, {
                position: "bottom-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
            })
            console.log(res)
            navigate("/admin/view-news")

        } catch (error) {
            console.log(error);
        }
    }
    const handelNews = async () => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/api/news`, {
                headers: {authorization: `Bearer ${token}`}
            })
            setNews(res.data)
        } catch (err) {

        }
    }
    const deleteNews = async (id) => {
        try {
            const res = await axiosJWT.delete(`${baseUrl}/api/news/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            toast.success(res.data.msg, {
                position: "bottom-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
            })
            handelNews()
        } catch (err) {
            console.log(error)
        }
    }
    const singleNews = async (id) => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/api/news/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

        } catch (err) {

        }
    }



    const updateNews = async (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("desc", data.desc);
        formData.append("catId", data.catId);
        formData.append("userId", userId);
        formData.append("file", data.file);
        try {
            const res = await axiosJWT.put(`${baseUrl}/api/news/${data.id}`, formData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            toast.success(res.data.msg, {
                position: "bottom-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
            });
            navigate("/admin/view-news");

        } catch (error) {
            console.log(error);
        }
    }

    const createCategory = async (value) => {
        try {
            const res = await axiosJWT.post(`${baseUrl}/api/create-category`, value, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            toast.success(res.data.msg, {
                position: "bottom-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
            });
            navigate("/admin/view-category");
        } catch (error) {
            console.log(error);
        }
    }
    const getCategory = async () => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/api/get-category`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setCategory(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    const updateCategory = async (values) => {
        try {
            const res = await axiosJWT.put(`${baseUrl}/api/update-category/${values.id}`, values, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            toast.success(res.data, {
                position: "bottom-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
            });
            navigate("/admin/view-category");
        } catch (error) {
            console.log(error);
        }
    }
    const deleteCategory = async (id) => {
        try {
            const res = await axiosJWT.delete(`${baseUrl}/api/delete-category/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            toast.success(res.data, {
                position: "bottom-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
            });
            getCategory()
        } catch (error) {
            console.log(error);
        }
    }
    //video
    const createVideo = async (data) => {
        const formData = new FormData()
        formData.append("file", data.file)
        try {
            const res = await axiosJWT.post(`${baseUrl}/api/create-video`, formData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            if (res.data.msg !== 'ویدیو افزوده شد') {
                setErrorVideo(res.data.msg)
                navigate('/add-video')
            } else {
                toast.success(res.data, {
                    position: "bottom-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                navigate('/view-video')
            }
        } catch (err) {

        }
    }
    const handelVideo = async () => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/api/get-videos`, {
                headers: {authorization: `Bearer ${token}`}
            })
            setVideos(res.data)
        } catch (err) {

        }

    }
    const deleteVideo = async (id) => {
        try {
            const res = await axiosJWT.delete(`${baseUrl}/api/delete-videos/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            toast.success(res.data, {
                position: "bottom-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
            });
            handelVideo()
        } catch (error) {
            console.log(error);
        }
    }

    // comments
    const getAllComment = async()=> {
        try {
            const res = await axiosJWT.get(`${baseUrl}/api/comment`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
           setComments(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    const deleteComment = async(id)=> {
        try {
            const res = await axiosJWT.delete(`${baseUrl}/api/comment/${id}`,{
                headers:{
                    authorization : `Bearer ${token}`
                }
            })
            toast.success(res.data, {
                position: "bottom-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
            });
            getAllComment()
        } catch (error) {
            console.log(error);
        }
    }
    const activeComment = async(id) => {
        const data = {
            isActive: true
        }
        try {
            const res = await axiosJWT.put(`${baseUrl}/api/comment/active/${id}`,data,{
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            getAllComment()
            toast.success(res.data, {
                position: "bottom-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        } catch (error) {
            console.log(error);
        }
    }

    const unActiveComment = async(id) => {
        const data = {
            isActive: false
        }
        try {
            const res = await axiosJWT.put(`${baseUrl}/api/comment/unactive/${id}`,data,{
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            getAllComment()
            toast.success(res.data, {
                position: "bottom-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <AuthContext.Provider value={{
            login,
            logout,
            userId,
            error,
            getAllUser,
            updateUser,
            user,
            updateProfile,
            Profile,
            profilePhoto,
            profileName,
            deleteUser,
            registers,
            axiosJWT,
            token,
            createNews,
            news,
            handelNews,
            deleteNews,
            singleNews,
            updateNews,
            createCategory,
            getCategory,
            category,
            updateCategory,
            deleteCategory,
            createVideo,
            errorVideo,
            videos,
            handelVideo,
            deleteVideo,
            getAllComment,
            comments,
            deleteComment,
            activeComment,
            unActiveComment

        }}> {children}</AuthContext.Provider>
    )
}