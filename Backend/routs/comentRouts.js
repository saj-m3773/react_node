import express from "express";
import {veryfiyToken} from "../middleware/VeryfiyToken.js";
import  { active, createComment, deleteComment, getAllComment, getComment, unActive, updateComment }from "../Controler/comentControl.js";


const router=express.Router()

router.get("/api/comment/:newsId", getComment)
router.get("/api/comment", veryfiyToken, getAllComment)
router.post("/api/comment", createComment)
router.put("/api/comment/active/:id", veryfiyToken, active)
router.put("/api/comment/unactive/:id", veryfiyToken, unActive)
router.put("/api/comment/:id", veryfiyToken, updateComment)
router.delete("/api/comment/:id", veryfiyToken, deleteComment)
export default router