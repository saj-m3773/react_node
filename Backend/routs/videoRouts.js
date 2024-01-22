import express from "express";
import {veryfiyToken} from "../middleware/VeryfiyToken.js";
import {createVideo, deleteVideo, getAllVideo, getSingleVideo} from "../Controler/VideoControler.js";

const router =express.Router()

router.post('/api/create-video',veryfiyToken,createVideo)
router.get('/api/get-videos',veryfiyToken,getAllVideo)
router.get('/api/get-video',getSingleVideo)//همه می تونن ببین این ویدیو رو پس نیاز نداره رمز نگاری شود
router.delete('/api/delete-videos/:id',veryfiyToken,deleteVideo)
export default router
