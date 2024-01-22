import express from "express";
import {veryfiyToken} from "../middleware/VeryfiyToken.js";
import {
    createNews,
    deleteNews,
    getCatNews, getDetailNews,
    getLastNews,
    getNews,
    getNewsById, popularNews,
    updateNews
} from "../Controler/NewsControl.js";


const router=express.Router()


router.get("/api/news/lastnews", getLastNews)
router.get("/api/news/detail/:id", getDetailNews)
router.get("/api/news/popular", popularNews)
router.get("/api/news/cat-news", getCatNews)



router.get("/api/news", veryfiyToken, getNews)
router.post("/api/news", veryfiyToken, createNews)
router.get("/api/news/:id", veryfiyToken , getNewsById)
router.put("/api/news/:id", veryfiyToken, updateNews)
router.delete("/api/news/:id", veryfiyToken, deleteNews)
export default router