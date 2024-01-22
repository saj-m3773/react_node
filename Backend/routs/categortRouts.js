import express from "express";
import {veryfiyToken} from "../middleware/VeryfiyToken.js";
import {
    carteCategory,
    deleteCategory,
    getCategory,
    getCategoryList,
    updateCategory
} from "../Controler/CategoryContorolar.js";

const router=express.Router()

router.get('/api/get-category-list',getCategoryList)

router.get('/api/get-category',veryfiyToken,getCategory)
router.post('/api/create-category',veryfiyToken,carteCategory)
router.put('/api/update-category/:id',veryfiyToken,updateCategory)//put--> barae viraesh
router.delete('/api/delete-category/:id',veryfiyToken,deleteCategory)
export default router