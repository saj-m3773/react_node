// The relationship between models and controler

import express from "express";
import {
    deleteUser,
    getAllUsers, Login, Logout, Profile,
    Register, updateProfile, updateUser
} from "../Controler/UserCintrollar.js";
import {veryfiyToken} from "../middleware/VeryfiyToken.js";
import {refreshToken} from "../Controler/RefreshTolen.js";
//aval in egra mesha and user

const router =express.Router()

router.get("/token", refreshToken)
router.get("/users",veryfiyToken,getAllUsers)
router.post('/users/register',veryfiyToken,Register)
router.post('/users/login',Login)
router.delete('/users/:id',veryfiyToken,deleteUser)
router.delete('/api/users/logout',veryfiyToken,Logout)
router.put('/users/profile/:id',veryfiyToken,updateProfile)
router.get('/users/profile',veryfiyToken,Profile)
router.put('/users/:id',veryfiyToken,updateUser)


export default router