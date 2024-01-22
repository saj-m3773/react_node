import {createContext, useEffect, useReducer, useState} from 'react'
import {videoReducer} from "./reduser/reduserVideo";
import {InitialState_Videos} from "./initialState/initialStateVideo";
import {InitialState_lastPost} from "./initialState/Lasdpost";
import {InitialState_CategoryPost} from "./initialState/Categorry";
import {
    Category_FAIL,
    Category_REQUEST,
    Category_SUCCESS, Popular_FAIL, Popular_REQUEST, Popular_SUCCESS,
    VIDEO_FAIL,
    VIDEO_REQUEST,
    VIDEO_SUCCESS
} from "./constans/canstants";
import {LastPost_FAIL, LastPost_REQUEST, LastPost_SUCCESS} from "./constans/canstants";
import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import {LastPostReducer} from "./reduser/reduserLastPost";
import {CategoryListReducer} from "./reduser/reduserCategory";
import { useNavigate, useLocation } from "react-router-dom";
import {PopularListReducer} from "./reduser/reducerPopular";
import {InitialState_Popular} from "./initialState/Popular";
import {toast} from "react-toastify";

export const HomeContext = createContext()


export const HomeContextProvider = ({children}) => {
    const navigate = useNavigate()

    const [state, dispatch] = useReducer(videoReducer, InitialState_Videos)
    const [stateLastPost, dispatchLastPost] = useReducer(LastPostReducer, InitialState_lastPost)
    const [stateCatPost, dispatchCatPost] = useReducer(CategoryListReducer, InitialState_CategoryPost)
    const [statePopularPost, dispatchPopularPost] = useReducer(PopularListReducer, InitialState_Popular)
    const [category, setCategory] = useState([])
    const cat = useLocation().search //بر اساس ایدی سرچ می شود
    const [newsComment,setNewsComment] = useState([])


    useEffect(() => {
        LoadVideo()
        LastPost()
        LoadCategory()
        catPost()
        PopularPost()
    }, [])

    const LoadVideo = async () => {

        try {
            dispatch({type: VIDEO_REQUEST})
            const {data} = await axios.get(`${baseUrl}/api/get-video`)
            dispatch({type: VIDEO_SUCCESS, payload: data})

        } catch (err) {
            dispatch({type: VIDEO_FAIL, payload: err.response.data.message})
        }
    }
    const LastPost = async () => {

        try {
            dispatchLastPost({type: LastPost_REQUEST})
            const {data} = await axios.get(`${baseUrl}/api/news/lastnews`)
            dispatchLastPost({type: LastPost_SUCCESS, payload: data})

        } catch (err) {
            dispatchLastPost({type: LastPost_FAIL, payload: err.response.data.message})
        }
    }


    const LoadCategory = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/get-category-list`)
            setCategory(res.data)
        } catch (err) {
            console.log(err)
        }

    }

    const catPost = async () => {

        try {
            dispatchCatPost({type: Category_REQUEST})
            const {data} = await axios.get(`${baseUrl}/api/news/cat-news${cat}`)
            dispatchCatPost({type: Category_SUCCESS, payload: data})

        } catch (err) {
            dispatchCatPost({type: Category_FAIL, payload: err.response.data.message})
        }
    }

    const PopularPost = async () => {

        try {
            dispatchPopularPost({type: Popular_REQUEST})
            const {data} = await axios.get(`${baseUrl}/api/news/popular`)
            dispatchPopularPost({type: Popular_SUCCESS, payload: data})

        } catch (err) {
            dispatchPopularPost({type: Popular_FAIL, payload: err.response.data.message})
        }
    }
    const LoadView=async (id)=>{
        try {

            const res=await axios.get(`${baseUrl}/api/news/detail/${id}`)

        }catch (err){
            console.log(err)
        }
    }

    const createComment = async(data) => {
        try {
            const res = await axios.post(`${baseUrl}/api/comment`, data)
            toast.success(res.data, {
                position: "bottom-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const getSingleComment = async(id) => {
        try {
            const res = await axios.get(`${baseUrl}/api/comment/${id}`)
            setNewsComment(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    const handleEmail = async(data) => {
        try {
            const res = await axios.post(`${baseUrl}/api/send-email`,data)
            toast.success(res.data, {
                position: "bottom-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
            });
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <HomeContext.Provider value={
            {
                loading: state.loading,
                error: state.error,
                videos: state.videos,
                loadingLastPost: stateLastPost.loadingLastPost,
                errorLastPost: stateLastPost.errorLastPost,
                LastPost: stateLastPost.LastPost,

                loadingCatPost: stateCatPost.loadingCategoryPost,
                errorCatPost: stateCatPost.errorCategoryPost,
                CatPost: stateCatPost.CategoryPost,
                LoadingPopular: statePopularPost.loadingLastPopular,
                errorPopular: statePopularPost.errorPopular,
                NewsPopular: statePopularPost.NewsPopular,
                category,
                catPost,//برای این که دسته بندی هارو نمایش بدیم
                createComment,
                getSingleComment,
                newsComment,
                LoadView,
                handleEmail


            }
        }>
            {children}
        </HomeContext.Provider>
    )
}


