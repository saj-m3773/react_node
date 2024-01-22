import express from "express";
import {sendEmailMsg} from "../Controler/EmailMsgControler.js";

const router=express.Router()

router.post("api/send-email",sendEmailMsg)

export default router