import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import popularImg from "../../../../assets/images/1.jpeg"
import { BsEye } from "react-icons/bs";
import travel from "../../../../assets/images/traveling.jpg"
import "./popular.css"
import {HomeContext} from "../../../Context/contect";
import moment from "jalali-moment";
import Loaders from "../../Loading/Loaders";
const PopularNews = () => {
     const {LoadingPopular,NewsPopular}=useContext(HomeContext)
  return (
    <div className="container mt-6">
        {LoadingPopular ? (
            <div className="column is-four-fifths has-background-white p-4 has-text-centered">
                <Loaders />
            </div>
        ) : (
            <div className="column is-four-fifths has-background-white p-4">
                <div className="popular mb-5">
                    <h1>محبوب ترین خبرها</h1>
                </div>
                <div className="columns">
                    {NewsPopular &&
                        NewsPopular?.map((news) => {
                            return (
                                <div className="column popular-news">
                                    <div className="popular-img is-relative">
                                        <Link to={`/detail/${news.id}`} state={news}>
                                            <img
                                                src={news.url}
                                                className="is-fullwidth popular-image"
                                                alt=""
                                            />
                                        </Link>
                                        <div className="num-views">
                          <span>
                            <BsEye />
                              {news.numViews}
                          </span>
                                        </div>
                                    </div>
                                    <div className="popular-title">
                                        <h6 className="is-flex has-text-weight-bold is-size-5">
                                            <Link to={`/detail/${news.id}`} state={news}>{news.title}</Link>
                                        </h6>
                                    </div>
                                    <div className="author mt-4">
                        <span className="is-size-6 has-text-grey ml-2">
                          {moment(news.createdAt).locale("fa").format("YYYY-MM-DD")}
                        </span>
                                        <span className="is-size-6 has-text-grey mr-2">
                          {news?.user?.name}
                        </span>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        )}
    </div>
  )
}

export default PopularNews